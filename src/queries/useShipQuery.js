import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";

export const useShipQuery = (imo) => {
  return useQuery(["ship"], async () =>
    axios
      .get(`${UrlDomain.DEV}/marinanet/ships/${imo}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
};
