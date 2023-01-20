import { useQuery } from "vue-query";
import axios from "axios";

export const useAllReportsQuery = (imo) => {
  return useQuery(
    ["getAllReports"],
    async () =>
      await axios
        .get(
          `${process.env.VUE_APP_URL_DOMAIN}/marinanet/ships/${imo}/reports/`
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error.message);
        }),
    { refetchOnWindowFocus: false }
  );
};
