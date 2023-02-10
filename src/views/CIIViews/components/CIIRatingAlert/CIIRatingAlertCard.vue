<script setup>
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
</script>

<template>
  <div class="flex flex-col pt-10">
    <span class="text-20 text-blue-800 font-bold mb-0.5 w-full"
      >{{ $t("ciiRatingAlert") }} ({{ alerts.length }})</span
    >
    <CIIRatingAlertRow v-for="alert in alerts" :key="alert.id" :alert="alert" />
  </div>
</template>
