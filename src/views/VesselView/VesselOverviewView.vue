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
      :start="portCodeToPortName[voyage.departure_port]"
      :mid="'At Sea'"
      :dest="portCodeToPortName[voyage.arrival_port]"
      :reports="reports[voyage.uuid]"
      :voyage-details="JSON.stringify(voyageDetails[voyage.uuid])"
      :num="voyage.voyage_num"
      :is-initially-open="index == 0"
    ></VoyageCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VoyageCard from "../../components/VoyageCard.vue";
import { useAuthStore } from "@/stores/auth.store";
import { readableUTCDate } from "@/utils/helpers";
import { ENUM_TO_REPORT_TYPE } from "@/constants";

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
  console.log("reports", json);

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
  // console.log("voyages", json);

  if (response.length == 0) {
    isEmpty = true;
    console.log("NO DATA");
  }
  return json;
};

const getLoadingCondition = async (uuid) => {
  return "Ballast"; // temp fix
  // const response = await fetch(
  //   "https://testapi.marinachain.io/marinanet/reports/" + uuid,
  //   {
  //     headers: {
  //       Authorization: "Bearer " + auth.jwt,
  //       "Content-Type": "application/json",
  //     },
  //     method: "GET",
  //   }
  // );

  // const json = response.json();

  // return json.curLoadingCondition;
};

const voyages = await getVoyages(imoReg);
const voyageDetails = {}; // uuid : arr of voyage details
const reports = {}; // uuid : arr of reports

for (let i = 0; i < voyages.length; i++) {
  const uuid = voyages[i].uuid;
  const json = await getReports(uuid);
  reports[uuid] = [];
  voyageDetails[uuid] = {};

  let curLoadingCondition = "";
  let curLegNo = "";
  let lastReportNo = {
    NOON: 0,
    DSBY: 0,
    DCSP: 0,
    ASBY: 0,
    AFWE: 0,
    BDN: 0,
    // evntp: 0,
    // evntc: 0,
    // noonp: 0,
    // noonc: 0.
  };

  // update report details
  for (let j of json) {
    // oldest to most recent
    const ret = {};

    if (j.report_type === "DSBY") {
      // update current load condition for every departure sby (new leg)
      curLoadingCondition = await getLoadingCondition(uuid);
    }
    curLegNo = j.leg_num; // update current leg no for every report
    lastReportNo[j.report_type] = j.report_num; // update most recent report no for each type

    ret["report_type"] = j.report_type;
    ret["report_no"] = ENUM_TO_REPORT_TYPE[j.report_type] + " " + j.report_num;
    ret["departure"] = j.route.departure_port || "N/A";
    ret["arrival"] = j.route.arrival_port || "N/A";
    ret["loading_condition"] = curLoadingCondition || "N/A";
    ret["date_of_report"] = readableUTCDate(new Date(j.report_date));

    reports[uuid].push(ret);
  }

  // update voyage details
  voyageDetails[uuid]["voyage_no"] = voyages[i].voyage_num;
  voyageDetails[uuid]["cur_loading_condition"] = curLoadingCondition || "N/A";
  voyageDetails[uuid]["cur_leg_no"] = curLegNo || "N/A";
  voyageDetails[uuid]["last_noon_report_no"] = lastReportNo["NOON"];
  voyageDetails[uuid]["last_deps_report_no"] = lastReportNo["DSBY"];
  voyageDetails[uuid]["last_depr_report_no"] = lastReportNo["DCSP"];
  voyageDetails[uuid]["last_arrs_report_no"] = lastReportNo["ASBY"];
  voyageDetails[uuid]["last_arrf_report_no"] = lastReportNo["AFWE"];
  voyageDetails[uuid]["last_bdn_report_no"] = lastReportNo["BDN"];
  // voyageDetails[uuid]["last_evntp_report_no"] = lastEvntpReportNo;
  // voyageDetails[uuid]["last_evntc_report_no"] = lastEvntcReportNo;
  // voyageDetails[uuid]["last_noonp_report_no"] = lastNoonpReportNo;
  // voyageDetails[uuid]["last_noonc_report_no"] = lastNooncReportNo;
}

// TODO: replace with helper conversion method
const portCodeToPortName = ref({
  "SG PPT": "Singapore",
  "KR USN": "Ulsan, South Korea",
});
</script>
