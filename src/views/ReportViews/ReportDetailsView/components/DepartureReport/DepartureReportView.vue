<script setup>
import { defineProps } from "vue";
import { Report } from "@/constants";

import DepartureReportCOSP from "./DepartureReportCOSP/DepartureReportCOSP.vue";
import DepartureReportSBY from "./DepartureReportCOSP/DepartureReportCOSP.vue";
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
