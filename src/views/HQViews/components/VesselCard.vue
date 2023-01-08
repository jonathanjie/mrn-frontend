<template>
  <button
    @click="navigate"
    class="flex h-20 mx-12 rounded-xl min-w-max z-10 bg-white drop-shadow mt-5 p-4 items-center"
  >
    <div class="flex w-full mr-16 ml-0.5 items-center justify-between">
      <!-- Sailing Icon -->
      <img
        v-if="vesselStatus === 'sailing'"
        src="@/assets/icons/My_Vessels/sailing_icon.svg"
        class="rounded-full bg-blue-50 h-11 w-11 py-2.5 px-3"
      />

      <!-- Cargo operation icon (Need to check background color) -->
      <img
        v-if="vesselStatus === 'cargo'"
        src="@/assets/icons/My_Vessels/cargo_icon.svg"
        class="rounded-full bg-blue-50 h-11 w-11 py-2.5 px-3"
      />

      <!-- Bunkering Icon (Need to check background color) -->
      <img
        v-if="vesselStatus === 'bunkering'"
        src="@/assets/icons/My_Vessels/bunkering_icon.svg"
        class="rounded-full bg-blue-50 h-11 w-11 py-2.5 px-3"
      />
      <!-- Waiting Icon -->
      <img
        v-if="vesselStatus === 'waiting'"
        src="@/assets/icons/My_Vessels/waiting_icon.svg"
        class="rounded-full bg-yellow-25 h-11 w-11 py-2.5 px-3"
      />

      <!-- Etc Icon -->
      <img
        v-if="vesselStatus === 'etc'"
        src="@/assets/icons/My_Vessels/etc_icon.svg"
        class="rounded-full bg-gray-25 h-11 w-11 py-2.5 px-3"
      />

      <div class="flex flex-col w-28">
        <span class="text-12 text-gray-500">{{ $t("name") }}</span>
        <span class="text-14 text-gray-700">{{ props.vesselName }}</span>
      </div>
      <div class="flex flex-col w-28">
        <span class="text-12 text-gray-500">{{ $t("type") }}</span>
        <span class="text-14 text-gray-700">{{ props.loadType }}</span>
      </div>
      <div class="flex flex-col w-28">
        <span class="text-12 text-gray-500">{{ $t("flag") }}</span>
        <span class="text-14 text-gray-700">{{ props.flag }}</span>
      </div>
      <div class="flex flex-col w-28">
        <span class="text-12 text-gray-500">{{ $t("imoNo") }}</span>
        <span class="text-14 text-gray-700">{{ props.imoNo }}</span>
      </div>
      <div class="flex flex-col w-28">
        <span class="text-12 text-gray-500">{{ $t("shipSize") }}</span>
        <span class="text-14 text-gray-700">{{ props.shipSize }} DWT</span>
      </div>
      <div class="flex flex-col w-28">
        <span class="text-12 text-gray-500">{{ $t("loadingCondition") }}</span>
        <span class="text-14 text-gray-700">{{ props.loadingCondition }}</span>
      </div>
      <div
        v-if="reportStatus === 'uploaded'"
        class="flex rounded-xl h-7 w-auto bg-green-50"
      >
        <ul class="list-disc p-0.5 text-14">
          <li class="text-green-500">
            <span class="text-green-700"
              >{{ $t("uploadedStatus") }}: {{ props.updatedDate }}</span
            >
          </li>
        </ul>
      </div>
      <!-- <div
        v-if="reportStatus === 'error'"
        class="flex rounded-xl h-7 w-auto bg-red-50"
      >
        <ul class="list-disc p-0.5 text-14">
          <li class="text-red-500">
            <span class="text-red-700"
              >{{ $t("errorStatus") }}: {{ props.updatedDate }}</span
            >
          </li>
        </ul>
      </div> -->
      <div
        v-if="reportStatus === 'pending'"
        class="flex rounded-xl h-7 w-auto bg-orange-50"
      >
        <ul class="list-disc p-0.5 text-14">
          <li class="text-orange-500">
            <span class="text-orange-700">{{ $t("pendingStatus") }}</span>
          </li>
        </ul>
      </div>
    </div>
  </button>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { useVoyageStore } from "@/stores/useVoyageStore";
const props = defineProps({
  vesselStatus: String,
  vesselName: String,
  loadType: String,
  flag: String,
  imoNo: Number,
  shipSize: String,
  loadingCondition: String,
  reportStatus: String,
  updatedDate: String,
});
const router = useRouter();
const store = useVoyageStore();
console.log("Report status in vessel", props.reportStatus);
console.log("Updated date in vessel card", props.updatedDate);
const getVoyages = async (imo) => {
  return await axios
    .get(`https://testapi.marinachain.io/marinanet/ships/${imo}/voyages/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getReports = async (imo) => {
  return await axios
    .get(`https://testapi.marinachain.io/marinanet/ships/${imo}/reports/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const navigate = async () => {
  const voyages = await getVoyages(props.imoNo);
  const reports = await getReports(props.imoNo);
  store.voyages = voyages;
  let output = {};
  for (let i of reports) {
    for (let j of voyages) {
      if (i.uuid == j.uuid) {
        output[i.uuid] = i.reports.reverse();
      }
    }
  }
  store.reports = output;
  console.log("This thing runs");
  router.push({
    name: "speed-graph-overview",
    params: { vesselname: props.vesselName, imo: props.imoNo },
  });
};
</script>
