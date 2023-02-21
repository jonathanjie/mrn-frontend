<script setup>
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
    ciiYtdGradeGrade: "A",
  },
];
</script>

<template>
  <div class="flex flex-col rounded-xl bg-white p-4">
    <div class="flex divide-x space-x-4">
      <span>2023-01-01 - 2023-02-08</span>
      <span>{{}} voyages</span>
    </div>
  </div>
</template>
