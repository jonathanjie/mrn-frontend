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
      <input
        class="col-span-3 p-3 border-b text-gray-700 bg-gray-50"
        disabled
        v-model="report_no"
      />
      <div class="col-span-2 text-blue-700 p-3 border-r">{{ $t("legNo") }}</div>
      <input
        class="col-span-3 p-3 text-gray-700 bg-gray-50"
        disabled
        v-model="leg_no"
      />
    </div>
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-gray-50 text-14"
    >
      <div class="col-span-2 text-blue-700 p-3 border-l border-y">
        {{ $t("voyageNo") }}
      </div>
      <div class="flex col-span-3 p-3 border">
        <input
          class="text-gray-700 bg-gray-50 w-8"
          disabled
          v-model="voyage_no"
        />
        <!-- value here (e.g. Ballast) should be dynamic -->
        <MiniUnitDisplay class="ml-0 mr-auto">{{
          $t("ballast")
        }}</MiniUnitDisplay>
      </div>
      <div class="hidden xl:block bg-white col-span-2 row-span-1"></div>
      <input class="hidden xl:block bg-white col-span-3 p-3" disabled />
    </div>
    <div class="col-span-2 xl:col-span-1 items-center mt-2">
      <div class="flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700">{{ $t("departurePort") }}</span>
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
        <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">
          {{ $t("portName") }}
        </div>
        <input
          v-model="route_departure_port_country"
          disabled
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0 bg-gray-50"
        />
        <input
          v-model="route_departure_port_name"
          disabled
          class="col-span-3 p-3 text-gray-700 border-l focus:outline-0 bg-gray-50"
        />
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 mt-4">
        <div class="col-span-2 text-blue-700 p-3 border-r">
          {{ $t("dateAndTime") }}
        </div>
        <DatePicker
          v-model="route_departure_date"
          class="col-span-3 text-gray-700 bg-gray-50"
          textInput
          :textInputOptions="textInputOptions"
          :format="format"
          :modelValue="string"
          disabled
          :placeholder="$t('selectDateAndTime')"
        >
          <template #input-icon>
            <img src="" />
          </template>
        </DatePicker>
      </div>
    </div>

    <div class="col-span-2 xl:col-span-1 mt-2">
      <div class="flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700">{{ $t("destinationPort") }}</span>
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
        <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">
          {{ $t("portName") }}
        </div>
        <input
          v-model="route_arrival_port_country"
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0"
        />
        <input
          v-model="route_arrival_port_name"
          class="col-span-3 p-3 text-gray-700 border-l focus:outline-0"
        />
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 mt-4">
        <div class="col-span-2 text-blue-700 p-3 border-r border-b">
          {{ $t("estDateAndTime") }}
        </div>
        <DatePicker
          v-model="route_arrival_date"
          class="col-span-3 border-b"
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
        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("timeZone") }}
        </div>
        <div class="flex col-span-3 border-b bg-white text-gray-700">
          <TimeZoneSelector
            class="grow self-center"
            v-model="route_arrival_time_zone"
          ></TimeZoneSelector>
        </div>
        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("summerTime") }}
        </div>
        <select
          v-model="route_arrival_summer_time"
          class="col-span-3 p-3 text-14 focus:outline-0 text-gray-700"
        >
          <option selected disabled value="default">
            {{ $t("selectSummerTime") }}
          </option>
          <option value="true">{{ $t("applied") }}</option>
          <option value="false">{{ $t("notApplied") }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { textInputOptions, format } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import TimeZoneSelector from "@/components/TimeZoneSelector.vue";
import { useNoonReportStore } from "@/stores/useNoonReportStore";
import { storeToRefs } from "pinia";

const store = useNoonReportStore();
const {
  reportNo: report_no,
  legNo: leg_no,
  voyageNo: voyage_no,
  routeDeparturePortCountry: route_departure_port_country,
  routeDeparturePortName: route_departure_port_name,
  routeDepartureDate: route_departure_date,
  routeArrivalPortCountry: route_arrival_port_country,
  routeArrivalPortName: route_arrival_port_name,
  routeArrivalDate: route_arrival_date,
  routeArrivalTimeZone: route_arrival_time_zone,
  routeArrivalSummerTime: route_arrival_summer_time,
} = storeToRefs(store);
</script>
