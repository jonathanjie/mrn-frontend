import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";

export const useReportQuery = (uuid) => {
  return useQuery(
    ["reportDetail"],
    async () =>
      axios
        .get(`${UrlDomain.TEST}/marinanet/reports/${uuid}/`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error.message);
        }),
    { refetchOnMount: true }
  );
};
