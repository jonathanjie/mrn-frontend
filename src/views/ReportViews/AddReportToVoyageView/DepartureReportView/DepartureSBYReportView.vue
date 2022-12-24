<template>
  <div class="flex flex-col space-y-6 my-6">
    <!-- Overview -->
    <DepartureSBYOverview />

    <!-- Departure and Destination -->
    <DepartureAndDestinationSBY />

    <!-- Cargo Operation -->
    <DepartureCargoOperation />

    <!-- Vessel Condition at Departure -->
    <DepartureVesselCondition />

    <!-- Pilot Station - Departure -->
    <DepartureSBYPilotStation />

    <!-- Consumption & Condition (departure ver.) -->
    <DepartureSBYConsumption />

    <!-- Consumption & Condition (Harbour/In Port in Total) -->
    <DepartureSBYTotalConsumption>{{
      $t("consumptionAndConditionHarbourInPortInTotal")
    }}</DepartureSBYTotalConsumption>
  </div>

  <!-- Save and Send -->
  <div class="flex justify-end space-x-4 my-6">
    <!-- <CustomButton
          class="p-3 text-14"
          type="button"
          v-on:click="saveChanges()"
        >
          <template v-slot:content>{{ $t("saveChanges") }}</template>
        </CustomButton> -->
    <GradientButton class="p-3 text-14" type="button" v-on:click="sendReport()">
      <!-- TODO: need alternate function for saving changes to backend -->
      <template v-slot:content>{{ $t("sendReport") }}</template>
    </GradientButton>
  </div>
</template>

<script setup>
import GradientButton from "@/components/Buttons/GradientButton.vue";
// import CustomButton from "@/components/Buttons/CustomButton.vue";

import DepartureAndDestinationSBY from "@/components/Reports/DepartureReport/DepartureAndDestinationSBY.vue";
import DepartureCargoOperation from "@/components/Reports/DepartureReport/DepartureCargoOperation.vue";
import DepartureVesselCondition from "@/components/Reports/DepartureReport/DepartureVesselCondition.vue";
import DepartureSBYTotalConsumption from "@/components/Reports/DepartureReport/DepartureSBYTotalConsumption.vue";
import DepartureSBYConsumption from "@/components/Reports/DepartureReport/DepartureSBYConsumption.vue";
import DepartureSBYPilotStation from "@/components/Reports/DepartureReport/DepartureSBYPilotStation.vue";
import DepartureSBYOverview from "@/components/Reports/DepartureReport/DepartureSBYOverview.vue";
</script>
