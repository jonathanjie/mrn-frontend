import { useQuery } from "vue-query";
import axios from "axios";

export const useStatsQuery = (imo) => {
  return useQuery(["stats"], async () =>
    axios
      .get(`https://testapi.marinachain.io/marinanet/ships/${imo}/stats`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
};
