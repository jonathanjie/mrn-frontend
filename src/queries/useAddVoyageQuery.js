import { useQuery } from "vue-query";
import axios from "axios";
import { UrlDomain } from "@/constants";

export const useAddVoyageQuery = (voyageData) => {
  return useQuery(
    ["addVoyages"],
    async () =>
      await axios
        .post(`${UrlDomain.DEV}/marinanet/voyages/`, voyageData)
        .then((response) => {
          console.log("Added voyage successfuly", response);
        })
        .catch((error) => {
          console.log(error.message);
        })
  );
};
