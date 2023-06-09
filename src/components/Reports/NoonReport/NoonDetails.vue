<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        {{ $t("reportingNoon") }} </span
      ><span class="text-red-500 text-16 ml-1">*</span>
    </div>
    <div class="col-span-2 xl:col-span-1 grid grid-cols-5 border">
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
    <div></div>
    <div class="col-span-2 xl:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span class="col-span-2 text-blue-700 p-3 text-14 self-center">{{
        $t("latitude")
      }}</span>
      <input
        v-model="lat_degree"
        @keypress="preventNaN($event, lat_degree)"
        placeholder="000 (Deg)"
        class="p-3 pl-4 border-l bg-white text-14 text-gray-700 focus:outline-0"
      />
      <input
        v-model="lat_minutes"
        @keypress="preventNaN($event, lat_minutes)"
        placeholder="000 (Min)"
        class="p-3 pl-4 border-l bg-white text-14 text-gray-700 focus:outline-0"
      />
      <select
        v-model="lat_dir"
        class="p-3 text-14 border-l focus:outline-0 focus:outline-0"
        :class="lat_dir === 'default' ? 'text-gray-400' : 'text-gray-700'"
      >
        <option selected disabled value="default">
          {{ $t("southAndNorth") }}
        </option>
        <option value="S">{{ $t("south") }}</option>
        <option value="N">{{ $t("north") }}</option>
      </select>
    </div>
    <div class="col-span-2 xl:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span class="col-span-2 text-blue-700 p-3 text-14 self-center">{{
        $t("longitude")
      }}</span>
      <input
        v-model="long_degree"
        @keypress="preventNaN($event, long_degree)"
        placeholder="000 (Deg)"
        class="p-3 pl-4 border-l bg-white text-14 text-gray-700 focus:outline-0"
      />
      <input
        v-model="long_minutes"
        @keypress="preventNaN($event, long_minutes)"
        placeholder="000 (Min)"
        class="p-3 pl-4 border-l bg-white text-14 text-gray-700 focus:outline-0"
      />
      <select
        v-model="long_dir"
        class="p-3 text-14 border-l focus:outline-0"
        :class="long_dir === 'default' ? 'text-gray-400' : 'text-gray-700'"
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

<script setup>
import {
  preventNaN,
  textInputOptions,
  format,
  formatUTC,
} from "@/utils/helpers.js";
import { useNoonReportStore } from "@/stores/useNoonReportStore";
import { storeToRefs } from "pinia";
import { TIMEZONES } from "@/utils/options";
import { UTCPlaceholder } from "@/constants";
import { computed } from "vue";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";

const store = useNoonReportStore();
const {
  reportingTimeZone: reporting_time_zone,
  reportingDateTime: reporting_date_time,
  reportingDateTimeUTC,
  latDir: lat_dir,
  latMinutes: lat_minutes,
  latDegree: lat_degree,
  longDir: long_dir,
  longMinutes: long_minutes,
  longDegree: long_degree,
} = storeToRefs(store);

const reporting_date_time_utc = computed(() =>
  reportingDateTimeUTC.value
    ? formatUTC(new Date(reportingDateTimeUTC.value))
    : UTCPlaceholder
);
</script>
