import { defineStore } from "pinia";
import { ref } from "vue";

export const useArrivalFWEReportStore = defineStore("arrivalFWEReport", () => {
  // Overview
  const reportingDate = ref("");
  const reportingTimeZone = ref("default");

  return {
    // Overview
    reportingDate,
    reportingTimeZone,
  };
});
