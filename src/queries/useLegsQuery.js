import { useQuery } from "vue-query";
import axios from "axios";

export const useLegsQuery = (imo) => {
  return useQuery(["legs"], async () =>
    axios
      .get(`https://testapi.marinachain.io/marinanet/ships/${imo}/legs/`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
};
