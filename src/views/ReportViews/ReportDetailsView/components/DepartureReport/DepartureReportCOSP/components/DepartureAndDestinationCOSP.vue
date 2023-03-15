<script setup>
import { computed } from "vue";
import {
  textInputOptions,
  format,
  convertUTCToLT,
  // formatUTC
} from "@/utils/helpers.js";
import { TIMEZONES } from "@/utils/options";
// import { UTCPlaceholder } from "@/constants";
// import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const departurePortCountry = computed(
  () => props.report.reportroute.departure_port.split(" ")[0]
);
const departurePortName = computed(
  () => props.report.reportroute.departure_port.split(" ")[1]
);
const departureDateTime = computed(() =>
  convertUTCToLT(
    new Date(props.report.reportroute.departure_date),
    props.report.reportroute.departure_tz
  )
);
const departureTimeZone = computed(() => props.report.reportroute.departure_tz);

const destinationPortCountry = computed(
  () => props.report.reportroute?.arrival_port.split(" ")[0] ?? ""
);
const destinationPortName = computed(
  () => props.report.reportroute?.arrival_port.split(" ")[1] ?? ""
);
const destinationEstimatedArrival = computed(() =>
  props.report.reportroute.arrival_tz != undefined
    ? convertUTCToLT(
        new Date(props.report.reportroute.arrival_date),
        props.report.reportroute?.arrival_tz
      )
    : ""
);
const destinationTimeZone = computed(
  () => props.report.reportroute?.arrival_tz ?? ""
);
</script>

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
          v-model="departurePortCountry"
          :placeholder="$t('inputLocode2')"
          disabled
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0 bg-gray-50"
        />
        <input
          v-model="departurePortName"
          :placeholder="$t('inputLocode3')"
          disabled
          class="col-span-3 p-3 text-gray-700 border-l focus:outline-0 bg-gray-50"
        />
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14">
        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("timeZone") }}
        </div>
        <div class="flex col-span-3 border-b bg-gray-50">
          <select
            disabled
            class="grow self-center p-3 text-14 focus:outline-0 bg-gray-50 text-gray-700 bg-gray-50"
            v-model="departureTimeZone"
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
            disabled
            v-model="departureDateTime"
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
          <!-- <MiniUnitDisplay
            class="absolute right-0 min-w-fit"
            :class="departure_date_time ? 'mr-9' : 'mr-2'"
            >{{ departure_date_time_utc }}</MiniUnitDisplay
          > -->
        </div>
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
          v-model="destinationPortCountry"
          :placeholder="$t('inputLocode2')"
          disabled
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0 bg-gray-50"
        />
        <input
          v-model="destinationPortName"
          :placeholder="$t('inputLocode3')"
          disabled
          class="col-span-3 p-3 text-gray-700 border-l focus:outline-0 bg-gray-50"
        />
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14">
        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("timeZone") }}
        </div>
        <div class="flex col-span-3 border-b bg-gray-50">
          <select
            disabled
            class="grow self-center p-3 text-14 focus:outline-0 bg-gray-50"
            :class="
              destinationTimeZone === 'default'
                ? 'text-gray-400'
                : 'text-gray-700'
            "
            v-model="destinationTimeZone"
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
        <div class="col-span-3 relative flex items-center">
          <DatePicker
            v-model="destinationEstimatedArrival"
            disabled
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
          <!-- <MiniUnitDisplay
            class="absolute right-0 min-w-fit"
            :class="destination_estimated_arrival ? 'mr-9' : 'mr-2'"
            >{{ destination_estimated_arrival_utc }}</MiniUnitDisplay
          > -->
        </div>
      </div>
    </div>
  </div>
</template>
