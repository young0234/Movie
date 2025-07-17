import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopRatedTV = () => {
  return api.get("/tv/top_rated");
};

export const useTopRatedTVQuery = () => {
  return useQuery({
    queryKey: ["tv-top-rated"],
    queryFn: fetchTopRatedTV,
  });
};
