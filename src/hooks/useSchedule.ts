import { useQuery } from '@tanstack/react-query';
import animeService from '../services/anime.service';

export const useSchedule = () => {
  return useQuery(['animeSchedule'], () => animeService.getSchedule(), {
    select: ({ data }) => data,
  });
};
