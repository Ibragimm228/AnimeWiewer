import { List2 } from '../interfaces/updates.interface';

export type AnimePlayerProps = {
  episode?: string;
  episodes?: List2[];
  onChangeEpisode?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export type PlayerControllerType = {
  episode?: string;
  episodes?: List2[];
  onChangeEpisode?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  togglePlay?: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleVolume?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeProgress?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleFullscreen?: () => void;
  playerState?: {
    playing?: boolean;
    duration?: number;
    volume?: number;
    start?: number;
    end?: number;
    playedSeconds?: number;
  };
  showControls?: boolean;
};
