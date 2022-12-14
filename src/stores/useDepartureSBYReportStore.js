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

export const useDepartureSBYReportStore = defineStore(
  "departureReportSBY",
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

    // Cargo Operation
    const loadCondition = ref("default");
    const loading = ref("");
    const unloading = ref("");
    const totalAmount = ref("");
    const time = ref("");

    // Vessel Condition at Departure
    const draftFwd = ref("");
    const draftMid = ref("");
    const draftAft = ref("");
    const constant = ref("");
    const gm = ref("");
    const ballast = ref("");
    const displacement = ref("");

    // Consumption and Condition (TODO: solving shared parent component issue)

    return {
      // Departure and Destination
      departurePortCountry,
      departurePortName,
      departureTimeZone,
      departureSummerTime,
      departureDateTime,
      destinationPortCountry,
      destinationPortName,
      destinationTimeZone,
      destinationSummerTime,
      destinationEstimatedArrival,
      // Cargo Operation
      loadCondition,
      loading,
      unloading,
      totalAmount,
      time,
      // Vessel Condition at Departure
      draftFwd,
      draftMid,
      draftAft,
      constant,
      gm,
      ballast,
      displacement,
    };
  }
);