import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTVRecommendations = (id) => {
  return api.get(`/tv/${id}/recommendations`);
};

export const useTVRecommendationsQuery = (id) => {
  return useQuery({
    queryKey: ["tv-recommendations", id],
    queryFn: () => fetchTVRecommendations(id),
    enabled: !!id,
  });
};
