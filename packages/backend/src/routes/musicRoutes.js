import express from 'express';
const express = require("express");
const router = express.Router();
const { getSongInfo, playSong } = require("../controllers/musicController");

// Ruta para obtener información de una canción por ID
router.get("/songs/:id", getSongInfo);

// Ruta para obtener la URL de reproducción de una canción
router.get("/songs/:id/play", playSong);

module.exports = router;
