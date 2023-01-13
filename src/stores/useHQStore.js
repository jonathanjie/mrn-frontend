import { defineStore } from "pinia";
import { useShipsQuery } from "@/queries/useShipsQuery";
import { useStatsQuery } from "@/queries/useStatsQuery";
import { useLegsQuery } from "@/queries/useLegsQuery";
import { useShipQuery } from "@/queries/useShipQuery";
import { ref } from "vue";

export const useHQStore = defineStore("hq", () => {
  const shipCount = {
    sailingVessels: ref(0),
    waitingVessels: ref(0),
    inPortVessels: ref(0),
    etcVessels: ref(0),
    cargoVessels: ref(0),
    bunkeringVessels: ref(0),
  };

  const shipStatus = ref([]);
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
    shipCount,
    shipStatus,
    shipQuery,
    shipsQuery,
    statsQuery,
    legsQuery,
  };
});
