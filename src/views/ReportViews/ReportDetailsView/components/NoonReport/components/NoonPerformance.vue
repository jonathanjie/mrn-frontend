<script setup>
// import { reactive } from "vue";
import { preventNaN } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { computed } from "vue";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const speedSinceNoon = computed(
  () => props.report.performancedata.speed_since_last
);
const rpmSinceNoon = computed(
  () => props.report.performancedata.rpm_since_last
);
const slipSinceNoon = computed(
  () => props.report.performancedata.slip_since_last
);
const speedAverage = computed(() => props.report.performancedata.speed_average);
const rpmAverage = computed(() => props.report.performancedata.rpm_average);
const slipAverage = computed(() => props.report.performancedata.slip_average);

// const store = useNoonReportStore();
// const {
//   speedSinceNoon: speed_since_noon,
//   rpmSinceNoon: rpm_since_noon,
//   slipSinceNoon: slip_since_noon,
//   speedAvg: speed_avg,
//   rpmAvg: rpm_avg,
//   slipAvg: slip_avg,
// } = storeToRefs(store);
</script>

<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        <slot>{{ $t("performance") }}</slot>
      </span>
    </div>
    <div class="col-span-2 lg:col-span-1 text-14">
      <div class="pb-2">{{ $t("noonToNoon") }}</div>
      <div class="grid grid-cols-5 border bg-gray-50">
        <div class="col-span-2 text-blue-700 p-3 border-r border-b">
          {{ $t("speed") }}
        </div>
        <div class="flex col-span-3 p-2 pl-4 border-b bg-gray-50">
          <input
            disabled
            v-model="speedSinceNoon"
            @keypress="preventNaN($event, speedSinceNoon)"
            placeholder="0"
            class="w-16 text-gray-700 focus:outline-0 bg-gray-50"
          />
          <MiniUnitDisplay>KNOTS</MiniUnitDisplay>
        </div>
        <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50">
          {{ $t("rpm") }}
        </div>
        <input
          disabled
          v-model="rpmSinceNoon"
          @keypress="preventNaN($event, rpmSinceNoon)"
          placeholder="0"
          class="col-span-3 p-3 pl-4 border-b text-gray-700 focus:outline-0 bg-gray-50"
        />
        <div class="col-span-2 text-blue-700 p-3 border-r">
          {{ $t("slip") }}
        </div>
        <div class="flex col-span-3 p-2 pl-4 bg-gray-50">
          <input
            disabled
            v-model="slipSinceNoon"
            @keypress="preventNaN($event, slipSinceNoon)"
            placeholder="0"
            class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
          />
          <MiniUnitDisplay>%</MiniUnitDisplay>
        </div>
      </div>
    </div>
    <div class="col-span-2 lg:col-span-1 text-14">
      <div class="pb-2">{{ $t("COSPtoEOSP") }}</div>
      <div class="grid grid-cols-5 border bg-gray-50">
        <div class="col-span-2 text-blue-700 p-3 border-r border-b">
          {{ $t("averageSpeed") }}
        </div>
        <div class="flex col-span-3 p-2 pl-4 border-b bg-gray-50">
          <input
            disabled
            v-model="speedAverage"
            @keypress="preventNaN($event, speedAverage)"
            placeholder="0"
            class="w-16 text-gray-700 focus:outline-0 bg-gray-50"
          />
          <MiniUnitDisplay>KNOTS</MiniUnitDisplay>
        </div>
        <div class="col-span-2 text-blue-700 p-3 border-r border-b">
          {{ $t("averageRPM") }}
        </div>
        <input
          disabled
          v-model="rpmAverage"
          @keypress="preventNaN($event, rpmAverage)"
          placeholder="0"
          class="col-span-3 p-3 pl-4 border-b text-gray-700 focus:outline-0 bg-gray-50"
        />
        <div class="col-span-2 text-blue-700 p-3 border-r">
          {{ $t("slip") }}
        </div>
        <div class="flex col-span-3 p-2 pl-4 bg-gray-50">
          <input
            disabled
            v-model="slipAverage"
            @keypress="preventNaN($event, slipAverage)"
            placeholder="0"
            class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
          />
          <MiniUnitDisplay>%</MiniUnitDisplay>
        </div>
      </div>
    </div>
  </div>
</template>
