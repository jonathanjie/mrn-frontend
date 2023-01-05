import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import { convertLTToUTC, sumObjectValues } from "@/utils/helpers";
import { useShipStore } from "@/stores/useShipStore";

const temp = {
  // Finish With Engine
  plannedOperations: [
    "waiting",
    "crewChange",
    "cargoOpBerth",
    "bunkeringDebunkering",
    "receivingProvisionSpareParts",
    "others",
  ],
  otherPlannedOperation: "Sign contract",
  // fetch above from most recent arrival eosp/sby

  // Distance & Time / Performance
  sbyTime: "2022-12-01T00:00:00Z",
  revolutionCountAtSby: 20000,
  propellerPitch: 2,

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
  prevDistanceByObservation: 2000,
  prevSailingTime: 200,

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
  const { arrfReportNo, curLegNo, curLoadingCondition, curVoyageNo } =
    storeToRefs(store);

  const shipStore = useShipStore();
  const { fuelOils, lubricatingOils, machinery } = storeToRefs(shipStore);

  // Overview
  const reportNo = arrfReportNo;
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
  // Finish With Engine
  const latDir = ref("default");
  const latMinute = ref("");
  const latDegree = ref("");
  const longDir = ref("default");
  const longMinute = ref("");
  const longDegree = ref("");
  const plannedOperations = ref(temp.plannedOperations);
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
    reportingDateTime.value
      ? +(
          (Date.parse(reportingDateTime.value) - Date.parse(temp.sbyTime)) /
          (1000 * 60 * 60)
        ).toFixed(0)
      : ""
  );
  const distanceObs = ref("");
  const distanceEng = computed(() =>
    revolutionCount.value
      ? +(
          (Number(revolutionCount.value) - temp.revolutionCountAtSby) *
          temp.propellerPitch
        ).toFixed(2)
      : ""
  );
  const revolutionCount = ref("");

  // Consumption & Condition (S/BY to F.W.E)
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
        rtn[fuelOil] = +sumObjectValues(fuelOilBreakdowns[fuelOil]).toFixed(2);
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

  // Actual Performance
  const totalDistanceObs = computed(
    () =>
      +(temp.prevDistanceByObservation + Number(distanceObs.value)).toFixed(2)
  );
  const totalSailingTime = computed(
    () => +(temp.prevSailingTime + Number(hours.value)).toFixed(2)
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
