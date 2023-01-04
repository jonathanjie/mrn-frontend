import { defineStore } from "pinia";
import { useStatsQuery } from "@/queries/useStatsQuery";
import { useLegsQuery } from "@/queries/useLegsQuery";

export const useCrewStore = defineStore("crew", () => {
  const legsQuery = (imo) => {
    return useLegsQuery(imo);
  };

  const statsQuery = (imo) => {
    return useStatsQuery(imo);
  };

  return {
    statsQuery,
    legsQuery,
  };
});
