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
        {{ $t("totalHours") }}
      </div>
      <div class="flex col-span-3 p-2 pl-4 border-x border-t bg-gray-50">
        <input
          v-model="hours"
          @keypress="preventNaN($event, hours)"
          placeholder="0"
          disabled
          class="w-24 text-14 bg-gray-50 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>HRS</MiniUnitDisplay>
      </div>

      <div
        class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14"
      >
        {{ $t("distanceByObservation") }}
        <span class="text-red-500 text-16 ml-1">*</span>
      </div>
      <div class="flex col-span-3 p-2 pl-4 border-x border-t">
        <input
          v-model="distance_obs"
          @keypress="preventNaN($event, distance_obs)"
          placeholder="0"
          class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>NM</MiniUnitDisplay>
      </div>

      <div
        class="col-span-2 text-blue-700 p-3 border-l border-t lg:border-y bg-gray-50 text-14"
      >
        {{ $t("distanceByEngine") }}
      </div>
      <div
        class="flex items-center col-span-3 p-2 pl-4 border-x border-t lg:border bg-gray-50"
        :class="distanceEngineDisabled ? 'bg-gray-50' : 'bg-white'"
      >
        <input
          v-if="distanceEngineDisabled"
          v-model="distance_eng_computed"
          placeholder="0"
          disabled
          class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <input
          v-else
          v-model="distance_eng_static"
          @keypress="preventNaN($event, distance_eng_static)"
          :placeholder="distance_eng_computed || 0"
          class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
          :class="distanceEngineDisabled ? 'bg-gray-50' : 'bg-white'"
        />
        <img
          src="@/assets/icons/edit.svg"
          @click="toggleDistanceEngine"
          class="ml-auto h-4 w-4 cursor-pointer"
        />
        <MiniUnitDisplay class="ml-2">NM</MiniUnitDisplay>
      </div>

      <div
        class="col-span-2 text-blue-700 p-3 border-l border-y lg:border-t-0 bg-gray-50 text-14"
      >
        {{ $t("revolutionCounter") }}
      </div>
      <input
        v-if="distanceEngineDisabled"
        v-model="revolution_count_static"
        @keypress="preventNaN($event, revolution_count)"
        placeholder="0"
        class="col-span-3 p-3 pl-4 border-x border-y lg:border-t-0 bg-white text-14 text-gray-700 focus:outline-0"
      />
      <input
        v-else
        v-model="revolution_count_computed"
        disabled
        placeholder="0"
        class="col-span-3 p-3 pl-4 border-x border-y lg:border-t-0 bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
    </div>
  </div>
</template>

<script setup>
import { preventNaN } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { useArrivalFWEReportStore } from "@/stores/useArrivalFWEReportStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const store = useArrivalFWEReportStore();

const distanceEngineDisabled = ref(true);
const toggleDistanceEngine = () => {
  distanceEngineDisabled.value = !distanceEngineDisabled.value;
  distance_eng_static.value = "";
  revolution_count_static.value = "";
};

const {
  hours: hours,
  distanceObs: distance_obs,
  distanceEngComputed: distance_eng_computed,
  distanceEngStatic: distance_eng_static,
  revolutionCountComputed: revolution_count_computed,
  revolutionCountStatic: revolution_count_static,
} = storeToRefs(store);
</script>
