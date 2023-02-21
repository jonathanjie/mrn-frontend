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
              v-model="total_distance_obs"
              @keypress="preventNaN($event, total_distance_obs)"
              placeholder="0"
              disabled
              class="w-16 text-14 text-gray-400 focus:outline-0 bg-gray-50"
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
              v-model="total_sailing_time"
              @keypress="preventNaN($event, total_sailing_time)"
              placeholder="0"
              disabled
              class="w-16 text-14 text-gray-400 focus:outline-0 bg-gray-50"
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
              class="w-16 text-14 text-gray-400 focus:outline-0 bg-gray-50"
            />
            <MiniUnitDisplay>TON</MiniUnitDisplay>
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
              class="w-16 text-14 text-gray-400 focus:outline-0 bg-gray-50"
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
              class="w-16 text-14 text-gray-400 focus:outline-0 bg-gray-50"
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
              class="w-16 text-14 text-gray-400 focus:outline-0 bg-gray-50"
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
          v-for="item in machinery"
          :key="item"
          class="p-3 border-l text-blue-700"
        >
          {{ $t(item) }}
        </div>
        <div class="p-3 border-l text-blue-700">{{ $t("total") }}</div>

        <span
          v-for="(fuelOil, index) of fuelOils"
          :key="index"
          :class="'col-span-full grid ' + getFuelOilCols()"
        >
          <div class="text-blue-700 p-3 border-t">{{ $t(fuelOil) }}</div>
          <input
            v-for="item of machinery"
            :key="item"
            v-model="fuel_oil_breakdowns_sum[fuelOil][item]"
            @keypress="
              preventNaN($event, fuel_oil_breakdowns_sum[fuelOil][item])
            "
            placeholder="000.00"
            disabled
            class="p-3 pl-4 border-t border-l text-14 text-gray-400 focus:outline-0 bg-gray-50"
          />
          <input
            v-model="fuel_oil_total_consumptions_sum[fuelOil]"
            @keypress="
              preventNaN($event, fuel_oil_total_consumptions_sum[fuelOil])
            "
            placeholder="000.00"
            disabled
            class="p-3 pl-4 border-t border-l bg-gray-50 text-14 text-gray-400 focus:outline-0"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { preventNaN } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { storeToRefs } from "pinia";
import { useArrivalEOSPReportStore } from "@/stores/useArrivalEOSPReportStore";

const store = useArrivalEOSPReportStore();
const {
  fuelOils,
  machinery,
  totalDistanceObs: total_distance_obs,
  totalSailingTime: total_sailing_time,
  displacement: displacement,
  avgSpeed: avg_speed,
  avgRpm: avg_rpm,
  meFoConsumption: me_fo_consumption,
  fuelOilBreakdownsSum: fuel_oil_breakdowns_sum,
  fuelOilTotalConsumptionsSum: fuel_oil_total_consumptions_sum,
} = storeToRefs(store);

const getFuelOilCols = () => "grid-cols-" + (machinery.value.length + 2);
</script>
