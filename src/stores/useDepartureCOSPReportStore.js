import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";

const temp = {
  // Overview
  reportNo: "2",
  legNo: "2",
  voyageNo: "2",
  departurePortCountry: "Country A",
  departurePortName: "Port A",
  destinationPortCountry: "Country A",
  destinationPortName: "Port A",
};

export const useDepartureCOSPReportStore = defineStore(
  "departureReportCOSP",
  () => {
    // Departure and Destination
    const departurePortCountry = ref("");
    const departurePortName = ref("");
    const departureTimeZone = ref("");
    const departureSummerTime = ref("default");
    const departureDateTime = ref("");
    const destinationPortCountry = ref("");
    const destinationPortName = ref("");
    const destinationTimeZone = ref("");
    const destinationSummerTime = ref("default");
    const destinationEstimatedArrival = ref("");
  }
);
