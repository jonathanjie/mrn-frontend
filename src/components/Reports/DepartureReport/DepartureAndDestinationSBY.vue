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
        <span class="text-blue-700 text-16">{{ $t("destination") }}</span>
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
        <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">
          {{ $t("portName") }}
        </div>
        <input
          v-model="destination_port_country"
          :placeholder="$t('inputLocode2')"
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0"
        />
        <input
          v-model="destination_port_name"
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
              destination_time_zone === 'default'
                ? 'text-gray-400'
                : 'text-gray-700'
            "
            v-model="destination_time_zone"
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
        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("estimatedTimeOfArrival") }}
        </div>
        <DatePicker
          v-model="destination_estimated_arrival"
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
  </div>
</template>

<script setup>
import { useDepartureSBYReportStore } from "@/stores/useDepartureSBYReportStore";
import { storeToRefs } from "pinia";

const store = useDepartureSBYReportStore();
const {
  departurePortCountry: departure_port_country,
  departurePortName: departure_port_name,
  reportingTimeZone: reporting_time_zone,
  reportingDate: reporting_date,
  destinationPortCountry: destination_port_country,
  destinationPortName: destination_port_name,
  destinationTimeZone: destination_time_zone,
  destinationEstimatedArrival: destination_estimated_arrival,
} = storeToRefs(store);
</script>
