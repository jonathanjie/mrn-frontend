import { defineStore } from "pinia";
import { ref } from "vue";

export const useArrivalEOSPReportStore = defineStore(
  "arrivalEOSPReport",
  () => {
    // Overview
    const reportingDate = ref("");
    const reportingTimeZone = ref("default");

    return {
      // Overview
      reportingDate,
      reportingTimeZone,
    };
  }
);
