import { useQuery } from "vue-query";
import axios from "axios";

export function useShipsQuery() {
  return useQuery(["ships"], async () =>
    axios
      .get(`https://testapi.marinachain.io/marinanet/ships`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
}
