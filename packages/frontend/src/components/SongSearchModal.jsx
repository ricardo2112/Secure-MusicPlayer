import React, { useState } from "react";

const SongSearchModal = ({ playlist, onAddSong, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.audius.co/v1/tracks/search?query=${searchTerm}`);
      const data = await response.json();
      setSongs(data.data);
    } catch (error) {
      console.error("Error al buscar canciones:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-4 rounded shadow-lg w-2/3">
        <h2 className="text-white text-lg mb-4">Añadir canciones a {playlist.name}</h2>
        <input
          type="text"
          placeholder="Buscar canciones"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white mb-4"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          Buscar
        </button>
        <ul className="space-y-2">
          {songs.map((song) => (
            <li key={song.id} className="flex items-center justify-between text-white">
              <span>{song.title}</span>
              <button
                onClick={() => onAddSong(song.id)}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Añadir
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default SongSearchModal;
