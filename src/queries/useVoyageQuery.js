import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";

export const useVoyageQuery = (imo) => {
  return useQuery(["voyages"], async () =>
    axios
      .get(`${UrlDomain.TEST}/marinanet/ships/${imo}/voyages/`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
};
