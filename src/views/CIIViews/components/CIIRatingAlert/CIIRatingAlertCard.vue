<script setup>
import { ref } from "vue";
import CIIRatingAlertRow from "./components/CIIRatingAlertRow.vue";
const alerts = [
  {
    shipName: "Marina A",
    startPeriod: "12 June 2022",
    endPeriod: "16 June 2022",
    gradeLimit: "B",
    gradeLimitValue: "4.87",
    currentGrade: "C",
    currentGradeValue: "3.62",
    alertVoyage: 3,
  },
  {
    shipName: "Marina A",
    startPeriod: "12 June 2022",
    endPeriod: "16 June 2022",
    gradeLimit: "B",
    gradeLimitValue: "4.87",
    currentGrade: "C",
    currentGradeValue: "3.62",
    alertVoyage: 3,
  },
  {
    shipName: "Marina A",
    startPeriod: "12 June 2022",
    endPeriod: "16 June 2022",
    gradeLimit: "B",
    gradeLimitValue: "4.87",
    currentGrade: "C",
    currentGradeValue: "3.62",
    alertVoyage: 3,
  },
  {
    shipName: "Marina A",
    startPeriod: "12 June 2022",
    endPeriod: "16 June 2022",
    gradeLimit: "B",
    gradeLimitValue: "4.87",
    currentGrade: "C",
    currentGradeValue: "3.62",
    alertVoyage: 3,
  },
];
let hover = ref(false);
</script>

<template>
  <div class="flex flex-col pt-10">
    <div
      v-if="hover"
      class="bg-black absolute rounded-xl py-2 px-3 -mt-12 ml-16"
    >
      <span class="text-12 text-white"
        >View the CII overview of your fleet by voyage, past historical and
        current year</span
      >
    </div>
    <div class="flex w-full">
      <span class="text-20 text-blue-800 font-bold mb-0.5 mr-2"
        >{{ $t("ciiRatingAlert") }} ({{ alerts.length }})</span
      >
      <img
        src="@/assets/icons/hover_icon.svg"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      />
    </div>

    <CIIRatingAlertRow v-for="alert in alerts" :key="alert.id" :alert="alert" />
  </div>
</template>
