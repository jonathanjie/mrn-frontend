import { useQuery } from "vue-query";
import axios from "axios";

export const useReportQuery = (uuid) => {
  return useQuery(
    ["reportDetail"],
    async () =>
      axios
        .get(`https://testapi.marinachain.io/marinanet/reports/${uuid}/`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error.message);
        }),
    { refetchOnMount: true }
  );
};
