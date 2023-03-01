<template>
  <div
    class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card min-w-fit"
  >
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">{{ $t("overview") }}</span>
      <span class="text-red-500 text-16 ml-1">*</span>
    </div>
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <div class="col-span-2 text-blue-700 p-3 border-r border-b">
        {{ $t("reportNo") }}
      </div>
      <div class="col-span-3 p-3 border-b text-gray-700 bg-gray-50">
        {{ report_no }}
      </div>
      <div class="col-span-2 text-blue-700 p-3 border-r">{{ $t("legNo") }}</div>
      <div class="col-span-3 p-3 text-gray-700 bg-gray-50">
        {{ leg_no }}
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
          loading_condition
        }}</MiniUnitDisplay>
      </div>
      <div class="hidden xl:block bg-white col-span-2 row-span-1"></div>
      <input class="hidden xl:block bg-white col-span-3 p-3" disabled />
    </div>
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-white text-14 border"
    >
      <div class="bg-gray-50 col-span-2 text-blue-700 p-3 border-r">
        {{ $t("reportingDateAndTime") }}
      </div>
      <div class="col-span-3 relative flex items-center">
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
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-gray-50 text-14 border"
    >
      <div class="col-span-2 text-blue-700 p-3 border-r">
        {{ $t("reportingTimeZone") }}
      </div>
      <div class="flex col-span-3 bg-white min-w-fit">
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
    </div>
  </div>
</template>

<script setup>
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { useArrivalEOSPReportStore } from "@/stores/useArrivalEOSPReportStore";
import { storeToRefs } from "pinia";
import { TIMEZONES } from "@/utils/options";
import { textInputOptions, format, formatUTC } from "@/utils/helpers";
import { UTCPlaceholder } from "@/constants";
import { computed } from "vue";

const store = useArrivalEOSPReportStore();
const {
  reportNo: report_no,
  legNo: leg_no,
  loadingCondition: loading_condition,
  voyageNo: voyage_no,
  reportingDateTime: reporting_date_time,
  reportingTimeZone: reporting_time_zone,
  reportingDateTimeUTC,
} = storeToRefs(store);

const reporting_date_time_utc = computed(() =>
  reportingDateTimeUTC.value
    ? formatUTC(new Date(reportingDateTimeUTC.value))
    : UTCPlaceholder
);
</script>
