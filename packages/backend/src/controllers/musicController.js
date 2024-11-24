const { fetchSongInfo, fetchSongStream } = require("../services/audiusService");

// Obtener información de una canción
const getSongInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const songInfo = await fetchSongInfo(id);
    res.status(200).json(songInfo);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la información de la canción." });
  }
};

// Obtener la URL para reproducir una canción
const playSong = async (req, res) => {
  try {
    const { id } = req.params;
    const songStreamURL = await fetchSongStream(id);
    res.status(200).json({ url: songStreamURL });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la URL de reproducción." });
  }
};

module.exports = { getSongInfo, playSong };
