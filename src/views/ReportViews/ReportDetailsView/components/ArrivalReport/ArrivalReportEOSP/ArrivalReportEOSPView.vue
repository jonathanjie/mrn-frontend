<script setup>
import ArrivalAndDeparture from "./components/ArrivalAndDeparture.vue";
import ArrivalDetails from "./components/ArrivalDetails.vue";
import ArrivalWeather from "./components/ArrivalWeather.vue";
import ArrivalPerformance from "./components/ArrivalPerformance.vue";
import ArrivalEOSPDistanceAndTime from "./components/ArrivalEOSPDistanceAndTime.vue";
import ArrivalEOSPSummary from "./components/ArrivalEOSPSummary.vue";
import ArrivalOverview from "../components/ArrivalOverview.vue";
import ArrivalPilotStation from "../components/ArrivalPilotStation.vue";
import ReportConsumption from "../../ReportConsumption.vue";

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
    <!-- TODO: Fix hardcoded planned operation -->
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
    <ReportConsumption :report="report">
      <template v-slot:header>
        {{ $t("consumptionAndConditionNoonToSby") }}
      </template>
    </ReportConsumption>

    <!-- Actual Performance at Sea / Total Consumption (Pilot to Pilot) -->
    <ArrivalEOSPSummary :report="props.report" />
  </div>
</template>
