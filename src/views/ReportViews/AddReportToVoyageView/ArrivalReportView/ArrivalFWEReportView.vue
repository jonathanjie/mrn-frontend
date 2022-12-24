<template>
  <div class="flex flex-col space-y-6 mt-6">
    <!-- Overview -->
    <ArrivalFWEOverview />

    <!-- Finish With Engine -->
    <ArrivalFinishWithEngine />

    <!-- Pilot Station - Arrival -->
    <ArrivalFWEPilotStation />

    <!-- Distance & Time (S/BY to F.W.E) -->
    <ArrivalFWEDistanceAndTime />

    <!-- Consumption & Condition (S/BY - F.W.E) -->
    <ArrivalFWEConsumption />

    <!-- ArrivalFWESummary: Actual Performance (Port to Port) & Total Consumption (Pilot to Pilot) -->
    <ArrivalFWESummary />
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

import ArrivalFWEDistanceAndTime from "@/components/Reports/ArrivalReport/ArrivalFWEDistanceAndTime.vue";
import ArrivalFWEPilotStation from "@/components/Reports/ArrivalReport/ArrivalFWEPilotStation.vue";
import ArrivalFWEConsumption from "@/components/Reports/ArrivalReport/ArrivalFWEConsumption.vue";
import ArrivalFinishWithEngine from "@/components/Reports/ArrivalReport/ArrivalFinishWithEngine.vue";
import ArrivalFWESummary from "@/components/Reports/ArrivalReport/ArrivalFWESummary.vue";
import ArrivalFWEOverview from "@/components/Reports/ArrivalReport/ArrivalFWEOverview.vue";
</script>
