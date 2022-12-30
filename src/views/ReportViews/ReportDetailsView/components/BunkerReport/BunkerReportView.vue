<script setup>
import { defineProps } from "vue";
import BunkerOverview from "./components/BunkerOverview.vue";
import BunkeringPort from "./components/BunkeringPort.vue";
import BunkerReceivedDetail from "./components/BunkerReceivedDetail.vue";
import BunkerDateAndTime from "./components/BunkerDateAndTime.vue";
import { useBunkerReportStore } from "@/stores/useBunkerReportStore";
import { storeToRefs } from "pinia";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const store = useBunkerReportStore();
const {
  // status var
  arrivalPort: arrival_port,
} = storeToRefs(store);
</script>

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
    <BunkerOverview :report="props.report" />

    <!-- Bunkering Port -->
    <BunkeringPort :report="props.report" />

    <!-- Received Bunker Detail -->
    <BunkerReceivedDetail
      :report="props.report"
    ></BunkerReceivedDetail>

    <!-- Bunker Date and Time & Supplier -->
    <BunkerDateAndTime :report="props.report" />
  </div>
</template>
