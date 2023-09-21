import { httpClient } from "./axiosClient";
import { useQuery } from "@tanstack/react-query";
import { TeamInformation } from "types";

export const teamPath = "/team";

export const useGetTeamInfo = () => {
  return useQuery(
    [`${teamPath}/members`],
    async () => {
      const res = await httpClient().get(`${teamPath}/members`);
      return res.data as TeamInformation;
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};
