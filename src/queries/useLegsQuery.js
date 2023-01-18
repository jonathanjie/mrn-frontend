import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";

export const useLegsQuery = (imo) => {
  return useQuery(
    ["legs"],
    async () =>
      axios
        .get(`${process.env.VUE_APP_URL_DOMAIN}/marinanet/ships/${imo}/legs/`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error.message);
        }),
    { refetchOnWindowFocus: false, retry: 1 }
  );
};
