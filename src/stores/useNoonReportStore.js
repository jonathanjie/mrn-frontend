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
import { useLatestReportDetailsStore } from "./useLatestReportDetailsStore";

export const useNoonReportStore = defineStore("noonReport", () => {
  const store = useVoyageStore();
  const { legUuid, noonReportNo, lastLegNo, curLoadingCondition, curVoyageNo } =
    storeToRefs(store);

  const shipStore = useShipStore();
  const { fuelOils, lubricatingOils, machinery } = storeToRefs(shipStore);

  const detailsStore = useLatestReportDetailsStore();
  const {
    departurePortCountry,
    departurePortName,
    departureTz,
    departureDate,
    arrivalPortCountry,
    arrivalPortName,
    arrivalTz,
    arrivalDate,
    lastReportDate,
    lastReportTz,
    distanceToGo: distance_to_go,
    distanceObservedTotal,
    distanceEngineTotal,
    revolutionCount: revolution_count,
    propellerPitch,
    fuelOilRobs: fuel_oil_robs,
    lubeOilRobs,
    freshwaterRob: freshwater_rob,
    timeSbyToCosp,
    distanceEngSbyToCosp,
    distanceObsSbyToCosp,
    revolutionCountSbyToCosp,
    timeStoppedAtSea,
  } = storeToRefs(detailsStore);

  // Getters
  // Overview
  const reportNo = computed(() =>
    noonReportNo.value ? noonReportNo.value : 0
  );
  const legNo = computed(() => (lastLegNo.value ? lastLegNo.value : 0));
  const loadingCondition = computed(() =>
    curLoadingCondition.value ? curLoadingCondition.value : "N.A"
  );
  const voyageNo = computed(() => (curVoyageNo.value ? curVoyageNo.value : 0));
  const getPrevDate = computed(() =>
    lastReportDate.value
      ? convertUTCToLT(
          new Date(new Date(lastReportDate.value).valueOf() + 3600 * 24 * 1000),
          lastReportTz.value
        )
      : ""
  );

  const reportingDateTimeUTC = computed(() =>
    reportingTimeZone.value !== "default" && reportingDateTime.value
      ? convertLTToUTC(
          new Date(reportingDateTime.value),
          reportingTimeZone.value
        )
      : ""
  );

  // Departure and Destination
  const routeDeparturePortCountry = computed(() =>
    departurePortCountry.value ? departurePortCountry.value : ""
  );
  const routeDeparturePortName = computed(() =>
    departurePortName.value ? departurePortName.value : ""
  );
  const routeDepartureDateTimeUTC = computed(() =>
    departureDate.value ? new Date(departureDate.value) : new Date()
  );
  const routeDepartureTimeZone = computed(() =>
    departureTz.value ? departureTz.value : 0
  );
  const routeDepartureDateTime = computed(() =>
    routeDepartureTimeZone.value !== "default" &&
    routeDepartureDateTimeUTC.value
      ? convertUTCToLT(
          new Date(routeDepartureDateTimeUTC.value),
          routeDepartureTimeZone.value
        )
      : ""
  );
  const routeArrivalPortCountry = computed(() =>
    arrivalPortCountry.value ? arrivalPortCountry.value : ""
  );
  const routeArrivalPortName = computed(() =>
    arrivalPortName.value ? arrivalPortName.value : ""
  );
  const routeArrivalTimeZone = computed(() =>
    arrivalTz.value ? arrivalTz.value : ""
  );
  const routeArrivalDateTimeUTC = computed(() =>
    arrivalDate.value ? new Date(arrivalDate.value) : new Date()
  );
  const routeArrivalDateTime = computed(() =>
    routeArrivalTimeZone.value !== "default" && routeArrivalDateTimeUTC.value
      ? convertUTCToLT(
          new Date(routeArrivalDateTimeUTC.value),
          routeArrivalTimeZone.value
        )
      : ""
  );

  const routeArrivalDateTimeEditedUTC = computed(() =>
    routeArrivalTimeZone.value !== "default" && routeArrivalDateTimeEdited.value
      ? convertLTToUTC(
          new Date(routeArrivalDateTimeEdited.value),
          routeArrivalTimeZone.value
        )
      : ""
  );

  // Heavy Weather Conditions
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
            Date.parse(lastReportDate.value)) /
          36e5
        ).toFixed(2)
      : ""
  );
  const hoursCospToEosp = computed(() =>
    reportingDateTimeUTC.value
      ? +(
          (Date.parse(reportingDateTimeUTC.value) -
            Date.parse(departureDate.value)) /
            36e5 -
          Number(timeSbyToCosp.value)
        ).toFixed(2)
      : ""
  );
  const hoursSbyToFwe = computed(() =>
    reportingDateTimeUTC.value
      ? +(
          (Date.parse(reportingDateTimeUTC.value) -
            Date.parse(departureDate.value)) /
          36e5
        ).toFixed(2)
      : ""
  );

  const distanceObsCospToEosp = computed(() =>
    distanceObsSinceNoon.value
      ? +(
          Number(distanceObservedTotal.value) +
          Number(distanceObsSinceNoon.value) -
          Number(distanceObsSbyToCosp.value)
        ).toFixed(2)
      : ""
  );
  const distanceObsSbyToFwe = computed(() =>
    distanceObsSinceNoon.value
      ? +(
          Number(distanceObservedTotal.value) +
          Number(distanceObsSinceNoon.value)
        ).toFixed(2)
      : ""
  );
  const distanceEngSinceNoon = computed(() =>
    distanceEngSinceNoonStatic.value
      ? distanceEngSinceNoonStatic.value
      : distanceEngSinceNoonComputed.value
  );
  const distanceEngSinceNoonComputed = computed(() =>
    revolutionCountStatic.value
      ? +(
          ((Number(revolutionCountStatic.value) -
            Number(revolution_count.value)) *
            Number(propellerPitch.value)) /
          1852
        ).toFixed(0)
      : ""
  );

  const distanceEngCospToEosp = computed(() =>
    distanceEngSinceNoon.value
      ? +(
          Number(distanceEngSinceNoon.value) +
          Number(distanceEngineTotal.value) -
          Number(distanceEngSbyToCosp.value)
        ).toFixed(0)
      : ""
  );
  const distanceEngSbyToFwe = computed(() =>
    distanceEngSinceNoon.value
      ? +(
          Number(distanceEngSinceNoon.value) + Number(distanceEngineTotal.value)
        ).toFixed(0)
      : ""
  );
  const distanceToGo = computed(
    () =>
      +(
        Number(distance_to_go.value) - (Number(distanceObsSinceNoon.value) || 0)
      ).toFixed(2)
  );

  const revolutionCount = computed(() =>
    revolutionCountStatic.value
      ? revolutionCountStatic.value
      : revolutionCountComputed.value
  );

  const revolutionCountComputed = computed(() =>
    distanceEngSinceNoonStatic.value
      ? +(
          (1852 * Number(distanceEngSinceNoonStatic.value)) /
          Number(propellerPitch.value)
        ).toFixed(0)
      : ""
  );

  const revolutionCountTotal = computed(() =>
    revolutionCountStatic.value
      ? +(
          Number(revolutionCountStatic.value) + Number(revolution_count.value)
        ).toFixed(0)
      : +(
          (1852 * Number(distanceEngSinceNoonStatic.value)) /
            Number(propellerPitch.value) +
          Number(revolution_count.value)
        ).toFixed(0)
  );

  // Performance
  const speedSinceNoon = computed(() =>
    distanceObsSinceNoon.value && hoursSinceNoon.value
      ? +(
          Number(distanceObsSinceNoon.value) /
          (Number(hoursSinceNoon.value) -
            (stoppageChangedRPM.value === "0"
              ? Number(stoppageDuration.value)
              : 0))
        ).toFixed(2)
      : ""
  );
  const rpmSinceNoon = computed(() =>
    revolutionCount.value && hoursSinceNoon.value
      ? +(
          Number(revolutionCount.value) /
          ((Number(hoursSinceNoon.value) -
            (stoppageChangedRPM.value === "0"
              ? Number(stoppageDuration.value)
              : 0)) *
            60)
        ).toFixed(1)
      : ""
  );
  const slipSinceNoon = computed(() =>
    distanceEngSinceNoon.value && distanceObsSinceNoon.value
      ? +(
          100 *
          ((Number(distanceEngSinceNoon.value) -
            Number(distanceObsSinceNoon.value)) /
            Number(distanceEngSinceNoon.value))
        ).toFixed(2)
      : ""
  );
  const speedAvg = computed(() =>
    speedSinceNoon.value && hoursCospToEosp.value
      ? +(
          Number(distanceObsCospToEosp.value) /
          (Number(hoursCospToEosp.value) -
            Number(timeStoppedAtSea.value) -
            (stoppageChangedRPM.value === "0"
              ? Number(stoppageDuration.value)
              : 0))
        ).toFixed(2)
      : ""
  );
  const rpmAvg = computed(() =>
    rpmSinceNoon.value && hoursCospToEosp.value
      ? +(
          (Number(revolutionCountTotal.value) -
            Number(revolutionCountSbyToCosp.value)) /
          ((Number(hoursCospToEosp.value) -
            Number(timeStoppedAtSea.value) -
            (stoppageChangedRPM.value === "0"
              ? Number(stoppageDuration.value)
              : 0)) *
            60)
        ).toFixed(1)
      : ""
  );
  const slipAvg = computed(() =>
    distanceEngCospToEosp.value && distanceObsCospToEosp.value
      ? +(
          100 *
          ((Number(distanceEngCospToEosp.value) -
            Number(distanceObsCospToEosp.value)) /
            Number(distanceEngCospToEosp.value))
        ).toFixed(2)
      : ""
  );

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
        Number(fuel_oil_robs.value[fuelOil]) -
        Number(fuelOilTotalConsumptions.value[fuelOil])
      ).toFixed(2);
    }
    return rtn;
  });

  const lubricatingOilRobs = computed(() => {
    let rtn = {};
    for (const lubricatingOil of lubricatingOils.value) {
      rtn[lubricatingOil] = +(
        Number(lubeOilRobs.value[lubricatingOil]) -
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
    () => freshwater_rob.value + freshwaterChange.value
  );

  // Stoppage or Reduction RPM
  const stoppageBeginningUTC = computed(() =>
    reportingTimeZone.value !== "default" && stoppageBeginning.value
      ? convertLTToUTC(
          new Date(stoppageBeginning.value),
          reportingTimeZone.value
        )
      : ""
  );

  const stoppageEndingUTC = computed(() =>
    reportingTimeZone.value !== "default" && stoppageEnding.value
      ? convertLTToUTC(new Date(stoppageEnding.value), reportingTimeZone.value)
      : ""
  );
  const stoppageDuration = computed(() =>
    stoppageBeginningUTC.value && stoppageEndingUTC.value
      ? (
          (Date.parse(stoppageEndingUTC.value) -
            Date.parse(stoppageBeginningUTC.value)) /
          36e5
        ).toFixed(2)
      : stoppageBeginningUTC.value && reportingDateTimeUTC.value
      ? (
          (Date.parse(reportingDateTimeUTC.value) -
            Date.parse(stoppageBeginningUTC.value)) /
          36e5
        ).toFixed(2)
      : ""
  );

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

  // State variables
  // Overview
  const reportingDateTime = ref(getPrevDate.value);
  const reportingTimeZone = ref("default");
  // Departure and Destination
  const dateEditIsDisabled = ref(true);
  const routeArrivalDateTimeEdited = ref(routeArrivalDateTime.value);
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

  // Distance and Time
  const distanceObsSinceNoon = ref("");
  const distanceEngSinceNoonStatic = ref("");
  const distanceToGoEdited = ref("");
  const remarksForChanges = ref("");
  const revolutionCountStatic = ref("");

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

  // Stoppage or Reduction RPM
  const stoppageBeginning = ref("");
  const stoppageEnding = ref("");
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
  // Additional Remarks
  const additionalRemarks = ref("");

  function $reset() {
    console.log("Noon store reset is being called");
    // State variables
    // Overview
    reportingDateTime.value = getPrevDate.value;
    reportingTimeZone.value = "default";
    // Departure and Destination
    dateEditIsDisabled.value = true;
    routeArrivalDateTimeEdited.value = routeArrivalDateTime.value;
    // Reporting Noon
    latDir.value = "default";
    latMinutes.value = "";
    latDegree.value = "";
    longDir.value = "default";
    longMinutes.value = "";
    longDegree.value = "";

    // Weather Conditions
    weather.value = "default";
    visibility.value = "default";
    windDirection.value = "default";
    windSpeed.value = "";
    seaDirection.value = "default";
    seaState.value = "default";
    swellDirection.value = "default";
    swellScale.value = "default";
    airTemperatureDry.value = "";
    airTemperatureWet.value = "";
    airPressure.value = "";
    seaTemperature.value = "";
    iceCondition.value = IceCondition.NONE;

    // Heavy Weather Conditions
    heavyWeatherHours.value = "";
    heavyWeatherDist.value = "";
    heavyWeatherConsumption.value = "";
    heavyWeatherNotation.value = "default";
    heavyWindDirection.value = "default";
    heavyWindSpeed.value = "";
    heavySeaDirection.value = "default";
    heavySeaState.value = "default";
    heavyRemarks.value = "";
    isHeavyWeatherEnabled.value = false; // toggle button is on/off

    // Distance and Time
    distanceObsSinceNoon.value = "";
    distanceEngSinceNoonStatic.value = "";
    distanceToGoEdited.value = "";
    remarksForChanges.value = "";
    revolutionCountStatic.value = "";

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

    // Stoppage or Reduction RPM
    stoppageBeginning.value = "";
    stoppageEnding.value = "";
    stoppageChangedRPM.value = "";
    stoppageReason.value = "default";
    stoppageRemarks.value = "";
    stoppageLatDir.value = "default";
    stoppageLatDegree.value = "";
    stoppageLatMinutes.value = "";
    stoppageLongDir.value = "default";
    stoppageLongDegree.value = "";
    stoppageLongMinutes.value = "";
    isStoppageEnabled.value = false; // stoppage button toggled on/off
    // Additional Remarks
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
    routeDeparturePortCountry,
    routeDeparturePortName,
    routeDepartureDateTime,
    routeDepartureDateTimeUTC,
    routeDepartureTimeZone,
    dateEditIsDisabled,
    routeArrivalPortCountry,
    routeArrivalPortName,
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
    // Distance & Time
    hoursSinceNoon,
    hoursSbyToFwe,
    hoursCospToEosp,
    distanceToGo,
    distanceToGoEdited,
    remarksForChanges,
    distanceObsSinceNoon,
    distanceObsCospToEosp,
    distanceObsSbyToFwe,
    distanceEngSinceNoon,
    distanceEngSinceNoonComputed,
    distanceEngSinceNoonStatic,
    distanceEngCospToEosp,
    distanceEngSbyToFwe,
    revolutionCount,
    revolutionCountComputed,
    revolutionCountStatic,
    revolutionCountTotal,
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
    // Additional remarks
    additionalRemarks,
    $reset,
  };
});
