<template>
  <div v-if="statsSuccess && stats[0] != undefined" class="w-full px-12 p-10">
    <div class="flex justify-between items-center mb-5">
      <div class="flex items-center">
        <span class="text-16 font-bold text-blue-800">{{
          $t("estimatedArrivalTime")
        }}</span>
        <div
          v-if="legsSuccess"
          class="flex bg-gray-100 rounded-2xl py-1 px-3 ml-2 items-center"
        >
          <span class="text-14 font-semibold text-gray-700"
            >{{
              dateHelper(portCalls[0].arrival_date, portCalls[0].arrival_tz)
            }}
            LT (UTC+{{ portCalls[0].arrival_tz }})</span
          >
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
    <TableOverview :stats="stats" />
  </div>
  <div
    v-else
    class="flex flex-col p-24 pb-52 m-12 justify-center items-center space-y-2 rounded-xl"
  >
    <img src="@/assets/icons/empty.svg" class="h-28 w-28" />
    <span class="text-lg font-bold text-gray-800 pt-3">{{
      $t("noReportCreated")
    }}</span>
    <span class="text-14 text-gray-500">{{
      $t("addNewReportToContinue")
    }}</span>
  </div>
</template>

<script setup>
import TableOverview from "@/views/HQViews/Overview/components/TableOverview.vue";
import { useCrewStore } from "@/stores/useCrewStore";
import { convertUTCToLT } from "@/utils/helpers";
const props = defineProps({
  vesselname: String,
  imo: String,
});

const store = useCrewStore();
const { isSuccess: legsSuccess, data: portCalls } = store.legsQuery(props.imo);
const { isSuccess: statsSuccess, data: stats } = store.statsQuery(props.imo);

const dateHelper = (arrival, difference) => {
  const date = new Date(convertUTCToLT(new Date(arrival), difference));
  return date.toUTCString().split(" ").slice(0, 5).join(" ");
};
</script>
