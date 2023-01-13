<script setup>
import { computed } from "vue";
import { preventNaN } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { CargoLoadConditions } from "@/constants";
import { useShipStore } from "@/stores/useShipStore";
import { storeToRefs } from "pinia";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const loadCondition = computed(
  () => props.report.cargooperation.load_condition
);
const loading = computed(() => props.report.cargooperation.loading);
const unloading = computed(() => props.report.cargooperation.unloading);
const totalAmount = computed(() => props.report.cargooperation.total);
const time = computed(() => props.report.cargooperation.time);

const store = useShipStore();
const { crewShipDetails } = storeToRefs(store);
const cargoUnit = computed(() => crewShipDetails.value.shipspecs.cargo_unit);
</script>

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
        </div>
        <select
          disabled
          v-model="loadCondition"
          class="col-span-3 p-3 border-l text-14 focus:outline-0 bg-gray-50"
          :class="
            loadCondition === 'default' ? 'text-gray-400' : 'text-gray-700'
          "
        >
          <option selected disabled value="default">
            {{ $t("selectAnOption") }}
          </option>
          <option :value="CargoLoadConditions.BALLAST">
            {{ $t("ballast") }}
          </option>
          <option :value="CargoLoadConditions.LADEN">{{ $t("laden") }}</option>
          <option :value="CargoLoadConditions.EASTBOUND">
            {{ $t("eastbound") }}
          </option>
          <option :value="CargoLoadConditions.WESTBOUND">
            {{ $t("westbound") }}
          </option>
        </select>
      </div>
      <div class="grid grid-cols-5">
        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14"
        >
          {{ $t("loading") }}
        </div>
        <div
          class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t bg-gray-50"
        >
          <input
            disabled
            v-model="loading"
            @keypress="preventNaN($event, loading)"
            :placeholder="$t('inputDetails')"
            class="w-24 bg-gray-50 text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>{{ $t(cargoUnit) }}</MiniUnitDisplay>
        </div>

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14"
        >
          {{ $t("unloading") }}
        </div>
        <div
          class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t bg-gray-50"
        >
          <input
            disabled
            v-model="unloading"
            @keypress="preventNaN($event, unloading)"
            :placeholder="$t('inputDetails')"
            class="w-24 bg-gray-50 text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>{{ $t(cargoUnit) }}</MiniUnitDisplay>
        </div>

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t lg:border-y bg-gray-50 text-14"
        >
          {{ $t("totalAmount") }}
        </div>
        <div
          class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t bg-gray-50"
        >
          <input
            disabled
            v-model="totalAmount"
            @keypress="preventNaN($event, totalAmount)"
            :placeholder="$t('inputDetails')"
            class="w-24 bg-gray-50 text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>{{ $t(cargoUnit) }}</MiniUnitDisplay>
        </div>

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-y lg:border-t-0 bg-gray-50 text-14"
        >
          {{ $t("time") }}
        </div>
        <div class="flex col-span-3 lg:col-span-3 p-2 pl-4 border bg-gray-50">
          <input
            disabled
            v-model="time"
            @keypress="preventNaN($event, time)"
            :placeholder="$t('inputDetails')"
            class="w-24 text-14 text-gray-700 focus:outline-0 bg-gray-50"
          />
          <MiniUnitDisplay>HRS</MiniUnitDisplay>
        </div>
      </div>
    </div>
  </div>
</template>
