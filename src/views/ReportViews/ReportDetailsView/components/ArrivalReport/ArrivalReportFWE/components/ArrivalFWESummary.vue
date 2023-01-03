<script setup>
import { computed } from "vue";
import { preventNaN } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const totalDistanceObs = computed(
  () => props.report.actualperformancedata.distance_obs_total
);
const totalSailingTime = computed(
  () => props.report.actualperformancedata.sailing_time
);

// Fuel Consumption
const lsfo_me_sum = computed(
  () =>
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "LSFO"
    )[0].breakdown.ME
);
const lsfo_ge_sum = computed(
  () =>
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "LSFO"
    )[0].breakdown.GE
);
const lsfo_boiler_sum = computed(
  () =>
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "LSFO"
    )[0].breakdown.BLR
);
const lsfo_igg_sum = computed(
  () =>
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "LSFO"
    )[0].breakdown.IGG
);
const lsfo_total_sum = computed(
  () =>
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "LSFO"
    )[0].total_consumption
);
const mgo_me_sum = computed(
  () =>
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "LSFO"
    )[0].breakdown.ME
);
const mgo_ge_sum = computed(
  () =>
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "LSFO"
    )[0].breakdown.GE
);
const mgo_boiler_sum = computed(
  () =>
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "LSFO"
    )[0].breakdown.BLR
);
const mgo_igg_sum = computed(
  () =>
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "LSFO"
    )[0].breakdown.IGG
);
const mgo_total_sum = computed(
  () =>
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "LSFO"
    )[0].total_consumption
);
</script>

<template>
  <div
    class="grid bg-white border border-yellow-500 rounded-lg p-5 gap-4 divide-y divide-dashed shadow-card"
  >
    <div class="grid grid-cols-2 gap-4 mb-4">
      <!-- Actual Performance at Sea -->
      <div class="col-span-2 flex items-center">
        <img
          src="@/assets/icons/selected_yellow_gradient.svg"
          class="h-5 w-5"
        />
        <span class="text-yellow-700 text-16">{{
          $t("actualPerformancePortToPort")
        }}</span>
      </div>
      <div class="col-span-2 lg:col-span-1">
        <div class="grid grid-cols-5 border">
          <div
            class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
          >
            {{ $t("totalDistanceByObservation") }}
          </div>
          <div class="flex col-span-3 p-2 pl-4 border-b bg-gray-50">
            <input
              v-model="totalDistanceObs"
              @keypress="preventNaN($event, totalDistanceObs)"
              placeholder="0"
              disabled
              class="w-16 text-14 text-gray-700 focus:outline-0 bg-gray-50"
            />
            <MiniUnitDisplay>NM</MiniUnitDisplay>
          </div>
          <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
            {{ $t("totalTime") }}
          </div>
          <div class="flex col-span-3 p-2 pl-4 bg-gray-50">
            <input
              v-model="totalSailingTime"
              @keypress="preventNaN($event, totalSailingTime)"
              placeholder="0"
              disabled
              class="w-16 text-14 text-gray-700 focus:outline-0 bg-gray-50"
            />
            <MiniUnitDisplay>HRS</MiniUnitDisplay>
          </div>
        </div>
      </div>
    </div>

    <!-- Total Consumption (Pilot to Pilot) -->
    <div>
      <div class="flex items-center mb-5 mt-8">
        <img
          src="@/assets/icons/selected_yellow_gradient.svg"
          class="h-5 w-5"
        />
        <span class="text-yellow-700 text-16">{{
          $t("totalConsumptionPortToPort")
        }}</span>
      </div>
      <div class="grid grid-cols-6 border bg-gray-25 text-14">
        <div></div>
        <div class="p-3 border-l text-blue-700">{{ $t("me") }}</div>
        <div class="p-3 border-l text-blue-700">{{ $t("ge") }}</div>
        <div class="p-3 border-l text-blue-700">{{ $t("boiler") }}</div>
        <div class="p-3 border-l text-blue-700">{{ $t("igg") }}</div>
        <div class="p-3 border-l text-blue-700">{{ $t("total") }}</div>

        <div class="text-blue-700 p-3 border-t">{{ $t("lsfo") }}</div>
        <input
          v-model="lsfo_me_sum"
          @keypress="preventNaN($event, lsfo_me_sum)"
          placeholder="000.00"
          disabled
          class="p-3 pl-4 border-t border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="lsfo_ge_sum"
          @keypress="preventNaN($event, lsfo_ge_sum)"
          placeholder="000.00"
          disabled
          class="p-3 pl-4 border-t border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="lsfo_boiler_sum"
          @keypress="preventNaN($event, lsfo_boiler_sum)"
          placeholder="000.00"
          disabled
          class="p-3 pl-4 border-t border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="lsfo_igg_sum"
          @keypress="preventNaN($event, lsfo_igg_sum)"
          placeholder="000.00"
          disabled
          class="p-3 pl-4 border-t border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="lsfo_total_sum"
          @keypress="preventNaN($event, lsfo_total_sum)"
          placeholder="000.00"
          disabled
          class="p-3 pl-4 border-t border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
        />

        <div class="text-blue-700 p-3 border-t">{{ $t("mgo") }}</div>
        <input
          v-model="mgo_me_sum"
          @keypress="preventNaN($event, mgo_me_sum)"
          placeholder="000.00"
          disabled
          class="p-3 pl-4 border-t border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="mgo_ge_sum"
          @keypress="preventNaN($event, mgo_ge_sum)"
          placeholder="000.00"
          disabled
          class="p-3 pl-4 border-t border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="mgo_boiler_sum"
          @keypress="preventNaN($event, mgo_boiler_sum)"
          placeholder="000.00"
          disabled
          class="p-3 pl-4 border-t border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="mgo_igg_sum"
          @keypress="preventNaN($event, mgo_igg_sum)"
          placeholder="000.00"
          disabled
          class="p-3 pl-4 border-t border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="mgo_total_sum"
          @keypress="preventNaN($event, mgo_total_sum)"
          placeholder="000.00"
          disabled
          class="p-3 pl-4 border-t border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
        />
      </div>
    </div>
  </div>
</template>
