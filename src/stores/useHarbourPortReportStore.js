import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import { convertLTToUTC, sumObjectValues } from "@/utils/helpers";
import { PARKING_STATUS_EVNT } from "@/utils/options";
import { useShipStore } from "@/stores/useShipStore";

// TODO: fetch from database
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
  lsfoPrevROB: 200,
  mgoPrevROB: 200,
  mecylPrevROB: 200,
  mesysPrevROB: 200,
  mesumpPrevROB: 200,
  gesysPrevROB: 200,
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
      curLegNo,
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
    for (const fuelOil of fuelOils.value) {
      fuelOilBreakdowns[fuelOil] = {
        "M/E": "",
        "G/E": "",
        IGG: "",
        BLR: "",
        receipt: "",
        debunkering: "",
      };
    }
    const fuelOilTotalConsumptions = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        if (fuelOils.value.includes(fuelOil)) {
          rtn[fuelOil] = +sumObjectValues(
            fuelOilBreakdowns[fuelOil],
            4
          ).toFixed(2);
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
            Number(fuelOilTotalConsumptions.value[fuelOil]) +
            Number(fuelOilBreakdowns[fuelOil].receipt) -
            Number(fuelOilBreakdowns[fuelOil].debunkering)
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
