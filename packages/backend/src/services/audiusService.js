import axios from "axios";

// Configuración base de la API Audius
const BASE_URL = "https://discoveryprovider.audius.co/v1";

// Obtener información de una canción por ID
export const fetchSongInfo = async (songId) => {
  try {
    const response = await axios.get(`${BASE_URL}/tracks/${songId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching song info for ID: ${songId}`, error.message);
    throw new Error("Failed to fetch song information");
  }
};

// Obtener la URL de streaming de una canción
export const fetchSongStream = async (songId) => {
  try {
    const response = await axios.get(`${BASE_URL}/tracks/${songId}/stream`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching song stream for ID: ${songId}`, error.message);
    throw new Error("Failed to fetch song stream URL");
  }
};

// Obtener canciones populares
export const fetchTrendingSongs = async (limit = 20) => {
  try {
    const response = await axios.get(`${BASE_URL}/tracks/trending`);
    // Limitar el número de resultados a `limit`
    const trendingSongs = response.data.data.slice(0, limit);
    return trendingSongs;
  } catch (error) {
    console.error("Error al obtener canciones populares:", error.message);
    throw new Error("Failed to fetch trending songs");
  }
};
