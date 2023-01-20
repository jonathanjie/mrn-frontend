import { useQuery } from "vue-query";
import axios from "axios";

export const useAddVoyageQuery = (voyageData) => {
  return useQuery(
    ["addVoyages"],
    async () =>
      await axios
        .post(
          `${process.env.VUE_APP_URL_DOMAIN}/marinanet/voyages/`,
          voyageData
        )
        .catch((error) => {
          console.log(error.message);
        }),
    { refetchOnWindowFocus: false, retry: 1 }
  );
};
