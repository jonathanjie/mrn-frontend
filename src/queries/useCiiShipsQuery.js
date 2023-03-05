import { useQuery } from "vue-query";
import axios from "axios";

export const useCiiShipsQuery = () => {
  return useQuery(["ciiShips"], async () =>
    axios
      .get(`${process.env.VUE_APP_URL_DOMAIN}/cii/ships-overview/`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
};
