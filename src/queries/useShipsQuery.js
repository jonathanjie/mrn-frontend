import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";
import { useHQStore } from "@/stores/useHQStore";

export const useShipsQuery = () => {
  return useQuery(["ships"], async () =>
    axios
      .get(`${UrlDomain.DEV}/marinanet/ships-overview`)
      .then((response) => {
        // return response.data;
        const store = useHQStore();
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
          if (ship.last_report_type in reportType) {
            const status = reportType[ship.last_report_type];
            store.shipStatus.push(reportType[ship.last_report_type]);
            if (status == "sailing") {
              store.shipCount.sailingVessels++;
              console.log(store.shipCount.sailingVessels);
            } else {
              store.shipCount.waitingVessels++;
            }
          } else if (
            ship.last_report_type in eventTypes &&
            Object.keys(ship.last_operation).length != 0
          ) {
            const keys = Object.keys(ship.last_operation).sort();
            console.log("Keys", keys);
            if (ship.last_operation[keys[1]] || ship.last_operation[keys[2]]) {
              store.shipCount.inPortVessels++;
              store.shipCount.cargoVessels++;
              store.shipStatus.push("cargo");
            } else if (ship.last_operation[keys[0]]) {
              store.shipCount.inPortVessels++;
              store.shipCount.bunkeringVessels++;
              store.shipStatus.push("bunkering");
            } else if (ship.last_operation[keys[4]]) {
              // Need to check with Haley
              store.shipCount.inPortVessels++;
              store.shipStatus.push("inport");
            } else {
              store.shipCount.inPortVessels++;
              store.shipCount.waitingVessels++;
              store.shipStatus.push("waiting");
            }
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
