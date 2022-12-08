import { defineStore } from "pinia";
import { ref } from "vue";
// import { reactive } from "vue";

export const useNoonReportStore = defineStore("noonReport", () => {
  //   DateTimeLatLong
  const timeZone = ref("default");
  const summerTime = ref("default");
  const dateTime = ref("");
  const latDir = ref("default");
  const latMinutes = ref("");
  const latDegree = ref("");
  const longDir = ref("default");
  const longMinutes = ref("");
  const longDegree = ref("");

  // Weather Conditions
  const weather = ref("default");
  const seaState = ref("default");
  const windDirection = ref("");
  const windSpeed = ref("");
  const beaufort = ref("default");
  const waveDirection = ref("");
  const waveHeight = ref("");
  const waveForce = ref("default");
  const swellDirection = ref("");
  const swellHeight = ref("");
  const swellScale = ref("default");
  const iceCondition = ref("NONE");

  // Heavy Weather Conditions
  const heavyWeatherHours = ref("");
  const heavyWeatherDist = ref("");
  const heavyWeatherConsumption = ref("");
  const heavyWindDirection = ref("");
  const heavyWindSpeed = ref("");
  const heavyMaxWaveHt = ref("");
  const heavyWaveForce = ref("");

  // Distance and Time
  const hoursSinceNoon = ref("");
  const hoursTotal = ref("");
  const distanceObsSinceNoon = ref("");
  const distanceObsTotal = ref("");
  const distanceEngSinceNoon = ref("");
  const distanceEngTotal = ref("");
  const revolutionCount = ref("");

  // Performance
  const speedSinceNoon = ref("");
  const rpmSinceNoon = ref("");
  const slipSinceNoon = ref("");
  const speedAvg = ref("");
  const rpmAvg = ref("");
  const slipAvg = ref("");

  // Stoppage or Reduction RPM
  const stoppageBeginning = ref("");
  const stoppageEnding = ref("");
  const stoppageDuration = ref("");
  const reducedRPM = ref("");
  const stoppageReason = ref("");
  const stoppageRemarks = ref("");
  const stoppageLatDir = ref("");
  const stoppageLatDegree = ref("");
  const stoppageLatMinutes = ref("");
  const stoppageLongDir = ref("");
  const stoppageLongDegree = ref("");
  const stoppageLongMinutes = ref("");

  return {
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
    seaState,
    windDirection,
    windSpeed,
    beaufort,
    waveDirection,
    waveHeight,
    waveForce,
    swellDirection,
    swellHeight,
    swellScale,
    iceCondition,
    // Heavy Weather Conditions
    heavyWeatherHours,
    heavyWeatherDist,
    heavyWeatherConsumption,
    heavyWindDirection,
    heavyWindSpeed,
    heavyMaxWaveHt,
    heavyWaveForce,
    // DistanceTime
    hoursSinceNoon,
    hoursTotal,
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
    // Stoppage or Reduction RPM
    stoppageBeginning,
    stoppageEnding,
    stoppageDuration,
    reducedRPM,
    stoppageReason,
    stoppageRemarks,
    stoppageLatDir,
    stoppageLatDegree,
    stoppageLatMinutes,
    stoppageLongDir,
    stoppageLongDegree,
    stoppageLongMinutes,
  };
});

export const useCounterStore = defineStore("counter", () => {
  const counter = ref(0);
  function increment() {
    counter.value++;
  }

  return { counter, increment };
});
