import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import { convertLTToUTC, sumObjectValues } from "@/utils/helpers";
import { IceCondition, Machinery } from "@/constants";
import { useShipStore } from "@/stores/useShipStore";
import { useLatestReportDetailsStore } from "./useLatestReportDetailsStore";

const temp = {
  // Total Consumption
  fuelOilPrevBreakdown: {
    me: 10,
    ge: 10,
    blr: 10,
    igg: 10,
    receipt: 20,
    debunkering: 10,
  },
};

export const useArrivalEOSPReportStore = defineStore(
  "arrivalEOSPReport",
  () => {
    const voyageStore = useVoyageStore();
    const {
      arrsReportNo,
      lastLegNo,
      legUuid,
      curLoadingCondition,
      curVoyageNo,
    } = storeToRefs(voyageStore);

    const shipStore = useShipStore();
    const { fuelOils, lubricatingOils, machinery } = storeToRefs(shipStore);

    const detailsStore = useLatestReportDetailsStore();
    const {
      departurePort,
      departureTz,
      departureDate,
      arrivalPort,
      lastReportDate,
      distanceToGo: distance_to_go,
      distanceObservedTotal,
      distanceEngineTotal,
      revolutionCount: revolution_count,
      propellerPitch,
      speedAverage,
      rpmAverage,
      slipAverage,
      displacementAtDeparture,
      fuelOilRobs: fuel_oil_robs,
      lubeOilRobs,
      freshwaterRob: freshwater_rob,
    } = storeToRefs(detailsStore);

    // Overview
    const reportNo = arrsReportNo;
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

    // Departure and Arrival
    const departurePortCountry = ref(departurePort.value.slice(0, 2));
    const departurePortName = ref(departurePort.value.slice(3, 6));
    const departureDateTime = ref(departureDate);
    const departureTimeZone = ref(departureTz);
    const departureDateTimeUTC = computed(() =>
      departureTimeZone.value !== "default" && departureDateTime.value
        ? convertLTToUTC(
            new Date(departureDateTime.value),
            departureTimeZone.value
          )
        : departureDateTime.value
    );
    const arrivalPortCountry = ref(arrivalPort.value.slice(0, 2));
    const arrivalPortName = ref(departurePort.value.slice(3, 6));
    const plannedOperations = ref([]);
    const isOtherPlannedOperationEnabled = computed(() =>
      plannedOperations.value.includes("others")
    );
    const otherPlannedOperation = ref("");

    // S/BY for Arrival
    const latDir = ref("default");
    const latMinute = ref("");
    const latDegree = ref("");
    const longDir = ref("default");
    const longMinute = ref("");
    const longDegree = ref("");

    // Weather (Noon to S/BY)
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

    // Distance & Time
    const hoursSinceNoon = computed(() =>
      reportingDateTime.value
        ? +(
            (Date.parse(reportingDateTime.value) -
              Date.parse(lastReportDate.value)) /
            (1000 * 60 * 60)
          ).toFixed(0)
        : ""
    );
    const hoursTotal = computed(() =>
      reportingDateTime.value
        ? +(
            (Date.parse(reportingDateTime.value) -
              Date.parse(departureDate.value)) /
            (1000 * 60 * 60)
          ).toFixed(0)
        : ""
    );
    const distanceObsSinceNoon = ref("");
    const distanceObsTotal = computed(() =>
      distanceObsSinceNoon.value
        ? +(
            distanceObservedTotal.value + Number(distanceObsSinceNoon.value)
          ).toFixed(2)
        : ""
    );
    const distanceEngSinceNoon = computed(() =>
      revolutionCount.value
        ? +(
            (Number(revolutionCount.value) - revolution_count.value) *
            propellerPitch.value
          ).toFixed(2)
        : ""
    );
    const distanceEngTotal = computed(() =>
      distanceEngSinceNoon.value
        ? +(distanceEngSinceNoon.value + distanceEngineTotal.value).toFixed(2)
        : ""
    );
    const distanceToGo = computed(() =>
      distanceObsSinceNoon.value
        ? +(distance_to_go.value - Number(distanceObsSinceNoon.value)).toFixed(
            2
          )
        : ""
    );
    const distanceToGoEdited = ref(""); // use distanceToGoEdited instead of distanceToGo if distanceToGoEdited.value != distanceToGo.value
    const remarksForChanges = ref("");
    const revolutionCount = ref("");

    // Performance
    const speedSinceNoon = computed(() =>
      distanceObsSinceNoon.value && hoursSinceNoon.value
        ? +(Number(distanceObsSinceNoon.value) / hoursSinceNoon.value).toFixed(
            2
          )
        : ""
    );
    const rpmSinceNoon = computed(() =>
      revolutionCount.value && hoursSinceNoon.value
        ? +(
            (Number(revolutionCount.value) - revolution_count.value) /
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
            (speedAverage.value + speedSinceNoon.value) /
            (hoursTotal.value / 24)
          ).toFixed(2)
        : ""
    );
    const rpmAvg = computed(() =>
      rpmSinceNoon.value !== "" && hoursTotal.value
        ? +(
            (rpmAverage.value + rpmSinceNoon.value) /
            (hoursTotal.value / 24)
          ).toFixed(1)
        : ""
    );
    const slipAvg = computed(() =>
      slipSinceNoon.value !== "" && hoursTotal.value
        ? +(
            (slipAverage.value + slipSinceNoon.value) /
            (hoursTotal.value / 24)
          ).toFixed(2)
        : ""
    );

    // Pilot Station -- Arrival
    const shouldPilotArrDataBeSent = computed(
      () =>
        pilotArrName.value ||
        pilotArrDateTime.value ||
        pilotArrDraftFwd.value ||
        pilotArrDraftMid.value ||
        pilotArrDraftAft.value
    );
    const pilotArrName = ref("");
    const pilotArrDateTime = ref("");
    const pilotArrDateTimeUTC = computed(() =>
      reportingTimeZone.value !== "default" && pilotArrDateTime.value
        ? convertLTToUTC(
            new Date(pilotArrDateTime.value),
            reportingTimeZone.value
          )
        : ""
    );
    const pilotArrDraftFwd = ref("");
    const pilotArrDraftMid = ref("");
    const pilotArrDraftAft = ref("");
    const pilotArrLatDir = ref("default");
    const pilotArrLatDegree = ref("");
    const pilotArrLatMinute = ref("");
    const pilotArrLongDir = ref("default");
    const pilotArrLongDegree = ref("");
    const pilotArrLongMinute = ref("");

    // Consumption and condition
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
          rtn[fuelOil] = +sumObjectValues(fuelOilBreakdowns[fuelOil]).toFixed(
            2
          );
        }
      }
      return rtn;
    });
    const fuelOilRobs = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        console.log(fuel_oil_robs.value);
        rtn[fuelOil] = +(
          fuel_oil_robs.value[fuelOil] -
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
        if (lubricatingOils.value.includes(lubricatingOil)) {
          rtn[lubricatingOil] = +(
            lubeOilRobs.value[lubricatingOil] -
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
      () => freshwater_rob.value + freshwaterChange.value
    );

    // Actual performance
    const totalDistanceObs = distanceObsTotal;
    const totalSailingTime = hoursTotal;
    const displacement = ref(displacementAtDeparture.value);
    const avgSpeed = speedAvg;
    const avgRpm = rpmAvg;
    const meFoConsumption = computed(() =>
      hoursTotal.value
        ? (
            Object.values(fuelOilBreakdowns).reduce(
              (total, fuelOil) => total + fuelOil["M/E"],
              0
            ) /
            (hoursTotal.value * 24)
          ).toFixed(2)
        : ""
    );
    const fuelOilBreakdownsSum = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        rtn[fuelOil] = {};
        rtn[fuelOil][Machinery.ME] = fuelOilBreakdowns[fuelOil][Machinery.ME]
          ? +(
              temp.fuelOilPrevBreakdown.me +
              Number(fuelOilBreakdowns[fuelOil][Machinery.ME])
            ).toFixed(2)
          : temp.fuelOilPrevBreakdown.me;
        rtn[fuelOil][Machinery.GE] = fuelOilBreakdowns[fuelOil][Machinery.GE]
          ? +(
              temp.fuelOilPrevBreakdown.ge +
              Number(fuelOilBreakdowns[fuelOil][Machinery.GE])
            ).toFixed(2)
          : temp.fuelOilPrevBreakdown.ge;
        rtn[fuelOil][Machinery.IGG] = fuelOilBreakdowns[fuelOil][Machinery.IGG]
          ? +(
              temp.fuelOilPrevBreakdown.igg +
              Number(fuelOilBreakdowns[fuelOil][Machinery.IGG])
            ).toFixed(2)
          : temp.fuelOilPrevBreakdown.igg;
        rtn[fuelOil][Machinery.BLR] = fuelOilBreakdowns[fuelOil][Machinery.BLR]
          ? +(
              temp.fuelOilPrevBreakdown.blr +
              Number(fuelOilBreakdowns[fuelOil][Machinery.BLR])
            ).toFixed(2)
          : temp.fuelOilPrevBreakdown.blr;
      }
      return rtn;
    });
    const fuelOilTotalConsumptionsSum = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        if (fuelOils.value.includes(fuelOil)) {
          rtn[fuelOil] = +sumObjectValues(
            fuelOilBreakdownsSum.value[fuelOil]
          ).toFixed(2);
        }
      }
      return rtn;
    });

    return {
      // Overview
      legUuid,
      reportNo,
      legNo,
      loadingCondition,
      voyageNo,
      reportingDateTime,
      reportingDateTimeUTC,
      reportingTimeZone,
      // Departure and Arrival
      departurePortCountry,
      departurePortName,
      departureTimeZone,
      departureDateTime,
      departureDateTimeUTC,
      arrivalPortCountry,
      arrivalPortName,
      plannedOperations,
      isOtherPlannedOperationEnabled,
      otherPlannedOperation,
      // S/BY for Arrival
      latDir,
      latMinute,
      latDegree,
      longDir,
      longMinute,
      longDegree,
      // Weather
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
      // Distance & Time
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
      // Pilot Station -- Arrival
      shouldPilotArrDataBeSent,
      pilotArrName,
      pilotArrDateTime,
      pilotArrDateTimeUTC,
      pilotArrDraftAft,
      pilotArrDraftMid,
      pilotArrDraftFwd,
      pilotArrLatDir,
      pilotArrLatDegree,
      pilotArrLatMinute,
      pilotArrLongDir,
      pilotArrLongDegree,
      pilotArrLongMinute,
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
      // Actual performance
      totalDistanceObs,
      totalSailingTime,
      displacement,
      avgSpeed,
      avgRpm,
      meFoConsumption,
      fuelOilBreakdownsSum,
      fuelOilTotalConsumptionsSum,
    };
  }
);
