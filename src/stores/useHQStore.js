import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useShipsQuery } from "@/queries/useShipsQuery";
import { useStatsQuery } from "@/queries/useStatsQuery";
import { useLegsQuery } from "@/queries/useLegsQuery";
import { useShipQuery } from "@/queries/useShipQuery";

export const useHQStore = defineStore("hq", () => {
  let ships = {};
  let shipsSuccess = false;
  let ship = {};
  let shipSuccess = false;
  let legs = {};
  let legsSuccess = false;
  let stats = {};
  let statsSuccess = false;

  const shipQuery = (imo) => {
    const { isSuccess: tempSuccess, data: tempShip } = useShipQuery(imo);
    shipSuccess = tempSuccess;
    ship = tempShip;
  };

  const shipsQuery = () => {
    const { isSuccess: tempSuccess, data: tempShips } = useShipsQuery();
    shipsSuccess = tempSuccess;
    ships = tempShips;
    console.log("ShipsQuery");
    console.log("Shipssss", ships);
  };

  const legsQuery = (imo) => {
    const { isSuccess: tempSuccess, data: tempLegs } = useLegsQuery(imo);
    legs = tempLegs;
    legsSuccess = tempSuccess;
  };

  const statsQuery = (imo) => {
    const { isSuccess: tempSuccess, data: tempStats } = useStatsQuery(imo);
    statsSuccess = tempSuccess;
    stats = tempStats;
  };

  return {
    ships,
    shipsSuccess,
    ship,
    shipSuccess,
    legs,
    legsSuccess,
    stats,
    statsSuccess,
    shipQuery,
    shipsQuery,
    statsQuery,
    legsQuery,
  };
});
