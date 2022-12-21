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
        {{ arrs_report_no }}
      </div>
      <div class="col-span-2 text-blue-700 p-3 border-r">{{ $t("legNo") }}</div>
      <div class="col-span-3 p-3 text-gray-700 bg-gray-50">
        {{ cur_leg_no }}
      </div>
    </div>
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-gray-50 text-14"
    >
      <div class="col-span-2 text-blue-700 p-3 border-l border-y">
        {{ $t("voyageNo") }}
      </div>
      <div class="flex items-center col-span-3 p-3 border">
        <div class="text-gray-700 bg-gray-50">{{ voyage_no }}</div>
        <MiniUnitDisplay class="ml-2 mr-auto">{{
          cur_loading_condition
        }}</MiniUnitDisplay>
      </div>
      <div class="hidden xl:block bg-white col-span-2 row-span-1"></div>
      <input class="hidden xl:block bg-white col-span-3 p-3" disabled />
    </div>
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-gray-50 text-14 border"
    >
      <div class="col-span-2 text-blue-700 p-3 border-r">
        {{ $t("reportingDateAndTime") }}
      </div>
      <DatePicker
        v-model="reporting_date_time"
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
      class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-gray-50 text-14 border"
    >
      <div class="col-span-2 text-blue-700 p-3 border-r">
        {{ $t("reportingTimeZone") }}
      </div>
      <div class="flex col-span-3 bg-white">
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
</template>

<script setup>
import { useArrivalEOSPReportStore } from "@/stores/useArrivalEOSPReportStore";
import { storeToRefs } from "pinia";
import { textInputOptions, format } from "@/utils/helpers";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";

const store = useArrivalEOSPReportStore();
const {
  arrsReportNo: arrs_report_no,
  curLegNo: cur_leg_no,
  curLoadingCondition: cur_loading_condition,
  voyageNo: voyage_no,
  reportingDateTime: reporting_date_time,
  reportingTimeZone: reporting_time_zone,
} = storeToRefs(store);
</script>
