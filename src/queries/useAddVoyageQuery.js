import { useQuery } from "vue-query";
import axios from "axios";

export const useAddVoyageQuery = (voyageData) => {
  return useQuery(
    ["addVoyages"],
    async () =>
      await axios
        .post("https://testapi.marinachain.io/marinanet/voyages/", voyageData)
        .then((response) => {
          console.log("Added voyage successfuly", response);
        })
        .catch((error) => {
          console.log(error.message);
        })
  );
};
