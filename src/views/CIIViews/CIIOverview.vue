<script setup>
import CIIGraph from "./components/CIIGraph.vue";
import CIIVesselListCard from "./components/CIIVesselListCard.vue";
import CIIRatingAlertCard from "./components/CIIRatingAlertCard.vue";
import VueApexCharts from "vue3-apexcharts";

VueApexCharts.colors = ["#12B76A", "#7BBD58", "#FFD400", "#FDA80C", "#F04438"];
const data = {
  2020: [11, 15, 16, 1, 1],
  2021: [1, 2, 3, 4, 5],
  2022: [10, 1, 6, 10, 20],
  2023: [12, 23, 24, 2, 1],
};
// Some api call to get the vessel and grade infomation
</script>
<template>
  <div class="flex flex-col px-12 pt-12 w-full">
    <span class="text-20 font-bold text-blue-800 w-full">{{
      $t("ciiOverview")
    }}</span>
    <CIIGraph :data="data" />

    <CIIVesselListCard></CIIVesselListCard>

    <CIIRatingAlertCard></CIIRatingAlertCard>
  </div>
</template>
