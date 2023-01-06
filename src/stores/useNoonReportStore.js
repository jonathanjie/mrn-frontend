import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import {
  convertLTToUTC,
  convertUTCToLT,
  sumObjectValues,
} from "@/utils/helpers";
import { storeToRefs } from "pinia";
import { IceCondition } from "@/constants";
import { useShipStore } from "@/stores/useShipStore";

// TODO: retrieve from backend or generate as needed
// API /reports/latest
const temp = {
  // Distance & Time / Performance
  lastNoonReportTime: "2022-12-01T00:00:00Z",
  rupOfDeparture: "2022-11-21T00:00:00Z",
  distanceLeft: 4000,
  distanceObsSoFar: 1000,
  distanceEngSoFar: 1000,
  revolutionCountYesterday: 20000,
  propellerPitch: 2,
  voyageAvgSpeed: 200,
  voyageAvgRpm: 100,
  voyageAvgSlip: 5,

  // Consumption & Condition
  prevRobs: {
    LSFO: 200,
    MGO: 200,
    MDO: 200,
    HFO: 200,
    LPGP: 200,
    LPGB: 200,
    LNG: 200,
    "M/E Cylinder": 200,
    "M/E System": 200,
    "M/E Sump": 200,
    "G/E System": 200,
    "T/C System": 200,
  },
  freshwaterPrevROB: 200,
};

export const useNoonReportStore = defineStore("noonReport", () => {
  const store = useVoyageStore();
  const { legUuid, noonReportNo, lastLegNo, curLoadingCondition, curVoyageNo } =
    storeToRefs(store);

  const shipStore = useShipStore();
  const { fuelOils, lubricatingOils, machinery } = storeToRefs(shipStore);

  // Overview
  const reportNo = noonReportNo;
  const legNo = lastLegNo;
  const loadingCondition = curLoadingCondition;
  const voyageNo = curVoyageNo;
  const reportingDateTime = ref("");
  const reportingTimeZone = ref("default");
  const reportingDateTimeUTC = computed(() =>
    reportingTimeZone.value !== "default" && reportingDateTime.value
      ? convertLTToUTC(
          new Date(reportingDateTime.value),
          reportingTimeZone.value
        )
      : ""
  );

  // Departure and Destination
  // TODO: replace dummy values
  const routeDeparturePortCountry = ref("SG");
  const routeDeparturePortName = ref("PPT");
  const routeDepartureDateTimeUTC = ref(new Date("2022-12-01T00:00:00Z"));
  const routeDepartureTimeZone = ref("8");
  const routeDepartureDateTime = computed(() =>
    routeDepartureTimeZone.value !== "default" &&
    routeDepartureDateTimeUTC.value
      ? convertUTCToLT(
          new Date(routeDepartureDateTimeUTC.value),
          routeDepartureTimeZone.value
        )
      : ""
  );
  const routeArrivalPortCountry = ref("SA");
  const routeArrivalPortName = ref("RTA");
  const routeArrivalTimeZone = ref("3");
  const isRouteArrivalDateTimeEdited = ref(false);
  const routeArrivalDateTimeUTC = ref(new Date("2022-12-21T00:00:00Z"));
  const routeArrivalDateTime = computed(() =>
    routeArrivalTimeZone.value !== "default" && routeArrivalDateTimeUTC.value
      ? convertUTCToLT(
          new Date(routeArrivalDateTimeUTC.value),
          routeArrivalTimeZone.value
        )
      : ""
  );
  const routeArrivalDateTimeEdited = ref("");
  const routeArrivalDateTimeEditedUTC = computed(() =>
    routeArrivalTimeZone.value !== "default" && routeArrivalDateTimeEdited.value
      ? convertLTToUTC(
          new Date(routeArrivalDateTimeEdited.value),
          routeArrivalTimeZone.value
        )
      : ""
  );

  // Reporting Noon
  const latDir = ref("default");
  const latMinutes = ref("");
  const latDegree = ref("");
  const longDir = ref("default");
  const longMinutes = ref("");
  const longDegree = ref("");

  // Weather Conditions
  const weather = ref("default");
  const visibility = ref("default");
  const windDirection = ref("default");
  const windSpeed = ref("");
  const seaDirection = ref("default");
  const seaState = ref("default");
  const swellDirection = ref("default");
  const swellScale = ref("default");
  const airTemperatureDry = ref("");
  const airTemperatureWet = ref("");
  const airPressure = ref("");
  const seaTemperature = ref("");
  const iceCondition = ref(IceCondition.NONE);

  // Heavy Weather Conditions
  const heavyWeatherHours = ref("");
  const heavyWeatherDist = ref("");
  const heavyWeatherConsumption = ref("");
  const heavyWeatherNotation = ref("default");
  const heavyWindDirection = ref("default");
  const heavyWindSpeed = ref("");
  const heavySeaDirection = ref("default");
  const heavySeaState = ref("default");
  const heavyRemarks = ref("");
  const isHeavyWeatherEnabled = ref(false); // toggle button is on/off
  const shouldHeavyWeatherDataBeSent = computed(
    // at least one field is filled out
    () =>
      heavyWeatherHours.value ||
      heavyWeatherDist.value ||
      heavyWeatherConsumption.value ||
      heavyWeatherNotation.value !== "default" ||
      heavyWindDirection.value !== "default" ||
      heavyWindSpeed.value ||
      heavySeaDirection.value !== "default" ||
      heavySeaState.value !== "default" ||
      heavyRemarks.value
  );

  // Distance and Time
  const hoursSinceNoon = computed(() =>
    reportingDateTimeUTC.value && reportingTimeZone.value !== "default"
      ? +(
          (Date.parse(reportingDateTimeUTC.value) -
            Date.parse(temp.lastNoonReportTime)) /
          (1000 * 60 * 60)
        ).toFixed(0)
      : ""
  );
  const hoursTotal = computed(() =>
    hoursSinceNoon.value
      ? +(
          (Date.parse(reportingDateTimeUTC.value) -
            Date.parse(temp.rupOfDeparture)) /
          (1000 * 60 * 60)
        ).toFixed(0)
      : ""
  );
  const distanceObsSinceNoon = ref("");
  const distanceObsTotal = computed(() =>
    distanceObsSinceNoon.value
      ? +(temp.distanceObsSoFar + Number(distanceObsSinceNoon.value)).toFixed(2)
      : ""
  );
  const distanceEngSinceNoon = computed(() =>
    revolutionCount.value
      ? +(
          (Number(revolutionCount.value) - temp.revolutionCountYesterday) *
          temp.propellerPitch
        ).toFixed(2)
      : ""
  );
  const distanceEngTotal = computed(() =>
    distanceEngSinceNoon.value
      ? +(distanceEngSinceNoon.value + temp.distanceEngSoFar).toFixed(2)
      : ""
  );
  const distanceToGo = computed(() =>
    distanceObsSinceNoon.value
      ? +(temp.distanceLeft - Number(distanceObsSinceNoon.value)).toFixed(2)
      : ""
  );
  const distanceToGoEdited = ref("");
  const remarksForChanges = ref("");
  const revolutionCount = ref("");

  // Performance
  const speedSinceNoon = computed(() =>
    distanceObsSinceNoon.value && hoursSinceNoon.value
      ? +(Number(distanceObsSinceNoon.value) / hoursSinceNoon.value).toFixed(2)
      : ""
  );
  const rpmSinceNoon = computed(() =>
    revolutionCount.value && hoursSinceNoon.value
      ? +(
          (Number(revolutionCount.value) - temp.revolutionCountYesterday) /
          (hoursSinceNoon.value * 60)
        ).toFixed(1)
      : ""
  );
  const slipSinceNoon = computed(() =>
    distanceEngSinceNoon.value && distanceObsSinceNoon.value
      ? +(
          100 *
          ((distanceEngSinceNoon.value - Number(distanceObsSinceNoon.value)) /
            distanceEngSinceNoon.value)
        ).toFixed(2)
      : ""
  );
  const speedAvg = computed(() =>
    speedSinceNoon.value !== "" && hoursTotal.value
      ? +(
          (temp.voyageAvgSpeed + speedSinceNoon.value) /
          (hoursTotal.value / 24)
        ).toFixed(2)
      : ""
  );
  const rpmAvg = computed(() =>
    rpmSinceNoon.value !== "" && hoursTotal.value
      ? +(
          (temp.voyageAvgRpm + rpmSinceNoon.value) /
          (hoursTotal.value / 24)
        ).toFixed(1)
      : ""
  );
  const slipAvg = computed(() =>
    slipSinceNoon.value !== "" && hoursTotal.value
      ? +(
          (temp.voyageAvgSlip + slipSinceNoon.value) /
          (hoursTotal.value / 24)
        ).toFixed(2)
      : ""
  );

  // Consumption and Condition
  const fuelOilBreakdowns = reactive({});
  for (const fuelOil of fuelOils.value) {
    fuelOilBreakdowns[fuelOil] = {
      "M/E": "",
      "G/E": "",
      IGG: "",
      BLR: "",
    };
  }
  const fuelOilTotalConsumptions = computed(() => {
    let rtn = {};
    for (const fuelOil of fuelOils.value) {
      if (fuelOils.value.includes(fuelOil)) {
        rtn[fuelOil] = +sumObjectValues(fuelOilBreakdowns[fuelOil]).toFixed(2);
      }
    }
    return rtn;
  });
  const fuelOilRobs = computed(() => {
    let rtn = {};
    for (const fuelOil of fuelOils.value) {
      if (fuelOils.value.includes(fuelOil)) {
        rtn[fuelOil] = +(
          temp.prevRobs[fuelOil] -
          Number(fuelOilTotalConsumptions.value[fuelOil])
        ).toFixed(2);
      }
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
      if (lubricatingOils.value.includes(lubricatingOil)) {
        rtn[lubricatingOil] = +(
          temp.prevRobs[lubricatingOil] -
          Number(lubricatingOilBreakdowns[lubricatingOil].total_consumption) +
          Number(lubricatingOilBreakdowns[lubricatingOil].receipt) -
          Number(lubricatingOilBreakdowns[lubricatingOil].debunkering)
        ).toFixed(2);
      }
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
    () => temp.freshwaterPrevROB + freshwaterChange.value
  );

  // Stoppage or Reduction RPM
  const stoppageBeginning = ref("");
  const stoppageBeginningUTC = computed(() =>
    reportingTimeZone.value !== "default" && stoppageBeginning.value
      ? convertLTToUTC(
          new Date(stoppageBeginning.value),
          reportingTimeZone.value
        )
      : ""
  );
  const stoppageEnding = ref("");
  const stoppageEndingUTC = computed(() =>
    reportingTimeZone.value !== "default" && stoppageEndingUTC.value
      ? convertLTToUTC(
          new Date(stoppageEndingUTC.value),
          reportingTimeZone.value
        )
      : ""
  );
  const stoppageDuration = ref("");
  const stoppageChangedRPM = ref("");
  const stoppageReason = ref("default");
  const stoppageRemarks = ref("");
  const stoppageLatDir = ref("default");
  const stoppageLatDegree = ref("");
  const stoppageLatMinutes = ref("");
  const stoppageLongDir = ref("default");
  const stoppageLongDegree = ref("");
  const stoppageLongMinutes = ref("");
  const isStoppageEnabled = ref(false); // stoppage button toggled on/off
  const shouldStoppageDataBeSent = computed(
    // at least one field is filled out
    () =>
      stoppageBeginning.value ||
      stoppageEnding.value ||
      stoppageDuration.value ||
      stoppageChangedRPM.value ||
      stoppageReason.value !== "default" ||
      stoppageRemarks.value ||
      stoppageLatDir.value !== "default" ||
      stoppageLatDegree.value ||
      stoppageLatMinutes.value ||
      stoppageLongDir.value !== "default" ||
      stoppageLongDegree.value ||
      stoppageLongMinutes.value
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
    routeDeparturePortCountry,
    routeDeparturePortName,
    routeDepartureDateTime,
    routeDepartureDateTimeUTC,
    routeDepartureTimeZone,
    routeArrivalPortCountry,
    routeArrivalPortName,
    isRouteArrivalDateTimeEdited,
    routeArrivalDateTime,
    routeArrivalDateTimeUTC,
    routeArrivalDateTimeEdited,
    routeArrivalDateTimeEditedUTC,
    routeArrivalTimeZone,
    // Reporting Noon
    latDir,
    latMinutes,
    latDegree,
    longDir,
    longMinutes,
    longDegree,
    // Weather Conditions
    weather,
    visibility,
    windDirection,
    windSpeed,
    seaDirection,
    seaState,
    swellDirection,
    swellScale,
    airTemperatureDry,
    airTemperatureWet,
    airPressure,
    seaTemperature,
    iceCondition,
    // Heavy Weather Conditions
    heavyWeatherHours,
    heavyWeatherDist,
    heavyWeatherConsumption,
    heavyWeatherNotation,
    heavyWindDirection,
    heavyWindSpeed,
    heavySeaDirection,
    heavySeaState,
    heavyRemarks,
    isHeavyWeatherEnabled,
    shouldHeavyWeatherDataBeSent,
    // DistanceTime
    hoursSinceNoon,
    hoursTotal,
    distanceToGo,
    distanceToGoEdited,
    remarksForChanges,
    distanceObsSinceNoon,
    distanceObsTotal,
    distanceEngSinceNoon,
    distanceEngTotal,
    revolutionCount,
    // Performance
    speedSinceNoon,
    rpmSinceNoon,
    slipSinceNoon,
    speedAvg,
    rpmAvg,
    slipAvg,
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
    // Stoppage or Reduction RPM
    stoppageBeginning,
    stoppageBeginningUTC,
    stoppageEnding,
    stoppageEndingUTC,
    stoppageDuration,
    stoppageChangedRPM,
    stoppageReason,
    stoppageRemarks,
    stoppageLatDir,
    stoppageLatDegree,
    stoppageLatMinutes,
    stoppageLongDir,
    stoppageLongDegree,
    stoppageLongMinutes,
    isStoppageEnabled,
    shouldStoppageDataBeSent,
  };
});
