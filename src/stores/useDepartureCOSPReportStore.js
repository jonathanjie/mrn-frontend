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
      departurePortCountry,
      departurePortName,
      departureDate: departureDateTimeUTC,
      departureTz: departureTimeZone,
      arrivalPortCountry: destinationPortCountry,
      arrivalPortName: destinationPortName,
      arrivalTz: destinationTimeZone,
      arrivalDate: destinationEstimatedArrival,
      lastReportDate,
      propellerPitch,
      revolutionCount: revolution_count,
      fuelOilRobs: prevFuelOilRobs,
      lubeOilRobs: prevLubeOilRobs,
      freshwaterRob: prevFreshWaterRobs,
      distanceObservedTotal,
      distanceEngineTotal,
      distanceToGo: distance_to_go,
    } = storeToRefs(detailsStore);

    // Overview
    const reportNo = deprReportNo;
    const legNo = lastLegNo;
    const loadingCondition = curLoadingCondition;
    const voyageNo = curVoyageNo;
    const reportingDateTime = ref("");
    // const reportingTimeZone = ref(temp.reportingTimeZone);
    const reportingTimeZone = ref(departureTimeZone);
    const reportingDateTimeUTC = computed(() =>
      reportingTimeZone.value !== "default" && reportingDateTime.value
        ? convertLTToUTC(
            new Date(reportingDateTime.value),
            reportingTimeZone.value
          )
        : ""
    );

    // Departure and Destination
    // const departurePortCountry = ref(temp.departurePortCountry);
    // const departurePortName = ref(temp.departurePortName);
    // const departureTimeZone = ref(temp.departureTimeZone);
    // const departureDateTimeUTC = ref(departureDate.value);
    const departureDateTime = computed(() =>
      departureTimeZone.value !== "default" && departureDateTimeUTC.value
        ? convertUTCToLT(
            new Date(departureDateTimeUTC.value),
            departureTimeZone.value
          )
        : ""
    );
    // const destinationPortCountry = ref(temp.destinationPortCountry);
    // const destinationPortName = ref(temp.destinationPortName);
    // const destinationTimeZone = ref(temp.destinationTimeZone);
    // const destinationEstimatedArrival = ref(temp.destinationEstimatedArrival);
    const destinationEstimatedArrivalUTC = computed(() =>
      destinationTimeZone.value !== "default" &&
      destinationEstimatedArrival.value
        ? convertLTToUTC(
            new Date(destinationEstimatedArrival.value),
            destinationTimeZone.value
          )
        : ""
    );

    // Pilot Station - Departure
    const shouldPilotDepDataBeSent = computed(
      () => pilotDepName.value || pilotDepDateTime.value
    );
    const pilotDepName = ref("");
    const pilotDepDateTime = ref("");
    const pilotDepDateTimeUTC = computed(() =>
      reportingTimeZone.value !== "default" && pilotDepDateTime.value
        ? convertLTToUTC(
            new Date(pilotDepDateTime.value),
            reportingTimeZone.value
          )
        : ""
    );
    const pilotDepLatDir = ref("default");
    const pilotDepLatDegree = ref("");
    const pilotDepLatMinute = ref("");
    const pilotDepLongDir = ref("default");
    const pilotDepLongDegree = ref("");
    const pilotDepLongMinute = ref("");

    // Pilot Station - Arrival
    const shouldPilotArrDataBeSent = computed(
      () => pilotArrName.value || pilotArrDateTime.value
    );
    const pilotArrName = ref("");
    const pilotArrDateTime = ref("");
    const pilotArrDateTimeUTC = computed(() =>
      destinationTimeZone.value !== "default" && pilotArrDateTime.value
        ? convertLTToUTC(
            new Date(pilotArrDateTime.value),
            destinationTimeZone.value
          )
        : ""
    );
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
    const sbyToRupTime = computed(() =>
      reportingDateTimeUTC.value
        ? +(
            (Date.parse(reportingDateTimeUTC.value) -
              Date.parse(departureDateTimeUTC.value)) /
            (1000 * 60 * 60)
          ).toFixed(0)
        : ""
    );
    const sbyToRupDistanceObs = ref("");
    const sbyToRupDistanceEng = ref("");
    const sbyToRupRevolutionCount = ref("");
    const sbyToRupSetRPM = ref("");
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
    const hoursTotal = computed(() =>
      sbyToRupTime.value
        ? +(
            (Date.parse(reportingDateTimeUTC.value) -
              Date.parse(departureDateTimeUTC.value)) /
            36e5
          ).toFixed(0)
        : ""
    );
    // Sailing Plan (Pilot to Pilot)
    const budgetDistance = ref("");
    const budgetSpeed = ref("");
    const meDaily = ref("");
    const meRPM = ref("");

    // Consumption and Condition
    const fuelOilBreakdowns = reactive({});
    for (const fuelOil of fuelOils.value) {
      fuelOilBreakdowns[fuelOil] = {};
      fuelOilBreakdowns[fuelOil][Machinery.ME] = "";
      fuelOilBreakdowns[fuelOil][Machinery.GE] = "";
      fuelOilBreakdowns[fuelOil][Machinery.IGG] = "";
      fuelOilBreakdowns[fuelOil][Machinery.BLR] = "";
    }
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
    const lubricatingOilDataCorrection = reactive({
      type: "default",
      correction: "",
      remarks: "",
    });

    const freshwaterConsumed = ref("");
    const freshwaterGenerated = ref("");
    const freshwaterChange = computed(
      () => +(freshwaterGenerated.value - freshwaterConsumed.value).toFixed(2)
    );
    const freshwaterRob = computed(
      () => prevFreshWaterRobs.value + freshwaterChange.value
    );

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
    };
  }
);
