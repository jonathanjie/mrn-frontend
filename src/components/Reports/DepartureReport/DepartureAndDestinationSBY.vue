<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card"
  >
    <!-- Departure -->
    <div class="col-span-1">
      <div class="flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700 text-16">{{ $t("departure") }}</span>
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
        <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">
          {{ $t("portName") }}
        </div>
        <input
          v-model="departure_port_country"
          :placeholder="$t('inputLocode2')"
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0"
        />
        <input
          v-model="departure_port_name"
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
        <DatePicker
          v-model="reporting_date"
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
    </div>

    <!-- Destination -->
    <div class="col-span-1">
      <div class="flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <img
          v-if="is_destination_enabled"
          src="@/assets/icons/checkboxes/checked_square.svg"
          class="mr-2 h-5 w-5"
          @click="is_destination_enabled = !is_destination_enabled"
        />
        <img
          v-else
          src="@/assets/icons/checkboxes/unchecked_square.svg"
          class="mr-2 h-5 w-5"
          @click="is_destination_enabled = !is_destination_enabled"
        />
        <span class="text-blue-700 text-16">{{ $t("destination") }}</span>
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
        <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">
          {{ $t("portName") }}
        </div>
        <input
          v-model="destination_port_country"
          :placeholder="$t('inputLocode2')"
          :disabled="!is_destination_enabled"
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0 disabled:bg-gray-50 disabled:text-gray-400"
        />
        <input
          v-model="destination_port_name"
          :placeholder="$t('inputLocode3')"
          :disabled="!is_destination_enabled"
          class="col-span-3 p-3 text-gray-700 border-l focus:outline-0 disabled:bg-gray-50 disabled:text-gray-400"
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
              destination_time_zone === 'default' || !is_destination_enabled
                ? 'text-gray-400'
                : 'text-gray-700'
            "
            :disabled="!is_destination_enabled"
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
        <DatePicker
          v-model="destination_estimated_arrival"
          class="col-span-3"
          textInput
          :textInputOptions="textInputOptions"
          :format="format"
          :disabled="!is_destination_enabled"
          :modelValue="string"
          :placeholder="$t('selectDateAndTime')"
        >
          <template #input-icon>
            <img src="" />
          </template>
        </DatePicker>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDepartureSBYReportStore } from "@/stores/useDepartureSBYReportStore";
import { storeToRefs } from "pinia";
import { TIMEZONES } from "@/utils/options";
import { textInputOptions, format } from "@/utils/helpers";

const store = useDepartureSBYReportStore();
const {
  departurePortCountry: departure_port_country,
  departurePortName: departure_port_name,
  reportingTimeZone: reporting_time_zone,
  reportingDate: reporting_date,
  isDestinationEnabled: is_destination_enabled,
  destinationPortCountry: destination_port_country,
  destinationPortName: destination_port_name,
  destinationTimeZone: destination_time_zone,
  destinationEstimatedArrival: destination_estimated_arrival,
} = storeToRefs(store);
</script>
