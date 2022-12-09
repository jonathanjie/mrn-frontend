import { defineStore } from "pinia";
import { ref, computed } from "vue";
// import { reactive } from "vue";

// TODO: fetch from database
const temp = {
  lastNoonReportTime: "2022-12-01T00:00:00Z",
  rupOfDeparture: "2022-11-21T00:00:00Z",
  distanceLeft: "4000",
  distanceObsSoFar: "1000",
  distanceEngSoFar: "1000",
  revolutionCountYesterday: "20000",
  propellerPitch: "10",
  previousNoonReportCount: "2",
  voyageAvgSpeed: "200",
  voyageAvgRpm: "100",
  voyageAvgSlip: "400",
};

export const useNoonReportStore = defineStore("noonReport", () => {
  //   DateTimeLatLong
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
  const seaState = ref("default");
  const windDirection = ref("default");
  const windSpeed = ref("");
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
  const hoursSinceNoon = computed(() =>
    dateTime.value
      ? +(
          (Date.parse(dateTime.value) - Date.parse(temp.lastNoonReportTime)) /
          (1000 * 60 * 60)
        ).toFixed(2)
      : ""
  );
  const hoursTotal = computed(() =>
    dateTime.value
      ? +(
          (Date.parse(dateTime.value) - Date.parse(temp.rupOfDeparture)) /
          (1000 * 60 * 60)
        ).toFixed(2)
      : ""
  );
  const distanceObsSinceNoon = ref("");
  const distanceObsTotal = computed(
    () =>
      +(
        Number(temp.distanceObsSoFar) + Number(distanceObsSinceNoon.value)
      ).toFixed(2)
  );
  const distanceEngSinceNoon = computed(() =>
    revolutionCount.value
      ? +(
          (Number(revolutionCount.value) -
            Number(temp.revolutionCountYesterday)) *
          Number(temp.propellerPitch)
        ).toFixed(2)
      : ""
  );
  const distanceEngTotal = computed(() =>
    distanceEngSinceNoon.value
      ? +(distanceEngSinceNoon.value + Number(temp.distanceEngSoFar)).toFixed(2)
      : ""
  );
  const distanceToGo = computed(() =>
    distanceObsSinceNoon.value
      ? +(
          Number(temp.distanceLeft) - Number(distanceObsSinceNoon.value)
        ).toFixed(2)
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
          (Number(revolutionCount.value) -
            Number(temp.revolutionCountYesterday)) /
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
          (Number(temp.voyageAvgSpeed) + speedSinceNoon.value) /
          (temp.previousNoonReportCount + 1)
        ).toFixed(2)
      : ""
  );
  const rpmAvg = computed(() =>
    rpmSinceNoon.value
      ? +(
          (Number(temp.voyageAvgRpm) + rpmSinceNoon.value) /
          (temp.previousNoonReportCount + 1)
        ).toFixed(1)
      : ""
  );
  const slipAvg = computed(() =>
    slipSinceNoon.value
      ? +(
          (Number(temp.voyageAvgSlip) + slipSinceNoon.value) /
          (temp.previousNoonReportCount + 1)
        ).toFixed(2)
      : ""
  );

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
