<script setup>
import { ref, computed } from "vue";
import { preventNaN } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { useNoonReportStore } from "@/stores/useNoonReportStore";
import { storeToRefs } from "pinia";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const hoursSinceNoon = computed(
  () => props.report.distanceperformancedata.hours_since_noon
);
const hoursTotal = computed(
  () => props.report.distanceperformancedata.hours_total
);
const distanceToGo = computed(
  () => props.report.distanceperformancedata.distance_to_go
);
const remarks = computed(
  () => props.report.distanceperformancedata.remarks_for_changes
);
const distanceObservedSinceNoon = computed(
  () => props.report.distanceperformancedata.distance_observed_since_noon
);
const distanceObservedTotal = computed(
  () => props.report.distanceperformancedata.distance_observed_total
);
const distanceEngineSinceNoon = computed(
  () => props.report.distanceperformancedata.distance_engine_since_noon
);
const distanceEngineTotal = computed(
  () => props.report.distanceperformancedata.distance_engine_total
);
const revolutionCount = computed(
  () => props.report.distanceperformancedata.revolution_count
);

const distanceToGoDisabled = ref(true);
const edited = ref(false);
// const store = useNoonReportStore();

// const toggle = () => {
//   distanceToGoDisabled.value = !distanceToGoDisabled.value;
//   edited.value = true;
// };

// const {
//   hoursSinceNoon: hours_since_noon,
//   hoursTotal: hours_total,
//   distanceToGo: distance_to_go,
//   distanceToGoEdited: distance_to_go_edited,
//   remarksForChanges: remarks,
//   distanceObsSinceNoon: distance_obs_since_noon,
//   distanceObsTotal: distance_obs_total,
//   distanceEngSinceNoon: distance_eng_since_noon,
//   distanceEngTotal: distance_eng_total,
//   revolutionCount: revolution_count,
// } = storeToRefs(store);

// const data = reactive({
//   // TODO: total distance in voyage - distance by observation? or engine?
//   hours_since_noon: "", // Distance & Time: time
//   hours_total: "", // Distance & Time: time total
//   distance_obs_since_noon: "", // Distance & Time: distance by observation
//   distance_obs_total: "", // distance observation total field missing from BE
//   distance_eng_since_noon: "", // Distance & Time: distance by engine
//   distance_eng_total: "", // Distance & Time: distance by engine total
//   revolution_count: "", // only for noon report
// });
</script>

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
          disabled
          v-model="hoursSinceNoon"
          @keypress="preventNaN($event, hoursSinceNoon)"
          placeholder="0"
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
          disabled
          v-model="hoursTotal"
          @keypress="preventNaN($event, hoursTotal)"
          placeholder="0"
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
          disabled
          v-model="distanceToGo"
          @keypress="preventNaN($event, distanceToGo)"
          placeholder="0"
          class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <!-- <input
          v-else
          v-model="distance_to_go_edited"
          @keypress="preventNaN($event, distance_to_go_edited)"
          :placeholder="distance_to_go"
          :disabled="distanceToGoDisabled"
          class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
          :class="distanceToGoDisabled ? 'bg-gray-50' : 'bg-white'"
        /> -->
        <!-- <img
          src="@/assets/icons/edit.svg"
          @click="toggle"
          class="ml-auto h-4 w-4 cursor-pointer"
        /> -->
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
        class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14"
      >
        {{ $t("distanceByObservation") }}
      </div>
      <div class="flex col-span-6 lg:col-span-3 p-2 pl-4 border-x border-t">
        <input
          disabled
          v-model="distanceObservedSinceNoon"
          @keypress="preventNaN($event, distanceObservedSinceNoon)"
          placeholder="0"
          class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>NM</MiniUnitDisplay>
      </div>
      <div
        class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-b lg:border-b-0 border-l lg:border-l-0 border-t bg-gray-50 text-14"
      >
        {{ $t("total") }}
      </div>
      <div
        class="flex col-span-6 lg:col-span-3 p-2 pl-4 border lg:border-b-0 bg-gray-50"
      >
        <input
          disabled
          v-model="distanceObservedTotal"
          @keypress="preventNaN($event, distanceObservedTotal)"
          placeholder="0"
          class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>NM</MiniUnitDisplay>
      </div>

      <div
        class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-l border-t lg:border-y bg-gray-50 text-14"
      >
        {{ $t("distanceByEngine") }}
      </div>
      <div
        class="flex col-span-6 lg:col-span-3 p-2 pl-4 border-x border-t lg:border bg-gray-50"
      >
        <input
          disabled
          v-model="distanceEngineSinceNoon"
          @keypress="preventNaN($event, distanceEngineSinceNoon)"
          placeholder="0"
          class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>NM</MiniUnitDisplay>
      </div>
      <div
        class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-y border-l lg:border-l-0 bg-gray-50 text-14"
      >
        {{ $t("total") }}
      </div>
      <div class="flex col-span-6 lg:col-span-3 p-2 pl-4 border bg-gray-50">
        <input
          disabled
          v-model="distanceEngineTotal"
          @keypress="preventNaN($event, distanceEngineTotal)"
          placeholder="0"
          class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>NM</MiniUnitDisplay>
      </div>
      <div
        class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-l border-y lg:border-t-0 bg-gray-50 text-14"
      >
        {{ $t("revolutionCounter") }}
      </div>
      <input
        disabled
        v-model="revolutionCount"
        @keypress="preventNaN($event, revolutionCount)"
        placeholder="0"
        class="col-span-6 lg:col-span-3 p-3 pl-4 border-x border-y lg:border-t-0 bg-white text-14 text-gray-700 focus:outline-0"
      />
    </div>
  </div>
</template>