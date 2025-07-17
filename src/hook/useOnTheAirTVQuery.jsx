/* 방영중 */
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchOnTheAirTV = () => {
  return api.get("/tv/on_the_air");
};

export const useOnTheAirTVQuery = () => {
  return useQuery({
    queryKey: ["tv-on-the-air"],
    queryFn: fetchOnTheAirTV,
  });
};