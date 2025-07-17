import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieSimilar = (id) => {
  return api.get(`/movie/${id}/similar`);
};

export const useMovieSimilar = (id) => {
  return useQuery({
    queryKey: ["movie", id, "similar"],
    queryFn: () => fetchMovieSimilar(id),
    enabled: !!id,
  });
};
