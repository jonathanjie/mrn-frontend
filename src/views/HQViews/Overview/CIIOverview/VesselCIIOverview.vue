<script setup>
import VesselCIIStatus from "./components/VesselCIIStatus.vue";
import VesselCIIGraph from "./components/VesselCIIGraph.vue";
import VesselCIITable from "./components/VesselCIITable.vue";
</script>
<template>
  <div class="flex flex-col py-8 px-12">
    <VesselCIIStatus />
    <VesselCIIGraph />
    <VesselCIITable />
  </div>
</template>
