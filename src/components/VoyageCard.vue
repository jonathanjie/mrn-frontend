<template>
  <!-- need to put below two components under one big div and then set min width to child -->
  <div
    class="flex h-20 mx-12 items-center rounded-xl min-w-max z-10"
    :class="isExpanded ? 'bg-blue' : 'bg-white drop-shadow-md mb-6'"
  >
    <img
      src="@/assets/icons/selected_blue_gradient.svg"
      class="h-6 w-6 -m-0.5"
    />
    <span
      class="text-14 font-bold px-1 min-w-fit"
      :class="isExpanded ? 'text-white' : 'text-gray-700'"
      >{{ $t("voyageNoCaps") }} {{ num }}</span
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
      <img src="@/assets/icons/forward.svg" class="h-6 w-6 mr-auto" />
      <span class="text-14 text-sysblue ml-16 mr-5 min-w-fit">{{
        $t("viewJourney")
      }}</span>
    </div>
    <button @click="isExpanded = !isExpanded" class="ml-3 mr-4">
      <img src="@/assets/icons/dropdown.svg" />
    </button>
  </div>
  <div
    v-show="isExpanded"
    class="min-h-fit bg-darkgray mx-12 mb-6 rounded-xl -mt-4 p-5"
  >
    <div class="flex items-center py-5">
      <button
        v-for="category in categories"
        :key="category"
        class="rounded-xl h-7 px-2 mr-4 text-14 min-w-fit"
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
        @click="
          $router.push({
            name: 'add-report',
            state: { voyageDetails },
          })
        "
        class="h-9 text-14 text-blue-700 rounded-xl ml-auto min-w-fit"
      >
        <template v-slot:content>+{{ $t("addNewReport") }}</template>
      </CustomButton>
    </div>

    <!-- TODO: pagination + different start/dest depending on report type -->
    <div class="flex flex-col space-y-4">
      <div
        v-for="(report, index) in filteredData.slice().reverse()"
        :key="index"
      >
        <!-- <div>{{ report }}</div> -->
        <div>{{ report.uuid }}</div>
        <ReportCard
          :uuid="report.uuid"
          :report_no="report.report_no"
          :report_type="report.report_type"
          :departure="report.departure"
          :arrival="report.arrival"
          :loading_condition="report.loading_condition"
          :date_of_report="report.date_of_report"
        ></ReportCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomButton from "./Buttons/CustomButton.vue";
import ReportCard from ".//ReportCard.vue";
import { defineProps, computed, ref } from "vue";

const props = defineProps({
  num: {
    type: Number,
    required: true,
    default: 0,
  },
  start: {
    type: String,
    required: true,
    default: "Singapore",
  },
  mid: {
    type: String,
    required: true,
    default: "Singapore",
  },
  dest: {
    type: String,
    required: true,
    default: "Ulsan, Korea",
  },
  isInitiallyOpen: {
    type: Boolean,
    required: false,
    default: false,
  },
  reports: {
    type: Array,
    required: true,
    default: [],
  },
  voyageDetails: {
    type: String,
    required: true,
    default: "",
  },
});

const isExpanded = ref(props.isInitiallyOpen);
const filter = ref("allReports");

const filteredData = computed(() => {
  if (!filter.value || filter.value == "allReports") {
    return props.reports;
  }
  return props.reports.filter(
    (p) => reportTypeEnumToString[p.report_type] === filter.value
  );
});

const reportTypeEnumToString = {
  NOON: "noon",
  DSBY: "departure",
  DCSP: "departure",
  ASBY: "arrival",
  AFWE: "arrival",
  BDN: "bunkerDelivery",
  EVNT: "inHarbourOrPort",
};

const categories = [
  "allReports",
  "departure",
  "arrival",
  "noon",
  "bunkerDelivery",
  "inHarbourOrPort",
];
</script>
