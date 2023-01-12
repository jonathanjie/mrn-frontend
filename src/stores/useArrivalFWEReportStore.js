import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import { convertLTToUTC, sumObjectValues } from "@/utils/helpers";
import { useShipStore } from "@/stores/useShipStore";
import { Machinery } from "@/constants";
import { useLatestReportDetailsStore } from "./useLatestReportDetailsStore";

const temp = {
  otherPlannedOperation: "Sign contract",

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

export const useArrivalFWEReportStore = defineStore("arrivalFWEReport", () => {
  const store = useVoyageStore();
  const { arrfReportNo, lastLegNo, legUuid, curLoadingCondition, curVoyageNo } =
    storeToRefs(store);

  const shipStore = useShipStore();
  const { fuelOils, lubricatingOils, machinery } = storeToRefs(shipStore);

  const detailsStore = useLatestReportDetailsStore();
  const {
    plannedOperations: planned_operations,
    departureDate,
    lastReportDate,
    distanceObservedTotal,
    distanceEngineTotal,
    distanceToGo: distance_to_go,
    revolutionCount: revolution_count,
    propellerPitch,
    fuelOilRobs: fuel_oil_robs,
    lubeOilRobs,
    freshwaterRob: freshwater_rob,
  } = storeToRefs(detailsStore);

  // Overview
  const reportNo = arrfReportNo;
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
  // Finish With Engine
  const latDir = ref("default");
  const latMinute = ref("");
  const latDegree = ref("");
  const longDir = ref("default");
  const longMinute = ref("");
  const longDegree = ref("");
  const plannedOperations = ref(planned_operations.value);
  const otherPlannedOperation = ref(temp.otherPlannedOperation);
  const operations = ref([]);
  const status = ref("");

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

  // Distance & Time (S/BY to F.W.E)
  const hours = computed(() =>
    reportingDateTimeUTC.value
      ? +(
          (Date.parse(reportingDateTimeUTC.value) -
            Date.parse(lastReportDate.value)) /
          (1000 * 60 * 60)
        ).toFixed(0)
      : ""
  );
  const distanceObs = ref("");
  const distanceEng = computed(() =>
    revolutionCount.value
      ? +(
          ((Number(revolutionCount.value) - Number(revolution_count.value)) *
            Number(propellerPitch.value)) /
          1852
        ).toFixed(0)
      : ""
  );
  const distanceObsTotal = computed(() =>
    distanceObs.value
      ? +(
          Number(distanceObservedTotal.value) + Number(distanceObs.value)
        ).toFixed(2)
      : ""
  );
  const distanceEngTotal = computed(() =>
    distanceEng.value
      ? +(
          Number(distanceEng.value) + Number(distanceEngineTotal.value)
        ).toFixed(0)
      : ""
  );
  const revolutionCount = ref("");
  const hoursSinceLast = computed(() =>
    reportingDateTimeUTC.value && reportingTimeZone.value !== "default"
      ? +(
          (Date.parse(reportingDateTimeUTC.value) -
            Date.parse(lastReportDate.value)) /
          (1000 * 60 * 60)
        ).toFixed(0)
      : ""
  );
  const hoursTotal = computed(() =>
    hoursSinceLast.value
      ? +(
          (Date.parse(reportingDateTimeUTC.value) -
            Date.parse(departureDate.value)) /
          36e5
        ).toFixed(0)
      : ""
  );
  const distanceToGo = computed(
    () =>
      +(
        Number(distance_to_go.value) - (Number(distanceObs.value) || 0)
      ).toFixed(2)
  );

  // Consumption & Condition (S/BY to F.W.E)
  const fuelOilBreakdowns = reactive({});
  for (const fuelOil of fuelOils.value) {
    fuelOilBreakdowns[fuelOil] = {};
    fuelOilBreakdowns[fuelOil][Machinery.ME] = "";
    fuelOilBreakdowns[fuelOil][Machinery.GE] = "";
    fuelOilBreakdowns[fuelOil][Machinery.IGG] = "";
    fuelOilBreakdowns[fuelOil][Machinery.BLR] = "";
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
      rtn[lubricatingOil] = +(
        lubeOilRobs.value[lubricatingOil] -
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

  // Actual Performance
  const totalDistanceObs = computed(() =>
    distanceObs.value
      ? +(
          Number(distanceObservedTotal.value) + Number(distanceObs.value)
        ).toFixed(2)
      : ""
  );
  const totalSailingTime = computed(() =>
    reportingDateTimeUTC.value
      ? +(
          (Date.parse(reportingDateTimeUTC.value) -
            Date.parse(departureDate.value)) /
          (1000 * 60 * 60)
        ).toFixed(0)
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
      rtn[fuelOil] = +sumObjectValues(
        fuelOilBreakdownsSum.value[fuelOil]
      ).toFixed(2);
    }
    return rtn;
  });

  return {
    // Overview
    reportNo,
    legUuid,
    legNo,
    loadingCondition,
    voyageNo,
    reportingDateTime,
    reportingTimeZone,
    reportingDateTimeUTC,
    // Finish With Engine
    latDir,
    latMinute,
    latDegree,
    longDir,
    longMinute,
    longDegree,
    plannedOperations,
    otherPlannedOperation,
    operations,
    status,
    // Pilot Station -- Arrival
    shouldPilotArrDataBeSent,
    pilotArrName,
    pilotArrDateTime,
    pilotArrDateTimeUTC,
    pilotArrDraftFwd,
    pilotArrDraftMid,
    pilotArrDraftAft,
    pilotArrLatDir,
    pilotArrLatDegree,
    pilotArrLatMinute,
    pilotArrLongDir,
    pilotArrLongDegree,
    pilotArrLongMinute,
    // Distance & Time (S/BY to F.W.E)
    hours,
    distanceObs,
    distanceEng,
    revolutionCount,
    distanceObsTotal,
    distanceEngTotal,
    hoursTotal,
    distanceToGo,
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
    fuelOilBreakdownsSum,
    fuelOilTotalConsumptionsSum,
  };
});
