<!-- TODO: Make this file as a common wrapper component for all components that needs async api calls -->
<script setup>
import ReportDetailsView from "./ReportDetailsView.vue";

const props = defineProps({
  uuid: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <Suspense>
    <ReportDetailsView :uuid="props.uuid" />
  </Suspense>
</template>
