<template>
  <div class="flex flex-col space-y-6 my-6">
    <!-- Overview -->
    <ArrivalEOSPOverview />

    <!-- Departure and Arrival -->
    <ArrivalAndDeparture />

    <!-- S/BY for Arrival -->
    <ArrivalDetails />

    <!-- Weather (Noon to S/BY) -->
    <ArrivalWeather />

    <!-- Distance & Time (Noon to S/BY) -->
    <ArrivalEOSPDistanceAndTime />

    <!-- Performance -->
    <ArrivalPerformance />

    <!-- Pilot Station - Arrival -->
    <ArrivalEOSPPilotStation />

    <!-- Consumption & Condition (Noon - S/BY) -->
    <ArrivalEOSPConsumption />

    <!-- Actual Performance at Sea / Total Consumption (Pilot to Pilot) -->
    <ArrivalEOSPSummary />
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
import ArrivalAndDeparture from "@/components/Reports/ArrivalReport/ArrivalAndDeparture.vue";
import ArrivalDetails from "@/components/Reports/ArrivalReport/ArrivalDetails.vue";
import ArrivalWeather from "@/components/Reports/ArrivalReport/ArrivalWeather.vue";
import ArrivalEOSPDistanceAndTime from "@/components/Reports/ArrivalReport/ArrivalEOSPDistanceAndTime.vue";
import ArrivalPerformance from "@/components/Reports/ArrivalReport/ArrivalPerformance.vue";
import ArrivalEOSPPilotStation from "@/components/Reports/ArrivalReport/ArrivalEOSPPilotStation.vue";
import ArrivalEOSPConsumption from "@/components/Reports/ArrivalReport/ArrivalEOSPConsumption.vue";
import ArrivalEOSPSummary from "@/components/Reports/ArrivalReport/ArrivalEOSPSummary.vue";
import ArrivalEOSPOverview from "@/components/Reports/ArrivalReport/ArrivalEOSPOverview.vue";
</script>
