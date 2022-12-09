<template>
  <div class="flex flex-col space-y-6 my-2 mb-6">
    <div class="flex text-gray-700 space-x-3 text-16">
      <span class="text-gray-500">{{ $t("arrivalPort") + ":" }}</span>
      <input
        type="radio"
        name="arrival_port"
        id="beforeArrival"
        value="0"
        v-model="data.arrival_port"
      />
      <label for="beforeArrival" class="mr-1">{{ $t("beforeArrival") }}</label>
      <input
        type="radio"
        name="arrival_port"
        id="afterArrival"
        value="1"
        v-model="data.arrival_port"
      />
      <label for="afterArrival">{{ $t("afterArrival") }}</label>
    </div>

    <!-- Overview -->
    <Overview></Overview>

    <!-- Bunkering Port -->
    <BunkeringPort></BunkeringPort>

    <!-- Received Bunker Detail -->
    <ReceivedBunkerDetail></ReceivedBunkerDetail>

    <!-- Bunker Date and Time & Supplier -->
    <DateAndTimeBunker></DateAndTimeBunker>

    <!-- Save and Send -->
    <div class="flex justify-end space-x-4 my-6">
      <CustomButton
        class="p-3 text-14"
        type="button"
        v-on:click="saveChanges()"
      >
        <!-- TODO: need alternate function for saving changes to backend -->
        <template v-slot:content>{{ $t("saveChanges") }}</template>
      </CustomButton>
      <GradientButton
        class="p-3 text-14"
        type="button"
        v-on:click="sendReport()"
      >
        <!-- TODO: need alternate function for saving changes to backend -->
        <template v-slot:content>{{ $t("sendReport") }}</template>
      </GradientButton>
    </div>
  </div>
</template>

<script setup>
import GradientButton from "@/components/Buttons/GradientButton.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";

import Overview from "@/components/ReportComponents/Overview.vue";
import BunkeringPort from "@/components/ReportComponents/BunkeringPort.vue";
import ReceivedBunkerDetail from "@/components/ReportComponents/ReceivedBunkerDetail.vue";
import DateAndTimeBunker from "@/components/ReportComponents/DateAndTimeBunker.vue";

const data = {
  arrival_port: "",
};
</script>
