import { useQuery } from "vue-query";
import axios from "axios";

export const useShipQuery = (imo) => {
  return useQuery(
    ["ship"],
    async () =>
      axios
        .get(`${process.env.VUE_APP_URL_DOMAIN}/marinanet/ships/${imo}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error.message);
        }),
    { refetchOnWindowFocus: false, retry: 1 }
  );
};
