import axios from 'axios';

const BACKEND_API_URL = 'http://localhost:3000';

export const fetchTrendingTracksData = async () => {
    try {
        const response = await axios.get(`${BACKEND_API_URL}/trending`);
        return response.data;
    } catch (error) {
        console.error('Error fetching trending tracks:', error);
        throw error;
    }
};

export const fetchRelaxingTracksData = async () => {
    const genres = ['chill', 'ambient', 'acoustic', 'classical', 'jazz', 'lo-fi', 'soul'];
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    try {
        const response = await axios.get(`https://discoveryprovider.audius.co/v1/tracks/trending?genre=${randomGenre}`);
        return response;
    } catch (error) {
        console.error('Error fetching relaxing tracks:', error);
        throw error;
    }
};
 
export const fetchTrackDetails = async (trackId) => {
    try {
        const response = await axios.get(`https://discoveryprovider.audius.co/v1/tracks/${trackId}`);
        return response;
    } catch (error) {
        console.error('Error fetching track details:', error);
        throw error;
    }
};
