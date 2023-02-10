<script setup>
import CIIAlert from "../../CIIAlert.vue";
import CIIVoyageAlert from "./CIIVoyageAlert.vue";

const props = defineProps({
  alert: Object,
});

const example = {
  shipName: "Marina A",
  startPeriod: "12 June 2022",
  endPeriod: "16 June 2022",
  gradeLimit: "B",
  gradeLimitValue: "4.87",
  currentGrade: "C",
  currentGradeValue: "3.62",
  alertVoyage: 3,
};
</script>

<template>
  <div class="flex bg-white rounded-xl w-full p-6 mb-3.5 justify-between">
    <div class="flex">
      <span class="text-14 text-gray-700 font-bold">{{
        props.alert.shipName
      }}</span>
    </div>
    <div class="flex divide-x">
      <div class="flex mr-6">
        <span class="text-14 text-gray-700"
          >{{ props.alert.startPeriod }}-</span
        >
        <span class="text-14 text-gray-700">{{ props.alert.endPeriod }}</span>
      </div>
      <CIIAlert
        :gradeLimit="props.alert.gradeLimit"
        :gradeLimitValue="props.alert.gradeLimitValue"
        :currentGrade="props.alert.currentGrade"
        :currentGradeValue="props.alert.currentGradeValue"
      />
      <CIIVoyageAlert />
    </div>
  </div>
</template>
