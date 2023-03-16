import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import { convertLTToUTC, sumObjectValues } from "@/utils/helpers";
import { IceCondition, Machinery } from "@/constants";
import { useShipStore } from "@/stores/useShipStore";
import { useLatestReportDetailsStore } from "./useLatestReportDetailsStore";

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
      departurePortCountry,
      departurePortName,
      departureTz,
      departureDate,
      arrivalPortCountry,
      arrivalPortName,
      lastReportDate,
      lastReportTz,
      distanceToGo: distance_to_go,
      distanceObservedTotal,
      distanceEngineTotal,
      revolutionCount: revolution_count,
      propellerPitch,
      displacementAtDeparture,
      fuelOilRobs: fuel_oil_robs,
      lubeOilRobs,
      freshwaterRob: freshwater_rob,
      fuelOilConsPilotToPilot,
      timeSbyToCosp,
      distanceObsSbyToCosp,
      revolutionCountSbyToCosp,
      timeStoppedAtSea,
      distanceEngSbyToCosp,
    } = storeToRefs(detailsStore);

    // Getters
    // Overview
    const reportNo = computed(() => (arrsReportNo ? arrsReportNo : 0));
    const legNo = computed(() => (lastLegNo ? lastLegNo : 0));
    const loadingCondition = computed(() =>
      curLoadingCondition ? curLoadingCondition : 0
    );
    const voyageNo = computed(() => (curVoyageNo ? curVoyageNo : 0));
    const reportingDateTimeUTC = computed(() =>
      reportingTimeZone.value !== "default" && reportingDateTime.value
        ? convertLTToUTC(
            new Date(reportingDateTime.value),
            reportingTimeZone.value
          )
        : ""
    );

    // Departure and Arrival
    const departureDateTimeUTC = computed(() =>
      departureTimeZone.value !== "default" && departureDateTime.value
        ? convertLTToUTC(
            new Date(departureDateTime.value),
            departureTimeZone.value
          )
        : departureDateTime.value
    );
    const isOtherPlannedOperationEnabled = computed(() =>
      plannedOperations.value.includes("others")
    );

    // Distance & Time
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
            Number(distanceEngSinceNoon.value) +
            Number(distanceEngineTotal.value)
          ).toFixed(0)
        : ""
    );
    const distanceToGo = computed(
      () =>
        +(
          Number(distance_to_go.value) -
          (Number(distanceObsSinceNoon.value) || 0)
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
            Number(distanceObsSinceNoon.value) / Number(hoursSinceNoon.value)
          ).toFixed(2)
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
            ((Number(hoursCospToEosp.value) - Number(timeStoppedAtSea.value)) *
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

    // Pilot Station -- Arrival
    const pilotArrDateTimeUTC = computed(() =>
      reportingTimeZone.value !== "default" && pilotArrDateTime.value
        ? convertLTToUTC(
            new Date(pilotArrDateTime.value),
            reportingTimeZone.value
          )
        : ""
    );
    const shouldPilotArrDataBeSent = computed(
      () =>
        pilotArrName.value ||
        pilotArrDateTime.value ||
        pilotArrDraftFwd.value ||
        pilotArrDraftMid.value ||
        pilotArrDraftAft.value
    );

    // Consumption and condition
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

    // Actual performance
    const totalDistanceObs = distanceObsCospToEosp;
    const totalSailingTime = hoursCospToEosp;
    const displacement = displacementAtDeparture;
    const avgSpeed = speedAvg;
    const avgRpm = rpmAvg;
    const meFoConsumption = computed(() =>
      hoursCospToEosp.value
        ? (
            Object.values(fuelOilBreakdownsSum.value).reduce(
              (total, fuelOil) => total + fuelOil[Machinery.ME],
              0
            ) /
            (Number(hoursCospToEosp.value) / 24)
          ).toFixed(2)
        : ""
    );
    const fuelOilBreakdownsSum = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        rtn[fuelOil] = {};
        if (Object.keys(fuelOilConsPilotToPilot.value).length !== 0) {
          for (const machine of machinery.value) {
            rtn[fuelOil][machine] = fuelOilBreakdowns[fuelOil][machine]
              ? +(
                  Number(fuelOilConsPilotToPilot.value[fuelOil][machine]) +
                  Number(fuelOilBreakdowns[fuelOil][machine])
                ).toFixed(2)
              : Number(fuelOilConsPilotToPilot.value[fuelOil][machine]);
          }
        } else {
          for (const machine of machinery.value) {
            rtn[fuelOil][machine] = Number(fuelOilBreakdowns[fuelOil][machine]);
          }
        }
      }
      return rtn;
    });
    const fuelOilTotalConsumptionsSum = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        rtn[fuelOil] = +sumObjectValues(
          fuelOilBreakdownsSum.value[fuelOil]
        ).toFixed(2);
      }
      return rtn;
    });

    // State
    // Overview
    const reportingDateTime = ref(new Date(lastReportDate.value));
    const reportingTimeZone = ref("default");

    // Departure and Arrival

    const departureDateTime = ref(departureDate);
    const departureTimeZone = ref(departureTz);

    const plannedOperations = ref([]);
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
    const distanceObsSinceNoon = ref("");
    const distanceEngSinceNoonStatic = ref("");
    const distanceToGoEdited = ref(""); // use distanceToGoEdited instead of distanceToGo if distanceToGoEdited.value != distanceToGo.value
    const remarksForChanges = ref("");
    const revolutionCountStatic = ref("");

    // Pilot Station -- Arrival
    const pilotArrName = ref("");
    const pilotArrDateTime = ref("");
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

    const additionalRemarks = ref("");

    function $reset() {
      console.log("Arr EOSP store is reset");
      // Overview
      reportingDateTime.value = new Date(lastReportDate.value);
      reportingTimeZone.value = "default";

      // Departure and Arrival
      departureDateTime.value = departureDate.value;
      departureTimeZone.value = departureTz.value;
      plannedOperations.value = [];
      otherPlannedOperation.value = "";

      // S/BY for Arrival
      latDir.value = "default";
      latMinute.value = "";
      latDegree.value = "";
      longDir.value = "default";
      longMinute.value = "";
      longDegree.value = "";

      // Weather (Noon to S/BY)
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

      // Distance & Time
      distanceObsSinceNoon.value = "";
      distanceEngSinceNoonStatic.value = "";
      distanceToGoEdited.value = ""; // use distanceToGoEdited instead of distanceToGo if distanceToGoEdited.value != distanceToGo.value
      remarksForChanges.value = "";
      revolutionCountStatic.value = "";

      // Pilot Station -- Arrival
      pilotArrName.value = "";
      pilotArrDateTime.value = "";
      pilotArrDraftFwd.value = "";
      pilotArrDraftMid.value = "";
      pilotArrDraftAft.value = "";
      pilotArrLatDir.value = "default";
      pilotArrLatDegree.value = "";
      pilotArrLatMinute.value = "";
      pilotArrLongDir.value = "default";
      pilotArrLongDegree.value = "";
      pilotArrLongMinute.value = "";

      // Consumption and condition
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

      // Additional
      additionalRemarks.value = "";
    }
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
      hoursCospToEosp,
      hoursSbyToFwe,
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
      // Additional Remarks
      additionalRemarks,
      $reset,
    };
  }
);
