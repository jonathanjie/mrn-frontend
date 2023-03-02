<script setup>
import CustomButton from "@/components/Buttons/CustomButton.vue";
import CIIVoyageCard from "./components/CIIVoyageCard.vue";
import CIIGrade from "@/views/CIIViews/components/CIIGrade.vue";
import HazingBanner from "@/components/HazingBanner.vue";
const hide = true;
const currentYear = 2023;
const currentStats = {
  year: 2023,
  currentGrade: "A",
  currentGradeValue: 4.62,
  ytd: "2023-02-10",
  targetCIIGrade: "A",
  targetCIIGradeValue: 4.62,
  cLevelLimit: 5.12,
  eedi: {
    grade: "D",
    value: 4.62,
  },
  eexi: {
    grade: "E",
    value: 4.62,
  },
};

const gradeColor = (grade) => {
  return grade.toLowerCase();
};
</script>
<template>
  <div class="flex flex-col pb-8">
    <div class="flex justify-between items-center">
      <span class="text-18 text-gray-700 font-bold">{{ $t("ciiStatus") }}</span>
      <CustomButton
        class="h-9 text-14 text-blue-700 rounded-xl ml-auto min-w-fit disabled:text-gray-500 mb-4"
      >
        <template v-slot:content>
          <img
            src="@/assets/icons/Speed_Graph/CIIOverview/cii_calculator.svg"
            class="mr-1.5"
          />{{ $t("ciiCalculator") }}</template
        >
      </CustomButton>
    </div>
    <div class="flex relative flex-row space-x-6 w-auto">
      <div
        class="flex flex-col rounded-xl bg-white p-4"
        :class="hide ? 'blur-sm' : ''"
      >
        <div class="flex flex-row mb-3">
          <span class="text-14 text-blue-700 font-semibold mr-1.5">{{
            currentYear
          }}</span>
          <div class="flex rounded-xl h-7 bg-red-50 ml-2">
            <ul class="list-disc p-0.5 text-14 ml-6 mr-3">
              <li class="text-red-500 font-bold whitespace-nowrap">
                <span class="text-red-700 font-bold">{{
                  $t("currentStats")
                }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="flex flex-col w-full rounded-2xl bg-opacity-10 items-center py-11 mb-6"
          :class="'bg-grades-' + gradeColor(currentStats.currentGrade)"
        >
          <span
            class="text-white text-18 font-bold rounded-xl bg-opacity-100 py-1.5 px-2.5 mb-4"
            :class="'bg-grades-' + gradeColor(currentStats.currentGrade)"
            >{{ currentStats.currentGrade }}</span
          >
          <span
            class="text-30 font-bold"
            :class="'text-grades-' + gradeColor(currentStats.currentGrade)"
            >{{ currentStats.currentGradeValue }}</span
          >
        </div>
        <div class="flex flex-col divide-y divide-dashed">
          <div class="flex flex-col text-14 text-gray-700 font-semibold pb-6">
            <span class="w-full mb-1">Period (YTD)</span>
            <span class="bg-gray-100 bg-opacity-70 px-4 py-2 rounded-2xl"
              >2023-01-01 - 2023-02-10</span
            >
          </div>
          <div class="flex flex-col pt-6">
            <span class="text-14 text-gray-700 font-semibold"
              >Target CII Grade</span
            >
            <div
              class="flex justify-between bg-opacity-10 px-3 py-1.5 rounded-2xl"
              :class="'bg-grades-' + gradeColor(currentStats.currentGrade)"
            >
              <span
                class="text-14 font-bold"
                :class="'text-grades-' + gradeColor(currentStats.currentGrade)"
                >{{ currentStats.targetCIIGradeValue }}</span
              >
              <CIIGrade :grade="currentStats.targetCIIGrade" />
            </div>
            <div class="flex flex-col pt-6">
              <span class="text-14 text-gray-700 font-semibold"
                >C Level Limit</span
              >
              <div
                class="flex justify-between bg-grades-c bg-opacity-10 px-3 py-1.5 rounded-2xl"
              >
                <span class="text-14 font-bold text-grades-c">{{
                  currentStats.cLevelLimit
                }}</span>
                <CIIGrade :grade="'C'" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CIIVoyageCard :class="hide ? 'blur-sm' : ''" />
      <HazingBanner v-if="hide" />
    </div>
  </div>
</template>
