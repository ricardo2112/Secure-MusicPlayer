import React from 'react'

const MusicList = () => {
    return (
        <div className="flex-1 overflow-y-auto p-6 bg-secondary">
          <section>
            <h2 className="text-white text-xl mb-4">Descubre lo nuevo</h2>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="aspect-square bg-contrast rounded-lg"></div>
              ))}
            </div>
          </section>
          
          <section className="mt-8">
            <h2 className="text-white text-xl mb-4">Para relajarse</h2>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="aspect-square bg-contrast rounded-lg"></div>
              ))}
            </div>
          </section>
        </div>
      );
}

export default MusicList