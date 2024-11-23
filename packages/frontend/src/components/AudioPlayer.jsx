import React, { useRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForwardStep,
  faBackwardStep,
  faVolumeLow,
  faCircleDown,
} from "@fortawesome/free-solid-svg-icons";

const AudioPlayer = ({
  url,
  onNextEpisode,
  onBackwardEpisode,
  titleEpisode,
  podcastImage,
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration || 0);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(e.target.value);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 text-white rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={podcastImage}
          alt="Podcast Cover"
          className="w-16 h-16 rounded-md"
        />
        <h3 className="text-lg font-bold">{titleEpisode}</h3>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBackwardEpisode}
          className="text-white hover:text-blue-400"
        >
          <FontAwesomeIcon icon={faBackwardStep} size="lg" />
        </button>
        <button
          onClick={togglePlayPause}
          className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="lg" />
        </button>
        <button
          onClick={onNextEpisode}
          className="text-white hover:text-blue-400"
        >
          <FontAwesomeIcon icon={faForwardStep} size="lg" />
        </button>
      </div>

      <div>
        <input
          type="range"
          value={progress}
          onChange={handleProgressChange}
          className="w-full appearance-none bg-gray-600 rounded-lg h-1 focus:outline-none"
        />
        <div className="flex justify-between text-sm mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <FontAwesomeIcon icon={faVolumeLow} size="lg" />
        <input
          type="range"
          value={volume}
          min="0"
          max="1"
          step="0.01"
          onChange={handleVolumeChange}
          className="w-3/4 appearance-none bg-gray-600 rounded-lg h-1 focus:outline-none"
        />
        <FontAwesomeIcon icon={faCircleDown} size="lg" className="hover:text-blue-400 cursor-pointer" />
      </div>

      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        className="hidden"
      />
    </div>
  );
};

const formatTime = (time) => {
  if (!time || isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export default AudioPlayer;
