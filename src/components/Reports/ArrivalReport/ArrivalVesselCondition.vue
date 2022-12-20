<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        <slot>{{ $t("vesselCondition") }}</slot>
      </span>
    </div>
    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-10 border-t bg-gray-50 text-14"
    >
      <div
        class="col-span-4 row-span-3 text-blue-700 border-x p-3 py-16 my-auto self-center"
      >
        {{ $t("draft") }}
      </div>
      <div class="col-span-1 text-blue-700 p-3 border-b my-auto self-center">
        {{ $t("fwd") }}
      </div>
      <div class="flex col-span-5 p-2 pl-4 border-b border-x bg-white">
        <input
          v-model="draft_fwd"
          @keypress="preventNaN($event, draft_fwd)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>M</MiniUnitDisplay>
      </div>
      <div class="col-span-1 text-blue-700 p-3 border-b my-auto self-center">
        {{ $t("mid") }}
      </div>
      <div class="flex col-span-5 p-2 pl-4 border-b border-x bg-white">
        <input
          v-model="draft_mid"
          @keypress="preventNaN($event, draft_mid)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>M</MiniUnitDisplay>
      </div>
      <div class="col-span-1 text-blue-700 p-3 my-auto self-center">
        {{ $t("aft") }}
      </div>
      <div class="flex col-span-5 p-2 pl-4 border-x bg-white">
        <input
          v-model="draft_aft"
          @keypress="preventNaN($event, draft_aft)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>M</MiniUnitDisplay>
      </div>
      <input
        disabled
        class="bg-white col-span-10 row-span-1 h-0 lg:block lg:p-3 border-t border-x-0"
      />
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
