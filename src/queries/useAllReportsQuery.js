import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";

export const useAllReportsQuery = (imo) => {
  return useQuery(
    ["getAllReports"],
    async () =>
      await axios
        .get(
          `${process.env.VUE_APP_URL_DOMAIN}/marinanet/ships/${imo}/reports/`
        )
        .then((response) => {
          console.log("all reports", response.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error.message);
        }),
    { refetchOnWindowFocus: false }
  );
};
