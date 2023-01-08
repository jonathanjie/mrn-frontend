import { useQuery } from "vue-query";
import axios from "axios";

export const useGetAllReportsQuery = (imo) => {
  return useQuery(
    ["getAllReports"],
    async () =>
      await axios
        .get(`https://testapi.marinachain.io/marinanet/ships/${imo}/reports/`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error.message);
        })
  );
};
