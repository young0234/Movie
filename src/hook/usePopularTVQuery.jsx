/* 인기티비 */

import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularTV = () => {
  return api.get("/tv/popular");
};

export const usePopularTVQuery = () => {
  return useQuery({
    queryKey: ["tv-popular"],
    queryFn: fetchPopularTV,
  });
};