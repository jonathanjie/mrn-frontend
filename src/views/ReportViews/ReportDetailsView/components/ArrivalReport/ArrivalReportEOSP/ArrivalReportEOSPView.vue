<script setup>
import { defineProps } from "vue";
import ArrivalAndDeparture from "./components/ArrivalAndDeparture.vue";
import ArrivalDetails from "./components/ArrivalDetails.vue";
import ArrivalWeather from "./components/ArrivalWeather.vue";
import ArrivalPerformance from "./components/ArrivalPerformance.vue";
import ArrivalEOSPDistanceAndTime from "./components/ArrivalEOSPDistanceAndTime.vue";
import ArrivalEOSPSummary from "./components/ArrivalEOSPSummary.vue";
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

    <!-- Departure and Arrival -->
    <ArrivalAndDeparture :report="props.report" />

    <!-- S/BY for Arrival -->
    <ArrivalDetails :report="props.report" />

    <!-- Weather (Noon to S/BY) -->
    <ArrivalWeather :report="props.report" />

    <!-- Distance & Time (Noon to S/BY) -->
    <ArrivalEOSPDistanceAndTime :report="props.report" />

    <!-- Performance -->
    <ArrivalPerformance :report="props.report" />

    <!-- Pilot Station - Arrival -->
    <ArrivalPilotStation :report="props.report" />

    <!-- Consumption & Condition (Noon - S/BY) -->
    <ArrivalConsumption :report="props.report" />

    <!-- Actual Performance at Sea / Total Consumption (Pilot to Pilot) -->
    <ArrivalEOSPSummary :report="props.report" />
  </div>
</template>
