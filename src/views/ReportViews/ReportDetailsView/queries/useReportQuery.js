import { useQuery } from "vue-query";
import axios from "axios";

export const useReportQuery = (uuid) => {
  return useQuery(
    ["reportDetail"],
    async () =>
      axios
        .get(`${process.env.VUE_APP_URL_DOMAIN}/marinanet/reports/${uuid}/`)
        .then((response) => {
          // console.log("report view", response.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error.message);
        }),
    { refetchOnWindowFocus: false, retry: 1 }
  );
};
