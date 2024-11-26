import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import Community from '../components/Community';
import AudioPlayer from '../components/AudioPlayer';
import MusicList from '../components/MusicList'; // Asegúrate de que este componente esté importado

function MusicPlayer() {
  const [selectedSection, setSelectedSection] = useState('MainContent');
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const handleNextEpisode = () => console.log("Next episode clicked");
  const handleBackwardEpisode = () => console.log("Previous episode clicked");

  const handleTrackSelect = (trackDetails) => {
    setCurrentTrack({
      url: trackDetails.stream_url || '',
      title: trackDetails.title || 'Unknown Title',
      artwork: trackDetails.artwork?.['480x480'] || 'https://via.placeholder.com/480'
    });
  };

  const renderMainContent = () => {
    if (selectedSection === 'Comunidad') {
      return <Community />;
    } else if (selectedSection === 'MusicList') {
      return <MusicList onTrackSelect={handleTrackSelect} />;
    }
    return <MainContent section={selectedSection} />;
  };

  return (
    <div className="flex flex-col h-screen bg-[#141D26]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-72 min-w-72 bg-[#141D26]">
          {/* Sidebar content */}
          <div className="flex-grow overflow-y-auto">
            <Sidebar onSectionChange={handleSectionChange} />
          </div>

          {/* Audio Player fixed at bottom */}
          <div className="flex-shrink-0">
            <AudioPlayer
              url={currentTrack?.url || 'https://example.com/audio-file.mp3'}
              onNextEpisode={handleNextEpisode}
              onBackwardEpisode={handleBackwardEpisode}
              titleEpisode={currentTrack?.title || 'Example Episode Title'}
              podcastImage={currentTrack?.artwork || 'https://via.placeholder.com/480'}
            />
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 bg-[#141D26] overflow-hidden">
          <div className="h-full overflow-hidden px-6 py-4">
            {renderMainContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
