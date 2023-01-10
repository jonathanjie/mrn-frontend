import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";

export const useLatestReportDetailsQuery = (imo) => {
  return useQuery(
    ["latestReport"],
    async () =>
      axios
        .get(`${UrlDomain.DEV}/marinanet/ships/${imo}/latest-details/`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error.message);
          throw new Error("helps \n" + error.message);
        }),
    { enabled: imo ? true : false, refetchOnWindowFocus: false, retry: 1 }
  );
};
