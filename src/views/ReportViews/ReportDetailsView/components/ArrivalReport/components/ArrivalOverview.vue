<script setup>
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { TIMEZONES } from "@/utils/options";
import {
  textInputOptions,
  format,
  // formatUTC
} from "@/utils/helpers";
// import { UTCPlaceholder } from "@/constants";
import { computed, defineProps } from "vue";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const reportNum = computed(() => props.report.report_num);
const legNum = computed(() => props.report.voyage_leg);
// TODO: switch to actual voyage number
const voyageNum = computed(() => props.report.voyage_leg);
// TODO: use actual backend loading conditions
const loadingCondition = computed(() => "NIL");
const reportingDateTime = computed(() => props.report.report_date);
const reportingTimeZone = computed(() => props.report.report_tz);

// const reporting_date_time_utc = computed(() =>
//   reportingDateTimeUTC.value
//     ? formatUTC(new Date(reportingDateTimeUTC.value))
//     : UTCPlaceholder
// );
</script>

<template>
  <div
    class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card min-w-fit"
  >
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
        {{ reportNum }}
      </div>
      <div class="col-span-2 text-blue-700 p-3 border-r">{{ $t("legNo") }}</div>
      <div class="col-span-3 p-3 text-gray-700 bg-gray-50">
        {{ legNum }}
      </div>
    </div>
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-gray-50 text-14"
    >
      <div class="col-span-2 text-blue-700 p-3 border-l border-y">
        {{ $t("voyageNo") }}
      </div>
      <div class="flex items-center col-span-3 p-3 border">
        <div class="text-gray-700 bg-gray-50">{{ voyageNum }}</div>
        <MiniUnitDisplay class="ml-2 mr-auto">{{
          loadingCondition
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
          :class="reportingDateTime ? 'mr-9' : 'mr-2'"
          >{{ reporting_date_time_utc }}</MiniUnitDisplay
        > -->
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
            reportingTimeZone === 'default' ? 'text-gray-400' : 'text-gray-700'
          "
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
    </div>
  </div>
</template>
