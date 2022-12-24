<script setup>
import { ref, onMounted, onBeforeMount, defineProps } from "vue";
import { useReportDetailsStore } from "./stores/useReportDetailsStore";
import router from "@/router";
import { Report } from "@/constants";
import { storeToRefs } from "pinia";
import NoonReportView from "./components/NoonReport/NoonReportView.vue";

// Props
const props = defineProps({
  uuid: {
    type: String,
    required: true,
  },
});

// Store
const store = useReportDetailsStore();
const { report } = storeToRefs(store);
const { getReport } = store;

// API calls
// getReport(props.uuid);

onBeforeMount(() => {
  getReport(props.uuid);
});

// Event Handlers
const handleBack = () => {
  router.push({ name: "vessel-overview" });
};
</script>

<template>
  <div v-if="report">
    <button @click="handleBack">
      <img
        src="@/assets/icons/back_arrow.svg"
        class="fill-blue float-left"
        type="button"
      />
    </button>
    <div>{{ report.report_type }}</div>
    <div>
      <div v-if="report.report_type == Report.type.NOON">
        <NoonReportView :report="report" />
      </div>
      <div
        v-else-if="
          report.report_type == Report.type.ARR_FWE ||
          report.report_type == Report.type.ARR_SBY_EOSP
        "
      >
        ARRIVAL
      </div>
      <div
        v-else-if="
          report.report_type == Report.type.DEP_COSP_RUP ||
          report.report_type == Report.type.DEP_SBY
        "
      >
        DEPARTURE
      </div>
      <div
        v-else-if="
          report.report_type == Report.type.EVENT_COASTAL ||
          report.report_type == Report.type.EVENT_PORT
        "
      >
        EVENT
      </div>
      <div
        v-else-if="
          report.report_type == Report.type.NOON_COASTAL ||
          report.report_type == Report.type.NOON_PORT
        "
      >
        COASTAL/PORT NOON
      </div>
      <div v-else>Invalid Report Type</div>
    </div>

    <div>{{ report }}</div>
  </div>
</template>
