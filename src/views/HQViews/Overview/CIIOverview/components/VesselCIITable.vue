<script setup>
import CIIGrade from "@/views/CIIViews/components/CIIGrade.vue";
import HazingBanner from "@/components/HazingBanner.vue";
const hide = true;
const data = [
  {
    year: 2025,
    requiredCii: "4.60",
    attainedCiiGrade: null,
    attainedCiiGradeValue: null,
    estimatedCiiGrade: "A",
    estimatedCiiGradeValue: "4.62",
  },
  {
    year: 2024,
    requiredCii: "4.60",
    attainedCiiGrade: null,
    attainedCiiGradeValue: null,
    estimatedCiiGrade: "A",
    estimatedCiiGradeValue: "4.62",
  },
  {
    year: 2023,
    requiredCii: "4.60",
    attainedCiiGrade: null,
    attainedCiiGradeValue: null,
    estimatedCiiGrade: "A",
    estimatedCiiGradeValue: "4.62",
  },
  {
    year: 2022,
    requiredCii: "4.60",
    attainedCiiGrade: "A",
    attainedCiiGradeValue: "4.62",
    estimatedCiiGrade: null,
    estimatedCiiGradeValue: null,
  },
  {
    year: 2021,
    requiredCii: "4.60",
    attainedCiiGrade: "A",
    attainedCiiGradeValue: "4.62",
    estimatedCiiGrade: null,
    estimatedCiiGradeValue: null,
  },
  {
    year: 2020,
    requiredCii: "4.60",
    attainedCiiGrade: "A",
    attainedCiiGradeValue: "4.62",
    estimatedCiiGrade: null,
    estimatedCiiGradeValue: null,
  },
];
const currentYear = 2023;
const gradeColor = (grade) => {
  return grade.toLowerCase();
};
</script>
<template>
  <div
    class="flex relative flex-col bg-white w-full pt-8 pb-5 px-5 border-t border-gray-200 rounded-b-xl shadow-md"
  >
    <span class="text-18 text-blue-800 font-bold w-full"
      >CII Reference Table</span
    >
    <div class="flex relative flex-col">
      <div
        class="grid grid-cols-4 bg-gray-50 rounded-xl p-3.5 text-12 text-gray-500 font-bold mt-3"
      >
        <div>YEAR</div>
        <div>REQUIRED CII</div>
        <div>ATTAINED CII / CII RATE</div>
        <div>ESTIMATED CII RATE</div>
      </div>
      <div class="flex flex-col divide-y" :class="hide ? 'blur-sm' : ''">
        <div v-for="row in data" :key="row.id" class="p-3">
          <div
            class="grid grid-cols-4 rounded-xl px-3.5 py-3 text-14 text-gray-700 font-semibold items-center"
            :class="
              row.year === currentYear
                ? 'border border-blue-25 bg-blue-600 bg-opacity-10'
                : ''
            "
          >
            <span>{{ row.year }}</span>
            <span>{{ row.requiredCii }}</span>
            <div v-if="row.attainedCiiGrade != null" class="flex pr-auto">
              <div
                class="flex rounded-2xl px-2 py-1 text-12 font-bold bg-opacity-10 justify-between items-center"
                :class="'bg-grades-' + gradeColor(row.attainedCiiGrade)"
              >
                <span
                  class="mr-2"
                  :class="'text-grades-' + gradeColor(row.attainedCiiGrade)"
                  >{{ row.attainedCiiGradeValue }}</span
                >
                <CIIGrade :grade="row.attainedCiiGrade" />
              </div>
            </div>
            <span v-else>-</span>
            <div v-if="row.estimatedCiiGrade != null" class="flex pr-auto">
              <div
                class="flex rounded-2xl px-2 py-1 text-12 font-bold bg-opacity-10 justify-between items-center"
                :class="'bg-grades-' + gradeColor(row.estimatedCiiGrade)"
              >
                <span
                  class="mr-2"
                  :class="'text-grades-' + gradeColor(row.estimatedCiiGrade)"
                  >{{ row.estimatedCiiGradeValue }}</span
                >
                <CIIGrade :grade="row.estimatedCiiGrade" />
              </div>
            </div>
            <span v-else>-</span>
          </div>
        </div>
      </div>
      <HazingBanner v-if="hide" />
    </div>
  </div>
</template>
