import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";

export const useLegsQuery = (imo) => {
  return useQuery(["legs"], async () =>
    axios
      .get(`${UrlDomain.TEST}/marinanet/ships/${imo}/legs/`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
};
