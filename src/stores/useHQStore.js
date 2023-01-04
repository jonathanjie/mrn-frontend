import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useShipsQuery } from "@/queries/useShipsQuery";
import { useStatsQuery } from "@/queries/useStatsQuery";
import { useLegsQuery } from "@/queries/useLegsQuery";
import { useShipQuery } from "@/queries/useShipQuery";

export const useHQStore = defineStore("hq", () => {
  const shipQuery = (imo) => {
    return useShipQuery(imo);
  };

  const shipsQuery = () => {
    return useShipsQuery();
  };

  const legsQuery = (imo) => {
    return useLegsQuery(imo);
  };

  const statsQuery = (imo) => {
    return useStatsQuery(imo);
  };

  return {
    shipQuery,
    shipsQuery,
    statsQuery,
    legsQuery,
  };
});
