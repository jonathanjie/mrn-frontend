import { defineStore, storeToRefs } from "pinia";
import { useLatestReportDetailsQuery } from "@/queries/useLatestReportDetailsQuery";
import { useShipStore } from "./useShipStore";

export const useLatestReportDetailsStore = defineStore(
  "latestReportDetails",
  () => {
    const shipStore = useShipStore();
    const { imoReg } = storeToRefs(shipStore);

    const {
      refetch: refetchLatestReportDetails,
      isFetching: isFetchingLatestReportDetails,
      isSucess: isSuccessLatestReportDetails,
      data: latestReportDetails,
    } = useLatestReportDetailsQuery(imoReg.value);

    return {
      refetchLatestReportDetails,
      isFetchingLatestReportDetails,
      isSuccessLatestReportDetails,
      latestReportDetails,
    };
  }
);
