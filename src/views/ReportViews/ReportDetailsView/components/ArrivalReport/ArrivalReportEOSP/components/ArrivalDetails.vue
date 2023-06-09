<script setup>
import { computed } from "vue";
import {
  preventNaN,
  textInputOptions,
  format,
  parsePositionFromString,
  convertUTCToLT,
} from "@/utils/helpers.js";
import { TIMEZONES } from "@/utils/options";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const reportingTimeZone = computed(() => props.report.report_tz);
const reportingDateTime = computed(() =>
  convertUTCToLT(new Date(props.report.report_date), props.report.report_tz)
);
const position = computed(() =>
  parsePositionFromString(props.report.arrivalstandbytimeandposition.position)
);
</script>

<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        {{ $t("sbyForArrival") }}
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
          class="grow self-center p-3 text-14 focus:outline-0 bg-gray-50 text-gray-700"
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
      <span class="col-span-2 text-blue-700 p-3 text-14 self-center">{{
        $t("latitude")
      }}</span>
      <input
        disabled
        v-model="position.latDegree"
        @keypress="preventNaN($event, position.latDegree)"
        placeholder="000 (Deg)"
        class="p-3 pl-4 border-l bg-gray-50 text-14 text-gray-700 focus:outline-0 text-gray-700 disabled:bg-gray-50"
      />
      <input
        disabled
        v-model="position.latMinutes"
        @keypress="preventNaN($event, position.latMinutes)"
        placeholder="000 (Min)"
        class="p-3 pl-4 border-l bg-gray-50 text-14 text-gray-700 focus:outline-0 text-gray-700 disabled:bg-gray-50"
      />
      <select
        disabled
        v-model="position.latDir"
        class="p-3 text-14 border-l focus:outline-0 focus:outline-0 text-gray-700 disabled:bg-gray-50"
        :class="
          position.latDir === 'default' ? 'text-gray-400' : 'text-gray-700'
        "
      >
        <option selected disabled value="default">
          {{ $t("southAndNorth") }}
        </option>
        <option value="S">{{ $t("south") }}</option>
        <option value="N">{{ $t("north") }}</option>
      </select>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span class="col-span-2 text-blue-700 p-3 text-14 self-center">{{
        $t("longitude")
      }}</span>
      <input
        disabled
        v-model="position.longDegree"
        @keypress="preventNaN($event, position.longDegree)"
        placeholder="000 (Deg)"
        class="p-3 pl-4 border-l bg-gray-50 text-14 text-gray-700 focus:outline-0 text-gray-700 disabled:bg-gray-50"
      />
      <input
        disabled
        v-model="position.longMinutes"
        @keypress="preventNaN($event, position.longMinutes)"
        placeholder="000 (Min)"
        class="p-3 pl-4 border-l bg-gray-50 text-14 text-gray-700 focus:outline-0 text-gray-700 disabled:bg-gray-50"
      />
      <select
        disabled
        v-model="position.longDir"
        class="p-3 text-14 border-l focus:outline-0 text-gray-700 disabled:bg-gray-50"
      >
        <option selected disabled value="default">
          {{ $t("eastAndWest") }}
        </option>
        <option value="E">{{ $t("east") }}</option>
        <option value="W">{{ $t("west") }}</option>
      </select>
    </div>
  </div>
</template>
