import React from 'react'

const Sidebar = ({ onSectionChange }) => {
    const menuItems = [
        { id: 1, label: 'Music List', component: 'MusicList' },
        { id: 2, label: 'Favoritas', component: 'Favoritas' },
        { id: 3, label: 'Playlists', component: 'Playlists' },
        { id: 4, label: 'Comunidad', component: 'Comunidad' },
    ];
  return (
    <div className='w-full bg-secondary text-white p-4 border-r border-contrast flex flex-col'>
        <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onSectionChange(item.component)}
                    className='w-full text-left py-2 px-4 hover:bg-primary rounded-lg'
                >{item.label}
                </button>
            ))}
        </nav>
    </div>
  )
}

export default Sidebar