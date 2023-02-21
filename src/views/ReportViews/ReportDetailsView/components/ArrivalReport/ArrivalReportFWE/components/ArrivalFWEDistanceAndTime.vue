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

const hours = computed(() => props.report.distancetimedata.hours_since_last);
const distance_obs = computed(
  () => props.report.distancetimedata.distance_observed_since_last
);
const distance_eng = computed(
  () => props.report.distancetimedata.distance_engine_since_last
);
const revolution_count = computed(
  () => props.report.distancetimedata.revolution_count
);
</script>

<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="flex items-center col-span-2">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        <slot>{{ $t("distanceAndTimeSbyToFwe") }}</slot>
      </span>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5">
      <div
        class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14"
      >
        {{ $t("time") }}
      </div>
      <div
        class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t bg-gray-50"
      >
        <input
          disabled
          v-model="hours"
          @keypress="preventNaN($event, hours)"
          placeholder="0"
          class="w-24 text-14 bg-gray-50 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>HRS</MiniUnitDisplay>
      </div>

      <div
        class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14"
      >
        {{ $t("distanceByObservation") }}
      </div>
      <div
        class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t bg-gray-50"
      >
        <input
          disabled
          v-model="distance_obs"
          @keypress="preventNaN($event, distance_obs)"
          placeholder="0"
          class="w-24 bg-gray-50 text-14 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>NM</MiniUnitDisplay>
      </div>

      <div
        class="col-span-2 text-blue-700 p-3 border-l border-t lg:border-y bg-gray-50 text-14"
      >
        {{ $t("distanceByEngine") }}
      </div>
      <div
        class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t lg:border bg-gray-50"
      >
        <input
          disabled
          v-model="distance_eng"
          @keypress="preventNaN($event, distance_eng)"
          placeholder="0"
          class="w-24 text-14 bg-gray-50 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>NM</MiniUnitDisplay>
      </div>

      <div
        class="col-span-2 text-blue-700 p-3 border-l border-y lg:border-t-0 bg-gray-50 text-14"
      >
        {{ $t("revolutionCounter") }}
      </div>
      <input
        disabled
        v-model="revolution_count"
        @keypress="preventNaN($event, revolution_count)"
        placeholder="0"
        class="col-span-3 lg:col-span-3 p-3 pl-4 border-x border-y lg:border-t-0 bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
    </div>
  </div>
</template>
