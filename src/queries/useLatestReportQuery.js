import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";

export const useLatestReportQuery = (imo) => {
  return useQuery(["latestReport"], async () =>
    axios
      .get(`${UrlDomain.TEST}/marinanet/ships/${imo}/latest-details/`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
};
