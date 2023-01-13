<script setup>
import {
  textInputOptions,
  format,
  preventNaN,
  convertUTCtoLT,
  parsePositionFromString,
} from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { useDepartureCOSPReportStore } from "@/stores/useDepartureCOSPReportStore";
import { storeToRefs } from "pinia";
import { TIMEZONES } from "@/utils/options";
import { computed } from "vue";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const reportingDateTime = computed(() =>
  convertUTCtoLT(new Date(props.report.report_date), props.report.report_tz)
);
const reportingTimeZone = computed(() => props.report.report_tz);
const position = computed(() =>
  parsePositionFromString(props.report.departurerunup.position)
);
const sby_to_rup_time = computed(
  () => props.report.distancetimedata.hours_since_last
);
const sby_to_rup_distance_obs = computed(
  () => props.report.distancetimedata.distance_observed_since_last
);
const sby_to_rup_distance_eng = computed(
  () => props.report.distancetimedata.distance_engine_since_last
);
const sby_to_rup_revolution_count = computed(
  () => props.report.distancetimedata.revolution_count
);
const sby_to_rup_set_rpm = computed(
  () => props.report.distancetimedata.set_rpm
);

// const store = useDepartureCOSPReportStore();
// const {
//   reportingDateTime: reporting_date_time,
//   reportingTimeZone: reporting_time_zone,
//   rupEngLatDir: rup_eng_lat_dir,
//   rupEngLatDegree: rup_eng_lat_degree,
//   rupEngLatMinute: rup_eng_lat_minute,
//   rupEngLongDir: rup_eng_long_dir,
//   rupEngLongDegree: rup_eng_long_degree,
//   rupEngLongMinute: rup_eng_long_minute,
//   sbyToRupTime: sby_to_rup_time,
//   sbyToRupDistanceObs: sby_to_rup_distance_obs,
//   sbyToRupDistanceEng: sby_to_rup_distance_eng,
//   sbyToRupRevolutionCount: sby_to_rup_revolution_count,
//   sbyToRupSetRPM: sby_to_rup_set_rpm,
// } = storeToRefs(store);
</script>

<template>
  <div
    class="grid rounded-lg p-5 gap-4 divide-y divide-dashed shadow-card bg-white"
  >
    <!-- Distance & Time (R/UP Engine) -->
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div class="col-span-2 flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700 text-16">{{ $t("rupEngine") }}</span>
      </div>
      <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("timeZone") }}
        </div>
        <div class="flex col-span-3 border-b bg-gray-50">
          <select
            class="grow self-center p-3 text-14 focus:outline-0 bg-gray-50 text-gray-700"
            disabled
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
      <div></div>
      <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
        <span
          class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center"
          >{{ $t("longitude") }}</span
        >
        <input
          v-model="position.longDegree"
          disabled
          class="col-span-3 p-3 pl-4 border-l border-b text-14 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <input
          v-model="position.longMinutes"
          disabled
          class="col-span-3 p-3 pl-4 border-l border-b text-14 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <select
          v-model="position.longDir"
          class="col-span-3 p-3 text-14 border-l focus:outline-0 text-gray-700 bg-gray-50"
          disabled
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
          disabled
          placeholder="000 (Degree)"
          class="col-span-3 p-3 pl-4 border-l border-b text-14 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <input
          v-model="position.latMinutes"
          disabled
          class="col-span-3 p-3 pl-4 border-l border-b text-14 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <select
          v-model="position.latDir"
          class="col-span-3 p-3 text-14 border-l focus:outline-0 text-gray-700 bg-gray-50"
          disabled
        >
          <option selected disabled value="default">
            {{ $t("southAndNorth") }}
          </option>
          <option value="S">{{ $t("south") }}</option>
          <option value="N">{{ $t("north") }}</option>
        </select>
      </div>
    </div>

    <!-- S/BY to R/UP -->
    <div class="grid grid-cols-2 gap-4">
      <div class="flex items-center col-span-2 mt-4">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700 text-16">
          <slot>{{ $t("distanceAndTimeSbyToRup") }}</slot>
        </span>
      </div>
      <div class="col-span-2 lg:col-span-1 grid grid-cols-5 bg-gray-50">
        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14"
        >
          {{ $t("time") }}
        </div>
        <div
          class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t bg-gray-50"
        >
          <input
            v-model="sby_to_rup_time"
            disabled
            @keypress="preventNaN($event, sby_to_rup_time)"
            placeholder="000"
            class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
          />
          <MiniUnitDisplay>HRS</MiniUnitDisplay>
        </div>

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14"
        >
          {{ $t("distanceByObservation") }}
        </div>
        <div
          class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t bg-gray-50"
        >
          <input
            v-model="sby_to_rup_distance_obs"
            disabled
            @keypress="preventNaN($event, sby_to_rup_distance_obs)"
            placeholder="000"
            class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
          />
          <MiniUnitDisplay>NM</MiniUnitDisplay>
        </div>

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t lg:border-y bg-gray-50 text-14"
        >
          {{ $t("distanceByEngine") }}
        </div>
        <div
          class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t lg:border bg-gray-50"
        >
          <input
            v-model="sby_to_rup_distance_eng"
            disabled
            @keypress="preventNaN($event, sby_to_rup_distance_eng)"
            placeholder="000"
            class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
          />
          <MiniUnitDisplay>NM</MiniUnitDisplay>
        </div>

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t lg:border-t-0 bg-gray-50 text-14"
        >
          {{ $t("revolutionCounter") }}
        </div>
        <input
          v-model="sby_to_rup_revolution_count"
          disabled
          @keypress="preventNaN($event, sby_to_rup_revolution_count)"
          placeholder="000"
          class="col-span-3 lg:col-span-3 p-3 pl-4 border-x border-t lg:border-t-0 text-14 text-gray-700 focus:outline-0 bg-gray-50"
        />

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-y bg-gray-50 text-14"
        >
          {{ $t("setRPMofME") }}
        </div>
        <div class="flex col-span-3 lg:col-span-3 p-2 pl-4 border bg-gray-50">
          <input
            v-model="sby_to_rup_set_rpm"
            disabled
            @keypress="preventNaN($event, sby_to_rup_set_rpm)"
            placeholder="000.0"
            class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
          />
          <MiniUnitDisplay>RPM</MiniUnitDisplay>
        </div>
      </div>
    </div>
  </div>
</template>
