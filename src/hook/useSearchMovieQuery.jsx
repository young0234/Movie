import { useQuery } from '@tanstack/react-query';
import api from '../utils/api'; // TMDB Axios instance

export const useSearchMovieQuery = (keyword, options = {}) => {
  return useQuery({
    queryKey: ['movie-search', keyword],
    queryFn: () => api.get(`/search/movie?query=${keyword}`),
    ...options,
    enabled: !!keyword, // keyword 있을 때만 실행
  });
};