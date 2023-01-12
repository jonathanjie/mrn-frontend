import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";

export const useShipsQuery = () => {
  return useQuery(["ships"], async () =>
    axios
      .get(`${UrlDomain.DEV}/marinanet/ships-overview`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
};
