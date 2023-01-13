import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";

export const useReportQuery = (uuid) => {
  return useQuery(
    ["reportDetail"],
    async () =>
      axios
        .get(`${UrlDomain.DEV}/marinanet/reports/${uuid}/`)
        .then((response) => {
          console.log("report view", response.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error.message);
        }),
    { refetchOnWindowFocus: false, retry: 1 }
  );
};
