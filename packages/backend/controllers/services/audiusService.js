const axios = require("axios");

// Configuración base de la API Audius
const BASE_URL = "https://discoveryprovider.audius.co/v1";

// Obtener información de una canción por ID
const fetchSongInfo = async (songId) => {
  const response = await axios.get(`${BASE_URL}/tracks/${songId}`);
  return response.data;
};

// Obtener la URL de streaming de una canción
const fetchSongStream = async (songId) => {
  const response = await axios.get(`${BASE_URL}/tracks/${songId}/stream`);
  return response.data.data;
};

module.exports = { fetchSongInfo, fetchSongStream };
