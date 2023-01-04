import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import { convertLTToUTC, sumObjectValues } from "@/utils/helpers";
import { IceCondition } from "@/constants";
import { useShipStore } from "@/stores/useShipStore";

const temp = {
  // Arrival and Departure
  departurePortCountry: "KR",
  departurePortName: "PUS",
  arrivalPortCountry: "SG",
  arrivalPortName: "PPT",
  departureDateTime: "2022-06-01T04:23:00Z",
  departureTimeZone: 9, // from departure sby time zone of this leg

  // Distance & Time / Performance
  lastNoonReportTime: "2022-12-01T00:00:00Z",
  rupOfDeparture: "2022-11-21T00:00:00Z",
  distanceLeft: 4000,
  distanceObsSoFar: 1000,
  distanceEngSoFar: 1000,
  revolutionCountPrevNoon: 20000,
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

  // Actual Performance
  displacement: 2000, // from departure s/by (vessel condition)

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
    const store = useVoyageStore();
    const { arrsReportNo, curLegNo, curLoadingCondition, curVoyageNo } =
      storeToRefs(store);

    const shipStore = useShipStore();
    const { fuelOils, lubricatingOils, machinery } = storeToRefs(shipStore);

    // Overview
    const reportNo = arrsReportNo;
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
        : ""
    );

    // Departure and Arrival
    const departurePortCountry = ref(temp.departurePortCountry);
    const departurePortName = ref(temp.departurePortName);
    const departureDateTime = ref(temp.departureDateTime);
    const departureTimeZone = ref(temp.departureTimeZone);
    const departureDateTimeUTC = computed(() =>
      departureTimeZone.value !== "default" && departureDateTime.value
        ? convertLTToUTC(
            new Date(departureDateTime.value),
            departureTimeZone.value
          )
        : departureDateTime.value
    );
    const arrivalPortCountry = ref(temp.arrivalPortCountry);
    const arrivalPortName = ref(temp.arrivalPortName);
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
              Date.parse(temp.lastNoonReportTime)) /
            (1000 * 60 * 60)
          ).toFixed(0)
        : ""
    );
    const hoursTotal = computed(() =>
      reportingDateTime.value
        ? +(
            (Date.parse(reportingDateTime.value) -
              Date.parse(temp.rupOfDeparture)) /
            (1000 * 60 * 60)
          ).toFixed(0)
        : ""
    );
    const distanceObsSinceNoon = ref("");
    const distanceObsTotal = computed(() =>
      distanceObsSinceNoon.value
        ? +(temp.distanceObsSoFar + Number(distanceObsSinceNoon.value)).toFixed(
            2
          )
        : ""
    );
    const distanceEngSinceNoon = computed(() =>
      revolutionCount.value
        ? +(
            (Number(revolutionCount.value) - temp.revolutionCountPrevNoon) *
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
        ? +(Number(distanceObsSinceNoon.value) / hoursSinceNoon.value).toFixed(
            2
          )
        : ""
    );
    const rpmSinceNoon = computed(() =>
      revolutionCount.value && hoursSinceNoon.value
        ? +(
            (Number(revolutionCount.value) - temp.revolutionCountPrevNoon) /
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

    // Actual performance
    const totalDistanceObs = distanceObsTotal;
    const totalSailingTime = hoursTotal;
    const displacement = ref(temp.displacement);
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
        rtn[fuelOil] = {
          "M/E": +(
            temp.fuelOilPrevBreakdown.me +
            Number(fuelOilBreakdowns[fuelOil]["M/E"])
          ).toFixed(2),
          "G/E": +(
            temp.fuelOilPrevBreakdown.ge +
            Number(fuelOilBreakdowns[fuelOil]["G/E"])
          ).toFixed(2),
          IGG: +(
            temp.fuelOilPrevBreakdown.igg +
            Number(fuelOilBreakdowns[fuelOil]["IGG"])
          ).toFixed(2),
          BLR: +(
            temp.fuelOilPrevBreakdown.blr +
            Number(fuelOilBreakdowns[fuelOil]["BLR"])
          ).toFixed(2),
        };
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
