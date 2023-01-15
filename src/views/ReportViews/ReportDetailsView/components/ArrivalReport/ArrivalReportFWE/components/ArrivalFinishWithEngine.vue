<script setup>
import { computed } from "vue";
// import { useArrivalFWEReportStore } from "@/stores/useArrivalFWEReportStore";
// import { storeToRefs } from "pinia";
import { TIMEZONES, OPERATIONS, PARKING_STATUS_ARR_FWE } from "@/utils/options";
// import { UTCPlaceholder } from "@/constants";
// import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import {
  preventNaN,
  textInputOptions,
  format,
  parsePositionFromString,
  convertUTCToLT,
} from "@/utils/helpers.js";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const reportingTimeZone = computed(
  () => props.report.arrivalfwetimeandposition.timezone
);
const reportingDateTime = computed(() =>
  convertUTCToLT(
    new Date(props.report.arrivalfwetimeandposition.time),
    props.report.arrivalfwetimeandposition.timezone
  )
);
const position = computed(() =>
  parsePositionFromString(props.report.arrivalfwetimeandposition.position)
);
const operations = computed(() =>
  props.report?.plannedoperations
    ? Object.keys(props.report?.plannedoperations).filter(
        (key) => props.report?.plannedoperations[key]
      )
    : []
);
console.log(operations.value);
const otherPlannedOperation = computed(
  () => props.report?.plannedoperations?.planned_operation_othersdetails
);
const status = computed(
  () => props.report?.arrivalfwetimeandposition.parking_status
);
</script>

<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        <slot>{{ $t("finishWithEngine") }}</slot>
      </span>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
      <div
        class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
      >
        {{ $t("timeZone") }}
      </div>
      <div class="flex col-span-3 border-b bg-gray-50">
        <select
          disabled
          class="grow self-center p-3 text-14 focus:outline-0 text-gray-700 bg-gray-50"
          v-model="reportingTimeZone"
        >
          <option selected disabled value="default">
            {{ $t("selectTimeZone") }}
          </option>
          <option v-for="(val, key) in TIMEZONES" :key="val" :value="val">
            {{ key }}
          </option>
        </select>
      </div>
      <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
        {{ $t("dateAndTime") }}
      </div>
      <div class="col-span-3 relative flex items-center bg-gray-50">
        <DatePicker
          disabled
          v-model="reportingDateTime"
          class="grow"
          textInput
          :textInputOptions="textInputOptions"
          :format="format"
          :modelValue="string"
          :placeholder="$t('selectDateAndTime')"
        >
          <template #input-icon>
            <img src="" />
          </template>
        </DatePicker>
        <!-- <MiniUnitDisplay
          class="absolute right-0 min-w-fit"
          :class="reporting_date_time ? 'mr-9' : 'mr-2'"
          >{{ reporting_date_time_utc }}</MiniUnitDisplay
        > -->
      </div>
    </div>
    <div></div>

    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span
        class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center"
        >{{ $t("longitude") }}</span
      >
      <input
        disabled
        v-model="position.longDegree"
        @keypress="preventNaN($event, position.longDegree)"
        placeholder="000 (Degree)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <input
        disabled
        v-model="position.longMinutes"
        @keypress="preventNaN($event, position.longMinutes)"
        placeholder="000 (Minutes)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <select
        disabled
        v-model="position.longDir"
        class="col-span-3 p-3 text-14 border-l focus:outline-0 bg-gray-50"
        :class="
          position.longDir === 'default' ? 'text-gray-400' : 'text-gray-700'
        "
      >
        <option selected disabled value="default">
          {{ $t("eastAndWest") }}
        </option>
        <option value="E">{{ $t("east") }}</option>
        <option value="W">{{ $t("west") }}</option>
      </select>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span
        class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center"
        >{{ $t("latitude") }}</span
      >
      <input
        disabled
        v-model="position.latDegree"
        @keypress="preventNaN($event, position.latDegree)"
        placeholder="000 (Degree)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <input
        disabled
        v-model="position.latMinutes"
        @keypress="preventNaN($event, position.latMinutes)"
        placeholder="000 (Minutes)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <select
        disabled
        v-model="position.latDir"
        class="col-span-3 p-3 text-14 border-l focus:outline-0 focus:outline-0 bg-gray-50 text-gray-700"
      >
        <option selected disabled value="default">
          {{ $t("southAndNorth") }}
        </option>
        <option value="S">{{ $t("south") }}</option>
        <option value="N">{{ $t("north") }}</option>
      </select>
    </div>

    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <div class="col-span-2 row-span-2 bg-gray-50 text-blue-700 p-3 border-r">
        {{ $t("status") }}
      </div>
      <div class="col-span-3 flex flex-col space-y-2 p-3 text-gray-700">
        <div
          v-for="(val, key) in PARKING_STATUS_ARR_FWE"
          :key="val"
          class="flex align-center space-x-2"
        >
          <input
            disabled
            type="radio"
            :id="val"
            :value="val"
            v-model="status"
          />
          <label :for="val">{{ $t(key) }}</label>
        </div>
      </div>
    </div>

    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <div class="col-span-2 row-span-2 text-blue-700 p-3 border-r">
        {{ $t("operationAtCurrentLocation") }}
      </div>
      <div
        class="col-span-3 bg-gray-50 flex flex-col space-y-2 p-3 text-gray-700"
      >
        <div class="flex align-center space-x-2">
          <input
            disabled
            type="checkbox"
            id="waiting"
            value="waiting"
            v-model="operations"
          />
          <label
            for="waiting"
            :class="operations.includes('waiting') ? '' : 'text-gray-400'"
            >{{ $t("waiting") }}</label
          >
        </div>
        <div
          v-for="(val, key) in OPERATIONS"
          :key="val"
          class="flex align-center space-x-2"
        >
          <input
            disabled
            type="checkbox"
            :id="val"
            :value="val"
            v-model="operations"
          />
          <label
            :for="val"
            :class="operations.includes(val) ? '' : 'text-gray-400'"
            >{{ $t(key) }}</label
          >
        </div>
        <div v-if="otherPlannedOperation" class="flex align-center space-x-2">
          <input
            disabled
            type="checkbox"
            id="others"
            value="others"
            v-model="operations"
          />
          <label
            for="others"
            :class="operations.includes('others') ? '' : 'text-gray-400'"
            >{{ otherPlannedOperation }}</label
          >
        </div>
      </div>
    </div>
  </div>
</template>
