import { defineStore } from "pinia";
import { useStatsQuery } from "@/queries/useStatsQuery";
import { useLegsQuery } from "@/queries/useLegsQuery";
import { useAddVoyageQuery } from "@/queries/useAddVoyageQuery";

export const useCrewStore = defineStore("crew", () => {
  const legsQuery = (imo) => {
    return useLegsQuery(imo);
  };

  const statsQuery = (imo) => {
    return useStatsQuery(imo);
  };

  const addVoyage = (voyageData) => {
    return useAddVoyageQuery(voyageData);
  };

  return {
    statsQuery,
    legsQuery,
    addVoyage,
  };
});
