<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">{{ $t("overview") }}</span>
      <span class="text-red-500 text-16 ml-1">*</span>
    </div>
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <div class="col-span-2 text-blue-700 p-3 border-r border-b">
        {{ $t("reportNo") }}
      </div>
      <div class="col-span-3 p-3 border-b text-gray-700 bg-gray-50">
        {{ report_no }}
      </div>
      <div class="col-span-2 text-blue-700 p-3 border-r">{{ $t("legNo") }}</div>
      <div class="col-span-3 p-3 text-gray-700 bg-gray-50">
        {{ leg_no }}
      </div>
    </div>
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-gray-50 text-14"
    >
      <div class="col-span-2 text-blue-700 p-3 border-l border-y">
        {{ $t("voyageNo") }}
      </div>
      <div class="flex items-center col-span-3 p-3 border">
        <div class="text-gray-700 bg-gray-50">{{ voyage_no }}</div>
        <MiniUnitDisplay class="ml-2 mr-auto">{{
          loading_condition
        }}</MiniUnitDisplay>
      </div>
      <div class="hidden xl:block bg-white col-span-2 row-span-1"></div>
      <input class="hidden xl:block bg-white col-span-3 p-3" disabled />
    </div>
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-gray-50 text-14 border xl:mb-6"
    >
      <div class="col-span-2 text-blue-700 p-3 border-r">
        {{ $t("reportingDateAndTime") }}
      </div>
      <div class="col-span-3 relative flex items-center bg-white">
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
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-gray-50 text-14 border xl:mb-6"
    >
      <div class="col-span-2 text-blue-700 p-3 border-r">
        {{ $t("reportingTimeZone") }}
      </div>
      <div class="flex col-span-3 bg-white">
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
        <div class="col-span-2 text-blue-700 border-b p-3 border-r">
          {{ $t("dateAndTime") }}
        </div>
        <div
          class="col-span-3 relative flex items-center text-gray-700 bg-gray-50 border-b"
        >
          <DatePicker
            v-model="route_departure_date_time"
            class="grow"
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
          <MiniUnitDisplay class="absolute right-0 min-w-fit mr-2">{{
            route_departure_date_time_utc
          }}</MiniUnitDisplay>
        </div>

        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("timeZone") }}
        </div>
        <div class="flex col-span-3 bg-white">
          <select
            class="grow self-center p-3 text-14 text-gray-900 bg-gray-50 focus:outline-0"
            disabled
            v-model="route_departure_time_zone"
          >
            <option selected disabled value="default">
              {{ $t("select") }}
            </option>
            <option v-for="(val, key) in TIMEZONES" :key="val" :value="val">
              {{ key }}
            </option>
          </select>
        </div>
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
          :disabled="dateEditIsDisabled"
          v-model="route_arrival_port_country"
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0 disabled:bg-gray-50"
        />
        <input
          :disabled="dateEditIsDisabled"
          v-model="route_arrival_port_name"
          class="col-span-3 p-3 text-gray-700 border-l focus:outline-0 disabled:bg-gray-50"
        />
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 mt-4">
        <div class="col-span-2 text-blue-700 p-3 border-r border-b">
          {{ $t("estDateAndTime") }}
        </div>
        <div
          class="flex items-center col-span-3 border-b"
          :class="dateEditIsDisabled ? 'bg-gray-50' : 'bg-white'"
        >
          <div
            v-if="dateEditIsDisabled"
            class="grow col-span-3 relative flex items-center"
          >
            <DatePicker
              v-model="route_arrival_date_time"
              class="grow"
              :disabled="dateEditIsDisabled"
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
            <MiniUnitDisplay class="absolute right-0 min-w-fit mr-2">{{
              route_arrival_date_time_utc
            }}</MiniUnitDisplay>
          </div>
          <div v-else class="grow col-span-3 relative flex items-center">
            <DatePicker
              v-model="route_arrival_date_time_edited"
              class="grow"
              :disabled="dateEditIsDisabled"
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
            <MiniUnitDisplay class="absolute right-0 min-w-fit">{{
              route_arrival_date_time_edited_utc
            }}</MiniUnitDisplay>
          </div>
          <img
            src="@/assets/icons/edit.svg"
            @click="toggle"
            class="mx-2 h-4 w-4 cursor-pointer"
          />
        </div>
        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("timeZone") }}
        </div>
        <div class="flex col-span-3 bg-white text-gray-700">
          <select
            :disabled="dateEditIsDisabled"
            class="grow self-center p-3 text-14 focus:outline-0 disabled:bg-gray-50"
            :class="
              route_arrival_time_zone === 'default'
                ? 'text-gray-400'
                : 'text-gray-700'
            "
            v-model="route_arrival_time_zone"
          >
            <option selected disabled value="default">
              {{ $t("select") }}
            </option>
            <option v-for="(val, key) in TIMEZONES" :key="val" :value="val">
              {{ key }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { textInputOptions, format, formatUTC } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { useNoonReportStore } from "@/stores/useNoonReportStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { TIMEZONES } from "@/utils/options";
import { UTCPlaceholder } from "@/constants";

const toggle = () => {
  if (!dateEditIsDisabled.value) {
    route_arrival_port_country.value = arrivalPortCountryStatic;
    route_arrival_port_name.value = arrivalPortNameStatic;
    route_arrival_date_time.value = arrivalDateTimeStatic;
    route_arrival_time_zone.value = arrivalTimeZoneStatic;
  }
  dateEditIsDisabled.value = !dateEditIsDisabled.value;
};

const store = useNoonReportStore();
const {
  reportNo: report_no,
  legNo: leg_no,
  loadingCondition: loading_condition,
  voyageNo: voyage_no,
  reportingDateTime: reporting_date_time,
  reportingTimeZone: reporting_time_zone,
  reportingDateTimeUTC,
  routeDeparturePortCountry: route_departure_port_country,
  routeDeparturePortName: route_departure_port_name,
  routeDepartureDateTime: route_departure_date_time,
  routeDepartureTimeZone: route_departure_time_zone,
  routeDepartureDateTimeUTC,
  routeArrivalPortCountry: route_arrival_port_country,
  routeArrivalPortName: route_arrival_port_name,
  routeArrivalDateTimeUTC,
  routeArrivalDateTime: route_arrival_date_time,
  routeArrivalDateTimeEdited: route_arrival_date_time_edited,
  routeArrivalDateTimeEditedUTC,
  routeArrivalTimeZone: route_arrival_time_zone,
  dateEditIsDisabled,
} = storeToRefs(store);

const arrivalPortCountryStatic = route_arrival_port_country.value;
const arrivalPortNameStatic = route_arrival_port_name.value;
const arrivalDateTimeStatic = route_departure_date_time.value;
const arrivalTimeZoneStatic = route_departure_time_zone.value;

const reporting_date_time_utc = computed(() =>
  reportingDateTimeUTC.value
    ? formatUTC(new Date(reportingDateTimeUTC.value))
    : UTCPlaceholder
);

const route_departure_date_time_utc = computed(() =>
  routeDepartureDateTimeUTC.value
    ? formatUTC(new Date(routeDepartureDateTimeUTC.value))
    : UTCPlaceholder
);

const route_arrival_date_time_utc = computed(() =>
  routeArrivalDateTimeUTC.value
    ? formatUTC(new Date(routeArrivalDateTimeUTC.value))
    : UTCPlaceholder
);

const route_arrival_date_time_edited_utc = computed(() =>
  routeArrivalDateTimeEditedUTC.value
    ? formatUTC(new Date(routeArrivalDateTimeEditedUTC.value))
    : UTCPlaceholder
);
</script>
