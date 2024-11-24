import express from 'express';
import { getSongInfo, playSong } from '../controllers/musicController.js';

const router = express.Router();

// Ruta para obtener información de una canción por ID
router.get('/songs/:id', getSongInfo);

// Ruta para obtener la URL de reproducción de una canción
router.get('/songs/:id/play', playSong);

export default router; // Exportar el router como módulo ES6
