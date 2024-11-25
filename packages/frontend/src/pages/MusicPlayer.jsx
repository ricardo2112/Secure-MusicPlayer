import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import Community from '../components/Community';
import AudioPlayer from '../components/AudioPlayer';
import portadaImage from '../assets/imgs/portadaExample.png';

function MusicPlayer({ onSectionChange }) {
  const [selectedSection, setSelectedSection] = useState('MainContent');

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const renderMainContent = () => {
    if (selectedSection === 'Comunidad') {
      return <Community />;
    }
    return <MainContent section={selectedSection} />;
  };

  const audioUrl = "https://example.com/audio-file.mp3";
  const handleNextEpisode = () => console.log("Next episode clicked");
  const handleBackwardEpisode = () => console.log("Previous episode clicked");
  const currentEpisodeTitle = "Example Episode Title";

  return (
    <div className="flex flex-col h-screen bg-[#141D26]">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-72 min-w-72 bg-[#141D26]">
          {/* Sidebar content */}
          <div className="flex-grow overflow-y-auto">
            <Sidebar onSectionChange={handleSectionChange} />
          </div>
          
          {/* Audio Player fixed at bottom */}
          <div className="flex-shrink-0">
            <AudioPlayer
              url={audioUrl}
              onNextEpisode={handleNextEpisode}
              onBackwardEpisode={handleBackwardEpisode}
              titleEpisode={currentEpisodeTitle}
              podcastImage={portadaImage}
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