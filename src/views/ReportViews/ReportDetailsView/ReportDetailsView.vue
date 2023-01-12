<script setup>
import { useReportDetailsStore } from "./stores/useReportDetailsStore";
import router from "@/router";
import { Report } from "@/constants";
import NoonReportView from "./components/NoonReport/NoonReportView.vue";
import DepartureReportView from "./components/DepartureReport/DepartureReportView.vue";
import ArrivalReportView from "./components/ArrivalReport/ArrivalReportView.vue";
import HarbourPortReportView from "./components/HarbourPortReport/HarbourPortReportView.vue";
import BunkerReportView from "./components/BunkerReport/BunkerReportView.vue";

// Props
const props = defineProps({
  uuid: {
    type: String,
    required: true,
  },
});

// Store
const store = useReportDetailsStore();
const { getReportQuery } = store;

// API calls
// getReport(props.uuid);

// onBeforeMount(() => {
//   getReport(props.uuid);
// });

const { isSuccess, isFetching, data: report } = getReportQuery(props.uuid);
// Event Handlers
const handleBack = () => {
  router.push({ name: "vessel-reports" });
};
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div v-if="isFetching">Loading...</div>
    <div v-else-if="isSuccess" class="flex flex-col px-24 pt-11">
      <button @click="handleBack">
        <img
          src="@/assets/icons/back_arrow.svg"
          class="fill-blue float-left"
          type="button"
        />
      </button>
      <div>REPORT TYPE: {{ report.report_type }}</div>
      <div>
        <div v-if="report.report_type == Report.type.NOON">
          <NoonReportView :report="report" />
        </div>
        <div
          v-else-if="
            report.report_type == Report.type.DEP_COSP_RUP ||
            report.report_type == Report.type.DEP_SBY
          "
        >
          <DepartureReportView :report="report" />
        </div>
        <div
          v-else-if="
            report.report_type == Report.type.ARR_FWE ||
            report.report_type == Report.type.ARR_SBY_EOSP
          "
        >
          <ArrivalReportView :report="report" />
        </div>
        <div
          v-else-if="
            report.report_type == Report.type.EVENT_HARBOUR ||
            report.report_type == Report.type.EVENT_PORT ||
            report.report_type == Report.type.NOON_HARBOUR ||
            report.report_type == Report.type.NOON_PORT
          "
        >
          <HarbourPortReportView :report="report" />
        </div>
        <div v-else-if="report.report_type == Report.type.BUNKER">
          <BunkerReportView :report="report" />
        </div>
        <div v-else><div>Invalid Report Type</div></div>
      </div>
      <!-- Uncomment For Debugging -->
      <div>{{ report }}</div>
    </div>
    <div v-else></div>
  </div>
</template>
