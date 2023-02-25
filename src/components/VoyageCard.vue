<script setup>
import CustomButton from "./Buttons/CustomButton.vue";
// import ReportCard from ".//ReportCard.vue";
import { computed, ref } from "vue";
// import {
//   ReportTypeToDisplay,
//   ReportFilterCategories,
//   ReportTypeToFilterCategories,
// } from "@/constants";
// import { readableUTCDate } from "@/utils/helpers";
import { useRouter } from "vue-router";
import { useLatestReportDetailsStore } from "@/stores/useLatestReportDetailsStore";
import { useVoyageStore } from "@/stores/useVoyageStore";
import { storeToRefs } from "pinia";
import LegCard from "./LegCard.vue";
import axios from "axios";
import GradientButton from "./Buttons/GradientButton.vue";

const router = useRouter();
const latestReportDetailsStore = useLatestReportDetailsStore();
const { refetchLatestReportDetails } = latestReportDetailsStore;
const { departurePort, arrivalPort } = storeToRefs(latestReportDetailsStore);
const voyageStore = useVoyageStore();
const { voyageLegs: storedVoyageLegs } = storeToRefs(voyageStore);

const props = defineProps({
  voyage: {
    type: Object,
    required: true,
    default: () => {},
  },
  isInitiallyOpen: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const voyageLegs = computed(() => props.voyage.voyage_legs);
const reports = computed(() =>
  props.voyage.voyage_legs.reduce((acc, curr) => curr.reports.concat(acc), [])
);

const isExpanded = ref(props.isInitiallyOpen);

const lastReportIndex = reports.value.length - 1; // Using this is Leg component
let lastLegIndex = props.voyage.voyage_legs.length - 1; // Using this is Leg component
if (lastLegIndex < 0) {
  lastLegIndex = 0;
}
const lastLegNo = props.voyage.voyage_legs[lastLegIndex]?.leg_num;
const lastLegUuid = props.voyage.voyage_legs[lastLegIndex]?.uuid;

let lastReportNo = {}; // Using this is Leg component
for (let report of reports.value) {
  lastReportNo[report.report_type] = Math.max(
    report.report_num,
    lastReportNo[report.report_type] || 0
  );
}
const voyageDetails = JSON.stringify({
  voyage_uuid: props.voyage.uuid,
  leg_uuid: lastLegUuid || "",
  cur_voyage_no: props.voyage.voyage_num,
  cur_loading_condition: props.voyage.voyage_legs[0]?.load_condition, // make dynamic for all legs
  last_leg_no: lastLegNo || 0,
  last_noon_report_no: lastReportNo["NOON"] || 0,
  last_deps_report_no: lastReportNo["DSBY"] || 0,
  last_depr_report_no: lastReportNo["DCSP"] || 0,
  last_arrs_report_no: lastReportNo["ASBY"] || 0,
  last_arrf_report_no: lastReportNo["AFWE"] || 0,
  last_bdn_report_no: lastReportNo["BDN"] || 0,
  last_evntp_report_no: lastReportNo["EVPO"] || 0,
  last_evntc_report_no: lastReportNo["EVHB"] || 0,
  last_noonp_report_no: lastReportNo["NNPO"] || 0,
  last_noonc_report_no: lastReportNo["NNHB"] || 0,
});

const start = reports.value[0]?.departure_port || departurePort.value || "N/A";
const mid = "At Sea";
const dest =
  reports.value[lastReportIndex]?.arrival_port || arrivalPort.value || "N/A";

// const filter = ref(ReportFilterCategories.ALL);

// const filteredData = computed(() => {
//   const copy = (list) => [...list];

//   if (!filter.value || filter.value == ReportFilterCategories.ALL) {
//     return copy(reports.value).sort((a, b) =>
//       new Date(a.report_date) < new Date(b.report_date) ? 1 : -1
//     );
//   }
//   return copy(reports.value)
//     .filter((p) => ReportTypeToFilterCategories[p.report_type] === filter.value)
//     .sort((a, b) =>
//       new Date(a.report_date) < new Date(b.report_date) ? 1 : -1
//     );
// });

// console.log(filteredData.value);

// const handleClick = async () => {
//   // console.log(voyageLegs.value);
//   storedVoyageLegs.value = voyageLegs.value;
//   await refetchLatestReportDetails();
//   router.push({
//     name: "add-report",
//     state: { voyageDetails },
//   });
// };

const isAddLegLoading = ref(false);
const addLeg = async () => {
  console.log("WORKING");
  if (
    !confirm("Are you sure? You may not be able to edit your previous leg.")
  ) {
    return;
  } else {
    isAddLegLoading.value = true;
    const legData = {
      voyage: props.voyage.uuid,
      leg_num: lastLegIndex + 1,
    };
    console.log(legData, "Leg data pls");
    await axios
      .post(`${process.env.VUE_APP_URL_DOMAIN}/marinanet/voyagelegs/`, legData)
      .then((response) => {
        console.log(response);
        //refetch.value();
        isAddLegLoading.value = false;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
};
</script>

<template>
  <!-- need to put below two components under one big div and then set min width to child -->
  <div
    class="flex h-20 mx-12 items-center rounded-xl min-w-fit z-10 mt-10"
    :class="isExpanded ? 'bg-blue' : 'bg-white drop-shadow-md'"
  >
    <img
      src="@/assets/icons/selected_blue_gradient.svg"
      class="h-6 w-6 -m-0.5"
    />
    <span
      class="text-14 font-bold px-1 min-w-fit"
      :class="isExpanded ? 'text-white' : 'text-gray-700'"
      >{{ $t("voyageNoCaps") }} {{ voyage.voyage_num }}</span
    >
    <div
      class="flex bg-gray-50 h-12 m-3 items-center rounded-xl w-full min-w-fit ml-20"
    >
      <div
        class="flex justify-between items-center h-px bg-sysblue-800 ml-5 w-full mx-4 my-3"
      >
        <!-- TODO: need to add light blue "already traveled" indicator -->
        <CustomButton
          class="p-1 h-7 text-12 text-blue min-w-fit rounded-xl z-10"
        >
          <template v-slot:content>{{ start }}</template>
        </CustomButton>
        <img src="@/assets/icons/forward.svg" class="h-4 w-4 z-10" />
        <CustomButton
          class="p-1 h-7 text-12 text-blue min-w-fit rounded-xl z-10"
        >
          <template v-slot:content>{{ mid }}</template>
        </CustomButton>
        <img src="@/assets/icons/forward.svg" class="h-4 w-4 z-10" />
        <CustomButton
          class="p-1 h-7 text-12 text-blue min-w-fit rounded-xl z-10"
        >
          <template v-slot:content>{{ dest }}</template>
        </CustomButton>
      </div>
      <!-- <img src="@/assets/icons/forward.svg" class="h-6 w-6 mr-auto" /> -->
      <!-- <span class="text-14 text-sysblue ml-16 mr-5 min-w-fit">{{
        $t("viewJourney")
      }}</span> -->
    </div>
    <button @click="isExpanded = !isExpanded" class="ml-3 mr-4">
      <img src="@/assets/icons/dropdown.svg" />
    </button>
  </div>
  <div
    v-show="isExpanded"
    class="min-h-fit min-w-fit bg-darkgray mx-12 rounded-xl -mt-4 p-5"
  >
    <!-- <div class="min-w-fit flex items-center py-5">
      <button
        v-for="category in ReportFilterCategories"
        :key="category"
        class="rounded-xl h-7 px-2 mr-2 text-14 min-w-fit"
        :class="
          filter === category
            ? 'border border-gradientblue bg-blue-50 text-blue-700'
            : 'bg-gray-100 text-gray-700'
        "
        @click="filter = category"
      >
        {{ $t(category) }}
      </button>
      <CustomButton
        :is-disabled="!props.isInitiallyOpen"
        @click="
          handleClick()
          // $router.push({
          //   name: 'add-report',
          //   state: { voyageDetails },
          // })
        "
        class="h-9 text-14 text-blue-700 rounded-xl ml-auto min-w-fit disabled:text-gray-500"
      >
        <template v-slot:content>+{{ $t("addNewReport") }}</template>
      </CustomButton>
    </div> -->

    <!-- TODO: pagination + different start/dest depending on report type -->
    <div class="flex justify-end w-full mt-6 mb-5">
      <GradientButton class="py-1.5 px-3.5" @click="addLeg()" type="button">
        <template v-slot:content>{{ $t("createNewLeg") }}</template>
      </GradientButton>
    </div>
    <div class="flex flex-col space-y-6">
      <LegCard
        v-for="leg in voyage.voyage_legs"
        :voyageDetails="voyageDetails"
        :key="leg.id"
        :voyage="voyage"
        :reports="leg.reports"
      />
      <!-- <div v-for="report in filteredData" :key="report.id">
        <ReportCard
          :uuid="report.uuid"
          :report_no="
            ReportTypeToDisplay[report.report_type] + ' ' + report.report_num
          "
          :report_type="report.report_type"
          :departure="report.departure_port || '-'"
          :arrival="report.arrival_port || '-'"
          :loading_condition="
            voyage.voyage_legs.filter((leg) => leg.id === report.voyage_leg)[0]
              .load_condition || '-'
          "
          :date_of_report="readableUTCDate(new Date(report.report_date))"
        ></ReportCard>
      </div> -->
    </div>
  </div>
</template>
