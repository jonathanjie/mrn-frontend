import { useQuery } from "vue-query";
import axios from "axios";

export const useLatestReportQuery = (imo) => {
  return useQuery(["latestReport"], async () =>
    axios
      .get(
        `https://testapi.marinachain.io/marinanet/ships/${imo}/latest-details/`
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
};
