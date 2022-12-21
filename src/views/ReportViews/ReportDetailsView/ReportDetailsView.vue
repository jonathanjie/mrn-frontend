<script setup>
import { ref, onMounted } from "vue";
import { useReportDetailsStore } from "./store/useReportDetailsStore";
import router from "@/router";
import { defineProps } from "vue";

// Props
const props = defineProps({
  uuid: {
    type: String,
    required: true,
  },
});

// Store
const store = useReportDetailsStore();
const { getReport } = store;

// API calls
getReport(props.uuid);
const report = ref(store.report).value;
console.log("Report: ", report.report_num);
const reportType = report.report_type;

// Event Handlers
const handleBack = () => {
  router.push({ name: "vessel-overview" });
};
</script>

<template>
  <button @click="handleBack">
    <img
      src="@/assets/icons/back_arrow.svg"
      class="fill-blue float-left"
      type="button"
    />
  </button>
  <div>
    <div v-if="true">Noon Report</div>
    <div v-if="false">Report 2</div>
    <div v-if="false">Report 3</div>
    <div v-if="false">Report 4</div>
  </div>

  <div>{{ report }}</div>

  <div>HELLO WORLD</div>
</template>
