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
      <div class="flex col-span-3 border-b">
        <select
          class="grow self-center p-3 text-14 focus:outline-0"
          :class="
            reporting_time_zone === 'default'
              ? 'text-gray-400'
              : 'text-gray-700'
          "
          v-model="reporting_time_zone"
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
      <div class="col-span-3 relative flex items-center bg-white">
        <DatePicker
          v-model="reporting_date_time"
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
        <MiniUnitDisplay
          class="absolute right-0 min-w-fit"
          :class="reporting_date_time ? 'mr-9' : 'mr-2'"
          >{{ reporting_date_time_utc }}</MiniUnitDisplay
        >
      </div>
    </div>
    <div></div>

    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span
        class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center"
        >{{ $t("longitude") }}</span
      >
      <input
        v-model="long_degree"
        @keypress="preventNaN($event, long_degree)"
        placeholder="000 (Degree)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
      />
      <input
        v-model="long_minutes"
        @keypress="preventNaN($event, long_minutes)"
        placeholder="000 (Minutes)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
      />
      <select
        v-model="long_dir"
        class="col-span-3 p-3 text-14 border-l focus:outline-0"
        :class="long_dir === 'default' ? 'text-gray-400' : 'text-gray-700'"
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
        v-model="lat_degree"
        @keypress="preventNaN($event, lat_degree)"
        placeholder="000 (Degree)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
      />
      <input
        v-model="lat_minute"
        @keypress="preventNaN($event, lat_minute)"
        placeholder="000 (Minutes)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
      />
      <select
        v-model="lat_dir"
        class="col-span-3 p-3 text-14 border-l focus:outline-0 focus:outline-0"
        :class="lat_dir === 'default' ? 'text-gray-400' : 'text-gray-700'"
      >
        <option selected disabled value="default">
          {{ $t("southAndNorth") }}
        </option>
        <option value="S">{{ $t("south") }}</option>
        <option value="N">{{ $t("north") }}</option>
      </select>
    </div>

    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-white text-14"
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
          <input type="radio" :id="val" :value="val" v-model="status" />
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
        class="col-span-3 bg-white flex flex-col space-y-2 p-3 text-gray-700"
      >
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="waiting"
            value="waiting"
            v-model="operations"
            @click="resetOperations"
          />
          <label for="waiting">{{ $t("waiting") }}</label>
        </div>
        <div
          v-for="(val, key) in OPERATIONS"
          :key="val"
          class="flex align-center space-x-2"
        >
          <input
            :disabled="
              !planned_operations.includes(val) ||
              operations.includes('waiting')
            "
            type="checkbox"
            :id="val"
            :value="val"
            v-model="operations"
          />
          <label
            :for="val"
            :class="
              planned_operations.includes(val)
                ? 'text-gray-700'
                : 'text-gray-400'
            "
            >{{ $t(key) }}</label
          >
        </div>
        <div
          v-if="other_planned_operation !== 'NIL'"
          class="flex align-center space-x-2"
        >
          <input
            :disabled="
              !planned_operations.includes('others') ||
              operations.includes('waiting')
            "
            type="checkbox"
            id="others"
            value="others"
            v-model="operations"
          />
          <label
            for="others"
            :class="
              planned_operations.includes('others') ? '' : 'text-gray-400'
            "
            >{{ other_planned_operation }}</label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  preventNaN,
  textInputOptions,
  format,
  formatUTC,
} from "@/utils/helpers.js";
import { useArrivalFWEReportStore } from "@/stores/useArrivalFWEReportStore";
import { storeToRefs } from "pinia";
import { TIMEZONES, OPERATIONS, PARKING_STATUS_ARR_FWE } from "@/utils/options";
import { UTCPlaceholder } from "@/constants";
import { computed } from "vue";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";

const store = useArrivalFWEReportStore();
const {
  reportingTimeZone: reporting_time_zone,
  reportingDateTime: reporting_date_time,
  reportingDateTimeUTC,
  latDir: lat_dir,
  latDegree: lat_degree,
  latMinute: lat_minute,
  longDir: long_dir,
  longMinute: long_minutes,
  longDegree: long_degree,
  plannedOperations: planned_operations,
  otherPlannedOperation: other_planned_operation,
  operations: operations,
  status: status,
} = storeToRefs(store);

const resetOperations = () => {
  if (
    operations.value !== ["waiting"] &&
    !operations.value.includes("waiting")
  ) {
    operations.value = ["waiting"];
  }
};

const reporting_date_time_utc = computed(() =>
  reportingDateTimeUTC.value
    ? formatUTC(new Date(reportingDateTimeUTC.value))
    : UTCPlaceholder
);
</script>
