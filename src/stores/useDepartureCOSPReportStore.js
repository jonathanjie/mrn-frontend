import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import {
  convertLTToUTC,
  convertUTCToLT,
  sumObjectValues,
} from "@/utils/helpers";
import { useShipStore } from "@/stores/useShipStore";
import { Machinery } from "@/constants";
import { useLatestReportDetailsStore } from "./useLatestReportDetailsStore";

export const useDepartureCOSPReportStore = defineStore(
  "departureReportCOSP",
  () => {
    const store = useVoyageStore();
    const {
      deprReportNo,
      lastLegNo,
      legUuid,
      curLoadingCondition,
      curVoyageNo,
    } = storeToRefs(store);

    const shipStore = useShipStore();
    const { fuelOils, lubricatingOils, machinery } = storeToRefs(shipStore);

    const detailsStore = useLatestReportDetailsStore();
    const {
      loadCondition,
      departurePortCountry,
      departurePortName,
      departureDate: departureDateTimeUTC,
      departureTz: departureTimeZone,
      arrivalPortCountry: destinationPortCountry,
      arrivalPortName: destinationPortName,
      arrivalTz,
      arrivalDate,
      lastReportDate,
      lastReportTz,
      propellerPitch,
      revolutionCount: revolution_count,
      fuelOilRobs: prevFuelOilRobs,
      lubeOilRobs: prevLubeOilRobs,
      freshwaterRob: prevFreshWaterRobs,
      distanceObservedTotal,
      distanceEngineTotal,
      distanceToGo: distance_to_go,
    } = storeToRefs(detailsStore);

    // Getters
    // Overview
    const reportNo = computed(() =>
      deprReportNo.value ? deprReportNo.value : 0
    );
    const legNo = computed(() => (lastLegNo.value ? lastLegNo.value : 0));
    // const loadingCondition = computed(() =>
    //   curLoadingCondition ? curLoadingCondition : loadCondition
    // );
    const loadingCondition = computed(() =>
      loadCondition.value ? loadCondition.value : "N.A"
    );
    const voyageNo = computed(() => (curVoyageNo ? curVoyageNo : 0));
    const reportingDateTimeUTC = computed(() =>
      reportingTimeZone.value !== "default" && reportingDateTime.value
        ? convertLTToUTC(
            new Date(reportingDateTime.value),
            reportingTimeZone.value
          )
        : ""
    );

    // Departure and Destination
    const departureDateTime = computed(() =>
      departureTimeZone.value !== "default" && departureDateTimeUTC.value
        ? convertUTCToLT(
            new Date(departureDateTimeUTC.value),
            departureTimeZone.value
          )
        : ""
    );
    const destinationEstimatedArrival = computed(() =>
      destinationTimeZone.value !== "default" && arrivalDate.value
        ? convertUTCToLT(new Date(arrivalDate.value), destinationTimeZone.value)
        : ""
    );
    const destinationEstimatedArrivalUTC = computed(() =>
      destinationTimeZone.value !== "default" &&
      destinationEstimatedArrival.value
        ? convertLTToUTC(
            new Date(destinationEstimatedArrival.value),
            reportingTimeZone.value
          )
        : ""
    );

    // Pilot Station - Departure
    const pilotDepDateTimeUTC = computed(() =>
      reportingTimeZone.value !== "default" && pilotDepDateTime.value
        ? convertLTToUTC(
            new Date(pilotDepDateTime.value),
            reportingTimeZone.value
          )
        : ""
    );
    const shouldPilotDepDataBeSent = computed(() => pilotDepName.value !== "");

    // Pilot Station - Arrival
    const pilotArrDateTimeUTC = computed(() =>
      destinationTimeZone.value !== "default" && pilotArrDateTime.value
        ? convertLTToUTC(
            new Date(pilotArrDateTime.value),
            destinationTimeZone.value
          )
        : ""
    );
    const shouldPilotArrDataBeSent = computed(() => pilotArrName.value !== "");

    // R/UP Engine / Distance & Time
    const sbyToRupTime = computed(() =>
      reportingDateTimeUTC.value
        ? +(
            (Date.parse(reportingDateTimeUTC.value) -
              Date.parse(departureDateTimeUTC.value)) /
            36e5
          ).toFixed(2)
        : ""
    );
    const distanceObsTotal = computed(() =>
      sbyToRupDistanceObs.value
        ? +(
            Number(distanceObservedTotal.value) +
            Number(sbyToRupDistanceObs.value)
          ).toFixed(2)
        : ""
    );
    const distanceEngTotal = computed(() =>
      sbyToRupDistanceEng.value
        ? +(
            Number(sbyToRupDistanceEng.value) +
            Number(distanceEngineTotal.value)
          ).toFixed(0)
        : ""
    );
    const hoursTotal = sbyToRupTime;

    // Consumption and Condition
    const fuelOilTotalConsumptions = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        rtn[fuelOil] = +sumObjectValues(fuelOilBreakdowns[fuelOil]).toFixed(2);
      }
      return rtn;
    });
    const fuelOilRobs = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        rtn[fuelOil] = +(
          Number(prevFuelOilRobs.value[fuelOil]) -
          Number(fuelOilTotalConsumptions.value[fuelOil])
        ).toFixed(2);
      }
      return rtn;
    });
    const lubricatingOilRobs = computed(() => {
      let rtn = {};
      for (const lubricatingOil of lubricatingOils.value) {
        rtn[lubricatingOil] = +(
          Number(prevLubeOilRobs.value[lubricatingOil]) -
          Number(lubricatingOilBreakdowns[lubricatingOil].total_consumption) +
          Number(lubricatingOilBreakdowns[lubricatingOil].receipt) -
          Number(lubricatingOilBreakdowns[lubricatingOil].debunkering)
        ).toFixed(2);
      }
      return rtn;
    });
    const freshwaterChange = computed(
      () => +(freshwaterGenerated.value - freshwaterConsumed.value).toFixed(2)
    );
    const freshwaterRob = computed(
      () => prevFreshWaterRobs.value + freshwaterChange.value
    );

    // State
    // Overview
    const reportingDateTime = ref("");
    const reportingTimeZone = ref(lastReportTz.value);

    // Departure and Destination
    const destinationTimeZone = ref(arrivalTz.value);

    // Pilot Station - Departure
    const pilotDepChecked = ref(false);
    const pilotDepName = ref("");
    const pilotDepDateTime = ref("");
    const pilotDepLatDir = ref("default");
    const pilotDepLatDegree = ref("");
    const pilotDepLatMinute = ref("");
    const pilotDepLongDir = ref("default");
    const pilotDepLongDegree = ref("");
    const pilotDepLongMinute = ref("");

    // Pilot Station - Arrival
    const pilotArrChecked = ref(false);
    const pilotArrName = ref("");
    const pilotArrDateTime = ref("");
    const pilotArrLatDir = ref("default");
    const pilotArrDraftFwd = ref("");
    const pilotArrDraftMid = ref("");
    const pilotArrDraftAft = ref("");
    const pilotArrLatDegree = ref("");
    const pilotArrLatMinute = ref("");
    const pilotArrLongDir = ref("default");
    const pilotArrLongDegree = ref("");
    const pilotArrLongMinute = ref("");

    // R/UP Engine / Distance & Time
    const rupEngLatDir = ref("default");
    const rupEngLatDegree = ref("");
    const rupEngLatMinute = ref("");
    const rupEngLongDir = ref("default");
    const rupEngLongDegree = ref("");
    const rupEngLongMinute = ref("");
    const sbyToRupDistanceObs = ref("");
    const sbyToRupDistanceEng = ref("");
    const sbyToRupRevolutionCount = ref("");
    const sbyToRupSetRPM = ref("");

    // Sailing Plan (Pilot to Pilot)
    const budgetDistance = ref("");
    const budgetSpeed = ref("");
    const meDaily = ref("");
    const meRPM = ref("");

    // Consumption and Condition
    const fuelOilBreakdowns = reactive({});
    for (const fuelOil of fuelOils.value) {
      fuelOilBreakdowns[fuelOil] = {};
      for (const machine of machinery.value) {
        fuelOilBreakdowns[fuelOil][machine] = "";
      }
      // fuelOilBreakdowns[fuelOil][Machinery.ME] = "";
      // fuelOilBreakdowns[fuelOil][Machinery.GE] = "";
      // fuelOilBreakdowns[fuelOil][Machinery.IGG] = "";
      // fuelOilBreakdowns[fuelOil][Machinery.BLR] = "";
    }

    const fuelOilDataCorrection = reactive({
      type: "default",
      correction: "",
      remarks: "",
    });

    const lubricatingOilBreakdowns = reactive({});
    for (const lubricatingOil of lubricatingOils.value) {
      lubricatingOilBreakdowns[lubricatingOil] = {
        total_consumption: "",
        receipt: "",
        debunkering: "",
      };
    }

    const lubricatingOilDataCorrection = reactive({
      type: "default",
      correction: "",
      remarks: "",
    });

    const freshwaterConsumed = ref("");
    const freshwaterGenerated = ref("");

    //Addiitonal remarks
    const additionalRemarks = ref("");

    function $reset() {
      console.log("Dep COSP store gets reset");
      // Overview
      reportingDateTime.value = "";
      reportingTimeZone.value = lastReportTz.value;

      // Departure and Destination
      destinationTimeZone.value = arrivalTz.value;

      // Pilot Station - Departure
      pilotDepChecked.value = false;
      pilotDepName.value = "";
      pilotDepDateTime.value = "";
      pilotDepLatDir.value = "default";
      pilotDepLatDegree.value = "";
      pilotDepLatMinute.value = "";
      pilotDepLongDir.value = "default";
      pilotDepLongDegree.value = "";
      pilotDepLongMinute.value = "";

      // Pilot Station - Arrival
      pilotArrChecked.value = false;
      pilotArrName.value = "";
      pilotArrDateTime.value = "";
      pilotArrLatDir.value = "default";
      pilotArrDraftFwd.value = "";
      pilotArrDraftMid.value = "";
      pilotArrDraftAft.value = "";
      pilotArrLatDegree.value = "";
      pilotArrLatMinute.value = "";
      pilotArrLongDir.value = "default";
      pilotArrLongDegree.value = "";
      pilotArrLongMinute.value = "";

      // R/UP Engine / Distance & Time
      rupEngLatDir.value = "default";
      rupEngLatDegree.value = "";
      rupEngLatMinute.value = "";
      rupEngLongDir.value = "default";
      rupEngLongDegree.value = "";
      rupEngLongMinute.value = "";
      sbyToRupDistanceObs.value = "";
      sbyToRupDistanceEng.value = "";
      sbyToRupRevolutionCount.value = "";
      sbyToRupSetRPM.value = "";

      // Sailing Plan (Pilot to Pilot)
      budgetDistance.value = "";
      budgetSpeed.value = "";
      meDaily.value = "";
      meRPM.value = "";

      // Consumption and Condition
      fuelOilBreakdowns.value = {};
      for (const fuelOil of fuelOils.value) {
        fuelOilBreakdowns[fuelOil] = {};
        for (const machine of machinery.value) {
          fuelOilBreakdowns[fuelOil][machine] = "";
        }
        // fuelOilBreakdowns[fuelOil][Machinery.ME] = "";
        // fuelOilBreakdowns[fuelOil][Machinery.GE] = "";
        // fuelOilBreakdowns[fuelOil][Machinery.IGG] = "";
        // fuelOilBreakdowns[fuelOil][Machinery.BLR] = "";
      }

      fuelOilDataCorrection.value = {
        type: "default",
        correction: "",
        remarks: "",
      };

      lubricatingOilBreakdowns.value = {};
      for (const lubricatingOil of lubricatingOils.value) {
        lubricatingOilBreakdowns[lubricatingOil] = {
          total_consumption: "",
          receipt: "",
          debunkering: "",
        };
      }

      lubricatingOilDataCorrection.value = {
        type: "default",
        correction: "",
        remarks: "",
      };

      freshwaterConsumed.value = "";
      freshwaterGenerated.value = "";

      //Addiitonal remarks
      additionalRemarks.value = "";
    }
    return {
      // Overview
      reportNo,
      legNo,
      legUuid,
      loadingCondition,
      voyageNo,
      reportingDateTime,
      reportingTimeZone,
      reportingDateTimeUTC,
      // Departure and Destination
      departurePortCountry,
      departurePortName,
      departureTimeZone,
      departureDateTime,
      departureDateTimeUTC,
      destinationPortCountry,
      destinationPortName,
      destinationTimeZone,
      destinationEstimatedArrival,
      destinationEstimatedArrivalUTC,
      // Pilot station - Departure
      shouldPilotDepDataBeSent,
      pilotDepChecked,
      pilotDepName,
      pilotDepDateTime,
      pilotDepDateTimeUTC,
      pilotDepLatDir,
      pilotDepLatDegree,
      pilotDepLatMinute,
      pilotDepLongDir,
      pilotDepLongDegree,
      pilotDepLongMinute,
      // Pilot Station - Arrival
      shouldPilotArrDataBeSent,
      pilotArrChecked,
      pilotArrName,
      pilotArrDateTime,
      pilotArrDateTimeUTC,
      pilotArrDraftFwd,
      pilotArrDraftMid,
      pilotArrDraftAft,
      pilotArrLatDir,
      pilotArrLatDegree,
      pilotArrLatMinute,
      pilotArrLongDir,
      pilotArrLongDegree,
      pilotArrLongMinute,
      // R/UP Engine / Distance & Time
      rupEngLatDir,
      rupEngLatDegree,
      rupEngLatMinute,
      rupEngLongDir,
      rupEngLongDegree,
      rupEngLongMinute,
      sbyToRupTime,
      sbyToRupDistanceObs,
      sbyToRupDistanceEng,
      sbyToRupRevolutionCount,
      sbyToRupSetRPM,
      distanceObsTotal,
      distanceEngTotal,
      hoursTotal,
      // Sailing Plan (Pilot to Pilot)
      budgetDistance,
      budgetSpeed,
      meDaily,
      meRPM,
      // Consumption and Condition
      fuelOils,
      lubricatingOils,
      machinery,
      fuelOilRobs,
      fuelOilBreakdowns,
      fuelOilTotalConsumptions,
      fuelOilDataCorrection,
      lubricatingOilBreakdowns,
      lubricatingOilRobs,
      lubricatingOilDataCorrection,
      freshwaterConsumed,
      freshwaterGenerated,
      freshwaterChange,
      freshwaterRob,
      // Additional Remarks
      additionalRemarks,
      $reset,
    };
  }
);
