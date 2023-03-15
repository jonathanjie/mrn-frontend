<template>
  <div
    class="grid bg-white rounded-lg p-5 gap-4 divide-y divide-dashed shadow-card"
  >
    <!-- Distance & Time (R/UP Engine) -->
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div class="col-span-2 flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700 text-16">{{ $t("rupEngine") }}</span>
        <span class="text-red-500 text-16 ml-1">*</span>
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
        <div class="col-span-3 relative flex items-center">
          <DatePicker
            v-model="reporting_date_time"
            class="grow"
            textInput
            :textInputOptions="textInputOptions"
            :format="format"
            :modelValue="string"
            :placeholder="$t('selectDateAndTime')"
            auto-apply
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
        <span class="col-span-2 text-blue-700 p-3 text-14 self-center">{{
          $t("latitude")
        }}</span>
        <input
          v-model="rup_eng_lat_degree"
          @keypress="preventNaN($event, rup_eng_lat_degree)"
          placeholder="000 (Deg)"
          class="p-3 pl-4 border-l bg-white text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="rup_eng_lat_minute"
          @keypress="preventNaN($event, rup_eng_lat_minute)"
          placeholder="000 (Min)"
          class="p-3 pl-4 border-l bg-white text-14 text-gray-700 focus:outline-0"
        />
        <select
          v-model="rup_eng_lat_dir"
          class="p-3 text-14 border-l focus:outline-0"
          :class="
            rup_eng_lat_dir === 'default' ? 'text-gray-400' : 'text-gray-700'
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
          v-model="rup_eng_long_degree"
          @keypress="preventNaN($event, rup_eng_long_degree)"
          placeholder="000 (Deg)"
          class="p-3 pl-4 border-l bg-white text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="rup_eng_long_minute"
          @keypress="preventNaN($event, rup_eng_long_minute)"
          placeholder="000 (Min)"
          class="p-3 pl-4 border-l bg-white text-14 text-gray-700 focus:outline-0"
        />
        <select
          v-model="rup_eng_long_dir"
          class="p-3 text-14 border-l focus:outline-0"
          :class="
            rup_eng_long_dir === 'default' ? 'text-gray-400' : 'text-gray-700'
          "
        >
          <option selected disabled value="default">
            {{ $t("eastAndWest") }}
          </option>
          <option value="E">{{ $t("east") }}</option>
          <option value="W">{{ $t("west") }}</option>
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
      <div class="col-span-2 lg:col-span-1 grid grid-cols-5">
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
            @keypress="preventNaN($event, sby_to_rup_time)"
            placeholder="0"
            disabled
            class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
          />
          <MiniUnitDisplay>HRS</MiniUnitDisplay>
        </div>

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14"
        >
          {{ $t("distanceByObservation") }}
          <span class="text-red-500 text-16 ml-1">*</span>
        </div>
        <div class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t">
          <input
            v-model="sby_to_rup_distance_obs"
            @keypress="preventNaN($event, sby_to_rup_distance_obs)"
            placeholder="000"
            class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>NM</MiniUnitDisplay>
        </div>

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t lg:border-y bg-gray-50 text-14"
        >
          {{ $t("distanceByEngine") }}
        </div>
        <div
          class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t lg:border bg-white"
        >
          <input
            v-model="sby_to_rup_distance_eng"
            @keypress="preventNaN($event, sby_to_rup_distance_eng)"
            placeholder="0"
            class="w-24 text-14 text-gray-700 focus:outline-0 bg-white"
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
          @keypress="preventNaN($event, sby_to_rup_revolution_count)"
          placeholder="000"
          class="col-span-3 lg:col-span-3 p-3 pl-4 border-x border-t lg:border-t-0 bg-white text-14 text-gray-700 focus:outline-0"
        />

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-y bg-gray-50 text-14"
        >
          {{ $t("setRPMofME") }}
        </div>
        <div class="flex col-span-3 lg:col-span-3 p-2 pl-4 border bg-white">
          <input
            v-model="sby_to_rup_set_rpm"
            @keypress="preventNaN($event, sby_to_rup_set_rpm)"
            placeholder="0"
            class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>RPM</MiniUnitDisplay>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  textInputOptions,
  format,
  preventNaN,
  formatUTC,
} from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { useDepartureCOSPReportStore } from "@/stores/useDepartureCOSPReportStore";
import { storeToRefs } from "pinia";
import { TIMEZONES } from "@/utils/options";
import { UTCPlaceholder } from "@/constants";
import { computed } from "vue";

const store = useDepartureCOSPReportStore();
const {
  reportingDateTime: reporting_date_time,
  reportingTimeZone: reporting_time_zone,
  reportingDateTimeUTC,
  rupEngLatDir: rup_eng_lat_dir,
  rupEngLatDegree: rup_eng_lat_degree,
  rupEngLatMinute: rup_eng_lat_minute,
  rupEngLongDir: rup_eng_long_dir,
  rupEngLongDegree: rup_eng_long_degree,
  rupEngLongMinute: rup_eng_long_minute,
  sbyToRupTime: sby_to_rup_time,
  sbyToRupDistanceObs: sby_to_rup_distance_obs,
  sbyToRupDistanceEng: sby_to_rup_distance_eng,
  sbyToRupRevolutionCount: sby_to_rup_revolution_count,
  sbyToRupSetRPM: sby_to_rup_set_rpm,
} = storeToRefs(store);

const reporting_date_time_utc = computed(() =>
  reportingDateTimeUTC.value
    ? formatUTC(new Date(reportingDateTimeUTC.value))
    : UTCPlaceholder
);
</script>
