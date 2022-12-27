<template>
  <div class="flex flex-col space-y-6 my-2 mb-6">
    <div class="flex text-gray-700 space-x-3 text-16">
      <span class="text-gray-500">{{ $t("arrivalPort") + ":" }}</span>
      <input
        type="radio"
        name="arrival_port"
        id="beforeArrival"
        value="0"
        v-model="arrival_port"
      />
      <label for="beforeArrival" class="mr-1">{{ $t("beforeArrival") }}</label>
      <input
        type="radio"
        name="arrival_port"
        id="afterArrival"
        value="1"
        v-model="arrival_port"
      />
      <label for="afterArrival">{{ $t("afterArrival") }}</label>
    </div>

    <!-- Overview -->
    <BunkerOverview />

    <!-- Bunkering Port -->
    <BunkeringPort />

    <!-- Received Bunker Detail -->
    <BunkerReceivedDetail @file-change="updateFiles"></BunkerReceivedDetail>

    <!-- Bunker Date and Time & Supplier -->
    <BunkerDateAndTime />

    <!-- Save and Send -->
    <div class="flex justify-end space-x-4 my-6">
      <!-- <CustomButton
        class="p-3 text-14"
        type="button"
        v-on:click="saveChanges()"
      >
        <template v-slot:content>{{ $t("saveChanges") }}</template>
      </CustomButton> -->
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
// import CustomButton from "@/components/Buttons/CustomButton.vue";
import BunkerOverview from "@/components/Reports/BunkerReport/BunkerOverview.vue";
import BunkeringPort from "@/components/Reports/BunkerReport/BunkeringPort.vue";
import BunkerReceivedDetail from "@/components/Reports/BunkerReport/BunkerReceivedDetail.vue";
import BunkerDateAndTime from "@/components/Reports/BunkerReport/BunkerDateAndTime.vue";
import { useBunkerReportStore } from "@/stores/useBunkerReportStore";
import { storeToRefs } from "pinia";

// TODO: less hacky
let files = [];
const updateFiles = (f) => {
  files = f;
  console.log("updatefiles");
};

const store = useBunkerReportStore();
const {
  // status var
  arrivalPort: arrival_port,
  // Overview
  reportNo,
  legNo,
  loadingCondition,
  voyageNo,
  reportingDateTime,
  reportingTimeZone,
  // Bunkering Port
  portCountry,
  portName,
  status,
  // Received Bunker Detail
  oil,
  density,
  sg,
  viscosity,
  flashPoint,
  sulfurContent,
  marpol1,
  marpol2,
  ship1,
  ship2,
  barge1,
  barge2,
  // Date and Time Bunker
  alongside,
  hoseConnection,
  pumpStart,
  pumpStop,
  hoseDisconnection,
  awayside,
  purchaser,
  bargeName,
  supplierName,
  address,
  telephoneNumber,
} = storeToRefs(store);
</script>