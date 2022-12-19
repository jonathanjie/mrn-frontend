<template>
  <!-- if there are no voyages in backend -->
  <div
    v-if="isEmpty"
    class="flex flex-col bg-gray-100 p-24 pb-52 m-12 justify-center content-center items-center space-y-2 rounded-xl"
  >
    <img src="@/assets/icons/empty.svg" class="h-28 w-28" />
    <span class="text-lg font-bold text-gray-800 pt-3">{{
      $t("noVoyageCreated")
    }}</span>
    <span class="text-14 text-gray-500">{{
      $t("clickOnCreateNewVoyageAboveToBegin")
    }}</span>
  </div>
  <div v-else class="bg-gray-50 flex flex-col mt-12">
    <VoyageCard
      v-for="(voyage, index) in voyages"
      :key="index"
      :num="voyage.voyage_num"
      :start="portCodeToPortName[voyage.departure_port]"
      :mid="'At Sea'"
      :dest="portCodeToPortName[voyage.arrival_port]"
      :reports="output[voyage.uuid]"
      :expanded="index == 0"
    ></VoyageCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VoyageCard from "../../components/VoyageCard.vue";
import { useAuthStore } from "@/stores/auth.store";
import { useAsyncStore } from "@/stores/asyncStore";

const asyncStore = useAsyncStore();
const auth = useAuthStore();
let isEmpty = ref(false);

let portCodeToPortName = ref({
  "SG PPT": "Singapore",
  "KR USN": "Ulsan, South Korea",
});

const getReports = async (imo) => {
  const response = await fetch(
    `https://testapi.marinachain.io/marinanet/ships/${imo}/reports/`,
    {
      headers: {
        Authorization: "Bearer " + auth.jwt,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  const json = response.json();
  return json;
};

const getVoyages = async (imo) => {
  const DUMMY_TOKEN = auth.jwt;
  const response = await fetch(
    "https://testapi.marinachain.io/marinanet/ships/" + imo + "/voyages/",
    {
      headers: {
        Authorization: "Bearer " + DUMMY_TOKEN,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  const json = response.json();
  //   console.log(json);

  if (response.length == 0) {
    isEmpty = true;
    console.log("NO DATA");
  }
  return json;
};
const imoReg = 1234567;
const voyages = await getVoyages(imoReg);
const reports = await getReports(imoReg); // uuid : arr of reports
let output = {};
for (let i of reports) {
  for (let j of voyages) {
    if (i.uuid == j.uuid) {
      output[i.uuid] = i.reports.reverse();
    }
  }
}
</script>
