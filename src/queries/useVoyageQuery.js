import { useQuery } from "vue-query";
import axios from "axios";

export const useVoyageQuery = (imo) => {
  return useQuery(["voyages"], async () =>
    axios
      .get(`https://testapi.marinachain.io/marinanet/ships/${imo}/voyages/`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
};
