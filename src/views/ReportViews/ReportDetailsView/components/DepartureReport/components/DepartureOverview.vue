<script setup>
import { computed } from "vue";
// import { useDepartureSBYReportStore } from "@/stores/useDepartureSBYReportStore";
// import { storeToRefs } from "pinia";
import { textInputOptions, format } from "@/utils/helpers";
import { TIMEZONES } from "@/utils/options";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const reportNum = computed(() => props.report.report_num);
const legNum = computed(() => props.report.voyage_leg.leg_num);
// TODO: switch to actual voyage number
const voyageNum = computed(() => props.report.voyage_leg.leg_num);
const reportingDate = computed(() => props.report.report_date);
const reportingTimeZone = computed(() => props.report.report_tz);

// const store = useDepartureSBYReportStore();
// const {
//   // depsReportNo: deps_report_no,
//   lastLegNo: last_leg_no,
//   voyageNo: voyage_no,
//   reportingDate: reporting_date,
//   reportingTimeZone: reporting_time_zone,
// } = storeToRefs(store);
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
      <div class="col-span-3 p-3 border text-gray-700 bg-gray-50">
        {{ voyageNum }}
      </div>
      <div class="hidden xl:block bg-white col-span-2 row-span-1"></div>
      <input disabled class="hidden xl:block bg-white col-span-3 p-3" />
    </div>
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-gray-50 text-14 border"
    >
      <div class="col-span-2 text-blue-700 p-3 border-r">
        {{ $t("reportingDateAndTime") }}
      </div>
      <DatePicker
        disabled
        v-model="reportingDate"
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
          disabled
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
