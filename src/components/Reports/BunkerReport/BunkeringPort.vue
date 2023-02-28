<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card"
  >
    <div class="col-span-1 lg:col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">{{ $t("bunkeringPort") }}</span>
      <span class="text-red-500 text-16 ml-1">*</span>
    </div>
    <div class="col-span-1">
      <div class="grid grid-cols-5 border bg-gray-50 text-14">
        <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">
          {{ $t("portName") }}
        </div>
        <input
          :placeholder="$t('inputLocode2')"
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0"
          :value="port_country.toUpperCase()"
          @input="port_country = $event.target.value.toUpperCase()"
        />
        <input
          :placeholder="$t('inputLocode3')"
          :value="port_name.toUpperCase()"
          @input="port_name = $event.target.value.toUpperCase()"
          class="col-span-3 p-3 text-gray-700 border-l focus:outline-0"
        />
      </div>
    </div>

    <div class="col-span-1">
      <div class="grid grid-cols-5 border bg-gray-50 text-14">
        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("timeZone") }}
        </div>
        <div class="flex col-span-3 border-b bg-white">
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
        <div class="col-span-3 relative flex items-center bg-white">
          <DatePicker
            v-model="reporting_date_time"
            class="col-span-3 grow"
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
    </div>
  </div>
</template>

<script setup>
import { textInputOptions, format, formatUTC } from "@/utils/helpers.js";
import { useBunkerReportStore } from "@/stores/useBunkerReportStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { TIMEZONES } from "@/utils/options";
import { UTCPlaceholder } from "@/constants";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";

const store = useBunkerReportStore();
const {
  portCountry: port_country,
  portName: port_name,
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
