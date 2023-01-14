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
    distanceToGo: distance_to_go,
    distanceObservedTotal,
    distanceEngineTotal,
    revolutionCount: revolution_count,
    propellerPitch,
    fuelOilRobs: fuel_oil_robs,
    lubeOilRobs,
    freshwaterRob: freshwater_rob,
    timeSbyToCosp,
    distanceSbyToCosp,
    revolutionCountSbyToCosp,
    timeStoppedAtSea,
  } = storeToRefs(detailsStore);

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
  const routeDeparturePortCountry = ref(departurePortCountry.value);
  const routeDeparturePortName = ref(departurePortName.value);
  const routeDepartureDateTimeUTC = ref(new Date(departureDate.value));
  const routeDepartureTimeZone = ref(departureTz.value);
  const routeDepartureDateTime = computed(() =>
    routeDepartureTimeZone.value !== "default" &&
    routeDepartureDateTimeUTC.value
      ? convertUTCToLT(
          new Date(routeDepartureDateTimeUTC.value),
          routeDepartureTimeZone.value
        )
      : ""
  );
  const routeArrivalPortCountry = ref(arrivalPortCountry.value);
  const routeArrivalPortName = ref(arrivalPortName.value);
  const routeArrivalTimeZone = ref(arrivalTz.value);
  const isRouteArrivalDateTimeEdited = ref(false);
  const routeArrivalDateTimeUTC = ref(new Date(arrivalDate.value));
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
  const distanceObsSinceNoon = ref("");
  const distanceObsCospToEosp = computed(() =>
    distanceObsSinceNoon.value
      ? +(
          Number(distanceObservedTotal.value) +
          Number(distanceObsSinceNoon.value) -
          Number(distanceSbyToCosp.value)
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
    revolutionCount.value
      ? +(
          ((Number(revolutionCount.value) - Number(revolution_count.value)) *
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
          Number(distanceSbyToCosp.value)
        ) // TODO: change this to distance eng value returned by backend
          .toFixed(0)
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
          (Number(revolutionCount.value) - Number(revolution_count.value)) /
          (Number(hoursSinceNoon.value) * 60)
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
          (Number(hoursCospToEosp.value) - Number(timeStoppedAtSea.value))
        ).toFixed(2)
      : ""
  );
  const rpmAvg = computed(() =>
    rpmSinceNoon.value && hoursCospToEosp.value
      ? +(
          (Number(revolutionCount.value) -
            Number(revolutionCountSbyToCosp.value)) /
          (Number(hoursCospToEosp.value) - Number(timeStoppedAtSea.value))
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
        Number(lubeOilRobs.value[lubricatingOil]) -
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
    () => freshwater_rob.value + freshwaterChange.value
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
      ? convertLTToUTC(new Date(stoppageEnding.value), reportingTimeZone.value)
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
    distanceEngCospToEosp,
    distanceEngSbyToFwe,
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
