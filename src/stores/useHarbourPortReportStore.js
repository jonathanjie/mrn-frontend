import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import { convertLTToUTC, sumObjectValues } from "@/utils/helpers";
import { PARKING_STATUS_EVNT } from "@/utils/options";
import { useShipStore } from "@/stores/useShipStore";
import { Machinery } from "@/constants";

const temp = {
  // Finish With Engine
  plannedOperations: [
    "waiting",
    "crewChange",
    "cargoOpBerth",
    "bunkeringDebunkering",
    "receivingProvisionSpareParts",
  ],
  otherPlannedOperation: "",
  // fetch above from most recent arrival eosp/sby

  // Harbour Port Report
  prevStatus: PARKING_STATUS_EVNT.anchoringStartOutside, // only applies if there was a previous event report

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
};

export const useHarbourPortReportStore = defineStore(
  "harbourPortReport",
  () => {
    const store = useVoyageStore();
    const {
      evntcReportNo,
      evntpReportNo,
      noonpReportNo,
      nooncReportNo,
      lastLegNo,
      legUuid,
      curLoadingCondition,
      curVoyageNo,
    } = storeToRefs(store);

    const shipStore = useShipStore();
    const { fuelOils, lubricatingOils, machinery } = storeToRefs(shipStore);

    // status var
    const reportSubtypeIsPort = ref(true);
    const reportSubtypeIsNoon = ref(false);

    // Harbour Port Overview
    const reportNo = computed(() =>
      reportSubtypeIsPort.value && reportSubtypeIsNoon.value
        ? noonpReportNo
        : reportSubtypeIsPort.value && !reportSubtypeIsNoon.value
        ? evntpReportNo
        : !reportSubtypeIsPort.value && reportSubtypeIsNoon.value
        ? nooncReportNo
        : !reportSubtypeIsPort.value && !reportSubtypeIsNoon.value
        ? evntcReportNo
        : ""
    );
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

    // Harbour Port Report
    const prevStatus = ref(temp.prevStatus);
    const status = ref(temp.prevStatus);
    const distanceTravelled = ref("");
    const latDir = ref("default");
    const latMinutes = ref("");
    const latDegree = ref("");
    const longDir = ref("default");
    const longMinutes = ref("");
    const longDegree = ref("");
    const plannedOperations = ref(temp.plannedOperations);
    const otherPlannedOperation = ref(temp.otherPlannedOperation);
    const operations = ref([]);

    // Consumption And Condition
    const fuelOilBreakdowns = reactive({});
    const fuelOilReceipts = reactive({});
    const fuelOilDebunkerings = reactive({});

    for (const fuelOil of fuelOils.value) {
      fuelOilBreakdowns[fuelOil] = {};
      fuelOilBreakdowns[fuelOil][Machinery.ME] = "";
      fuelOilBreakdowns[fuelOil][Machinery.GE] = "";
      fuelOilBreakdowns[fuelOil][Machinery.IGG] = "";
      fuelOilBreakdowns[fuelOil][Machinery.BLR] = "";
      fuelOilReceipts[fuelOil] = "";
      fuelOilDebunkerings[fuelOil] = "";
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
          temp.prevRobs[fuelOil] -
          Number(fuelOilTotalConsumptions.value[fuelOil]) +
          Number(fuelOilReceipts[fuelOil]) -
          Number(fuelOilDebunkerings[fuelOil])
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
          temp.prevRobs[lubricatingOil] -
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
    const freshwaterReceiving = ref("");
    const freshwaterDischarging = ref("");
    const freshwaterChange = computed(
      () => +(freshwaterGenerated.value - freshwaterConsumed.value).toFixed(2)
    );
    const freshwaterRob = computed(
      () =>
        temp.freshwaterPrevROB +
        Number(freshwaterReceiving.value) -
        Number(freshwaterDischarging.value) +
        freshwaterChange.value
    );

    return {
      // status var
      reportSubtypeIsPort, // HarbourPortReportOverview.vue
      reportSubtypeIsNoon, // HarbourPortReport.vue
      // Harbour Port Overview
      reportNo,
      legUuid,
      noonpReportNo,
      nooncReportNo,
      evntpReportNo,
      evntcReportNo,
      legNo,
      loadingCondition,
      voyageNo,
      reportingDateTime,
      reportingTimeZone,
      reportingDateTimeUTC,
      // Harbour Port Report
      prevStatus,
      status,
      distanceTravelled,
      latDir,
      latMinutes,
      latDegree,
      longDir,
      longMinutes,
      longDegree,
      plannedOperations,
      otherPlannedOperation,
      operations,
      // Consumption And Condition
      fuelOils,
      lubricatingOils,
      machinery,
      fuelOilRobs,
      fuelOilBreakdowns,
      fuelOilReceipts,
      fuelOilDebunkerings,
      fuelOilTotalConsumptions,
      fuelOilDataCorrection,
      lubricatingOilBreakdowns,
      lubricatingOilRobs,
      lubricatingOilDataCorrection,
      freshwaterConsumed,
      freshwaterGenerated,
      freshwaterReceiving,
      freshwaterDischarging,
      freshwaterChange,
      freshwaterRob,
    };
  }
);
