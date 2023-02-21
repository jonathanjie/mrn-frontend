import { useQuery } from "vue-query";
import axios from "axios";

export const useLatestReportDetailsQuery = (imo) => {
  return useQuery(
    ["latestReport"],
    async () =>
      axios
        .get(
          `${process.env.VUE_APP_URL_DOMAIN}/marinanet/ships/${imo}/latest-details/`
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw new Error("helps \n" + error.message);
        }),
    { enabled: imo ? true : false, refetchOnWindowFocus: false, retry: 1 }
  );
};
