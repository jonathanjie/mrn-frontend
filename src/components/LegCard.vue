<script setup>
import {
  ReportTypeToDisplay,
  ReportFilterCategories,
  ReportTypeToFilterCategories,
} from "@/constants";
import { ref, computed, toRefs } from "vue";
import ReportCard from ".//ReportCard.vue";
import CustomButton from "./Buttons/CustomButton.vue";
import { useRouter } from "vue-router";
import { readableUTCDate } from "@/utils/helpers";
import { useVoyageStore } from "@/stores/useVoyageStore";
import { storeToRefs } from "pinia";
import { useLatestReportDetailsStore } from "@/stores/useLatestReportDetailsStore";
let isExpanded = ref(true);
const router = useRouter();
const props = defineProps({
  reports: Array,
  voyage: Object,
  voyageDetails: Object,
  legNum: Number,
});

const { reports, voyage, voyageDetails, legNum } = toRefs(props);
const voyageLegs = computed(() => voyage.value.voyage_legs);
const voyageStore = useVoyageStore();
const { voyageLegs: storedVoyageLegs } = storeToRefs(voyageStore);
const latestReportDetailsStore = useLatestReportDetailsStore();
const { refetchLatestReportDetails } = latestReportDetailsStore;
const filter = ref(ReportFilterCategories.ALL);

const filteredData = computed(() => {
  const copy = (list) => [...list];

  if (!filter.value || filter.value == ReportFilterCategories.ALL) {
    return copy(reports.value).sort((a, b) =>
      new Date(a.report_date) < new Date(b.report_date) ? 1 : -1
    );
  }
  return copy(reports.value)
    .filter((p) => ReportTypeToFilterCategories[p.report_type] === filter.value)
    .sort((a, b) =>
      new Date(a.report_date) < new Date(b.report_date) ? 1 : -1
    );
});
let disabled = ref(true);
if (voyageLegs.value.length === legNum.value) {
  disabled.value = false;
}
// Enable for addReport function
const handleClick = async () => {
  storedVoyageLegs.value = voyageLegs.value;
  await refetchLatestReportDetails();
  voyageDetails.value.cur_leg_no = legNum.value;
  localStorage.setItem("voyageDetails", JSON.stringify(voyageDetails.value));
  router.push({
    name: "add-report",
    // state: { voyageDetails },
  });
};
</script>

<template>
  <div class="flex flex-col bg-white py-4 rounded-xl items-center divide-y">
    <div class="flex w-full justify-between" :class="isExpanded ? 'mb-4' : ''">
      <div class="flex items-center">
        <img
          src="@/assets/icons/selected_blue_gradient.svg"
          class="h-6 w-6 -m-0.5"
        />
        <span class="text-14 font-bold px-1 min-w-fit text-blue-700"
          >{{ $t("leg") }} {{ legNum }}</span
        >
      </div>
      <div class="flex">
        <CustomButton
          @click="handleClick()"
          :is-disabled="disabled"
          class="h-9 text-14 text-blue-700 rounded-xl ml-auto min-w-fit disabled:text-gray-500"
        >
          <template v-slot:content>+{{ $t("addNewReport") }}</template>
        </CustomButton>
        <button @click="isExpanded = !isExpanded" class="ml-3 mr-4">
          <img src="@/assets/icons/dropdown.svg" />
        </button>
      </div>
    </div>
    <div v-if="isExpanded" class="flex flex-col w-full p-4 divide-y">
      <div>
        <div class="min-w-fit flex items-center mb-4">
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
        </div>
        <div v-for="report in filteredData" :key="report.id" class="mb-3.5">
          <ReportCard
            :uuid="report.uuid"
            :report_no="
              ReportTypeToDisplay[report.report_type] + ' ' + report.report_num
            "
            :report_type="report.report_type"
            :departure="report.departure_port || '-'"
            :arrival="report.arrival_port || '-'"
            :loading_condition="'-'"
            :date_of_report="readableUTCDate(new Date(report.report_date))"
          ></ReportCard>
        </div>
      </div>

      <div class="flex w-full justify-center">
        <span>1234567890</span>
      </div>
    </div>
  </div>
</template>
