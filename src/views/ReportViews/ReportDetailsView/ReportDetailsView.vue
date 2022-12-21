<script setup>
import { ref, onMounted } from "vue";
import { useReportDetailsStore } from "./store/useReportDetailsStore";

const store = useReportDetailsStore();
const report = ref(store.report);
const uuid = "placeholder"
const { getReport } = store;
onMounted(getReport(uuid));
</script>

<template>
  <div></div>
</template>
