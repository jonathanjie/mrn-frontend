<script setup>
import { defineProps, computed } from "vue";
import BunkerOverview from "./components/BunkerOverview.vue";
import BunkeringPort from "./components/BunkeringPort.vue";
import BunkerReceivedDetail from "./components/BunkerReceivedDetail.vue";
import BunkerDateAndTime from "./components/BunkerDateAndTime.vue";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const isBeforeArrival = computed(() => props.report.bdndata.is_before_arrival);

// const store = useBunkerReportStore();
// const {
//   // status var
//   arrivalPort: arrival_port,
// } = storeToRefs(store);
</script>

<template>
  <div class="flex flex-col space-y-6 my-2 mb-6">
    <div class="flex text-gray-700 space-x-3 text-16">
      <span class="text-gray-500">{{ $t("arrivalPort") + ":" }}</span>
      <input
        disabled
        type="radio"
        name="arrival_port"
        id="beforeArrival"
        value="0"
        :checked="isBeforeArrival"
      />
      <label for="beforeArrival" class="mr-1">{{ $t("beforeArrival") }}</label>
      <input
        disabled
        type="radio"
        name="arrival_port"
        id="afterArrival"
        value="1"
        :checked="!isBeforeArrival"
      />
      <label for="afterArrival">{{ $t("afterArrival") }}</label>
    </div>

    <!-- Overview -->
    <BunkerOverview :report="props.report" />

    <!-- Bunkering Port -->
    <BunkeringPort :report="props.report" />

    <!-- Received Bunker Detail -->
    <BunkerReceivedDetail :report="props.report"></BunkerReceivedDetail>

    <!-- Bunker Date and Time & Supplier -->
    <BunkerDateAndTime :report="props.report" />
  </div>
</template>
