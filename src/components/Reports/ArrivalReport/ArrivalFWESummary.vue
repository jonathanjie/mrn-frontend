<template>
  <div
    class="grid bg-gray-25 border border-yellow-500 rounded-lg p-5 gap-4 divide-y divide-dashed shadow-card"
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
            {{ $t("totalDistanceByOBS") }}
          </div>
          <div class="flex col-span-3 p-2 pl-4 border-b bg-gray-50">
            <input
              v-model="total_distance_obs"
              @keypress="preventNaN($event, total_distance_obs)"
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
              v-model="total_time"
              @keypress="preventNaN($event, total_time)"
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
        <div class="p-3 border-l text-gray-700">{{ $t("me") }}</div>
        <div class="p-3 border-l text-gray-700">{{ $t("ge") }}</div>
        <div class="p-3 border-l text-gray-700">{{ $t("boiler") }}</div>
        <div class="p-3 border-l text-gray-700">{{ $t("igg") }}</div>
        <div class="p-3 border-l text-gray-700">{{ $t("total") }}</div>

        <div class="text-blue-700 p-3 border-t">{{ $t("lsfo") }}</div>
        <input
          v-model="lsfo_me"
          @keypress="preventNaN($event, lsfo_me)"
          placeholder="000.00"
          class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="lsfo_ge"
          @keypress="preventNaN($event, lsfo_ge)"
          placeholder="000.00"
          class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="lsfo_boiler"
          @keypress="preventNaN($event, lsfo_boiler)"
          placeholder="000.00"
          class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="lsfo_igg"
          @keypress="preventNaN($event, lsfo_igg)"
          placeholder="000.00"
          class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="lsfo_total"
          @keypress="preventNaN($event, lsfo_total)"
          placeholder="000.00"
          class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"
        />

        <div class="text-blue-700 p-3 border-t">{{ $t("mgo") }}</div>
        <input
          v-model="mgo_me"
          @keypress="preventNaN($event, mgo_me)"
          placeholder="000.00"
          class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="mgo_ge"
          @keypress="preventNaN($event, mgo_ge)"
          placeholder="000.00"
          class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="mgo_boiler"
          @keypress="preventNaN($event, mgo_boiler)"
          placeholder="000.00"
          class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="mgo_igg"
          @keypress="preventNaN($event, mgo_igg)"
          placeholder="000.00"
          class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="mgo_total"
          @keypress="preventNaN($event, mgo_total)"
          placeholder="000.00"
          class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { preventNaN } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { useArrivalFWEReportStore } from "@/stores/useArrivalFWEReportStore";
import { storeToRefs } from "pinia";

const store = useArrivalFWEReportStore();
const {
  totalDistanceObs: total_distance_obs,
  totalTime: total_time,
  lsfoMe: lsfo_me,
  lsfoGe: lsfo_ge,
  lsfoBoiler: lsfo_boiler,
  lsfoIgg: lsfo_igg,
  lsfoTotal: lsfo_total,
  mgoMe: mgo_me,
  mgoGe: mgo_ge,
  mgoBoiler: mgo_boiler,
  mgoIgg: mgo_igg,
  mgoTotal: mgo_total,
} = storeToRefs(store);
</script>
