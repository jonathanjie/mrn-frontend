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
const displacement = computed(
  () => props.report.actualperformancedata.displacement
);
const avg_speed = computed(
  () => props.report.actualperformancedata.speed_average
);
const avg_rpm = computed(() => props.report.actualperformancedata.rpm_average);
const me_fo_consumption = computed(
  () => props.report.actualperformancedata.me_average_daily_fo_consumption
);

// Fuel Consumption
const fuelMachineTypes = computed(() =>
  Object.keys(
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set[0]
      .breakdown
  )
);
const fuelOilDataSet = computed(
  () => props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set
);
const getFuelOilCols = () => "grid-cols-" + (fuelMachineTypes.value.length + 2);
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
          $t("actualPerformancePilotToPilot")
        }}</span>
      </div>
      <div class="col-span-2 lg:col-span-1">
        <div class="grid grid-cols-5 border bg-gray-50">
          <div
            class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
          >
            {{ $t("totalDistanceByObservation") }}
          </div>
          <div class="flex col-span-3 p-2 pl-4 border-b">
            <input
              v-model="totalDistanceObs"
              @keypress="preventNaN($event, totalDistanceObs)"
              placeholder="0"
              disabled
              class="w-16 text-14 text-gray-700 focus:outline-0 bg-gray-50"
            />
            <MiniUnitDisplay>NM</MiniUnitDisplay>
          </div>
          <div
            class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
          >
            {{ $t("totalSailingTime") }}
          </div>
          <div class="flex col-span-3 p-2 pl-4 border-b">
            <input
              v-model="totalSailingTime"
              @keypress="preventNaN($event, totalSailingTime)"
              placeholder="0"
              disabled
              class="w-16 text-14 text-gray-700 focus:outline-0 bg-gray-50"
            />
            <MiniUnitDisplay>HRS</MiniUnitDisplay>
          </div>
          <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
            {{ $t("displacement") }}
          </div>
          <div class="flex col-span-3 p-2 pl-4">
            <input
              v-model="displacement"
              @keypress="preventNaN($event, displacement)"
              placeholder="0"
              disabled
              class="w-16 text-14 text-gray-700 focus:outline-0 bg-gray-50"
            />
            <MiniUnitDisplay>MT</MiniUnitDisplay>
          </div>
        </div>
      </div>
      <div class="col-span-2 lg:col-span-1">
        <div class="grid grid-cols-5 border bg-gray-50">
          <div class="col-span-2 text-blue-700 p-3 border-r border-b text-14">
            {{ $t("averageSpeed") }}
          </div>
          <div class="flex col-span-3 p-2 pl-4 border-b">
            <input
              v-model="avg_speed"
              @keypress="preventNaN($event, avg_speed)"
              placeholder="0"
              disabled
              class="w-16 text-14 text-gray-700 focus:outline-0 bg-gray-50"
            />
            <MiniUnitDisplay>KNOTS</MiniUnitDisplay>
          </div>
          <div
            class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
          >
            {{ $t("averageRPM") }}
          </div>
          <div class="flex col-span-3 p-2 pl-4 border-b">
            <input
              v-model="avg_rpm"
              @keypress="preventNaN($event, avg_rpm)"
              placeholder="0"
              disabled
              class="w-16 text-14 text-gray-700 focus:outline-0 bg-gray-50"
            />
            <MiniUnitDisplay>RPM</MiniUnitDisplay>
          </div>
          <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
            {{ $t("mefoConsumptionPerDay") }}
          </div>
          <div class="flex col-span-3 p-2 pl-4">
            <input
              v-model="me_fo_consumption"
              @keypress="preventNaN($event, me_fo_consumption)"
              placeholder="0"
              disabled
              class="w-16 text-14 text-gray-700 focus:outline-0 bg-gray-50"
            />
            <MiniUnitDisplay>MT</MiniUnitDisplay>
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
          $t("totalConsumptionPilotToPilot")
        }}</span>
      </div>
      <div class="grid border bg-gray-25 text-14" :class="getFuelOilCols()">
        <div></div>
        <div
          v-for="item in fuelMachineTypes"
          :key="item"
          class="p-3 border-l text-blue-700"
        >
          {{ $t(item) }}
        </div>
        <div class="p-3 border-l text-blue-700">{{ $t("total") }}</div>

        <span
          v-for="(fuelOilData, index) of fuelOilDataSet"
          :key="index"
          :class="'col-span-full grid ' + getFuelOilCols()"
        >
          <div class="text-blue-700 p-3 border-t">
            {{ $t(fuelOilData.fuel_oil_type) }}
          </div>
          <input
            v-for="entry of Object.entries(fuelOilData.breakdown)"
            :key="entry"
            v-model="entry[1]"
            placeholder="000.00"
            disabled
            class="p-3 pl-4 border-t border-l text-14 text-gray-700 focus:outline-0 bg-gray-50"
          />
          <div
            class="col-span-1 text-gray-700 p-3 border-t border-l bg-gray-50 pl-4 text-14"
          >
            {{ fuelOilData.total_consumption }}
          </div>
        </span>
      </div>
    </div>
  </div>
</template>
