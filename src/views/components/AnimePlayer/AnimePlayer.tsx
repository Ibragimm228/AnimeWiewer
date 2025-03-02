import ReactPlayer from 'react-player';
import { ControlsVideo } from './VideoControls/ControlsVideo';
import { AnimePlayerProps } from '../../../types/animePlayer.type';
import { useState, useRef, useEffect } from 'react';
import { OnProgressProps } from 'react-player/base';
import screenfull from 'screenfull';

export const AnimePlayer = ({
  episode,
  episodes,
  onChangeEpisode,
}: AnimePlayerProps) => {
  const [playerState, setPlayerState] = useState({
    playing: false,
    volume: 0.5,
    start: 0,
    playedSeconds: 0,
    end: 1,
  });

  const [showControls, setShowControls] = useState(false);
  const controlsTimeoutRef = useRef<number | null>(null);

  const refPlayer = useRef<ReactPlayer | null>(null);
  const refPlayerWrapper = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (playerState.playing) {
        setShowControls(false);
      }
    }, 2000);
  };

  const handleMouseLeave = () => {
    if (playerState.playing) {
      setShowControls(false);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  function getDuration(duration: number) {
    setPlayerState({ ...playerState, end: duration });
  }

  const togglePlay = () => {
    setPlayerState({ ...playerState, playing: !playerState.playing });
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerState({ ...playerState, volume: Number(e.target.value) });
  };

  const handleProgress = (progress: OnProgressProps) => {
    setPlayerState({
      ...playerState,
      playedSeconds: progress.playedSeconds,
    });
  };

  const changeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (refPlayer.current) refPlayer.current.seekTo(Number(e.target.value));
  };

  const toggleFullScreen = () => {
    if (refPlayerWrapper.current) screenfull.toggle(refPlayerWrapper.current);
  };

  console.log(playerState);

  return (
    <div className="my-5">
      <h1 className="text-3xl text-center">Серия {episode}</h1>
      <div 
        ref={refPlayerWrapper} 
        className="my-5 relative cursor-none hover:cursor-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <ControlsVideo
          episode={episode}
          episodes={episodes}
          onChangeEpisode={onChangeEpisode}
          togglePlay={togglePlay}
          playerState={playerState}
          handleVolume={handleVolume}
          changeProgress={changeProgress}
          toggleFullscreen={toggleFullScreen}
          showControls={showControls}
        />
        {episodes?.map(ep =>
          ep.episode == Number(episode) ? (
            <ReactPlayer
              key={ep.episode}
              controls={false}
              height="auto"
              width="100%"
              url={`https://cache.libria.fun${ep.hls.fhd}`}
              onDuration={getDuration}
              playing={playerState.playing}
              volume={playerState.volume}
              ref={refPlayer}
              onProgress={handleProgress}
            />
          ) : null,
        )}
      </div>
    </div>
  );
};
