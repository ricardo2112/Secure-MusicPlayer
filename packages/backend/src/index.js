import express from 'express';
import connectToDatabase from "./config/mongodb.js";
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import verifyToken from './middleware/auth.js';
import User from './model/user.js';
import cors from 'cors';
import logout from './middleware/logout.js';
import musicRoutes from './routes/musicRoutes.js'

import { PORT, SECRET_JWT_KEY} from './config/config.js';
import { validateRegister, validateLogin } from './utils/validations.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
connectToDatabase();

app.get('/', (req, res) => {
    res.send('hello');
});

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Validar datos de entrada
        validateLogin({ username, password });

        // Buscar al usuario en la base de datos
        const user = await User.findOne({ user: username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { userId: user._id, username: user.user }, // Payload
            SECRET_JWT_KEY, // Llave secreta
            { expiresIn: '1h' } // Configuración del token
        );

        // Opcional: Configurar una cookie segura con el token
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hora

        // Responder con el token o mensaje de éxito
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error('Error in /login:', error.message);
        res.status(400).json({ error: error.message });
    }
});

// Registro de usuario
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Validar datos de entrada
        validateRegister({ username, password });

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ user: username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new User({
            user: username,
            password: hashedPassword,
        });

        // Guardar el usuario en la base de datos
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', id: newUser._id });
    } catch (error) {
        console.error('Error in /register:', error.message);
        res.status(400).json({ error: error.message });
    }
});

// Logout
app.post('/logout', (req, res) => {
    // Verifica si la cookie del token existe
    if (!req.cookies.token) {
        return res.status(400).json({ message: 'No active session found' });
    }

    // Elimina la cookie del token con opciones seguras
    res.clearCookie('token', {
        httpOnly: true,     // Solo accesible desde el servidor
        secure: true,       // Solo se envía en conexiones HTTPS (configúralo según tu entorno)
        sameSite: 'strict', // Protege contra ataques CSRF
    });

    res.status(200).json({ message: 'Logout successful' });
});


// Ruta protegida
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: `Hello, ${req.user.username}. You have access to this protected route!` });
});

app.use("/api", musicRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
