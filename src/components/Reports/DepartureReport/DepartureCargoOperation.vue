<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="flex items-center col-span-2">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        <slot>{{ $t("cargoOperation") }}</slot>
      </span>
    </div>
    <div class="col-span-2 lg:col-span-1">
      <div class="grid grid-cols-5 my-5 border">
        <div class="col-span-2 text-blue-700 p-3 bg-gray-50 text-14">
          {{ $t("loadCondition") }}
        </div>
        <select
          v-model="loadCondition"
          class="col-span-3 p-3 border-l text-14 focus:outline-0"
          :class="
            loadCondition === 'default' ? 'text-gray-400' : 'text-gray-700'
          "
        >
          <option selected disabled value="default">
            {{ $t("selectAnOption") }}
          </option>
          <option value="ballast">{{ $t("ballast") }}</option>
          <option value="laden">{{ $t("laden") }}</option>
          <option value="eastbound">{{ $t("eastbound") }}</option>
          <option value="westbound">{{ $t("westbound") }}</option>
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
            :placeholder="$t('inputDetails')"
            class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>Unit</MiniUnitDisplay>
        </div>

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14"
        >
          {{ $t("unloading") }}
        </div>
        <div class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t">
          <input
            v-model="unloading"
            @keypress="preventNaN($event, loading)"
            :placeholder="$t('inputDetails')"
            class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>Unit</MiniUnitDisplay>
        </div>

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t lg:border-y bg-gray-50 text-14"
        >
          {{ $t("totalAmount") }}
        </div>
        <div class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t">
          <input
            v-model="totalAmount"
            @keypress="preventNaN($event, totalAmount)"
            :placeholder="$t('inputDetails')"
            class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>Unit</MiniUnitDisplay>
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
            :placeholder="$t('inputDetails')"
            class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>HRS</MiniUnitDisplay>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { preventNaN } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { useDepartureSBYReportStore } from "@/stores/useDepartureSBYReportStore";
import { storeToRefs } from "pinia";

const store = useDepartureSBYReportStore;

const { loadCondition, loading, unloading, totalAmount, time } =
  storeToRefs(store);

// const data = reactive({
//   load_condition: "default",
//   loading: "",
//   unloading: "",
//   total_amount: "",
//   time: "",
// });
</script>
