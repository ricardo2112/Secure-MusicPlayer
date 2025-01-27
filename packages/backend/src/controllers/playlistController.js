// playlistController.js
import User from "../model/user.js";

// Crear una nueva playlist
export const createPlaylist = async (req, res) => {
  try {
    const { userId } = req.user; // Verificar que el middleware haya asignado el userId
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "El nombre de la playlist es obligatorio" });
    }

    // Buscar al usuario en la base de datos
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Crear la nueva playlist
    const newPlaylist = { name, songs: [] };
    user.playlists.push(newPlaylist);
    await user.save();

    res.status(201).json({ message: "Playlist creada con éxito", playlist: newPlaylist });
  } catch (error) {
    console.error("Error al crear la playlist:", error);
    res.status(500).json({ error: "Error al crear la playlist" });
  }
};

// Obtener todas las playlists del usuario
export const getPlaylists = async (req, res) => {
  try {
    const userId = req.userId; // Esto debe venir del token después de usar `verifyToken`
    const user = await User.findById(userId).populate("playlists"); // Asegúrate de que `playlists` sea un campo válido

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ playlists: user.playlists });
  } catch (error) {
    console.error("Error al obtener playlists:", error);
    res.status(500).json({ error: "Error al obtener playlists" });
  }
};
// Actualizar una playlist
export const updatePlaylist = async (req, res) => {
  const { userId } = req.user;
  const { playlistId, name } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const playlist = user.playlists.id(playlistId);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    playlist.name = name;
    await user.save();

    res.status(200).json({ message: "Playlist updated", playlist });
  } catch (error) {
    console.error("Error updating playlist:", error);
    res.status(500).json({ error: "Failed to update playlist" });
  }
};

// Eliminar una playlist
export const deletePlaylist = async (req, res) => {
  const { userId } = req.user;
  const { playlistId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.playlists = user.playlists.filter((p) => p._id.toString() !== playlistId);
    await user.save();

    res.status(200).json({ message: "Playlist deleted" });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).json({ error: "Failed to delete playlist" });
  }
};

// Añadir una canción a una playlist
export const addSongToPlaylist = async (req, res) => {
  const { userId } = req.user;
  const { playlistId, songId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const playlist = user.playlists.id(playlistId);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    if (playlist.songs.includes(songId)) {
      return res.status(400).json({ error: "Song already in playlist" });
    }

    playlist.songs.push(songId);
    await user.save();

    res.status(200).json({ message: "Song added to playlist", playlist });
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    res.status(500).json({ error: "Failed to add song to playlist" });
  }
};

// Eliminar una canción de una playlist
export const removeSongFromPlaylist = async (req, res) => {
  const { userId } = req.user;
  const { playlistId, songId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const playlist = user.playlists.id(playlistId);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    playlist.songs = playlist.songs.filter((id) => id !== songId);
    await user.save();

    res.status(200).json({ message: "Song removed from playlist", playlist });
  } catch (error) {
    console.error("Error removing song from playlist:", error);
    res.status(500).json({ error: "Failed to remove song from playlist" });
  }
};