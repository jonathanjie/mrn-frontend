<script setup>
import { computed } from "vue";
import { preventNaN } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});
const budget_distance = computed(() => props.report.sailingplan.distance_to_go);
const budget_speed = computed(() => props.report.sailingplan.speed);
const me_daily = computed(
  () => props.report.sailingplan.me_daily_fo_consumption
);
const me_rpm = computed(() => props.report.sailingplan.me_rpm);
</script>

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
      <div class="flex col-span-3 p-2 pl-4 border-b border-l bg-gray-50">
        <input
          v-model="budget_distance"
          disabled
          @keypress="preventNaN($event, budget_distance)"
          placeholder="00000"
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>NM</MiniUnitDisplay>
      </div>
      <span class="col-span-2 text-blue-700 p-3 self-center">{{
        $t("speed")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 border-l bg-gray-50">
        <input
          v-model="budget_speed"
          disabled
          @keypress="preventNaN($event, budget_speed)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
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
      <div class="flex col-span-3 p-2 pl-4 border-b border-l bg-gray-50">
        <input
          disabled
          v-model="me_daily"
          @keypress="preventNaN($event, me_daily)"
          placeholder="000.00"
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>M/T</MiniUnitDisplay>
      </div>
      <span class="col-span-2 text-blue-700 p-3 self-center">{{
        $t("meRPM")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 border-l bg-gray-50">
        <input
          disabled
          v-model="me_rpm"
          @keypress="preventNaN($event, me_rpm)"
          placeholder="000.00"
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>RPM</MiniUnitDisplay>
      </div>
    </div>
  </div>
</template>
