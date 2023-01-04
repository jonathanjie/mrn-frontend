import { useQuery } from "vue-query";
import axios from "axios";

export const useReportQuery = (voyage_uuid) => {
  return useQuery(["voyages"], async () =>
    axios
      .get(
        `https://testapi.marinachain.io/marinanet/voyages/${voyage_uuid}/reports`
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
};
