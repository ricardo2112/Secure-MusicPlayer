import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "../services/playlistService";
import { AuthContext } from "./AuthContext.jsx";

export const PlaylistsContext = createContext();

export const PlaylistsProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (token) {
      fetchPlaylists();
    }
  }, [token]);

  const fetchPlaylists = async () => {
    try {
      const data = await getPlaylists(user.token); // Asegúrate de pasar el token correcto
      setPlaylists(data.playlists || []); // Si no hay playlists, usa un array vacío
    } catch (error) {
      console.error("Error al obtener playlists:", error);
    }
  };

  const addPlaylist = async (name) => {
    try {
      const data = await createPlaylist(token, name);
      setPlaylists((prev) => [...prev, data.playlist]);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const editPlaylist = async (playlistId, name) => {
    try {
      const data = await updatePlaylist(token, playlistId, name);
      setPlaylists((prev) =>
        prev.map((playlist) =>
          playlist._id === playlistId ? { ...playlist, name: data.playlist.name } : playlist
        )
      );
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };

  const removePlaylist = async (playlistId) => {
    try {
      await deletePlaylist(token, playlistId);
      setPlaylists((prev) => prev.filter((playlist) => playlist._id !== playlistId));
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const addSong = async (playlistId, songId) => {
    try {
      const data = await addSongToPlaylist(token, playlistId, songId);
      setPlaylists((prev) =>
        prev.map((playlist) =>
          playlist._id === playlistId ? { ...playlist, songs: data.playlist.songs } : playlist
        )
      );
    } catch (error) {
      console.error("Error adding song to playlist:", error);
    }
  };

  const removeSong = async (playlistId, songId) => {
    try {
      const data = await removeSongFromPlaylist(token, playlistId, songId);
      setPlaylists((prev) =>
        prev.map((playlist) =>
          playlist._id === playlistId ? { ...playlist, songs: data.playlist.songs } : playlist
        )
      );
    } catch (error) {
      console.error("Error removing song from playlist:", error);
    }
  };

  return (
    <PlaylistsContext.Provider
      value={{
        playlists,
        fetchPlaylists,
        addPlaylist,
        editPlaylist,
        removePlaylist,
        addSong,
        removeSong,
      }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
};

export const usePlaylists = () => {
  return useContext(PlaylistsContext);
};