import React, { useEffect, useState } from "react";
import { fetchTrendingTracksData, fetchRelaxingTracksData, fetchTrackDetails } from "../services/data";

const MusicList = ({ onTrackSelect }) => {
  const [trendingTracks, setTrendingTracks] = useState([]);
  const [relaxingTracks, setRelaxingTracks] = useState([]);

  useEffect(() => {
    const fetchTrendingTracks = async () => {
      try {
        const response = await fetchTrendingTracksData();
        const shuffledTracks = response.data.data.sort(() => Math.random() - 0.5).slice(0, 8);
        setTrendingTracks(shuffledTracks); 
      } catch (error) {
        console.error("Error fetching trending tracks:", error);
      }
    };

    const fetchRelaxingTracks = async () => {
      try {
        const response = await fetchRelaxingTracksData();
        const shuffledTracks = response.data.data.sort(() => Math.random() - 0.5).slice(0, 8);
        setRelaxingTracks(shuffledTracks); 
      } catch (error) {
        console.error("Error fetching relaxing tracks:", error);
      }
    };

    fetchTrendingTracks();
    fetchRelaxingTracks();
  }, []);

  const handleTrackClick = async (trackId) => {
    try {
        const response = await fetchTrackDetails(trackId);
        const trackDetails = response.data;
        onTrackSelect(trackDetails);
    } catch (error) {
        console.error('Error selecting track:', error);
    }
};

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-secondary">
      <section>
        <h2 className="text-white text-xl mb-4">Descubre lo nuevo</h2>
        <div className="grid grid-cols-4 gap-4">
          {trendingTracks.length > 0 ? (
            trendingTracks.map((track) => (
              <div
                key={track.id}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                onClick={() => handleTrackClick(track.id)}
              >
                <img
                  src={
                    track.artwork["480x480"] ||
                    "https://via.placeholder.com/480"
                  }
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
                <div className="p-2">
                  <h3 className="text-white text-md font-semibold">{track.title} Hola</h3>
                  <p className="text-gray-400 text-sm">{track.user.name}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">Cargando...</p>
          )}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-white text-xl mb-4">Para relajarse con lo mejor!</h2>
        <div className="grid grid-cols-4 gap-4">
          {relaxingTracks.length > 0 ? (
            relaxingTracks.map((track) => (
              <div
                key={track.id}
                className="aspect-square bg-contrast rounded-lg overflow-hidden cursor-pointer"
                onClick={() => handleTrackClick(track.id)}
              >
                <img
                  src={
                    track.artwork["480x480"] ||
                    "https://via.placeholder.com/480"
                  }
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
                <div className="p-2">
                  <h3 className="text-white text-md font-semibold">
                    {track.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{track.user.name}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">Próximamente...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default MusicList;
