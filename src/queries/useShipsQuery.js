import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";
import { useHQStore } from "@/stores/useHQStore";

export const useShipsQuery = () => {
  return useQuery(["ships"], async () =>
    axios
      .get(`${UrlDomain.DEV}/marinanet/ships-overview`)
      .then((response) => {
        const store = useHQStore();
        store.shipCount.etcVessels = 0;
        store.shipCount.bunkeringVessels = 0;
        store.shipCount.cargoVessels = 0;
        store.shipCount.inPortVessels = 0;
        store.shipCount.sailingVessels = 0;
        store.shipCount.waitingVessels = 0;
        store.shipStatus.length = 0;
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
            store.shipStatus.push(reportType[ship.last_report_type]);
            if (status == "sailing") {
              store.shipCount.sailingVessels++;
            } else {
              store.shipCount.waitingVessels++;
            }
            // Event
          } else if (
            ship.last_report_type in eventTypes &&
            Object.keys(ship.last_operation).length != 0
          ) {
            const keys = Object.keys(ship.last_operation).sort();
            if (ship.last_operation[keys[1]] || ship.last_operation[keys[2]]) {
              store.shipCount.inPortVessels++;
              store.shipCount.cargoVessels++;
              store.shipStatus.push("cargo");
            } else if (ship.last_operation[keys[0]]) {
              store.shipCount.inPortVessels++;
              store.shipCount.bunkeringVessels++;
              store.shipStatus.push("bunkering");
            } else if (
              ship.last_operation[keys[4]] ||
              ship.last_operation[keys[5]]
            ) {
              store.shipCount.etcVessels++;
              store.shipStatus.push("etc");
            } else {
              store.shipCount.inPortVessels++;
              store.shipCount.waitingVessels++;
              store.shipStatus.push("waiting");
            }
            // ETC catch
          } else {
            store.shipCount.etcVessels++;
            store.shipStatus.push("etc");
          }
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
};
