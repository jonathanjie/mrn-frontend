<script setup>
import CIIGrade from "@/views/CIIViews/components/CIIGrade.vue";
const voyages = [
  {
    voyageStart: "2023-01-01",
    voyageEnd: "2023-01-01",
    voyageNum: 1,
    distanceTravelled: 10000,
    co2Emission: 1000,
    ciiImpactPeriodGrade: "A",
    ciiImpactPeriodGradeValue: 4.62,
    ciiYtdGrade: "A",
    ciiYtdGradeValue: "4.62",
  },
  {
    voyageStart: "2023-01-01",
    voyageEnd: "2023-01-01",
    voyageNum: 1,
    distanceTravelled: 10000,
    co2Emission: 1000,
    ciiImpactPeriodGrade: "A",
    ciiImpactPeriodGradeValue: 4.62,
    ciiYtdGrade: "A",
    ciiYtdGradeValue: "4.62",
  },
  {
    voyageStart: "2023-01-01",
    voyageEnd: "2023-01-01",
    voyageNum: 1,
    distanceTravelled: 10000,
    co2Emission: 1000,
    ciiImpactPeriodGrade: "A",
    ciiImpactPeriodGradeValue: 4.62,
    ciiYtdGrade: "A",
    ciiYtdGradeValue: "4.62",
  },
  {
    voyageStart: "2023-01-01",
    voyageEnd: "2023-01-01",
    voyageNum: 1,
    distanceTravelled: 10000,
    co2Emission: 1000,
    ciiImpactPeriodGrade: "A",
    ciiImpactPeriodGradeValue: 4.62,
    ciiYtdGrade: "A",
    ciiYtdGradeValue: "4.62",
  },
  {
    voyageStart: "2023-01-01",
    voyageEnd: "2023-01-01",
    voyageNum: 1,
    distanceTravelled: 10000,
    co2Emission: 1000,
    ciiImpactPeriodGrade: "A",
    ciiImpactPeriodGradeValue: 4.62,
    ciiYtdGrade: "A",
    ciiYtdGradeValue: "4.62",
  },
];

const tableHeaders = [
  "PERIOD",
  "VOYAGE NO.",
  "DISTANCE TRAVELLED",
  "CO2 EMISSION",
  "CII IMPACT (Period)",
  "CII GRADE (YTD)",
];

const gradeColor = (grade) => {
  return grade.toLowerCase();
};
</script>

<template>
  <div class="flex flex-col rounded-xl bg-white p-4 w-full">
    <div class="flex divide-x space-x-4 text-14 text-sysblue-800 font-semibold">
      <span>2023-01-01 - 2023-02-08</span>
      <span class="pl-4">{{ voyages.length }} voyages</span>
    </div>
    <div
      class="grid rounded-2xl bg-gray-50 grid-cols-7 text-12 text-gray-500 font-bold justify-between w-full p-3.5 mt-3"
    >
      <span
        v-for="(item, index) in tableHeaders"
        class="whitespace-normal"
        :key="item.id"
        :class="index === 0 ? 'col-span-2' : ''"
        >{{ item }}</span
      >
    </div>
    <div
      v-for="voyage in voyages"
      :key="voyage.id"
      class="grid grid-cols-7 px-3.5 py-3 text-14 font-semibold text-gray-700 items-center mt-3"
    >
      <span class="col-span-2"
        >{{ voyage.voyageStart }} to {{ voyage.voyageEnd }}</span
      >
      <span>{{ voyage.voyageNum }}</span>
      <span>{{ voyage.distanceTravelled }}</span>
      <span>{{ voyage.co2Emission }}</span>
      <div class="flex pr-auto">
        <div
          class="flex rounded-2xl px-2 py-1 text-12 font-bold bg-opacity-10 justify-between items-center"
          :class="'bg-grades-' + gradeColor(voyage.ciiImpactPeriodGrade)"
        >
          <span
            class="mr-2"
            :class="'text-grades-' + gradeColor(voyage.ciiImpactPeriodGrade)"
            >{{ voyage.ciiImpactPeriodGradeValue }}</span
          >
          <CIIGrade :grade="voyage.ciiImpactPeriodGrade" />
        </div>
      </div>
      <div class="flex pr-auto">
        <div
          class="flex rounded-2xl px-2 py-1 text-12 font-bold bg-opacity-10 justify-between items-center"
          :class="'bg-grades-' + gradeColor(voyage.ciiYtdGrade)"
        >
          <span
            class="mr-2"
            :class="'text-grades-' + gradeColor(voyage.ciiYtdGrade)"
            >{{ voyage.ciiImpactPeriodGradeValue }}</span
          >
          <CIIGrade :grade="voyage.ciiYtdGrade" />
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <span>1234567890</span>
    </div>
  </div>
</template>
