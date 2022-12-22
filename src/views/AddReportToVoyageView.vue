<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="flex flex-col px-24 pt-11">
      <div class="flex items-center mx-5 mb-6">
        <button @click="$router.push({ name: 'vessel-overview' })">
          <img
            src="@/assets/icons/back_arrow.svg"
            class="fill-blue float-left"
            type="button"
          />
        </button>
        <span class="mx-5 text-20 text-blue">{{ $t("submitNewReport") }}</span>
      </div>
      <div
        class="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-5 justify-items-stretch pb-8"
      >
        <RadioBtnIcon
          :icon="require('@/assets/icons/noon_report.svg')"
          :content="$t('noon')"
          type="noon"
          :active="reportType"
          @onUpdateBtn="updateActiveReportType"
        >
        </RadioBtnIcon>
        <RadioBtnIcon
          :icon="require('@/assets/icons/depart_report.svg')"
          :content="$t('departure')"
          type="departure"
          :active="reportType"
          @onUpdateBtn="updateActiveReportType"
        >
        </RadioBtnIcon>
        <RadioBtnIcon
          :icon="require('@/assets/icons/arrival_report.svg')"
          :content="$t('arrival')"
          type="arrival"
          :active="reportType"
          @onUpdateBtn="updateActiveReportType"
        >
        </RadioBtnIcon>
        <RadioBtnIcon
          :icon="require('@/assets/icons/harbourport_report.svg')"
          :content="$t('inHarbourOrPort')"
          type="harbour-port"
          :active="reportType"
          @onUpdateBtn="updateActiveReportType"
        >
        </RadioBtnIcon>
        <RadioBtnIcon
          :icon="require('@/assets/icons/bunker_report.svg')"
          :content="$t('bunkerDelivery')"
          type="bunker-delivery"
          :active="reportType"
          @onUpdateBtn="updateActiveReportType"
        >
        </RadioBtnIcon>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import RadioBtnIcon from "../components/Buttons/RadioBtnIcon.vue";
import router from "@/router";
import { ref } from "vue";
import { useVoyageStore } from "@/stores/useVoyageStore";
import { storeToRefs } from "pinia";
import { onBeforeRouteLeave } from "vue-router";

const reportType = ref("");

const updateActiveReportType = (type) => {
  reportType.value = type;
  router.push({ name: type });
};

const store = useVoyageStore();
const {
  curLoadingCondition,
  curLegNo,
  voyageNo,
  lastNoonReportNo,
  lastDepsReportNo,
  lastDeprReportNo,
  lastArrsReportNo,
  lastArrfReportNo,
  lastBdnReportNo,
  // lastEvntpReportNo,
  // lastEvntcReportNo,
  // lastNoonpReportNo,
  // lastNooncReportNo,
} = storeToRefs(store);

const voyageDetails = history.state.voyageDetails
  ? JSON.parse(history.state.voyageDetails)
  : {};

// store selected voyage details in pinia voyage store
curLoadingCondition.value = voyageDetails.cur_loading_condition;
curLegNo.value = voyageDetails.cur_leg_no;
voyageNo.value = voyageDetails.voyage_no;
lastNoonReportNo.value = voyageDetails.last_noon_report_no;
lastDepsReportNo.value = voyageDetails.last_deps_report_no;
lastDeprReportNo.value = voyageDetails.last_depr_report_no;
lastArrsReportNo.value = voyageDetails.last_arrs_report_no;
lastArrfReportNo.value = voyageDetails.last_arrf_report_no;
lastBdnReportNo.value = voyageDetails.last_bdn_report_no;
// lastEvntpReportNo.value = voyageDetails.last_evntp_report_no;
// lastEvntcReportNo.value = voyageDetails.last_evntc_report_no;
// lastNoonpReportNo.value = voyageDetails.last_noonp_report_no;
// lastNooncReportNo.value = voyageDetails.last_noonc_report_no;

// onBeforeRouteLeave((to, from) => {
//   console.log(to);
//   console.log(from);

//   const answer = window.confirm(
//     "Do you really want to leave? You have unsaved changes!"
//   );
//   // cancel the navigation and stay on the same page
//   if (!answer) return false;
// });
</script>
