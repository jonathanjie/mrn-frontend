<script setup>
import { toRefs } from "vue";
import CIIAlert from "../../CIIAlert.vue";
import CIIVoyageAlert from "./CIIVoyageAlert.vue";

const props = defineProps({
  alert: Object,
});

const { alert } = toRefs(props);
if (alert.value === undefined || alert.value === null) {
  throw new Error("Prop has issues: alert");
}

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
  <div
    class="flex bg-white rounded-xl w-full px-3.5 py-4 mb-3.5 justify-between items-center"
  >
    <div class="flex items-center">
      <img class="mr-3.5" src="@/assets/icons/Cii/cii_alert_red.svg" />

      <span class="text-14 text-gray-700 font-bold">{{ alert.shipName }}</span>
    </div>
    <div class="flex divide-x items-center">
      <div class="flex mr-6">
        <span class="text-14 text-gray-700">{{ alert.startPeriod }}-</span>
        <span class="text-14 text-gray-700">{{ alert.endPeriod }}</span>
      </div>
      <CIIAlert
        class="px-5"
        :gradeLimit="alert.gradeLimit"
        :gradeLimitValue="alert.gradeLimitValue"
        :currentGrade="alert.currentGrade"
        :currentGradeValue="alert.currentGradeValue"
      />
      <div class="px-5">
        <CIIVoyageAlert
          :alertVoyage="alert.alertVoyage"
          :currentGrade="alert.currentGrade"
        />
      </div>
    </div>
  </div>
</template>
