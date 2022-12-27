import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { convertLTToUTC, convertUTCToLT } from "@/utils/helpers";
import { storeToRefs } from "pinia";

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
  previousNoonReportCount: 2,
  voyageAvgSpeed: 200,
  voyageAvgRpm: 100,
  voyageAvgSlip: 5,

  // Consumption & Condition
  lsfoPrevROB: 200,
  mgoPrevROB: 200,
  mecylPrevROB: 200,
  mesysPrevROB: 200,
  mesumpPrevROB: 200,
  gesysPrevROB: 200,
  freshwaterPrevROB: 200,
};

export const useNoonReportStore = defineStore("noonReport", () => {
  const store = useVoyageStore();
  const { noonReportNo, curLegNo, curLoadingCondition, curVoyageNo } =
    storeToRefs(store);

  // Overview
  const reportNo = noonReportNo;
  const legNo = curLegNo;
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
      : reportingDateTime.value
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
          new Date(routeDepartureDateTimeUTC).value,
          routeDepartureTimeZone.value
        )
      : routeDepartureDateTimeUTC.value
  );
  const routeArrivalPortCountry = ref("SA");
  const routeArrivalPortName = ref("RTA");
  const routeArrivalDateTimeUTC = ref(new Date("2022-12-21T00:00:00Z"));
  const routeArrivalTimeZone = ref("3");
  const routeArrivalDateTimeEdited = ref(false);
  const routeArrivalDateTimeFromUTC = computed(() =>
    routeArrivalTimeZone.value !== "default" && routeArrivalDateTimeUTC.value
      ? convertUTCToLT(
          new Date(routeArrivalDateTimeUTC.value),
          routeArrivalTimeZone.value
        )
      : routeArrivalDateTimeUTC.value
  );
  const routeArrivalDateTime = ref("");

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
  const iceCondition = ref("default");

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
      heavyWeatherNotation.value ||
      heavyWindDirection.value ||
      heavyWindSpeed.value ||
      heavySeaDirection.value ||
      heavySeaState.value ||
      heavyRemarks.value
  );

  // Distance and Time
  const hoursSinceNoon = computed(() =>
    reportingDateTimeUTC.value
      ? +(
          (Date.parse(reportingDateTimeUTC.value) -
            Date.parse(temp.lastNoonReportTime)) /
          (1000 * 60 * 60)
        ).toFixed(0)
      : ""
  );
  const hoursTotal = computed(() =>
    reportingDateTimeUTC.value
      ? +(
          (Date.parse(reportingDateTimeUTC.value) -
            Date.parse(temp.rupOfDeparture)) /
          (1000 * 60 * 60)
        ).toFixed(0)
      : ""
  );
  const distanceObsSinceNoon = ref("");
  const distanceObsTotal = computed(
    () =>
      +(temp.distanceObsSoFar + Number(distanceObsSinceNoon.value)).toFixed(2)
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
  const distanceToGoEdited = ref(""); // use distanceToGoEdited instead of distanceToGo if distanceToGoEdited.value != distanceToGo.value
  const remarksForChanges = ref("");
  const revolutionCount = ref("");

  // Performance
  const speedSinceNoon = computed(() =>
    distanceObsSinceNoon.value && hoursSinceNoon.value
      ? +(Number(distanceObsSinceNoon.value) / hoursSinceNoon.value).toFixed(2)
      : 0
  );
  const rpmSinceNoon = computed(() =>
    revolutionCount.value && hoursSinceNoon.value
      ? +(
          (Number(revolutionCount.value) - temp.revolutionCountYesterday) /
          (hoursSinceNoon.value * 60)
        ).toFixed(1)
      : 0
  );
  const slipSinceNoon = computed(() =>
    distanceEngSinceNoon.value && distanceObsSinceNoon.value
      ? +(
          100 *
          ((distanceEngSinceNoon.value - Number(distanceObsSinceNoon.value)) /
            distanceEngSinceNoon.value)
        ).toFixed(2)
      : 0
  );
  const speedAvg = computed(() =>
    speedSinceNoon.value
      ? +(
          (temp.voyageAvgSpeed + speedSinceNoon.value) /
          (temp.previousNoonReportCount + 1)
        ).toFixed(2)
      : 0
  );
  const rpmAvg = computed(() =>
    rpmSinceNoon.value
      ? +(
          (temp.voyageAvgRpm + rpmSinceNoon.value) /
          (temp.previousNoonReportCount + 1)
        ).toFixed(1)
      : 0
  );
  const slipAvg = computed(() =>
    slipSinceNoon.value
      ? +(
          (temp.voyageAvgSlip + slipSinceNoon.value) /
          (temp.previousNoonReportCount + 1)
        ).toFixed(2)
      : 0
  );

  // Consumption and Condition
  // TODO: create for each fuel oil and lubricating oil type
  const lsfoBreakdown = reactive({
    me: "",
    ge: "",
    blr: "",
    igg: "",
  });
  const mgoBreakdown = reactive({
    me: "",
    ge: "",
    blr: "",
    igg: "",
  });
  const lsfoTotalConsumption = computed(
    () =>
      +(
        Number(lsfoBreakdown.me) +
        Number(lsfoBreakdown.ge) +
        Number(lsfoBreakdown.blr) +
        Number(lsfoBreakdown.igg)
      )
  );
  const lsfoRob = computed(() => temp.lsfoPrevROB - lsfoTotalConsumption.value);
  const mgoTotalConsumption = computed(
    () =>
      +(
        Number(mgoBreakdown.me) +
        Number(mgoBreakdown.ge) +
        Number(mgoBreakdown.blr) +
        Number(mgoBreakdown.igg)
      ).toFixed(2)
  );
  const mgoRob = computed(() => temp.mgoPrevROB - mgoTotalConsumption.value);
  const fuelOilDataCorrection = reactive({
    type: "default",
    correction: "",
    remarks: "",
  });

  const mecylinderBreakdown = reactive({
    total_consumption: "",
    receipt: "",
    debunkering: "",
  });
  const mesystemBreakdown = reactive({
    total_consumption: "",
    receipt: "",
    debunkering: "",
  });
  const mesumpBreakdown = reactive({
    total_consumption: "",
    receipt: "",
    debunkering: "",
  });
  const gesystemBreakdown = reactive({
    total_consumption: "",
    receipt: "",
    debunkering: "",
  });
  const mecylinderRob = computed(
    () =>
      +(
        temp.mecylPrevROB -
        Number(mecylinderBreakdown.total_consumption) +
        Number(mecylinderBreakdown.receipt) -
        Number(mecylinderBreakdown.debunkering)
      ).toFixed(2)
  );
  const mesystemRob = computed(
    () =>
      +(
        temp.mesysPrevROB -
        Number(mesystemBreakdown.total_consumption) +
        Number(mesystemBreakdown.receipt) -
        Number(mesystemBreakdown.debunkering)
      ).toFixed(2)
  );
  const mesumpRob = computed(
    () =>
      +(
        temp.mesumpPrevROB -
        Number(mesumpBreakdown.total_consumption) +
        Number(mesumpBreakdown.receipt) -
        Number(mesumpBreakdown.debunkering)
      ).toFixed(2)
  );
  const gesystemRob = computed(
    () =>
      +(
        temp.gesysPrevROB -
        Number(gesystemBreakdown.total_consumption) +
        Number(gesystemBreakdown.receipt) -
        Number(gesystemBreakdown.debunkering)
      ).toFixed(2)
  );
  const lubricatingOilDataCorrection = reactive({
    type: "default",
    correction: "",
    remarks: "",
  });

  const freshwaterConsumed = ref("");
  const freshwaterEvaporated = ref("");
  const freshwaterChange = computed(
    () => +(freshwaterEvaporated.value - freshwaterConsumed.value).toFixed(2)
  );
  const freshwaterRob = computed(
    () => temp.freshwaterPrevROB + freshwaterChange.value
  );

  // Stoppage or Reduction RPM
  const stoppageBeginning = ref("");
  const stoppageEnding = ref("");
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
      stoppageReason.value ||
      stoppageRemarks.value ||
      stoppageLatDir.value ||
      stoppageLatDegree.value ||
      stoppageLatMinutes.value ||
      stoppageLongDir.value ||
      stoppageLongDegree.value ||
      stoppageLongMinutes.value
  );

  return {
    // Overview
    reportNo,
    legNo,
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
    routeArrivalDateTimeUTC,
    routeArrivalDateTimeFromUTC,
    routeArrivalDateTimeEdited,
    routeArrivalDateTime,
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
    lsfoTotalConsumption,
    lsfoRob,
    mgoTotalConsumption,
    mgoRob,
    lsfoBreakdown,
    mgoBreakdown,
    fuelOilDataCorrection,
    mecylinderBreakdown,
    mesystemBreakdown,
    mesumpBreakdown,
    gesystemBreakdown,
    mecylinderRob,
    mesystemRob,
    mesumpRob,
    gesystemRob,
    lubricatingOilDataCorrection,
    freshwaterConsumed,
    freshwaterEvaporated,
    freshwaterChange,
    freshwaterRob,
    // Stoppage or Reduction RPM
    stoppageBeginning,
    stoppageEnding,
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
