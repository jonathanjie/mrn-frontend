<script setup>
import NoonOverview from "./components/NoonOverview.vue";
import NoonDetails from "./components/NoonDetails.vue";
import NoonWeather from "./components/NoonWeather.vue";
import NoonHeavyWeather from "./components/NoonHeavyWeather.vue";
import NoonDistanceAndTime from "./components/NoonDistanceAndTime.vue";
import NoonPerformance from "./components/NoonPerformance.vue";
import NoonStoppage from "./components/NoonStoppage.vue";
import NoonAddRemarks from "./components/NoonAddRemarks.vue";
import ReportConsumption from "../ReportConsumption.vue";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col space-y-6 my-6">
    <!-- Overview -->
    <NoonOverview :report="props.report" />

    <!-- Reporting Noon -->
    <NoonDetails :report="props.report">{{ $t("reportingNoon") }}</NoonDetails>

    <!-- Weather -->
    <NoonWeather :report="props.report" />

    <!-- Heavy Weather Condition -->
    <NoonHeavyWeather
      v-if="props.report.heavyweatherdata"
      :report="props.report"
    />

    <!-- Distance & Time -->
    <NoonDistanceAndTime :report="props.report" />

    <!-- Performance -->
    <NoonPerformance :report="props.report" />

    <!-- Consumption & Condition -->
    <ReportConsumption :report="report">
      <template v-slot:header>
        {{ $t("consumptionAndConditionNoonToNoon") }}
      </template>
    </ReportConsumption>

    <!-- Stoppage or Reduction of RPM (at sea) -->
    <NoonStoppage v-if="props.report.stoppagedata" :report="props.report" />

    <!-- Additional Remarks -->
    <NoonAddRemarks :report="props.report" />
  </div>
</template>
