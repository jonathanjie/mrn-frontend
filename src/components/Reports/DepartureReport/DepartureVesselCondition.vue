<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        <slot>{{ $t("vesselConditionAtDeparture") }}</slot>
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
          v-model="draftFwd"
          @keypress="preventNaN($event, draftFwd)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>FWD</MiniUnitDisplay>
      </div>
      <div class="flex col-span-3 p-2 pl-4 border-b border-l bg-white">
        <input
          v-model="draftMid"
          @keypress="preventNaN($event, draftMid)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>MID</MiniUnitDisplay>
      </div>
      <div class="flex col-span-3 p-2 pl-4 border-l bg-white">
        <input
          v-model="draftAft"
          @keypress="preventNaN($event, draftAft)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>AFT</MiniUnitDisplay>
      </div>
    </div>
    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <span class="col-span-2 text-blue-700 border-b p-3 self-center">{{
        $t("constant")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 border-b border-l bg-white">
        <input
          v-model="constant"
          @keypress="preventNaN($event, constant)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>M/T</MiniUnitDisplay>
      </div>
      <span class="col-span-2 text-blue-700 border-b p-3 self-center">{{
        $t("gm")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 border-b border-l bg-white">
        <input
          v-model="gm"
          @keypress="preventNaN($event, gm)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>M</MiniUnitDisplay>
      </div>
      <span class="col-span-2 text-blue-700 border-b p-3 self-center">{{
        $t("ballast")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 border-b border-l bg-white">
        <input
          v-model="ballast"
          @keypress="preventNaN($event, ballast)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>M/T</MiniUnitDisplay>
      </div>
      <span class="col-span-2 text-blue-700 p-3 self-center">{{
        $t("displacement")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 border-l bg-white">
        <input
          v-model="displacement"
          @keypress="preventNaN($event, displacement)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>M/T</MiniUnitDisplay>
      </div>
    </div>
  </div>
</template>

<script setup>
import { preventNaN } from "@/utils/helpers.js";
import { reactive } from "vue";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { useDepartureSBYReportStore } from "@/stores/useDepartureSBYReportStore";
import { storeToRefs } from "pinia";

const store = useDepartureSBYReportStore;

const { draftFwd, draftMid, draftAft, constant, gm, ballast, displacement } =
  storeToRefs(store);

// const data = reactive({
//   draft_fwd: "",
//   draft_mid: "",
//   draft_aft: "",
//   constant: "",
//   gm: "",
//   ballast: "",
//   displacement: "",
// });
</script>
