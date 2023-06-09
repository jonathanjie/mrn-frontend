<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card"
  >
    <!-- Departure -->
    <div class="col-span-1">
      <div class="flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700 text-16">{{ $t("departure") }}</span>
        <span class="text-red-500 text-16 ml-1">*</span>
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
        <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">
          {{ $t("portName") }}
        </div>
        <input
          :value="departure_port_country.toUpperCase()"
          @input="departure_port_country = $event.target.value.toUpperCase()"
          :placeholder="$t('inputLocode2')"
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0"
        />
        <input
          :value="departure_port_name.toUpperCase()"
          @input="departure_port_name = $event.target.value.toUpperCase()"
          :placeholder="$t('inputLocode3')"
          class="col-span-3 p-3 text-gray-700 border-l focus:outline-0"
        />
      </div>
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
    </div>
    <!-- Destination -->
    <div class="col-span-1">
      <div class="flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700 text-16">{{ $t("destination") }}</span>
        <span class="text-red-500 text-16 ml-1">*</span>
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
        <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">
          {{ $t("portName") }}
        </div>
        <input
          :value="destination_port_country.toUpperCase()"
          @input="destination_port_country = $event.target.value.toUpperCase()"
          :placeholder="$t('inputLocode2')"
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0 disabled:bg-gray-50 disabled:text-gray-500"
        />
        <input
          :value="destination_port_name.toUpperCase()"
          @input="destination_port_name = $event.target.value.toUpperCase()"
          :placeholder="$t('inputLocode3')"
          class="col-span-3 p-3 text-gray-700 border-l focus:outline-0 disabled:bg-gray-50 disabled:text-gray-500"
        />
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14">
        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("timeZone") }}
        </div>
        <div class="flex col-span-3 border-b bg-white">
          <select
            class="grow self-center p-3 text-14 focus:outline-0 disabled:bg-gray-50"
            :class="
              destination_time_zone === 'default'
                ? 'text-gray-400'
                : 'text-gray-700'
            "
            v-model="destination_time_zone"
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
          {{ $t("estimatedTimeOfArrival") }}
        </div>
        <div class="col-span-3 relative flex items-center bg-white">
          <DatePicker
            v-model="destination_estimated_arrival"
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
            :class="destination_estimated_arrival ? 'mr-9' : 'mr-2'"
            >{{ destination_estimated_arrival_utc }}</MiniUnitDisplay
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDepartureSBYReportStore } from "@/stores/useDepartureSBYReportStore";
import { storeToRefs } from "pinia";
import { TIMEZONES } from "@/utils/options";
import { textInputOptions, format, formatUTC } from "@/utils/helpers";
import { UTCPlaceholder } from "@/constants";
import { computed } from "vue";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";

const store = useDepartureSBYReportStore();
const {
  departurePortCountry: departure_port_country,
  departurePortName: departure_port_name,
  reportingTimeZone: reporting_time_zone,
  reportingDateTime: reporting_date_time,
  reportingDateTimeUTC,
  isDestinationEnabled: is_destination_enabled,
  destinationPortCountry: destination_port_country,
  destinationPortName: destination_port_name,
  destinationTimeZone: destination_time_zone,
  destinationEstimatedArrival: destination_estimated_arrival,
  destinationEstimatedArrivalUTC,
} = storeToRefs(store);

const reporting_date_time_utc = computed(() =>
  reportingDateTimeUTC.value
    ? formatUTC(new Date(reportingDateTimeUTC.value))
    : UTCPlaceholder
);

const destination_estimated_arrival_utc = computed(() =>
  destinationEstimatedArrivalUTC.value
    ? formatUTC(new Date(destinationEstimatedArrivalUTC.value))
    : UTCPlaceholder
);
</script>
