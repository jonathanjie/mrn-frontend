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
          v-model="data.draft_fwd"
          @keypress="preventNaN($event, data.draft_fwd)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>FWD</MiniUnitDisplay>
      </div>
      <div class="flex col-span-3 p-2 pl-4 border-b border-l bg-white">
        <input
          v-model="data.draft_mid"
          @keypress="preventNaN($event, data.draft_mid)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>MID</MiniUnitDisplay>
      </div>
      <div class="flex col-span-3 p-2 pl-4 border-l bg-white">
        <input
          v-model="data.draft_aft"
          @keypress="preventNaN($event, data.draft_aft)"
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
          v-model="data.constant"
          @keypress="preventNaN($event, data.constant)"
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
          v-model="data.gm"
          @keypress="preventNaN($event, data.gm)"
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
          v-model="data.ballast"
          @keypress="preventNaN($event, data.ballast)"
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
          v-model="data.displacement"
          @keypress="preventNaN($event, data.displacement)"
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

const data = reactive({
  draft_fwd: "",
  draft_mid: "",
  draft_aft: "",
  constant: "",
  gm: "",
  ballast: "",
  displacement: "",
});
</script>
