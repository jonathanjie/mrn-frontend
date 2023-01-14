<script setup>
import { computed } from "vue";
import {
  textInputOptions,
  format,
  // formatUTC
} from "@/utils/helpers.js";
import { storeToRefs } from "pinia";
import { useArrivalEOSPReportStore } from "@/stores/useArrivalEOSPReportStore";
import { OPERATIONS } from "@/utils/options";
// import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
// import { UTCPlaceholder } from "@/constants";
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
const departureDateTime = computed(
  () => props.report.reportroute?.departure_date ?? ""
);

const arrivalPortCountry = computed(
  () => props.report.reportroute?.arrival_port.split(" ")[0] ?? ""
);
const arrivalPortName = computed(
  () => props.report.reportroute?.arrival_port.split(" ")[1] ?? ""
);

const store = useArrivalEOSPReportStore();
const {
  plannedOperations: planned_operations,
  otherPlannedOperation: other_planned_operation,
} = storeToRefs(store);

// const departure_date_time_utc = departureDateTimeUTC.value
//   ? formatUTC(new Date(departureDateTimeUTC.value))
//   : UTCPlaceholder;
</script>

<template>
  <div
    class="grid grid-cols-1 xl:grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card"
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
          disabled
          class="col-span-3 p-3 text-gray-700 bg-gray-50 border-l border-b disabled:text-gray-500 disabled:bg-gray-50"
          v-model="departurePortCountry"
        />
        <input
          disabled
          class="col-span-3 p-3 text-gray-700 bg-gray-50 border-l disabled:text-gray-500 disabled:bg-gray-50"
          v-model="departurePortName"
        />
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 min-w-fit">
        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("dateAndTime") }}
        </div>
        <div class="col-span-3 relative flex">
          <DatePicker
            v-model="departureDateTime"
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
          <!-- <MiniUnitDisplay class="absolute right-0 min-w-fit mr-2">{{
            departure_date_time_utc
          }}</MiniUnitDisplay> -->
        </div>
      </div>
    </div>

    <!-- Arrival -->
    <div class="col-span-1">
      <div class="flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700 text-16">{{ $t("arrival") }}</span>
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
        <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">
          {{ $t("portName") }}
        </div>
        <input
          disabled
          class="col-span-3 p-3 text-gray-700 bg-gray-50 border-l border-b disabled:text-gray-500 disabled:bg-gray-50"
          v-model="arrivalPortCountry"
        />
        <input
          disabled
          class="col-span-3 p-3 text-gray-700 bg-gray-50 border-l disabled:text-gray-500 disabled:bg-gray-50"
          v-model="arrivalPortName"
        />
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14">
        <div class="col-span-2 row-span-2 text-blue-700 p-3 border-r">
          {{ $t("plannedOperation") }}
        </div>
        <div
          class="col-span-3 bg-white flex flex-col space-y-2 p-3 text-gray-700"
        >
          <div
            v-for="(val, key) in OPERATIONS"
            :key="val"
            class="flex align-center space-x-2"
          >
            <input
              disabled
              type="checkbox"
              :id="val"
              :value="val"
              v-model="planned_operations"
            />
            <label :for="val">{{ $t(key) }}</label>
          </div>
          <div class="flex align-center space-x-2">
            <input
              disabled
              type="checkbox"
              id="others"
              value="others"
              v-model="planned_operations"
            />
            <label for="others">{{ $t("others") }}</label>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 mt-5">
        <div class="col-span-2 text-blue-700 p-3">{{ $t("others") }}</div>
        <input
          disabled
          class="col-span-3 p-3 text-gray-700 border-l disabled:text-gray-500 disabled:bg-gray-50 focus:outline-0"
          :placeholder="$t('inputOtherPlannedOperation')"
          v-model="other_planned_operation"
        />
      </div>
    </div>
  </div>
</template>
