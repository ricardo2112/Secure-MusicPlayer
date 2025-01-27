import React, { useState, useEffect } from "react";
import { usePlaylists } from "../context/PlaylistsContext";
import SongSearchModal from "./SongSearchModal"; // Nuevo componente para buscar canciones

const Playlists = ({ onPlaySong }) => {
  const {
    playlists,
    fetchPlaylists,
    addPlaylist,
    removePlaylist,
    addSong,
  } = usePlaylists();

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [viewPlaylist, setViewPlaylist] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [isAddingSongs, setIsAddingSongs] = useState(false); // Modal para añadir canciones
  const [newPlaylistName, setNewPlaylistName] = useState(""); // Nombre de la nueva playlist
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        setIsLoading(true);
        await fetchPlaylists();
      } catch (error) {
        console.error("Error al cargar playlists:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPlaylists(); // Cargar las playlists al montar el componente
  }, []);

  const handleAddPlaylist = async () => {
    if (!newPlaylistName.trim()) {
      alert("Por favor, ingresa un nombre para la playlist.");
      return;
    }

    try {
      await addPlaylist(newPlaylistName);
      setNewPlaylistName(""); // Limpiar el campo de nombre
    } catch (error) {
      console.error("Error al agregar playlist:", error);
    }
  };

  const handleViewPlaylist = (playlist) => {
    setPlaylistSongs(playlist.songs || []);
    setViewPlaylist(playlist);
  };

  const handleDeletePlaylist = async (id) => {
    try {
      await removePlaylist(id);
    } catch (error) {
      console.error("Error al eliminar la playlist:", error);
    }
  };

  const handleAddSongToPlaylist = async (playlistId, songId) => {
    try {
      await addSong(playlistId, songId);
    } catch (error) {
      console.error("Error al añadir canción:", error);
    }
  };

  if (isLoading) {
    return <div className="text-white">Cargando playlists...</div>;
  }

  if (viewPlaylist) {
    return (
      <div className="text-white">
        <h3 className="text-lg">Canciones en {viewPlaylist.name}</h3>
        <ul>
          {playlistSongs.map((song, index) => (
            <li key={index}>{song}</li>
          ))}
        </ul>
        <button
          onClick={() => setViewPlaylist(null)}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-white text-2xl mb-4">Tus Playlists</h2>

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Nombre de la playlist"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          className="mr-2 p-2 rounded bg-gray-800 text-white border border-gray-600"
        />
        <button
          onClick={handleAddPlaylist}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Crear Playlist
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {playlists.map((playlist) => (
          <div
            key={playlist._id || playlist.id} // Asegúrate de que la clave es única
            className="relative border rounded-lg p-4 cursor-pointer bg-gray-800 hover:bg-gray-700"
            onClick={() => handleViewPlaylist(playlist)}
          >
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddingSongs(true);
                  setSelectedPlaylist(playlist);
                }}
                className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600"
              >
                ➕
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeletePlaylist(playlist._id || playlist.id);
                }}
                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                🗑️
              </button>
            </div>
            <h3 className="text-white text-lg">{playlist.name}</h3>
          </div>
        ))}
      </div>

      {isAddingSongs && selectedPlaylist && (
        <SongSearchModal
          playlist={selectedPlaylist}
          onAddSong={(songId) => handleAddSongToPlaylist(selectedPlaylist._id, songId)}
          onClose={() => setIsAddingSongs(false)}
        />
      )}
    </div>
  );
};

export default Playlists;
