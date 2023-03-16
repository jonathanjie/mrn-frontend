import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import { convertLTToUTC, sumObjectValues } from "@/utils/helpers";
import { useShipStore } from "@/stores/useShipStore";
import { useLatestReportDetailsStore } from "./useLatestReportDetailsStore";

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
    const detailsStore = useLatestReportDetailsStore();
    const {
      parkingStatus,
      fuelOilRobs: fuel_oil_robs,
      lubeOilRobs,
      freshwaterRob: freshwater_rob,
      plannedOperations,
      otherPlannedOperation,
    } = storeToRefs(detailsStore);

    // Getters
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
    const reportingDateTimeUTC = computed(() =>
      reportingTimeZone.value !== "default" && reportingDateTime.value
        ? convertLTToUTC(
            new Date(reportingDateTime.value),
            reportingTimeZone.value
          )
        : ""
    );

    // Consumption And Condition
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
          Number(fuelOilTotalConsumptions.value[fuelOil]) +
          Number(fuelOilReceipts[fuelOil]) -
          Number(fuelOilDebunkerings[fuelOil])
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
      () =>
        +(
          Number(freshwaterGenerated.value) - Number(freshwaterConsumed.value)
        ).toFixed(2)
    );
    const freshwaterRob = computed(
      () =>
        Number(freshwater_rob.value) +
        Number(freshwaterReceiving.value) -
        Number(freshwaterDischarging.value) +
        Number(freshwaterChange.value)
    );

    // State
    // status var
    const reportSubtypeIsPort = ref(true);
    const reportSubtypeIsNoon = ref(false);

    // Harbour Port Overview
    const legNo = lastLegNo;
    const loadingCondition = curLoadingCondition;
    const voyageNo = curVoyageNo;
    const reportingDateTime = ref("");
    const reportingTimeZone = ref("default");

    // Harbour Port Report
    const prevStatus = ref(parkingStatus.value || "default");
    const status = ref(parkingStatus.value || "default");
    const distanceTravelled = ref("");
    const latDir = ref("default");
    const latMinutes = ref("");
    const latDegree = ref("");
    const longDir = ref("default");
    const longMinutes = ref("");
    const longDegree = ref("");
    const operations = ref([]);

    // Consumption And Condition
    const fuelOilBreakdowns = reactive({});
    const fuelOilReceipts = reactive({});
    const fuelOilDebunkerings = reactive({});
    for (const fuelOil of fuelOils.value) {
      fuelOilBreakdowns[fuelOil] = {};
      for (const machine of machinery.value) {
        fuelOilBreakdowns[fuelOil][machine] = "";
      }
      // fuelOilBreakdowns[fuelOil][Machinery.ME] = "";
      // fuelOilBreakdowns[fuelOil][Machinery.GE] = "";
      // fuelOilBreakdowns[fuelOil][Machinery.IGG] = "";
      // fuelOilBreakdowns[fuelOil][Machinery.BLR] = "";
      fuelOilReceipts[fuelOil] = "";
      fuelOilDebunkerings[fuelOil] = "";
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
    const freshwaterReceiving = ref("");
    const freshwaterDischarging = ref("");

    // Additional Remarks
    const additionalRemarks = ref("");

    function $reset() {
      console.log("In Harbour reset is called");
      // State
      // status var
      reportSubtypeIsPort.value = true;
      reportSubtypeIsNoon.value = false;

      // Harbour Port Overview
      legNo.value = lastLegNo;
      loadingCondition.value = curLoadingCondition;
      voyageNo.value = curVoyageNo;
      reportingDateTime.value = "";
      reportingTimeZone.value = "default";

      // Harbour Port Report
      prevStatus.value = parkingStatus.value || "default";
      status.value = parkingStatus.value || "default";
      distanceTravelled.value = "";
      latDir.value = "default";
      latMinutes.value = "";
      latDegree.value = "";
      longDir.value = "default";
      longMinutes.value = "";
      longDegree.value = "";
      operations.value = [];

      // Consumption And Condition
      fuelOilBreakdowns.value = {};
      fuelOilReceipts.value = {};
      fuelOilDebunkerings.value = {};
      for (const fuelOil of fuelOils.value) {
        fuelOilBreakdowns[fuelOil] = {};
        for (const machine of machinery.value) {
          fuelOilBreakdowns[fuelOil][machine] = "";
        }
        // fuelOilBreakdowns[fuelOil][Machinery.ME] = "";
        // fuelOilBreakdowns[fuelOil][Machinery.GE] = "";
        // fuelOilBreakdowns[fuelOil][Machinery.IGG] = "";
        // fuelOilBreakdowns[fuelOil][Machinery.BLR] = "";
        fuelOilReceipts[fuelOil] = "";
        fuelOilDebunkerings[fuelOil] = "";
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
      freshwaterReceiving.value = "";
      freshwaterDischarging.value = "";

      // Additional Remarks
      additionalRemarks.value = "";
    }
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
      additionalRemarks,
      $reset,
    };
  }
);
