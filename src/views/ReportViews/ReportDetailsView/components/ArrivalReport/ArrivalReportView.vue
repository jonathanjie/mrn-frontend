<script setup>
import { Report } from "@/constants";
import ArrivalReportFWEView from "./ArrivalReportFWE/ArrivalReportFWEView.vue";
import ArrivalReportEOSPView from "./ArrivalReportEOSP/ArrivalReportEOSPView.vue";
const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <div v-if="props.report.report_type == Report.type.ARR_FWE">
      <ArrivalReportFWEView :report="props.report" />
    </div>
    <div v-else-if="props.report.report_type == Report.type.ARR_SBY_EOSP">
      <ArrivalReportEOSPView :report="props.report" />
    </div>
    <div v-else>
      <div>Invalid Report Type</div>
    </div>
  </div>
</template>
