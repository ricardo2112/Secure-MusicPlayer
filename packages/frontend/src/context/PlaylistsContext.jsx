import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const PlaylistsContext = createContext();
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const PlaylistsProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([
    { id: 1, title: "Playlist 1", description: "Description 1", cover: "", songs: [] },
    { id: 2, title: "Playlist 2", description: "Description 2", cover: "", songs: [] },
    { id: 3, title: "Playlist 3", description: "Description 3", cover: "", songs: [] },
  ]);

  const addPlaylist = (newPlaylist) => {
    setPlaylists([...playlists, newPlaylist]);
  };

  const updatePlaylist = (updatedPlaylist) => {
    setPlaylists(
      playlists.map((p) => (p.id === updatedPlaylist.id ? updatedPlaylist : p))
    );
  };

  const removePlaylist = (id) => {
    setPlaylists(playlists.filter((playlist) => playlist.id !== id));
  };

// En PlaylistsContext.jsx o el archivo donde esté definida la función
const loadSongsForPlaylist = async (playlistId) => {
  try {
    // URL dinámica para la API de canciones populares
    const response = await axios.get(`${BASE_URL}/api/trending`);
    
    const songs = response.data.map((track) => ({
      id: track.id,
      title: track.title,
      artist: track.user.name,
      artwork: track.artwork["150x150"],
      streamUrl: `${BASE_URL}/api/tracks/${track.id}/stream`, // URL dinámica para streaming
    }));
    
    return songs;
  } catch (error) {
    console.error("Error al cargar canciones desde el backend:", error);
    return [];
  }
};


    
  

  return (
    <PlaylistsContext.Provider
      value={{
        playlists,
        addPlaylist,
        updatePlaylist,
        removePlaylist,
        loadSongsForPlaylist,
      }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
};

export const usePlaylists = () => {
  return useContext(PlaylistsContext);
};
