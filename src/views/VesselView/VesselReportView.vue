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
  <div v-else class="relative bg-gray-50 flex flex-col mt-12">
    <GradientButton
      class="m-10 absolute right-0 -top-48"
      type="button"
      :disabled="isFetchingVoyages"
      @click="addVoyage()"
    >
      <template v-slot:content>{{ $t("createNewVoyage") }}</template>
    </GradientButton>
    <div class="contents" :key="update">
      <VoyageCard
        v-for="(voyage, index) in voyages.slice().reverse()"
        :key="index"
        :start="voyage.departure_port"
        :mid="'At Sea'"
        :dest="voyage.arrival_port"
        :reports="reports[voyage.uuid]"
        :voyage-details="JSON.stringify(voyageDetails[voyage.uuid])"
        :num="voyage.voyage_num"
        :is-initially-open="index == 0"
      ></VoyageCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import VoyageCard from "../../components/VoyageCard.vue";
import { readableUTCDate } from "@/utils/helpers";
import { ReportTypeToDisplay, Report } from "@/constants";
import { useShipStore } from "@/stores/useShipStore";
import { storeToRefs } from "pinia";
import axios from "axios";
import { UrlDomain } from "@/constants";
import GradientButton from "../../components/Buttons/GradientButton.vue";

const props = defineProps({
  imo: { type: String, require: true },
});

const isEmpty = ref(false);
const update = ref(0);

const store = useShipStore();
const { isFetchingVoyages, lastVoyageNo, nextVoyageNo } = storeToRefs(store);

// POST request to add in a new voyage
const addVoyage = async () => {
  const voyageData = {
    voyage_num: nextVoyageNo.value,
    imo_reg: props.imo,
  };
  isFetchingVoyages.value = true;
  await axios
    .post(`${UrlDomain.DEV}/marinanet/voyages/`, voyageData)
    .then((response) => {
      console.log(response);
      lastVoyageNo.value += 1;
      update.value += 1;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getAllReports = async (imo) => {
  return await axios
    .get(`https://testapi.marinachain.io/marinanet/ships/${imo}/reports/`)
    .then((response) => {
      console.log("Why isnt this correct", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getLoadingCondition = async (uuid) => {
  return "Ballast"; // temp fix
  // const response = await fetch(
  //   `${UrlDomain.DEV}/marinanet/reports/` + uuid,
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

// const voyages = await getVoyages(props.imo);
const voyages = await getAllReports(props.imo);

const voyageDetails = {}; // uuid : arr of voyage details
const reports = {}; // uuid : arr of reports

for (let i = 0; i < voyages.length; i++) {
  const uuid = voyages[i].uuid;
  const json = voyages[i].reports;
  reports[uuid] = [];
  voyageDetails[uuid] = {};

  let curLoadingCondition = "";
  let lastLegNo = 1;
  let lastLegUuid = "";
  let lastReportNo = {
    NOON: 0,
    DSBY: 0,
    DCSP: 0,
    ASBY: 0,
    AFWE: 0,
    BDN: 0,
    EVPO: 0,
    EVHB: 0,
    NNHB: 0,
    NNPO: 0,
  };

  // update report details
  for (let j of json) {
    // oldest to most recent
    const ret = {};

    if (j.report_type === Report.type.DEP_SBY) {
      // update current load condition for every departure sby (new leg)
      curLoadingCondition = await getLoadingCondition(uuid);
    }

    lastReportNo[j.report_type] = j.report_num; // update most recent report no for each type
    lastLegNo = j.voyage_leg.leg_num; // update last leg no
    lastLegUuid = j.voyage_leg.uuid; // update last leg uuid

    ret["report_type"] = j.report_type;
    ret["report_no"] = ReportTypeToDisplay[j.report_type] + " " + j.report_num;
    // TODO: get voyage leg to get route
    // ret["departure"] = j.route.departure_port || "N/A";
    // ret["arrival"] = j.route.arrival_port || "N/A";
    ret["loading_condition"] = curLoadingCondition || "N/A";
    ret["date_of_report"] = readableUTCDate(new Date(j.report_date));
    ret["uuid"] = j.uuid;

    reports[uuid].push(ret);
  }

  // update voyage details
  voyageDetails[uuid]["voyage_uuid"] = uuid;
  voyageDetails[uuid]["leg_uuid"] = lastLegUuid;
  voyageDetails[uuid]["cur_voyage_no"] = voyages[i].voyage_num;
  voyageDetails[uuid]["cur_loading_condition"] = curLoadingCondition || "N/A";
  voyageDetails[uuid]["last_leg_no"] = lastLegNo || "N/A";
  voyageDetails[uuid]["last_noon_report_no"] = lastReportNo["NOON"];
  voyageDetails[uuid]["last_deps_report_no"] = lastReportNo["DSBY"];
  voyageDetails[uuid]["last_depr_report_no"] = lastReportNo["DCSP"];
  voyageDetails[uuid]["last_arrs_report_no"] = lastReportNo["ASBY"];
  voyageDetails[uuid]["last_arrf_report_no"] = lastReportNo["AFWE"];
  voyageDetails[uuid]["last_bdn_report_no"] = lastReportNo["BDN"];
  voyageDetails[uuid]["last_evntp_report_no"] = lastReportNo["EVPO"];
  voyageDetails[uuid]["last_evntc_report_no"] = lastReportNo["EVHB"];
  voyageDetails[uuid]["last_noonp_report_no"] = lastReportNo["NNPO"];
  voyageDetails[uuid]["last_noonc_report_no"] = lastReportNo["NNHB"];

  if (i === voyages.length - 1) {
    // update voyage number
    lastVoyageNo.value = voyages[i].voyage_num;
  }
}

onMounted(() => {
  isFetchingVoyages.value = false;
});
// console.log("This runs in overview view");
// const store = useVoyageStore();
// const voyages = store.voyages;
// console.log("Voyages in Overview", voyages);
// const reports = store.reports;
// console.log("Report in Overview", voyages);
</script>
