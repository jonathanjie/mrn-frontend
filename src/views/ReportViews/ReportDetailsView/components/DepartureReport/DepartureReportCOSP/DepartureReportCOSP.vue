<script setup>
import DepartureAndDestinationCOSP from "./components/DepartureAndDestinationCOSP.vue";
import DepartureOverview from "../components/DepartureOverview.vue";
import DeparturePilotStation from "../components/DeparturePilotStation.vue";
import DeparturePilotStationArrival from "./components/DeparturePilotStationArrival.vue";
import DepartureDistanceAndTime from "../components/DepartureDistanceAndTime.vue";
import DepartureSailingPlan from "./components/DepartureSailingPlan.vue";
import DepartureAddRemarks from "../components/DepartureAddRemarks.vue";
import ReportConsumption from "../../ReportConsumption.vue";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="flex flex-col space-y-6 mt-6">
    <!-- Overview -->
    <DepartureOverview :report="props.report" />

    <!-- Departure and Destination TODO: may need to disable some fields -->
    <DepartureAndDestinationCOSP :report="props.report" />

    <!-- Pilot Station - Departure -->
    <DeparturePilotStation :report="props.report" />

    <!-- Pilot Station - Arrival -->
    <DeparturePilotStationArrival :report="props.report" />

    <!-- Distance & Time (R/UP Engine) & S/BY to R/UP (In Harbour)-->
    <DepartureDistanceAndTime :report="props.report" />

    <!-- Sailing Plan (Pilot to Pilot) -->
    <DepartureSailingPlan :report="props.report" />

    <!-- Consumption & Condition (S/BY to R/UP) -->
    <ReportConsumption :report="report">
      <template v-slot:header>
        {{ $t("consumptionAndConditionSbyToRup") }}
      </template>
    </ReportConsumption>

    <!-- Additional Remarks -->
    <DepartureAddRemarks :report="props.report" />
  </div>
</template>
