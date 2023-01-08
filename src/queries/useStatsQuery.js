import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";

export const useStatsQuery = (imo) => {
  return useQuery(["stats"], async () =>
    axios
      .get(`${UrlDomain.DEV}/marinanet/ships/${imo}/stats`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
};
