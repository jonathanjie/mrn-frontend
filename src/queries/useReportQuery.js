import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";

export const useReportQuery = (voyage_uuid) => {
  return useQuery(["voyages"], async () =>
    axios
      .get(`${UrlDomain.TEST}/marinanet/voyages/${voyage_uuid}/reports`)
      .then((response) => {
        console.log("Report: ", response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
};
