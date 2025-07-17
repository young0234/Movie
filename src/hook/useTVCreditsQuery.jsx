import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTVCredits = (id) => {
  return api.get(`/tv/${id}/credits`);
};

export const useTVCreditsQuery = (id) => {
  return useQuery({
    queryKey: ["tv-credits", id],
    queryFn: () => fetchTVCredits(id),
    enabled: !!id,
  });
};
