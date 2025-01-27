import axios from "axios";

const API_URL = "http://localhost:3000/playlists"; // Cambia esto según tu backend

// Obtener todas las playlists
export const getPlaylists = async (token) => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error en getPlaylists:", error.response?.data || error.message);
      throw error;
    }
  };
  

// Crear una nueva playlist
export const createPlaylist = async (token, name) => {
  const response = await axios.post(
    API_URL,
    { name },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Actualizar una playlist
export const updatePlaylist = async (token, playlistId, name) => {
  const response = await axios.put(
    API_URL,
    { playlistId, name },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Eliminar una playlist
export const deletePlaylist = async (token, playlistId) => {
  const response = await axios.delete(`${API_URL}/${playlistId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Añadir una canción a una playlist
export const addSongToPlaylist = async (token, playlistId, songId) => {
  const response = await axios.post(
    `${API_URL}/add-song`,
    { playlistId, songId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Eliminar una canción de una playlist
export const removeSongFromPlaylist = async (token, playlistId, songId) => {
  const response = await axios.post(
    `${API_URL}/remove-song`,
    { playlistId, songId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
