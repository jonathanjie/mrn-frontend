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
      :reports="reports[voyage.uuid]"
      :isInitiallyOpen="index == 0"
    ></VoyageCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VoyageCard from "../../components/VoyageCard.vue";
import { useAuthStore } from "@/stores/auth.store";
import { readableUTCDate } from "@/utils/helpers";

const auth = useAuthStore();
let isEmpty = ref(false);
const imoReg = 1234567;

const getReports = async (voyage_uuid) => {
  const response = await fetch(
    `https://testapi.marinachain.io/marinanet/voyages/${voyage_uuid}/reports`,
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
  const response = await fetch(
    "https://testapi.marinachain.io/marinanet/ships/" + imoReg + "/voyages/",
    {
      headers: {
        Authorization: "Bearer " + auth.jwt,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  const json = response.json();
  console.log(json);

  if (response.length == 0) {
    isEmpty = true;
    console.log("NO DATA");
  }
  return json;
};

const getLoadCondition = async (uuid) => {
  const response = await fetch(
    "https://testapi.marinachain.io/marinanet/reports/" + uuid,
    {
      headers: {
        Authorization: "Bearer " + auth.jwt,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  const json = response.json();
  // console.log("loadcondition", json);

  return json.load_condition;
};

const voyages = await getVoyages(imoReg);
const reports = {}; // uuid : arr of reports

for (let i = 0; i < voyages.length; i++) {
  const uuid = voyages[i].uuid;
  const json = await getReports(uuid);
  let load_condition = "";
  reports[uuid] = [];

  for (let j of json.reverse()) {
    const ret = {};

    if (j.report_type === "DEP_SBY") {
      // update load condition for every departure sby (new leg)
      load_condition = await getLoadCondition(uuid);
    }

    ret["report_type"] = j.report_type;
    ret["report_no"] = j.report_type + " " + j.report_num;
    ret["departure"] = j.route.departure_port || "N/A";
    ret["arrival"] = j.route.arrival_port || "N/A";
    ret["loading_condition"] = load_condition || "N/A";
    ret["date_of_report"] = readableUTCDate(new Date(j.report_date));

    reports[uuid].push(ret);
  }
}

// TODO: replace with helper conversion method
const portCodeToPortName = ref({
  "SG PPT": "Singapore",
  "KR USN": "Ulsan, South Korea",
});
</script>
