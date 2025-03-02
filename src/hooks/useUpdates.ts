import { useQuery } from '@tanstack/react-query';
import { QueryInterface } from '../interfaces/query.interface';
import animeService from '../services/anime.service';

export const useUpdates = (querySettings: QueryInterface) => {
  return useQuery(
    ['animeUpdates'],
    () => animeService.getUpdates(querySettings),
    {
      select: ({ data }) => data,
    },
  );
};
