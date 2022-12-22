<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { useReportDetailsStore } from "./store/useReportDetailsStore";
import router from "@/router";
import { defineProps } from "vue";
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
const {report:reportRef} = storeToRefs(store)
const { getReport } = store;

// API calls
getReport(props.uuid);


// onMounted(() => {
//   getReport(props.uuid);
// });
const report = reportRef.value;
console.log("Report Type: ", report.report_type);
const reportType = report.report_type;

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
  <div>
    <div v-if="reportType == Report.type.NOON">NOON</div>
    <div
      v-else-if="
        reportType == Report.type.ARR_FWE ||
        reportType == Report.type.ARR_SBY_EOSP
      "
    >
      ARRIVAL
    </div>
    <div
      v-else-if="
        reportType == Report.type.DEP_COSP_RUP ||
        reportType == Report.type.DEP_SBY
      "
    >
      DEPARTURE
    </div>
    <div
      v-else-if="
        reportType == Report.type.EVENT_COASTAL ||
        reportType == Report.type.EVENT_PORT
      "
    >
      EVENT
    </div>
    <div
      v-else-if="
        reportType == Report.type.NOON_COASTAL ||
        reportType == Report.type.NOON_PORT
      "
    >
      COASTAL/PORT NOON
    </div>
    <div v-else>Invalid Report Type</div>
  </div>

  <div>{{ report }}</div>

  <div>HELLO WORLD</div>
</div>  
</template>
