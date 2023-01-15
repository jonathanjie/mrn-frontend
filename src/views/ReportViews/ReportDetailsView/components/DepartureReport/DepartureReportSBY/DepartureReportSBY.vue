<script setup>
import { computed } from "vue";
import DepartureAndDestinationSBY from "./components/DepartureAndDestinationSBY.vue";
import DepartureSBYTotalConsumption from "./components/DepartureSBYTotalConsumption.vue";
import DepartureSBYPilotStation from "../components/DeparturePilotStation.vue";
import DepartureSBYOverview from "../components/DepartureOverview.vue";
import DepartureCargoOperation from "../components/DepartureCargoOperation.vue";
import DepartureVesselCondition from "../components/DepartureVesselCondition.vue";
import ReportConsumption from "../../ReportConsumption.vue";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const isFirstReport = computed(
  () => props.report.report_num == 1 && props.report.voyage_leg.leg_num == 1
);
</script>

<template>
  <div class="flex flex-col space-y-6 my-6">
    <!-- Overview -->
    <DepartureSBYOverview :report="props.report" />

    <!-- Departure and Destination -->
    <DepartureAndDestinationSBY :report="props.report" />

    <!-- Cargo Operation -->
    <DepartureCargoOperation :report="props.report" />

    <!-- Vessel Condition at Departure -->
    <DepartureVesselCondition :report="props.report" />

    <!-- Pilot Station - Departure -->
    <DepartureSBYPilotStation :report="props.report" />

    <!-- Consumption & Condition (departure ver.) -->
    <ReportConsumption :report="report">
      <template v-slot:header>
        {{ $t("consumptionAndConditionLastReportToSby") }}
      </template>
    </ReportConsumption>

    <!-- Consumption & Condition (Harbour/In Port in Total) -->
    <!-- <DepartureSBYTotalConsumption
      v-if="!isFirstReport"
      :report="props.report"
    /> -->

    <!-- <DepartureSBYTotalConsumption :report="props.report">{{
      $t("consumptionAndConditionHarbourInPortInTotal")
    }}</DepartureSBYTotalConsumption> -->
  </div>
</template>
