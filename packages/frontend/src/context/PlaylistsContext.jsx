import React, { createContext, useContext, useState } from "react";
import { fetchTrendingSongs, fetchSongStream } from "../services/data";

const PlaylistsContext = createContext();

export const PlaylistsProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([
    { id: 1, title: "Playlist 1", description: "Description 1", cover: "", songs: [] },
    { id: 2, title: "Playlist 2", description: "Description 2", cover: "", songs: [] },
    { id: 3, title: "Playlist 3", description: "Description 3", cover: "", songs: [] },
  ]);

  const [currentSong, setCurrentSong] = useState(null);

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

  const loadSongsForPlaylist = async (playlistId) => {
    try {
      const trendingSongs = await fetchTrendingSongs();
      const songs = await Promise.all(
        trendingSongs.map(async (track) => {
          const streamUrl = await fetchSongStream(track.id);
          return {
            id: track.id,
            title: track.title,
            artist: track.user.name,
            artwork: track.artwork["150x150"],
            streamUrl,
          };
        })
      );
      return songs;
    } catch (error) {
      console.error("Error al cargar canciones desde el backend:", error.message);
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
        currentSong,
        setCurrentSong,
      }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
};

export const usePlaylists = () => useContext(PlaylistsContext);
