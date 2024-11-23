import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import AudioPlayer from '../components/AudioPlayer';
import portadaImage from '../assets/imgs/portadaExample.png';

function MusicPlayer() {
  const [selectedSection, setSelectedSection] = useState('MainContent');

  const audioUrl = "https://example.com/audio-file.mp3";
  const handleNextEpisode = () => console.log("Next episode clicked");
  const handleBackwardEpisode = () => console.log("Previous episode clicked");
  const currentEpisodeTitle = "Título del Episodio Ejemplo";

  return (
    <div className="flex flex-col h-screen bg-secondary">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className='flex flex-col w-1/4 bg-primary space-y-4'>
          <Sidebar onSectionChange ={setSelectedSection} />
          <AudioPlayer
            url={audioUrl}
            onNextEpisode={handleNextEpisode}
            onBackwardEpisode={handleBackwardEpisode}
            titleEpisode={currentEpisodeTitle}
            podcastImage={portadaImage} 
          />
        </div>
        <MainContent section={selectedSection} />
      </div>
    </div>
  );
}

export default MusicPlayer;
