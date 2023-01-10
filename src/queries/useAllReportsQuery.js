import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";

export const useAllReportsQuery = (imo) => {
  return useQuery(
    ["getAllReports"],
    async () =>
      await axios
        .get(`${UrlDomain.DEV}/marinanet/ships/${imo}/reports/`)
        .then((response) => {
          // console.log(response.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error.message);
        }),
    { refetchOnWindowFocus: false }
  );
};
