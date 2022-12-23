<script setup>
import router from "@/router";
import { useRoute } from "vue-router";
import { Report, ReportTypeToDisplay } from "@/constants";

const route = useRoute();

const props = defineProps({
  report_type: {
    type: String,
    required: false,
    default: "NOON",
  },
  uuid: {
    type: String,
    required: true,
  },
  report_no: {
    type: String,
    required: true,
    default: "REPORT 0",
  },
  departure: {
    type: String,
    required: false,
    default: "DEPARTURE",
  },
  arrival: {
    type: String,
    required: false,
    default: "ARRIVAL",
  },
  loading_condition: {
    type: String,
    required: false,
    default: "WESTBOUND",
  },
  date_of_report: {
    type: String, // TODO: enum - change to Date after backend
    required: false,
    default: "DATE",
  },
});

const handleClick = () => {
  console.log("im clicked");
  console.log(route.params);
  const imo = route.params.imo;
  const vesselname = route.params.vesselname;
  router.push({
    name: "report-details",
    params: {
      imo: imo,
      vesselname: vesselname,
      uuid: props.uuid,
    },
  });
};

const report_sent = true; // TODO: always true for MVP, no save function implemented
</script>

<template>
  <div
    @click="handleClick"
    class="relative flex h-24 items-center justify-between rounded-xl bg-gray-50 pt-5 cursor-pointer"
  >
    <!-- <div>{{ props.uuid }}</div> -->
    <img
      v-if="
        report_type == Report.type.DEP_COSP_RUP ||
        report_type == Report.type.DEP_SBY
      "
      src="@/assets/icons/departure_header.svg"
      class="absolute left-0 top-0"
    />
    <img
      v-else-if="
        report_type == Report.type.ARR_SBY_EOSP ||
        report_type == Report.type.ARR_FWE
      "
      src="@/assets/icons/arrival_header.svg"
      class="absolute left-0 top-0"
    />
    <img
      v-else-if="report_type == Report.type.NOON"
      src="@/assets/icons/noon_header.svg"
      class="absolute left-0 top-0"
    />
    <img
      v-else-if="report_type == Report.type.BUNKER"
      src="@/assets/icons/bunker_header.svg"
      class="absolute left-0 top-0"
    />
    <img
      v-else-if="
        report_type == Report.type.EVENT_COASTAL ||
        report_type == Report.type.EVENT_PORT ||
        report_type == Report.type.NOON_PORT ||
        report_type == Report.type.NOON_COASTAL
      "
      src="@/assets/icons/in_harbour_header.svg"
      class="absolute left-0 top-0"
    />
    <div v-else></div>
    <div class="flex flex-col w-20 ml-5 mr-2">
      <span class="text-12 text-gray-400">{{ $t("reportNo") }}</span>
      <span class="text-14 text-gray-700">{{ report_no }}</span>
    </div>
    <div class="flex flex-col w-20 mr-2">
      <span class="text-12 text-gray-400">{{ $t("departure") }}</span>
      <span class="text-14 text-gray-700">{{ departure }}</span>
    </div>
    <div class="flex flex-col w-20 mr-2">
      <span class="text-12 text-gray-400">{{ $t("arrival") }}</span>
      <span class="text-14 text-gray-700">{{ arrival }}</span>
    </div>
    <div class="flex flex-col w-28 mr-2">
      <span class="text-12 text-gray-400">{{ $t("loadingCondition") }}</span>
      <span class="text-14 text-gray-700">{{ loading_condition }}</span>
    </div>
    <div class="flex flex-col w-38 mr-2">
      <span class="text-12 text-gray-400">{{ $t("dateOfReport") }}</span>
      <span class="text-14 text-gray-700">{{ date_of_report }}</span>
    </div>

    <img
      v-if="report_sent == false"
      src="@/assets/icons/saved_icon.svg"
      class="mr-5"
    />
    <img v-else src="@/assets/icons/sent_icon.svg" class="mr-5" />
  </div>
</template>
