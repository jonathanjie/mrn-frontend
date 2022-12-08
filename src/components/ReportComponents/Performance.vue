<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        <slot>{{ $t("performance") }}</slot>
      </span>
    </div>
    <div class="col-span-2 lg:col-span-1">
      <div class="pb-2 text-14">{{ $t("noonToNoon") }}</div>
      <div class="grid grid-cols-5 border">
        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("speed") }}
        </div>
        <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
          <input
            v-model="speed_since_noon"
            @keypress="preventNaN($event, speed_since_noon)"
            placeholder="0"
            class="w-16 text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>KNOTS</MiniUnitDisplay>
        </div>
        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("rpm") }}
        </div>
        <input
          v-model="rpm_since_noon"
          @keypress="preventNaN($event, rpm_since_noon)"
          placeholder="0"
          class="col-span-3 p-3 pl-4 border-b bg-white text-14 text-gray-700 focus:outline-0"
        />
        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("slip") }}
        </div>
        <div class="flex col-span-3 p-2 pl-4 bg-white">
          <input
            v-model="slip_since_noon"
            @keypress="preventNaN($event, slip_since_noon)"
            placeholder="0"
            class="w-24 text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>%</MiniUnitDisplay>
        </div>
      </div>
    </div>
    <div class="col-span-2 lg:col-span-1">
      <div class="pb-2 text-14">{{ $t("currentVoyage") }}</div>
      <div class="grid grid-cols-5 border">
        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("averageSpeed") }}
        </div>
        <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
          <input
            v-model="speed_avg"
            @keypress="preventNaN($event, speed_avg)"
            placeholder="0"
            class="w-16 text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>KNOTS</MiniUnitDisplay>
        </div>
        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("averageRPM") }}
        </div>
        <input
          v-model="rpm_avg"
          @keypress="preventNaN($event, rpm_avg)"
          placeholder="0"
          class="col-span-3 p-3 pl-4 border-b bg-white text-14 text-gray-700 focus:outline-0"
        />
        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("slip") }}
        </div>
        <div class="flex col-span-3 p-2 pl-4 bg-white">
          <input
            v-model="slip_avg"
            @keypress="preventNaN($event, slip_avg)"
            placeholder="0"
            class="w-24 text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>%</MiniUnitDisplay>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { reactive } from "vue";
import { preventNaN } from "../../utils/helpers.js";
import MiniUnitDisplay from "../../components/MiniUnitDisplay.vue";
import { useNoonReportStore } from "@/store/useNoonReportStore";
import { storeToRefs } from "pinia";
const store = useNoonReportStore();

const {
  speedSinceNoon: speed_since_noon,
  rpmSinceNoon: rpm_since_noon,
  slipSinceNoon: slip_since_noon,
  speedAvg: speed_avg,
  rpmAvg: rpm_avg,
  slipAvg: slip_avg,
} = storeToRefs(store);

// const data = reactive({
//   speed_since_noon: "",
//   rpm_since_noon: "",
//   slip_since_noon: "",
//   speed_avg: "",
//   rpm_avg: "",
//   slip_avg: "",
// });
</script>
