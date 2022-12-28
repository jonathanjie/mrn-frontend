import { useQuery } from "vue-query";
import axios from "axios";

export function useShipsQuery({ enabled }) {
  return useQuery(
    ["ships"],
    async () =>
      await axios
        .get(`https://testapi.marinachain.io/marinanet/ships`)
        .then((response) => {
          console.log("Ship", response.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error.message);
        }),
    {
      enabled,
      select: (ships) => ships.data,
    }
  );
}
