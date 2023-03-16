import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import { convertLTToUTC, sumObjectValues } from "@/utils/helpers";
import { useShipStore } from "@/stores/useShipStore";
import { useLatestReportDetailsStore } from "./useLatestReportDetailsStore";

export const useArrivalFWEReportStore = defineStore("arrivalFWEReport", () => {
  const store = useVoyageStore();
  const { arrfReportNo, lastLegNo, legUuid, curLoadingCondition, curVoyageNo } =
    storeToRefs(store);

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
    plannedOperations,
    otherPlannedOperation,
    distanceObservedTotal,
    distanceEngineTotal,
    revolutionCount: revolution_count,
    propellerPitch,
    fuelOilRobs: fuel_oil_robs,
    lubeOilRobs,
    freshwaterRob: freshwater_rob,
    fuelOilConsPortToPort,
  } = storeToRefs(detailsStore);

  // Getters
  // Overview
  const reportNo = computed(() =>
    arrfReportNo.value ? arrfReportNo.value : 0
  );
  const legNo = computed(() => (lastLegNo.value ? lastLegNo.value : 0));
  const loadingCondition = computed(() =>
    curLoadingCondition.value ? curLoadingCondition.value : "N.A"
  );
  const voyageNo = computed(() => (curVoyageNo.value ? curVoyageNo.value : 0));
  const reportingDateTimeUTC = computed(() =>
    reportingTimeZone.value !== "default" && reportingDateTime.value
      ? convertLTToUTC(
          new Date(reportingDateTime.value),
          reportingTimeZone.value
        )
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
  const pilotArrDateTimeUTC = computed(() =>
    reportingTimeZone.value !== "default" && pilotArrDateTime.value
      ? convertLTToUTC(
          new Date(pilotArrDateTime.value),
          reportingTimeZone.value
        )
      : ""
  );

  // Distance & Time (S/BY to F.W.E)
  const hours = computed(() =>
    reportingDateTimeUTC.value
      ? +(
          (Date.parse(reportingDateTimeUTC.value) -
            Date.parse(lastReportDate.value)) /
          36e5
        ).toFixed(0)
      : ""
  );
  const distanceEng = computed(() =>
    distanceEngStatic.value
      ? distanceEngStatic.value
      : distanceEngComputed.value
  );
  const distanceEngComputed = computed(() =>
    revolutionCountStatic.value
      ? +(
          ((Number(revolutionCountStatic.value) -
            Number(revolution_count.value)) *
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
  const revolutionCount = computed(() =>
    revolutionCountStatic.value
      ? revolutionCountStatic.value
      : revolutionCountComputed.value
  );
  const revolutionCountComputed = computed(() =>
    distanceEngStatic.value
      ? +(
          (1852 * Number(distanceEngStatic.value)) /
            Number(propellerPitch.value) +
          Number(revolution_count.value)
        ).toFixed(0)
      : ""
  );
  const hoursSinceLast = computed(() =>
    reportingDateTimeUTC.value && reportingTimeZone.value !== "default"
      ? +(
          (Date.parse(reportingDateTimeUTC.value) -
            Date.parse(lastReportDate.value)) /
          36e5
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

  // Consumption & Condition (S/BY to F.W.E)
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
          36e5
        ).toFixed(0)
      : ""
  );
  const fuelOilBreakdownsSum = computed(() => {
    let rtn = {};
    for (const fuelOil of fuelOils.value) {
      rtn[fuelOil] = {};
      if (Object.keys(fuelOilConsPortToPort.value).length !== 0) {
        for (const machine of machinery.value) {
          rtn[fuelOil][machine] = fuelOilBreakdowns[fuelOil][machine]
            ? +(
                Number(fuelOilConsPortToPort.value[fuelOil][machine]) +
                Number(fuelOilBreakdowns[fuelOil][machine])
              ).toFixed(2)
            : +Number(fuelOilConsPortToPort.value[fuelOil][machine]).toFixed(2);
        }
      } else {
        for (const machine of machinery.value) {
          rtn[fuelOil][machine] = +Number(
            fuelOilBreakdowns[fuelOil][machine]
          ).toFixed(2);
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
  const departureDateTime = ref(departureDate);
  const departureTimeZone = ref(departureTz);
  const reportingDateTime = ref("");
  const reportingTimeZone = ref("default");

  // Finish With Engine
  const latDir = ref("default");
  const latMinute = ref("");
  const latDegree = ref("");
  const longDir = ref("default");
  const longMinute = ref("");
  const longDegree = ref("");
  const operations = ref([]);
  const status = ref("");

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

  // Distance & Time (S/BY to F.W.E)
  const distanceObs = ref("");
  const distanceEngStatic = ref("");
  const revolutionCountStatic = ref("");

  // Consumption & Condition (S/BY to F.W.E)
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

  // Additional Remarks
  const additionalRemarks = ref("");

  function $reset() {
    console.log("Arr EOSP Store reset");
    // Overview
    departureDateTime.value = departureDate;
    departureTimeZone.value = departureTz;
    reportingDateTime.value = "";
    reportingTimeZone.value = "default";

    // Finish With Engine
    latDir.value = "default";
    latMinute.value = "";
    latDegree.value = "";
    longDir.value = "default";
    longMinute.value = "";
    longDegree.value = "";
    operations.value = [];
    status.value = "";

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

    // Distance & Time (S/BY to F.W.E)
    distanceObs.value = "";
    distanceEngStatic.value = "";
    revolutionCountStatic.value = "";

    // Consumption & Condition (S/BY to F.W.E)
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

    // Additional Remarks
    additionalRemarks.value = "";
  }
  return {
    departurePortCountry,
    departurePortName,
    departureDateTime,
    departureTimeZone,
    arrivalPortCountry,
    arrivalPortName,
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
    distanceEngComputed,
    distanceEngStatic,
    revolutionCount,
    revolutionCountComputed,
    revolutionCountStatic,
    distanceObsTotal,
    distanceEngTotal,
    hoursTotal,
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
    // Additional remarks
    additionalRemarks,
    $reset,
  };
});
