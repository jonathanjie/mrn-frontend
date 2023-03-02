<script setup>
import VesselCIIStatus from "./components/VesselCIIStatus/VesselCIIStatus.vue";
import VesselCIIGraph from "./components/VesselCIIGraph.vue";
import VesselCIITable from "./components/VesselCIITable.vue";
</script>
<template>
  <div class="flex flex-col py-8 px-12 divide-y divide-dashed">
    <VesselCIIStatus />
    <div class="flex flex-col pt-8">
      <VesselCIIGraph />
      <VesselCIITable />
    </div>
  </div>
</template>
