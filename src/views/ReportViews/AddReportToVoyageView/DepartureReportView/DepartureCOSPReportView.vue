<template>
  <div class="flex flex-col space-y-6 mt-6">
    <!-- Overview -->
    <DepartureCOSPOverview />

    <!-- Departure and Destination TODO: may need to disable some fields -->
    <DepartureAndDestinationCOSP />

    <!-- Pilot Station - Departure -->
    <DepartureCOSPPilotStation />

    <!-- Pilot Station - Arrival -->
    <DeparturePilotStationArrival />

    <!-- Distance & Time (R/UP Engine) & S/BY to R/UP (In Harbour)-->
    <DepartureDistanceAndTime />

    <!-- Budget Trans Ocean (Pilot to Pilot) -->
    <DepartureBudgetTransOcean />

    <!-- Consumption & Condition (S/BY to R/UP) -->
    <DepartureCOSPConsumption>{{
      $t("consumptionAndConditionSbyToRup")
    }}</DepartureCOSPConsumption>
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
import DepartureAndDestinationCOSP from "@/components/Reports/DepartureReport/DepartureAndDestinationCOSP.vue";
import DepartureCOSPConsumption from "@/components/Reports/DepartureReport/DepartureCOSPConsumption.vue";
import DeparturePilotStationArrival from "@/components/Reports/DepartureReport/DeparturePilotStationArrival.vue";
import DepartureCOSPPilotStation from "@/components/Reports/DepartureReport/DepartureCOSPPilotStation.vue";
import DepartureDistanceAndTime from "@/components/Reports/DepartureReport/DepartureDistanceAndTime.vue";
import DepartureBudgetTransOcean from "@/components/Reports/DepartureReport/DepartureBudgetTransOcean.vue";
import DepartureCOSPOverview from "@/components/Reports/DepartureReport/DepartureCOSPOverview.vue";
</script>
