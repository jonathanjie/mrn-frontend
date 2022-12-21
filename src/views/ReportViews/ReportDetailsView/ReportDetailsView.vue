<script setup>
import { ref, onMounted } from "vue";
import { useReportDetailsStore } from "./store/useReportDetailsStore";

import { defineProps } from "vue";

// props
const props = defineProps({
  uuid: {
    type: String,
    required: true,
  },
});

console.log(props.uuid);
// store
const store = useReportDetailsStore();
const { getReport } = store;
// onMounted(getReport(props.uuid));
getReport(props.uuid);
const report = ref(store.report).value;
console.log("Report: ", report.report_num);
</script>

<template>
  <div>{{ report }}</div>
  <div>HELLO WORLD</div>
</template>
