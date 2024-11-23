import express from 'express';
import connectToDatabase from "./config/mongodb.js";
import bcrypt from 'bcrypt';
import { PORT } from './config/config.js';
import User from './model/user.js';

const app = express();
app.use(express.json());
connectToDatabase();

app.get('/', (req, res) => {
    res.send('hello');
});

// Login
app.post('/login', (req, res) => {
    res.json({ message: 'login' });
});

// Registro de usuario
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Validar datos de entrada
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        if (username.length < 3) {
            return res.status(400).json({ error: 'Username must be at least 3 characters long' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

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
        console.error('Error in /register:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Logout
app.post('/logout', (req, res) => {
    res.json({ message: 'logout' });
});

// Ruta protegida
app.get('/protected', (req, res) => {
    res.json({ message: 'protected' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
