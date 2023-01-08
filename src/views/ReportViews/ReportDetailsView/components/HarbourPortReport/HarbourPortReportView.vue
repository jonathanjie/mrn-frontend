<script setup>
import { computed } from "vue";
import RadioBtnDetail from "@/components/Buttons/RadioBtnDetail.vue";
import HarbourPortOverview from "./components/HarbourPortOverview.vue";
import HarbourPortReport from "./components/HarbourPortReport.vue";

import { Report } from "@/constants";
import ReportConsumption from "../ReportConsumption.vue";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const reportSubtypeIsPort = computed(() =>
  props.report.report_type == Report.type.NOON_PORT ||
  props.report.report_type == Report.type.EVENT_PORT
    ? true
    : false
);

// TODO: hacky due to the behavior of the custom component RadioBtnDetail, will update later
// const updateActiveReportType = (type) => {
//   if (type === "false") {
//     reportSubtypeIsPort.value = false;
//   } else {
//     reportSubtypeIsPort.value = true;
//   }
// };
</script>

<template>
  <div class="flex flex-col space-y-6 my-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <RadioBtnDetail
        disabled
        :icon="require('@/assets/icons/in_port.svg')"
        :content="$t('inPortBerthingShiftingDryDocking')"
        type="true"
        :active="reportSubtypeIsPort + ''"
      >
      </RadioBtnDetail>
      <RadioBtnDetail
        disabled
        :icon="require('@/assets/icons/coastal_water.svg')"
        :content="$t('coastalWaterAnchoringDrifting')"
        type="false"
        :active="reportSubtypeIsPort + ''"
      >
      </RadioBtnDetail>
    </div>

    <!-- Overview -->
    <HarbourPortOverview :report="props.report" />

    <!-- Report -->
    <HarbourPortReport :report="props.report" />

    <!-- Consumption & Condition -->
    <!-- <HarbourPortConsumption :report="props.report">{{
      $t("consumptionAndConditionLastReportToEventNoon")
    }}</HarbourPortConsumption> -->
    <ReportConsumption :report="report">
      <template v-slot:header>
        {{ $t("consumptionAndConditionLastReportToEventNoon") }}
      </template>
    </ReportConsumption>
  </div>
</template>
