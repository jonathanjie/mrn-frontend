<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        <slot>{{ $t("vesselCondition") }}</slot>
      </span>
    </div>
    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <span class="col-span-2 row-span-3 text-blue-700 p-3 self-center">{{
        $t("draft")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 border-b border-l bg-white">
        <input
          v-model="draft_fwd"
          @keypress="preventNaN($event, draft_fwd)"
          placeholder="00.00"
          class="text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>FWD</MiniUnitDisplay>
      </div>
      <div class="flex col-span-3 p-2 pl-4 border-b border-l bg-white">
        <input
          v-model="draft_mid"
          @keypress="preventNaN($event, draft_mid)"
          placeholder="00.00"
          class="text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>MID</MiniUnitDisplay>
      </div>
      <div class="flex col-span-3 p-2 pl-4 border-l bg-white">
        <input
          v-model="draft_aft"
          @keypress="preventNaN($event, draft_aft)"
          placeholder="00.00"
          class="text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>AFT</MiniUnitDisplay>
      </div>
    </div>
  </div>
</template>

<script setup>
import { preventNaN } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { useArrivalFWEReportStore } from "@/stores/useArrivalFWEReportStore";
import { storeToRefs } from "pinia";

const store = useArrivalFWEReportStore();
const {
  draftFwd: draft_fwd,
  draftMid: draft_mid,
  draftAft: draft_aft,
} = storeToRefs(store);
</script>
