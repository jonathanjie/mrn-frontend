<script setup>
import { computed } from "vue";
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

const reporting_time_zone = computed(() => props.report.report_tz);
const reporting_date_time = computed(() =>
  convertUTCToLT(new Date(props.report.report_date), props.report.report_tz)
);
const position = computed(() =>
  parsePositionFromString(props.report.noonreporttimeandposition.position)
);
</script>

<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        {{ $t("reportingNoon") }}
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
          class="grow self-center p-3 text-14 focus:outline-0 bg-gray-50"
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
          <option value="-12">UTC-12:00</option>
          <option value="-11">UTC-11:00</option>
          <option value="-10">UTC-10:00</option>
          <option value="-9.5">UTC-9:30</option>
          <option value="-9">UTC-9:00</option>
          <option value="-8">UTC-8:00</option>
          <option value="-7">UTC-7:00</option>
          <option value="-6">UTC-6:00</option>
          <option value="-5">UTC-5:00</option>
          <option value="-4">UTC-4:00</option>
          <option value="-3.5">UTC-3:30</option>
          <option value="-3">UTC-3:00</option>
          <option value="-2">UTC-2:00</option>
          <option value="-1">UTC-1:00</option>
          <option value="0">UTC</option>
          <option value="1">UTC+1:00</option>
          <option value="2">UTC+2:00</option>
          <option value="3">UTC+3:00</option>
          <option value="3.5">UTC+3:30</option>
          <option value="4">UTC+4:00</option>
          <option value="4.5">UTC+4:30</option>
          <option value="5">UTC+5:00</option>
          <option value="5.5">UTC+5:30</option>
          <option value="5.75">UTC+5:45</option>
          <option value="6">UTC+6:00</option>
          <option value="6.5">UTC+6:30</option>
          <option value="7">UTC+7:00</option>
          <option value="8">UTC+8:00</option>
          <option value="8.75">UTC+8:45</option>
          <option value="9">UTC+9:00</option>
          <option value="9.5">UTC+9:30</option>
          <option value="10">UTC+10:00</option>
          <option value="10.5">UTC+10:30</option>
          <option value="11">UTC+11:00</option>
          <option value="12">UTC+12:00</option>
          <option value="12.75">UTC+12:45</option>
          <option value="13">UTC+13:00</option>
          <option value="14">UTC+14:00</option>
        </select>
      </div>
      <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
        {{ $t("dateAndTime") }}
      </div>
      <DatePicker
        v-model="reporting_date_time"
        class="col-span-3"
        textInput
        :textInputOptions="textInputOptions"
        :format="format"
        :modelValue="string"
        :placeholder="$t('selectDateAndTime')"
        disabled
      >
        <template #input-icon>
          <img src="" />
        </template>
      </DatePicker>
    </div>
    <div></div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span
        class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center"
        >{{ $t("longitude") }}</span
      >
      <input
        v-model="position.longDegree"
        @keypress="preventNaN($event, position.longDegree)"
        placeholder="000 (Degree)"
        disabled
        class="col-span-3 p-3 pl-4 border-l border-b bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <input
        v-model="position.longMinutes"
        @keypress="preventNaN($event, position.longMinutes)"
        placeholder="000 (Minutes)"
        disabled
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
        v-model="position.latDegree"
        @keypress="preventNaN($event, position.latDegree)"
        placeholder="000 (Degree)"
        disabled
        class="col-span-3 p-3 pl-4 border-l border-b bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <input
        v-model="position.latMinutes"
        @keypress="preventNaN($event, position.latMinutes)"
        placeholder="000 (Minutes)"
        disabled
        class="col-span-3 p-3 pl-4 border-l border-b bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <select
        disabled
        v-model="position.latDir"
        class="col-span-3 p-3 text-14 border-l bg-gray-50 focus:outline-0 text-gray-700 bg-gray-50"
      >
        <option selected disabled value="default">
          {{ $t("southAndNorth") }}
        </option>
        <option value="S">{{ $t("south") }}</option>
        <option value="N">{{ $t("north") }}</option>
      </select>
    </div>
  </div>
</template>
