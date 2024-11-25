import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import AudioPlayer from '../components/AudioPlayer';

function MusicPlayer() {
  const [selectedSection, setSelectedSection] = useState('MusicList');
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleNextEpisode = () => console.log("Next episode clicked");
  const handleBackwardEpisode = () => console.log("Previous episode clicked");

  const handleTrackSelect = (trackDetails) => {
    setCurrentTrack({
      url: trackDetails.stream_url || '',
      title: trackDetails.title || 'Unknown Title',
      artwork: trackDetails.artwork?.['480x480'] || 'https://via.placeholder.com/480'
    });
  };

  return (
    <div className="flex flex-col h-screen bg-secondary">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className='flex flex-col w-1/4 bg-primary'>
          <Sidebar onSectionChange ={setSelectedSection} />
          <div className="mt-auto">
            <AudioPlayer
                url={currentTrack.url}
                onNextEpisode={handleNextEpisode}
                onBackwardEpisode={handleBackwardEpisode}
                titleEpisode={currentTrack.title}
                podcastImage={currentTrack.artwork}
              />
          </div>
        </div>
        <MainContent section={selectedSection} />
          {selectedSection === 'MusicList' && (
            <MusicList onTrackSelect={handleTrackSelect} />
          )}
      </div>
    </div>
  );
}

export default MusicPlayer;
