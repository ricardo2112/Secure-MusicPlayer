import axios from 'axios';

// Function to fetch trending tracks from Audius API
export const fetchTrendingTracksData = async () => {
    try {
        const response = await axios.get('https://discoveryprovider.audius.co/v1/tracks/trending');
        return response;
    } catch (error) {
        console.error('Error fetching trending tracks:', error);
        throw error;
    }
};

// Function to fetch relaxing tracks (using a sample tag or filter for relaxation)
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

// Function to fetch track details by track ID
export const fetchTrackDetails = async (trackId) => {
    try {
        const response = await axios.get(`https://discoveryprovider.audius.co/v1/tracks/${trackId}`);
        return response;
    } catch (error) {
        console.error('Error fetching track details:', error);
        throw error;
    }
};