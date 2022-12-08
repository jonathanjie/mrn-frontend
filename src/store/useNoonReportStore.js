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
  const windDirection = ref("default");
  const windSpeed = ref("");
  const beaufort = ref("default");
  const waveDirection = ref("default");
  const waveHeight = ref("");
  const waveForce = ref("default");
  const swellDirection = ref("default");
  const swellHeight = ref("");
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
  const heavyMaxWaveHt = ref(""); 
  const heavySeaDirection = ref("default");
  const heavySeaState = ref("default");
  const heavyRemarks = ref("");

  // Distance and Time
  const hoursSinceNoon = ref("");
  const hoursTotal = ref("");
  const distanceToGo = ref("");
  const remarksForChanges = ref("");
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
  const stoppageReason = ref("default");
  const stoppageRemarks = ref("");
  const stoppageLatDir = ref("default");
  const stoppageLatDegree = ref("");
  const stoppageLatMinutes = ref("");
  const stoppageLongDir = ref("default");
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
    heavyMaxWaveHt,
    heavySeaDirection,
    heavySeaState,
    heavyRemarks,
    // DistanceTime
    hoursSinceNoon,
    hoursTotal,
    distanceToGo,
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
