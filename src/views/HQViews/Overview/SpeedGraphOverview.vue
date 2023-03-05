<template>
  <div class="flex mx-12 mt-10 flex-wrap">
    <div
      class="flex relative rounded-xl bg-white w-full shadow-md items-center"
    >
      <div v-if="shipSuccess" class="flex flex-col">
        <div class="flex flex-row items-center justify-evenly p-5">
          <img
            src="@/assets/icons/Speed_Graph/ship_image.svg"
            class="h-10 w-30 rounded-xl mr-6"
          />
          <div class="flex mr-12">
            <span class="text-14 text-gray-500">{{ $t("name") }}: </span>
            <span class="ml-1.5 text-14 text-gray-700 font-bold">{{
              props.vesselname
            }}</span>
          </div>
          <div class="flex mr-12">
            <span class="text-14 text-gray-500">{{ $t("type") }}: </span>
            <span class="ml-1.5 text-14 text-gray-700 font-bold">{{
              shipRef[ship.ship_type]
            }}</span>
          </div>
          <div class="flex mr-12">
            <span class="text-14 text-gray-500">{{ $t("capacity") }}: </span>
            <span class="ml-1.5 text-14 text-gray-700 font-bold">{{
              ship.shipspecs.deadweight_tonnage
            }}</span>
          </div>
          <div class="flex mr-12">
            <span class="text-14 text-gray-500">{{ $t("flag") }}: </span>
            <span class="ml-1.5 text-14 text-gray-700 font-bold">{{
              ship.shipspecs.flag
            }}</span>
          </div>
          <div class="flex mr-12">
            <span class="text-14 text-gray-500">{{ $t("imoNo") }}: </span>
            <span class="ml-1.5 text-14 text-gray-700 font-bold">{{
              imo
            }}</span>
          </div>
        </div>
        <!-- <div
          class="absolute bottom-0 left-0 flex flex-row pl-5 py-2.5 w-full items-center rounded-b-xl bg-gradient-to-r from-white to-red-50"
        >
          <div class="rounded-2xl bg-green-50 px-1.5 pl-2.5 mr-3.5">
            <span class="font-semibold text-12 text-gray-700 mr-2">{{
              $t("previousCII")
            }}</span>
            <span
              class="py-0.5 px-2.5 rounded-2xl bg-green-500 text-12 text-white"
              >{{ previousCIIGrade }}</span
            >
          </div>
          <div class="rounded-2xl bg-green-50 px-1.5 pl-2.5 mr-4">
            <span class="font-semibold text-12 text-gray-700 mr-2">{{
              $t("eexiGrade")
            }}</span>
            <span
              class="py-0.5 px-2.5 rounded-2xl bg-green-500 text-12 text-white"
              >{{ eexiGrade }}</span
            >
          </div>
          <img
            src="@/assets/icons/Speed_Graph/notification_divider.svg"
            class="mx-5 h-5 border-0 border-red-200"
          />
          <div class="hidden flex flex-row bg-transparent items-center">
            <img
              src="@/assets/icons/Speed_Graph/alert_icon.svg"
              class="bg-transparent w-5 h-5 mr-2"
            />
            <span class="text-12 text-red-500">{{ message }}</span>
          </div>
        </div> -->
      </div>
      <div v-else></div>
    </div>
    <div class="divide-y divide-solid w-full">
      <div>
        <div class="flex mt-12 w-full justify-between items-center">
          <div class="flex">
            <span class="flex items-center text-16 font-bold text-blue-800">{{
              $t("estimatedArrivalTime")
            }}</span>
            <div
              v-if="legsSuccess"
              class="flex bg-gray-100 rounded-2xl py-1 px-3 ml-2"
            >
              <span
                v-if="portCalls[0] !== undefined"
                class="text-14 font-semibold text-gray-700"
                >{{
                  dateHelper(portCalls[0].arrival_date, portCalls[0].arrival_tz)
                }}
                LT (UTC+{{ portCalls[0].arrival_tz }})</span
              >
              <span v-else>No report uploaded, please create a new voyage</span>
            </div>
            <div v-else></div>
          </div>
          <!-- <div
            class="hidden flex h-12 bg-gray-100 rounded-lg align-center p-px"
          >
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
        <!-- <div class="flex flex-row mt-6">
          <SpeedSideNav
            :speed="speed"
            :focDay="focDay"
            :distanceToGo="distanceToGo"
            :remainOnBoard="remainOnBoard"
          ></SpeedSideNav>
          <SpeedGraphPlot></SpeedGraphPlot>
        </div> -->
      </div>
      <!-- Port Calls -->
      <div class="flex mt-10 pt-10 flex-wrap">
        <span class="text-20 w-full text-blue-800 font-bold mb-4">{{
          $t("portCalls")
        }}</span>
        <div class="flex flex-row w-full">
          <div
            v-if="legsSuccess && portCalls[0] != undefined"
            class="flex flex-col w-full"
          >
            <PortCard
              v-for="port in portCalls"
              :key="port.id"
              :portCountry="port.arrival_port"
              :origin="port.departure_port"
              :destination="port.arrival_port"
              :departureTime="port.departure_date"
              :arrivalTime="port.arrival_date"
            ></PortCard>
          </div>
          <div
            v-else
            class="flex flex-col p-24 pb-52 m-12 justify-center items-center space-y-2 rounded-xl w-full"
          >
            <img src="@/assets/icons/empty.svg" class="h-28 w-28" />
            <span class="text-lg font-bold text-gray-800 pt-3">{{
              $t("noVoyageCreated")
            }}</span>
            <span class="text-14 text-gray-500"
              >Please create a new report on Daily Report</span
            >
          </div>
          <!-- <SpeedGraphReminders></SpeedGraphReminders> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TableOverview from "@/views/HQViews/Overview/components/TableOverview.vue";
import PortCard from "@/views/HQViews/Overview/components/PortCard.vue";
import { useHQStore } from "@/stores/useHQStore";
import constants from "@/constants";

const props = defineProps({
  vesselname: String,
  imo: String,
});
const shipRef = constants.shipRefs;
const store = useHQStore();
const { isSuccess: shipSuccess, data: ship } = store.shipQuery(props.imo);
const { isSuccess: legsSuccess, data: portCalls } = store.legsQuery(props.imo);
const { isSuccess: statsSuccess, data: stats } = store.statsQuery(props.imo);

const dateHelper = (arrival, difference) => {
  const date = new Date(arrival);
  date.setTime(date.getTime() + difference * 60 * 60 * 1000);
  return date.toUTCString().split(" ").slice(0, 5).join(" ");
};
// Unused variables for CII/EEXI/message feature
// const previousCIIGrade = "A";
// const eexiGrade = "2.03/2.2";
// const message =
//   "Low CII grade message goes here. [Provide action to follow up]";
</script>
