import { useQuery } from "vue-query";
import axios from "axios";

export function useShipQuery(imo) {
  return useQuery(["ship"], async () =>
    axios
      .get(`https://testapi.marinachain.io/marinanet/ships/${imo}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
}
