<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        <slot>{{ $t("sailingPlanPilotToPilot") }}</slot>
      </span>
    </div>
    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <span class="col-span-2 text-blue-700 border-b p-3 self-center">{{
        $t("distance")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 border-b border-l bg-white">
        <input
          v-model="budget_distance"
          @keypress="preventNaN($event, budget_distance)"
          placeholder="00000"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>NM</MiniUnitDisplay>
      </div>
      <span class="col-span-2 text-blue-700 p-3 self-center">{{
        $t("speed")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 border-l bg-white">
        <input
          v-model="budget_speed"
          @keypress="preventNaN($event, budget_speed)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>KNOTS</MiniUnitDisplay>
      </div>
    </div>
    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <span class="col-span-2 text-blue-700 border-b p-3 self-center">{{
        $t("meDailyFOCons")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 border-b border-l bg-white">
        <input
          v-model="me_daily"
          @keypress="preventNaN($event, me_daily)"
          placeholder="000.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>M/T</MiniUnitDisplay>
      </div>
      <span class="col-span-2 text-blue-700 p-3 self-center">{{
        $t("meRPM")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 border-l bg-white">
        <input
          v-model="me_rpm"
          @keypress="preventNaN($event, me_rpm)"
          placeholder="000.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>RPM</MiniUnitDisplay>
      </div>
    </div>
  </div>
</template>

<script setup>
import { preventNaN } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { useDepartureCOSPReportStore } from "@/stores/useDepartureCOSPReportStore";
import { storeToRefs } from "pinia";

const store = useDepartureCOSPReportStore();
const {
  budgetDistance: budget_distance,
  budgetSpeed: budget_speed,
  meDaily: me_daily,
  meRPM: me_rpm,
} = storeToRefs(store);
</script>
