import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";

// TODO: fetch from database
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
  // Departure and Destination
  // TODO: replace dummy values
  const routeDeparturePortCountry = ref("SG");
  const routeDeparturePortName = ref("PPT");
  const routeDepartureDate = ref("2022-12-01T00:00:00Z");
  const routeArrivalPortCountry = ref("SA");
  const routeArrivalPortName = ref("RTA");
  const routeArrivalDate = ref("2022-12-21T00:00:00Z");
  const routeArrivalTimeZone = ref("Asia/Singapore");
  const routeArrivalSummerTime = ref("false");

  // DateTimeLatLong
  const timeZone = ref("");
  const summerTime = ref("default");
  const dateTime = ref(""); // TODO: need to convert from local time to utc using timeZone and summerTime
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
  const heavyWeatherIsActive = ref(false);

  // Distance and Time
  const hoursSinceNoon = computed(() =>
    dateTime.value
      ? +(
          (Date.parse(dateTime.value) - Date.parse(temp.lastNoonReportTime)) /
          (1000 * 60 * 60)
        ).toFixed(0)
      : ""
  );
  const hoursTotal = computed(() =>
    dateTime.value
      ? +(
          (Date.parse(dateTime.value) - Date.parse(temp.rupOfDeparture)) /
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
    speedSinceNoon.value
      ? +(
          (temp.voyageAvgSpeed + speedSinceNoon.value) /
          (temp.previousNoonReportCount + 1)
        ).toFixed(2)
      : ""
  );
  const rpmAvg = computed(() =>
    rpmSinceNoon.value
      ? +(
          (temp.voyageAvgRpm + rpmSinceNoon.value) /
          (temp.previousNoonReportCount + 1)
        ).toFixed(1)
      : ""
  );
  const slipAvg = computed(() =>
    slipSinceNoon.value
      ? +(
          (temp.voyageAvgSlip + slipSinceNoon.value) /
          (temp.previousNoonReportCount + 1)
        ).toFixed(2)
      : ""
  );

  // Consumption and Condition
  // TODO: create for each fuel oil and lubricate oil type
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
  const fuelOilDataCorrection = reactive({
    type: "default",
    correction: "",
    remarks: "",
  });

  const mecylinderTotalConsumption = ref("");
  const mesystemTotalConsumption = ref("");
  const mesumpTotalConsumption = ref("");
  const gesystemTotalConsumption = ref("");
  const mecylinderRob = computed(
    () => +(temp.mecylPrevROB - mecylinderTotalConsumption.value).toFixed(2)
  );
  const mesystemRob = computed(
    () => +(temp.mesysPrevROB - mesystemTotalConsumption.value).toFixed(2)
  );
  const mesumpRob = computed(
    () => +(temp.mesumpPrevROB - mesumpTotalConsumption.value).toFixed(2)
  );
  const gesystemRob = computed(
    () => +(temp.gesysPrevROB - gesystemTotalConsumption.value).toFixed(2)
  );
  const lubricatingOilDataCorrection = reactive({
    type: "default",
    correction: "",
    remarks: "",
  });

  const freshwaterConsumed = ref("");
  const freshwaterEvaporated = ref("");
  const freshwaterReceived = ref("");
  const freshwaterDischarged = ref("");
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
  const stoppageReducedRPM = ref("");
  const stoppageReason = ref("default");
  const stoppageRemarks = ref("");
  const stoppageLatDir = ref("default");
  const stoppageLatDegree = ref("");
  const stoppageLatMinutes = ref("");
  const stoppageLongDir = ref("default");
  const stoppageLongDegree = ref("");
  const stoppageLongMinutes = ref("");
  const stoppageIsActive = ref(false);

  return {
    // Departure and Destination
    routeDeparturePortCountry,
    routeDeparturePortName,
    routeDepartureDate,
    routeArrivalPortCountry,
    routeArrivalPortName,
    routeArrivalDate,
    routeArrivalTimeZone,
    routeArrivalSummerTime,
    // DateTimeLatLong
    timeZone,
    summerTime,
    dateTime,
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
    heavyWeatherIsActive,
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
    mecylinderTotalConsumption,
    mesystemTotalConsumption,
    mesumpTotalConsumption,
    gesystemTotalConsumption,
    mecylinderRob,
    mesystemRob,
    mesumpRob,
    gesystemRob,
    lubricatingOilDataCorrection,
    freshwaterConsumed,
    freshwaterEvaporated,
    freshwaterReceived,
    freshwaterDischarged,
    freshwaterChange,
    freshwaterRob,
    // Stoppage or Reduction RPM
    stoppageBeginning,
    stoppageEnding,
    stoppageDuration,
    stoppageReducedRPM,
    stoppageReason,
    stoppageRemarks,
    stoppageLatDir,
    stoppageLatDegree,
    stoppageLatMinutes,
    stoppageLongDir,
    stoppageLongDegree,
    stoppageLongMinutes,
    stoppageIsActive,
  };
});

export const useCounterStore = defineStore("counter", () => {
  const counter = ref(0);
  function increment() {
    counter.value++;
  }

  return { counter, increment };
});
