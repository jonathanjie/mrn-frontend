<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">{{ $t("overview") }}</span>
    </div>
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <div class="col-span-2 text-blue-700 p-3 border-r border-b">
        {{ $t("reportNo") }}
      </div>
      <input
        class="col-span-3 p-3 border-b text-gray-700 bg-gray-50"
        disabled
        v-model="report_no"
      />
      <div class="col-span-2 text-blue-700 p-3 border-r">{{ $t("legNo") }}</div>
      <input
        class="col-span-3 p-3 text-gray-700 bg-gray-50"
        disabled
        v-model="leg_no"
      />
    </div>
    <div
      class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-gray-50 text-14"
    >
      <div class="col-span-2 text-blue-700 p-3 border-l border-y">
        {{ $t("voyageNo") }}
      </div>
      <input
        class="flex col-span-3 p-3 border text-gray-700 bg-gray-50"
        disabled
        v-model="voyage_no"
      />
      <div class="hidden xl:block bg-white col-span-2 row-span-1"></div>
      <input class="hidden xl:block bg-white col-span-3 p-3" disabled />
    </div>
  </div>
</template>

<script setup>
import { useArrivalEOSPReportStore } from "@/stores/useArrivalEOSPReportStore";
import { storeToRefs } from "pinia";

const store = useArrivalEOSPReportStore();
const {
  reportNo: report_no,
  legNo: leg_no,
  voyageNo: voyage_no,
} = storeToRefs(store);
</script>
