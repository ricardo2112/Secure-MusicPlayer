import { fetchSongInfo, fetchSongStream, fetchTrendingSongs } from "../services/audiusService.js";
// Obtener información de una canción
export const getSongInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const songInfo = await fetchSongInfo(id);
    res.status(200).json(songInfo);
  } catch (error) {
    console.error("Error en getSongInfo:", error.message);
    res.status(500).json({ error: "Error al obtener la información de la canción." });
  }
};

// Obtener la URL para reproducir una canción
export const playSong = async (req, res) => {
  try {
    const { id } = req.params;
    const songStreamURL = await fetchSongStream(id);
    res.status(200).json({ url: songStreamURL });
  } catch (error) {
    console.error("Error en playSong:", error.message);
    res.status(500).json({ error: "Error al obtener la URL de reproducción." });
  }
};

// Obtener canciones populares
export const getTrendingSongs = async (req, res) => {
  try {
    // Obtener el límite opcional desde la query string (por ejemplo, ?limit=10)
    const limit = parseInt(req.query.limit, 10) || 20;
    const trendingSongs = await fetchTrendingSongs(limit);
    res.status(200).json(trendingSongs);
  } catch (error) {
    console.error("Error en getTrendingSongs:", error.message);
    res.status(500).json({ error: "Error al obtener canciones populares." });
  }
};