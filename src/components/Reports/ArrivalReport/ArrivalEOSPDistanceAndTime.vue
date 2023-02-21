<template>
  <div class="grid grid-cols-1 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        <slot>{{ $t("distanceAndTime") }}</slot>
      </span>
    </div>
    <div class="grid grid-cols-10">
      <div
        class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14"
      >
        {{ $t("time") }}
      </div>
      <div
        class="flex col-span-6 lg:col-span-3 p-2 pl-4 border-x border-t bg-gray-50"
      >
        <input
          v-model="hours_since_noon"
          @keypress="preventNaN($event, hours_since_noon)"
          placeholder="0"
          disabled
          class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>HRS</MiniUnitDisplay>
      </div>
      <div
        class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-b lg:border-b-0 border-l lg:border-l-0 border-t bg-gray-50 text-14"
      >
        {{ $t("total") }}
      </div>
      <div
        class="flex col-span-6 lg:col-span-3 p-2 pl-4 border-x border-y lg:border-b-0 bg-gray-50"
      >
        <input
          v-model="hours_total"
          @keypress="preventNaN($event, hours_total)"
          placeholder="0"
          disabled
          class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>HRS</MiniUnitDisplay>
      </div>

      <div
        class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14"
      >
        {{ $t("distanceToGo") }}
      </div>
      <div
        class="flex items-center col-span-6 lg:col-span-3 p-2 pl-4 border-x border-t"
        :class="distanceToGoDisabled ? 'bg-gray-50' : 'bg-white'"
      >
        <input
          v-if="!edited"
          v-model="distance_to_go"
          @keypress="preventNaN($event, distance_to_go)"
          placeholder="0"
          disabled
          class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <input
          v-else
          v-model="distance_to_go_edited"
          @keypress="preventNaN($event, distance_to_go_edited)"
          :placeholder="distance_to_go"
          :disabled="distanceToGoDisabled"
          class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
          :class="distanceToGoDisabled ? 'bg-gray-50' : 'bg-white'"
        />
        <img
          src="@/assets/icons/edit.svg"
          @click="toggleDistanceToGo"
          class="ml-auto h-4 w-4 cursor-pointer"
        />
        <MiniUnitDisplay class="ml-2">NM</MiniUnitDisplay>
      </div>
      <div
        class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-b lg:border-b-0 border-l lg:border-l-0 border-t bg-gray-50 text-14"
      >
        {{ $t("remarksOfChanges") }}
      </div>
      <input
        v-model="remarks"
        :placeholder="$t('inputRemarks')"
        :disabled="distanceToGoDisabled"
        class="col-span-6 lg:col-span-3 p-3 pl-4 border-x border-t text-14 text-gray-700 focus:outline-0"
        :class="distanceToGoDisabled ? 'bg-gray-50' : 'bg-white'"
      />

      <div
        class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-l border-y bg-gray-50 text-14"
      >
        {{ $t("distanceByObservation") }}
      </div>
      <div class="flex col-span-6 lg:col-span-3 p-2 pl-4 border-x border-y">
        <input
          v-model="distance_obs_since_noon"
          @keypress="preventNaN($event, distance_obs_since_noon)"
          placeholder="0"
          class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>NM</MiniUnitDisplay>
      </div>
      <div
        class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-b border-l lg:border-l-0 border-t bg-gray-50 text-14"
      >
        {{ $t("total") }}
      </div>
      <div class="flex col-span-6 lg:col-span-3 p-2 pl-4 border bg-gray-50">
        <input
          v-model="distance_obs_total"
          @keypress="preventNaN($event, distance_obs_total)"
          placeholder="0"
          disabled
          class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>NM</MiniUnitDisplay>
      </div>

      <div
        class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-l border-b bg-gray-50 text-14"
      >
        {{ $t("distanceByEngine") }}
      </div>
      <div
        class="flex items-center col-span-6 lg:col-span-3 p-2 pl-4 border-x border-b bg-gray-50"
        :class="distanceEngineDisabled ? 'bg-gray-50' : 'bg-white'"
      >
        <input
          v-if="distanceEngineDisabled"
          v-model="distance_eng_since_noon_computed"
          placeholder="0"
          disabled
          class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <input
          v-else
          v-model="distance_eng_since_noon_static"
          @keypress="preventNaN($event, distance_eng_since_noon_static)"
          :placeholder="distance_eng_since_noon_computed || 0"
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
        class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-l border-y lg:border-l-0 lg:border-t-0 bg-gray-50 text-14"
      >
        {{ $t("revolutionCounter") }}
      </div>
      <input
        v-if="distanceEngineDisabled"
        v-model="revolution_count_static"
        @keypress="preventNaN($event, revolution_count)"
        placeholder="0"
        class="col-span-6 lg:col-span-3 p-3 pl-4 border-x border-y lg:border-t-0 bg-white text-14 text-gray-700 focus:outline-0"
      />
      <input
        v-else
        v-model="revolution_count_computed"
        disabled
        placeholder="0"
        class="col-span-6 lg:col-span-3 p-3 pl-4 border-x border-y lg:border-t-0 bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { preventNaN } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { useArrivalEOSPReportStore } from "@/stores/useArrivalEOSPReportStore";
import { storeToRefs } from "pinia";

const store = useArrivalEOSPReportStore();
const distanceToGoDisabled = ref(true);
const edited = ref(false);
const distanceEngineDisabled = ref(true);

const toggleDistanceToGo = () => {
  distanceToGoDisabled.value = !distanceToGoDisabled.value;
  edited.value = true;
};

const toggleDistanceEngine = () => {
  distanceEngineDisabled.value = !distanceEngineDisabled.value;
  distance_eng_since_noon_static.value = "";
  revolution_count_static.value = "";
};

const {
  hoursSinceNoon: hours_since_noon,
  hoursCospToEosp: hours_total,
  distanceToGo: distance_to_go,
  distanceToGoEdited: distance_to_go_edited,
  remarksForChanges: remarks,
  distanceObsSinceNoon: distance_obs_since_noon,
  distanceObsCospToEosp: distance_obs_total,
  distanceEngSinceNoonComputed: distance_eng_since_noon_computed,
  distanceEngSinceNoonStatic: distance_eng_since_noon_static,
  distanceEngCospToEosp: distance_eng_total,
  revolutionCountComputed: revolution_count_computed,
  revolutionCountStatic: revolution_count_static,
} = storeToRefs(store);
</script>
