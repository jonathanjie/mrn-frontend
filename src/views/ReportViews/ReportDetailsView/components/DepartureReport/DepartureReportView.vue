<script setup>
import { Report } from "@/constants";
import DepartureReportSBY from "./DepartureReportSBY/DepartureReportSBY.vue";
import DepartureReportCOSP from "./DepartureReportCOSP/DepartureReportCOSP.vue";
const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <div v-if="props.report.report_type == Report.type.DEP_SBY">
      <DepartureReportSBY :report="props.report" />
    </div>
    <div v-else-if="props.report.report_type == Report.type.DEP_COSP_RUP">
      <DepartureReportCOSP :report="props.report" />
    </div>
    <div v-else>
      <div>Invalid Report Type</div>
    </div>
  </div>
</template>
