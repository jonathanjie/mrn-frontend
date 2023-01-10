<template>
  <div class="w-full px-12 p-10">
    <div class="flex justify-between items-center mb-5">
      <div class="flex">
        <span class="text-16 font-bold text-blue-800">{{
          $t("estimatedArrivalTime")
        }}</span>
        <div
          v-if="legsSuccess"
          class="flex bg-gray-100 rounded-2xl py-1 px-3 ml-2"
        >
          <!-- <span class="text-14 font-semibold text-gray-700">{{
            new Date(portCalls[0].arrival_date).toUTCString()
          }}</span> -->
        </div>
      </div>
      <!-- <div class="hidden flex h-12 bg-gray-100 rounded-lg align-center p-px">
        <button
          class="py-2 px-3 rounded-lg m-1"
          :class="weeklyFlag ? 'bg-white shadow-md' : 'bg-transparent'"
          @click="weeklyFlag = !weeklyFlag"
        >
          <span
            class="text-14 font-semibold"
            :class="weeklyFlag ? 'text-blue-700' : 'text-gray-500'"
            >{{ $t("weekly") }}</span
          >
        </button>
        <button
          class="py-2 px-3 rounded-lg m-1"
          :class="!weeklyFlag ? 'bg-white shadow-md' : 'bg-transparent'"
          @click="weeklyFlag = !weeklyFlag"
        >
          <span
            class="text-14 font-semibold"
            :class="!weeklyFlag ? 'text-blue-700' : 'text-gray-500'"
            >{{ $t("voyage") }}</span
          >
        </button>
      </div> -->
    </div>
    <TableOverview v-if="statsSuccess" :stats="stats" />
  </div>
</template>

<script setup>
import TableOverview from "@/views/HQViews/components/TableOverview.vue";
import { useCrewStore } from "@/stores/useCrewStore";

const props = defineProps({
  vesselname: String,
  imo: String,
});

const store = useCrewStore();
const { isSuccess: legsSuccess, data: portCalls } = store.legsQuery(props.imo);
const { isSuccess: statsSuccess, data: stats } = store.statsQuery(props.imo);
</script>
