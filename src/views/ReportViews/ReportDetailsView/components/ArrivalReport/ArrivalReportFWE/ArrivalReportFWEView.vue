<!-- eslint-disable vue/no-parsing-error -->
<script setup>
import { defineProps } from "vue";
import ArrivalFWEDistanceAndTime from "./components/ArrivalFWEDistanceAndTime.vue";
import ArrivalFinishWithEngine from "./components/ArrivalFinishWithEngine.vue";
import ArrivalFWESummary from "./components/ArrivalFWESummary.vue";
import ArrivalConsumption from "../components/ArrivalConsumption.vue";
import ArrivalOverview from "../components/ArrivalOverview.vue";
import ArrivalPilotStation from "../components/ArrivalPilotStation.vue";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col space-y-6 my-6">
    <!-- Overview -->
    <ArrivalOverview :report="props.report" />

    <!-- Finish With Engine -->
    <ArrivalFinishWithEngine :report="props.report" />

    <!-- Pilot Station - Arrival -->
    <ArrivalPilotStation :report="props.report" />

    <!-- Distance & Time (S/BY to F.W.E) -->
    <ArrivalFWEDistanceAndTime :report="props.report" />

    <!-- Consumption & Condition (S/BY - F.W.E) -->
    <ArrivalConsumption :report="props.report" />

    <!-- ArrivalFWESummary: Actual Performance (Port to Port) & Total Consumption (Pilot to Pilot) -->
    <ArrivalFWESummary :report="props.report" />
  </div>
</template>
