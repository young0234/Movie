import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieRecommendations = (id) => {
  return api.get(`/movie/${id}/recommendations`);
};

export const useMovieRecommendations = (id) => {
  return useQuery({
    queryKey: ["movie", id, "recommendations"],
    queryFn: () => fetchMovieRecommendations(id),
    enabled: !!id, // id가 있을 때만 실행
  });
};
