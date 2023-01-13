import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";
import { useHQStore } from "@/stores/useHQStore";
import { storeToRefs } from "pinia";

export const useShipsQuery = () => {
  return useQuery(["ships"], async () =>
    axios
      .get(`${UrlDomain.DEV}/marinanet/ships-overview`)
      .then((response) => {
        const { shipCount, shipStatus } = storeToRefs(useHQStore());
        shipCount.etcVessels = 0;
        shipCount.bunkeringVessels = 0;
        shipCount.cargoVessels = 0;
        shipCount.inPortVessels = 0;
        shipCount.sailingVessels = 0;
        shipCount.waitingVessels = 0;
        shipStatus.length = 0;
        const ships = response.data;
        const eventTypes = { EVPO: "", EVHB: "", NNPO: "", NNHB: "" };

        const reportType = {
          NOON: "sailing",
          DSBY: "sailing",
          DCSP: "sailing",
          ASBY: "sailing",
          AFWE: "waiting",
          BDN: "waiting",
        };

        for (let i in ships) {
          const ship = ships[i];
          // Sailing/Waiting
          if (ship.last_report_type in reportType) {
            const status = reportType[ship.last_report_type];
            shipStatus.push(reportType[ship.last_report_type]);
            if (status == "sailing") {
              shipCount.sailingVessels++;
            } else {
              shipCount.waitingVessels++;
            }
            // Event
          } else if (
            ship.last_report_type in eventTypes &&
            Object.keys(ship.last_operation).length != 0
          ) {
            const keys = Object.keys(ship.last_operation).sort();
            if (ship.last_operation[keys[1]] || ship.last_operation[keys[2]]) {
              shipCount.inPortVessels++;
              shipCount.cargoVessels++;
              shipStatus.push("cargo");
            } else if (ship.last_operation[keys[0]]) {
              shipCount.inPortVessels++;
              shipCount.bunkeringVessels++;
              shipStatus.push("bunkering");
            } else if (
              ship.last_operation[keys[4]] ||
              ship.last_operation[keys[5]]
            ) {
              shipCount.etcVessels++;
              shipStatus.push("etc");
            } else {
              shipCount.inPortVessels++;
              shipCount.waitingVessels++;
              shipStatus.push("waiting");
            }
            // ETC catch
          } else {
            shipCount.etcVessels++;
            shipStatus.push("etc");
          }
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
};
