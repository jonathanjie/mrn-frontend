<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="flex items-center col-span-2">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        <slot>{{ $t("cargoOperation") }}</slot>
      </span>
    </div>
    <div class="col-span-2 lg:col-span-1">
      <div class="grid grid-cols-5 mb-5 border">
        <div class="col-span-2 text-blue-700 p-3 bg-gray-50 text-14">
          {{ $t("loadCondition") }}
          <span class="text-red-500 text-16 ml-1">*</span>
        </div>
        <select
          v-model="load_condition"
          class="col-span-3 p-3 border-l text-14 focus:outline-0"
          :class="
            load_condition === 'default' ? 'text-gray-400' : 'text-gray-700'
          "
        >
          <option selected disabled value="default">
            {{ $t("selectAnOption") }}
          </option>
          <option
            v-for="(val, label) in LOAD_CONDITIONS"
            :key="val"
            :value="val"
          >
            {{ $t(label) }}
          </option>
        </select>
      </div>
      <div class="grid grid-cols-5">
        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14"
        >
          {{ $t("loading") }}
        </div>
        <div class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t">
          <input
            v-model="loading"
            @keypress="preventNaN($event, loading)"
            placeholder="0"
            class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>{{ $t(cargoUnit) }}</MiniUnitDisplay>
        </div>

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14"
        >
          {{ $t("unloading") }}
        </div>
        <div class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t">
          <input
            v-model="unloading"
            @keypress="preventNaN($event, unloading)"
            placeholder="0"
            class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>{{ $t(cargoUnit) }}</MiniUnitDisplay>
        </div>

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t lg:border-y bg-gray-50 text-14"
        >
          {{ $t("totalAmount") }}
        </div>
        <div
          class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t"
          :class="isFirstReport ? 'bg-white' : 'bg-gray-50'"
        >
          <input
            v-if="isFirstReport"
            v-model="totalAmountStatic"
            @keypress="preventNaN($event, totalAmountStatic)"
            placeholder="0"
            class="w-24 text-14 focus:outline-0 bg-white text-gray-700"
          />
          <input
            v-else
            v-model="totalAmountComputed"
            class="w-24 text-14 focus:outline-0 bg-gray-50 text-gray-400"
          />
          <MiniUnitDisplay>{{ $t(cargoUnit) }}</MiniUnitDisplay>
        </div>

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-y lg:border-t-0 bg-gray-50 text-14"
        >
          {{ $t("time") }}
        </div>
        <div class="flex col-span-3 lg:col-span-3 p-2 pl-4 border">
          <input
            v-model="time"
            @keypress="preventNaN($event, time)"
            placeholder="0"
            class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>HRS</MiniUnitDisplay>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { preventNaN } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { useDepartureSBYReportStore } from "@/stores/useDepartureSBYReportStore";
import { storeToRefs } from "pinia";
import { LOAD_CONDITIONS } from "@/utils/options";

const store = useDepartureSBYReportStore();
const {
  isFirstReport,
  loadCondition: load_condition,
  loading: loading,
  unloading: unloading,
  totalAmountComputed,
  totalAmountStatic,
  time: time,
  cargoUnit: cargoUnit,
} = storeToRefs(store);
</script>
