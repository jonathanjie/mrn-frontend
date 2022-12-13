<template>
  <div class="flex mx-12 mt-6 flex-wrap">
    <div class="flex relative rounded-xl bg-white h-32 w-full shadow-md">
      <div class="flex flex-col">
        <div class="flex flex-row items-center justify-evenly p-5">
          <img
            src="@/assets/icons/Speed_Graph/ship_image.svg"
            class="h-10 w-30 rounded-xl mr-6"
          />
          <div class="flex mr-12">
            <span class="text-14 text-gray-500">{{ $t("name") }}: </span>
            <span class="ml-1.5 text-14 text-gray-700 font-bold">{{
              vesselname
            }}</span>
          </div>
          <div class="flex mr-12">
            <span class="text-14 text-gray-500">{{ $t("type") }}: </span>
            <span class="ml-1.5 text-14 text-gray-700 font-bold">{{
              payloadType
            }}</span>
          </div>
          <div class="flex mr-12">
            <span class="text-14 text-gray-500">{{ $t("capacity") }}: </span>
            <span class="ml-1.5 text-14 text-gray-700 font-bold">{{
              shipCapacity
            }}</span>
          </div>
          <div class="flex mr-12">
            <span class="text-14 text-gray-500">{{ $t("flag") }}: </span>
            <span class="ml-1.5 text-14 text-gray-700 font-bold">{{
              shipFlag
            }}</span>
          </div>
          <div class="flex mr-12">
            <span class="text-14 text-gray-500">{{ $t("imoNo") }}: </span>
            <span class="ml-1.5 text-14 text-gray-700 font-bold">{{
              imo
            }}</span>
          </div>
        </div>
        <div
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
        </div>
      </div>
    </div>
    <div class="divide-y divide-solid w-full">
      <div>
        <div class="flex mt-12 w-full justify-between items-center">
          <div class="flex">
            <span class="text-16 font-bold text-blue-800">{{
              $t("estimatedArrivalTime")
            }}</span>
            <div class="flex bg-gray-100 rounded-2xl py-1 px-3 ml-2">
              <span class="text-14 font-semibold text-gray-700">{{
                date
              }}</span>
            </div>
          </div>

          <div
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
          </div>
        </div>
        <div class="flex flex-row mt-6">
          <SpeedSideNav></SpeedSideNav>
          <!-- <SpeedGraphPlot></SpeedGraphPlot> -->
        </div>
      </div>
      <!-- Port Calls -->
      <div class="flex mt-10 pt-10 flex-wrap">
        <span class="text-20 w-full text-blue-800 font-bold mb-4">{{
          $t("portCalls")
        }}</span>
        <div class="flex flex-row">
          <div class="flex flex-col">
            <PortCard
              v-for="port in PortCalls"
              :portCountry="port.portCountry"
              :origin="port.origin"
              :destination="port.destination"
              :departureTime="port.departureTime"
              :arrivalTime="port.arrivalTime"
            ></PortCard>
          </div>
          <!-- <SpeedGraphReminders></SpeedGraphReminders> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SpeedSideNav from "./SpeedSideNav.vue";
import SpeedGraphPlot from "./SpeedGraphPlot.vue";
import PortCard from "@/components/PortCard.vue";
import SpeedGraphReminders from "./SpeedGraphReminders.vue";

let weeklyFlag = ref(true);
const imoReg = 1234567;
// Variables to be changed
const props = defineProps({
  vesselname: String,
  imo: String,
});

const payloadType = "Oil";
const shipCapacity = "300,000";
const shipFlag = "Panama";
const previousCIIGrade = "A";
const eexiGrade = "2.03/2.2";

const message =
  "Low CII grade message goes here. [Provide action to follow up]";
const date = "15 Jan 2023, 11:03PM";

const PortCalls = [
  {
    portCountry: "SINGAPORE",
    origin: "Onsan, Korea",
    destination: "Singapore",
    departureTime: "19 May 2022, 23:15 UTC",
    arrivalTime: "31 May 2022, 04:13 UTC",
  },
  {
    portCountry: "ONSAN, KOREA",
    origin: "Juaymah, Saudi Arabia",
    destination: "Onsan, Korea",
    departureTime: "27 Apr 2022, 23:15 UTC",
    arrivalTime: "18 May 2022, 04:13 UTC",
  },
  {
    portCountry: "JUAYMAH, SAUDI ARABIA",
    origin: "Ras Tanura, Saudi Arabia",
    destination: "Juaymah, Saudi Arabia",
    departureTime: "26 Apr 2022, 23:15 UTC",
    arrivalTime: "27 Apr 2022, 04:13 UTC",
  },
];

const getVoyages = async () => {
  const DUMMY_TOKEN = localStorage.getItem("jwt");
  const response = await fetch(
    "https://testapi.marinachain.io/marinanet/ships/" + imoReg + "/voyages/",
    {
      headers: {
        Authorization: "Bearer " + DUMMY_TOKEN,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  const voyages = await response.json();
  return voyages;

  // Can be used to sort the voyages based on their numbers
  // return voyages.sort(function (a, b) {
  //   return b.voyage_num - a.voyage_num;
  // });
};

const getReports = async (voyage_uuid) => {
  const DUMMY_TOKEN = localStorage.getItem("jwt");
  const response = await fetch(
    `https://testapi.marinachain.io/marinanet/voyages/${voyage_uuid}/reports`,
    {
      headers: {
        Authorization: "Bearer " + DUMMY_TOKEN,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  const json = await response.json();

  return json;
  // Need to figure out api call for all of this data
  // return json.sort(function (a, b) {
  //   return new Date(b.created_at) - new Date(a.created_at)
  // return new Date(b.report_date) - new Date(a.report_date)
  // })
};
const voyages = await getVoyages();
const latestReports = await getReports(voyages[0].uuid);
console.log(latestReports);
// reports.sort(function (a, b) {
//   return new Date(b.date) - new Date(a.date)
// })
</script>
