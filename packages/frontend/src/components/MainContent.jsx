import React from 'react'
import MusicList from './MusicList';
import Favorites from './Favorites';
import Playlists from './PlayList';
import Community from './Community';


const MainContent = ({ section }) => {
    return (
      <div className="flex-1 bg-secondary text-white p-4 overflow-y-auto">
      {section === 'MusicList' && <MusicList />}
      {section === 'Favoritas' && <Favorites />}
      {section === 'Playlists' && <Playlists />}
      {section === 'Comunidad' && <Community />}
    </div>
    )
}

export default MainContent