<script setup>
import CIIGraph from "./components/CIIGraph.vue";
import CIIVesselListCard from "./components/CIIVesselListCard.vue";
import CIIRatingAlertCard from "./components/CIIRatingAlertCard.vue";

// Some api call to get the vessel and grade infomation
</script>
<template>
  <div class="flex px-12 pt-12">
    <span class="text-20 font-bold text-blue-800 w-full">{{
      $t("ciiOverview")
    }}</span>
    <CIIGraph></CIIGraph>

    <CIIVesselListCard></CIIVesselListCard>

    <CIIRatingAlertCard></CIIRatingAlertCard>
  </div>
</template>
