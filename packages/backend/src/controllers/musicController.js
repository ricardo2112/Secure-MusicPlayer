import { fetchSongInfo, fetchSongStream } from "../services/audiusService.js";

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
