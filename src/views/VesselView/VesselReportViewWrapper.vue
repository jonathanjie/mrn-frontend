<script setup>
import VesselReportView from "./VesselReportView.vue";

const props = defineProps({
  imo: { type: String, require: true },
});
</script>

<template>
  <div>
    <Suspense>
      <VesselReportView :imo="props.imo" />
    </Suspense>
  </div>
</template>
