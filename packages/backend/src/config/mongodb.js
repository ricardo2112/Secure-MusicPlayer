import mongoose from 'mongoose';

const mongoURL = 'mongodb://localhost:27017/musicplayer';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURL); // Sin opciones adicionales
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};

export default connectToDatabase;

