import { useQuery } from "vue-query";
import axios from "axios";

export const useStatsQuery = (imo) => {
  return useQuery(
    ["stats"],
    async () =>
      axios
        .get(`${process.env.VUE_APP_URL_DOMAIN}/marinanet/ships/${imo}/stats`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error.message);
        }),
    { refetchOnWindowFocus: false, retry: 1 }
  );
};
