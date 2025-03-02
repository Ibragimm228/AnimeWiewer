import { useState } from 'react';
import { PlayerControllerType } from '../../../../types/animePlayer.type';

export const ControlsVideo = ({
  episode,
  episodes,
  onChangeEpisode,
  togglePlay,
  handleVolume,
  changeProgress,
  playerState,
  toggleFullscreen,
  showControls
}: PlayerControllerType) => {
  const [showVolume, setShowVolume] = useState<boolean>(false);

  const toggleVolume = () => {
    setShowVolume(!showVolume);
  };

  return (
    <div className={`absolute top-0 left-0 bottom-0 right-0 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
      <select
        value={episode}
        onChange={onChangeEpisode}
        className="bg-slate-800 absolute top-3 left-3 text-xl z-50 p-2 rounded-lg outline-none cursor-pointer"
      >
        {episodes?.map(ep => (
          <option value={ep.episode} key={ep.created_timestamp}>
            Серия {ep.episode}
          </option>
        ))}
      </select>
      <div
        className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] cursor-pointer z-50"
        onClick={togglePlay}
      >
        {playerState?.playing ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-20 h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-20 h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            />
          </svg>
        )}
      </div>
      <div className="w-full absolute bottom-0 left-0 right-0 bg-slate-950/50 p-2 z-50">
        <div className="flex items-center">
          <div className="relative">
            <input
              className={`rotate-[270deg] absolute left-[-55px] top-[-85px] ${
                showVolume ? 'block' : 'hidden'
              }`}
              type="range"
              min="0"
              max="1"
              step="0.01"
              onChange={handleVolume}
              value={playerState?.volume}
            />
            <svg
              onClick={toggleVolume}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          </div>
          <input
            type="range"
            className="w-full ml-5 progress-track"
            min={playerState?.start}
            max={playerState?.end}
            step="0.1"
            value={playerState?.playedSeconds}
            onChange={changeProgress}
          />
          <div className="ml-5 cursor-pointer" onClick={toggleFullscreen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
