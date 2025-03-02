import { useQuery } from '@tanstack/react-query';
import { QueryTitleProps } from '../interfaces/query.interface';
import animeService from '../services/anime.service';

export const useTitle = (titleProps: QueryTitleProps) => {
  return useQuery(['animeTitle'], () => animeService.getTitle(titleProps), {
    select: ({ data }) => data,
  });
};
