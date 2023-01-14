<script setup>
import { computed } from "vue";
import { textInputOptions, format, convertUTCToLT } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const noonReportNum = computed(() => props.report.report_num);
const voyageNum = computed(() => props.report.voyage_leg.voyage.voyage_num);
const voyageLeg = computed(() => props.report.voyage_leg.leg_num);
const cur_loading_condition = computed(
  () => props.report.voyage_leg.load_condition
);
const reportingDateTime = computed(() =>
  convertUTCToLT(new Date(props.report.report_date), props.report.report_tz)
);
const reportingTimeZone = computed(() => props.report.report_tz);
const route_departure_port_country = computed(
  () => props.report.reportroute.departure_port.split(" ")[0]
);
const route_departure_port_name = computed(
  () => props.report.reportroute.departure_port.split(" ")[1]
);
const route_departure_date = computed(
  () => props.report.reportroute.departure_date
);
const route_departure_time_zone = computed(
  () => props.report.reportroute.departure_tz
);
const route_arrival_port_country = computed(
  () => props.report.reportroute.arrival_port.split(" ")[0]
);
const route_arrival_port_name = computed(
  () => props.report.reportroute.arrival_port.split(" ")[1]
);
const route_arrival_date = computed(
  () => props.report.reportroute.arrival_date
);
const route_arrival_time_zone = computed(
  () => props.report.reportroute.arrival_tz
);
</script>

<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">{{ $t("overview") }}</span>
    </div>
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <div class="col-span-2 text-blue-700 p-3 border-r border-b">
        {{ $t("reportNo") }}
      </div>
      <div class="col-span-3 p-3 border-b text-gray-700 bg-gray-50">
        {{ noonReportNum }}
      </div>
      <div class="col-span-2 text-blue-700 p-3 border-r">{{ $t("legNo") }}</div>
      <div class="col-span-3 p-3 text-gray-700 bg-gray-50">
        {{ voyageLeg }}
      </div>
    </div>
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-gray-50 text-14"
    >
      <div class="col-span-2 text-blue-700 p-3 border-l border-y">
        {{ $t("voyageNo") }}
      </div>
      <div class="flex items-center col-span-3 p-3 border bg-gray-50">
        <div class="text-gray-700">{{ voyageNum }}</div>
        <MiniUnitDisplay class="ml-2 mr-auto">{{
          cur_loading_condition
        }}</MiniUnitDisplay>
      </div>
      <div class="hidden xl:block bg-white col-span-2 row-span-1"></div>
      <input class="hidden xl:block bg-white col-span-3 p-3" disabled />
    </div>
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-gray-50 text-14 border xl:mb-6"
    >
      <div class="col-span-2 text-blue-700 p-3 border-r">
        {{ $t("reportingDateAndTime") }}
      </div>
      <DatePicker
        disabled
        v-model="reportingDateTime"
        class="col-span-3"
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
    </div>
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-gray-50 text-14 border xl:mb-6"
    >
      <div class="col-span-2 text-blue-700 p-3 border-r">
        {{ $t("reportingTimeZone") }}
      </div>
      <div class="flex col-span-3 bg-gray-50">
        <select
          disabled
          class="grow self-center p-3 text-14 focus:outline-0 text-gray-700 bg-gray-50"
          v-model="reportingTimeZone"
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
    </div>
    <div class="col-span-2 xl:col-span-1 items-center mt-2">
      <div class="flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700">{{ $t("departurePort") }}</span>
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
        <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">
          {{ $t("portName") }}
        </div>
        <input
          v-model="route_departure_port_country"
          disabled
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0 bg-gray-50"
        />
        <input
          v-model="route_departure_port_name"
          disabled
          class="col-span-3 p-3 text-gray-700 border-l focus:outline-0 bg-gray-50"
        />
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 mt-4">
        <div class="col-span-2 text-blue-700 border-b p-3 border-r">
          {{ $t("dateAndTime") }}
        </div>
        <DatePicker
          disabled
          v-model="route_departure_date"
          class="col-span-3 text-gray-700 bg-gray-50 border-b"
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
        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("timeZone") }}
        </div>
        <div class="flex col-span-3 bg-gray-50">
          <select
            disabled
            class="grow self-center p-3 text-14 text-gray-900 bg-gray-50 focus:outline-0"
            v-model="route_departure_time_zone"
          >
            <option selected disabled value="default">
              {{ $t("select") }}
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
      </div>
    </div>

    <div class="col-span-2 xl:col-span-1 mt-2">
      <div class="flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700">{{ $t("destinationPort") }}</span>
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
        <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">
          {{ $t("portName") }}
        </div>
        <input
          disabled
          v-model="route_arrival_port_country"
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0 bg-gray-50"
        />
        <input
          disabled
          v-model="route_arrival_port_name"
          class="col-span-3 p-3 text-gray-700 border-l focus:outline-0 bg-gray-50"
        />
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 mt-4">
        <div class="col-span-2 text-blue-700 p-3 border-r border-b">
          {{ $t("estDateAndTime") }}
        </div>
        <DatePicker
          disabled
          v-model="route_arrival_date"
          class="col-span-3 border-b"
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
        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("timeZone") }}
        </div>
        <div class="flex col-span-3 bg-gray-50 text-gray-700">
          <select
            disabled
            class="grow self-center p-3 text-14 bg-gray-50 focus:outline-0 text-gray-700"
            v-model="route_arrival_time_zone"
          >
            <option selected disabled value="default">
              {{ $t("select") }}
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
      </div>
    </div>
  </div>
</template>
