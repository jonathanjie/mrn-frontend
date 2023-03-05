<script setup>
import CIIGrade from "@/views/CIIViews/components/CIIGrade.vue";
import HazingBanner from "@/components/HazingBanner.vue";
const hide = true;
const grades = ["E", "D", "C", "B", "A"];
const percentages = ["> 28%", "8% to 28%", "-7% to 8%", "-18% to -7%", "<-18%"];

const series = [
  {
    name: "Grade E",
    data: [
      [2019, 5.23],
      [2020, 5.17],
      [2021, 5.12],
      [2022, 5.07],
      [2023, 5.02],
      [2024, 4.95],
      [2025, 4.9],
    ],
  },
  {
    name: "Grade D",
    data: [
      [2019, 5.07],
      [2020, 5.02],
      [2021, 4.97],
      [2022, 4.92],
      [2023, 4.87],
      [2024, 4.82],
      [2025, 4.77],
    ],
  },
  {
    name: "Grade C",
    data: [
      [2019, 4.92],
      [2020, 4.87],
      [2021, 4.82],
      [2022, 4.77],
      [2023, 4.72],
      [2024, 4.67],
      [2025, 4.62],
    ],
  },
  {
    name: "Grade B",
    data: [
      [2019, 4.77],
      [2020, 4.72],
      [2021, 4.67],
      [2022, 4.62],
      [2023, 4.57],
      [2024, 4.52],
      [2025, 4.47],
    ],
  },

  {
    name: "Grade A",
    data: [
      [2019, 4.62],
      [2020, 4.52],
      [2021, 4.42],
      [2022, 4.32],
      [2023, 4.27],
      [2024, 4.22],
      [2025, 4.17],
    ],
  },
  {
    name: "Vessel CII",
    data: [
      [2019, 5.07],
      [2020, 5.05],
      [2021, 4.82],
      [2022, 4.77],
      [2023, 4.72],
      [2024, 4.72],
      [2025, 4.72],
    ],
  },
];

const labels = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
let chartOptions = {
  chart: {
    labels: labels,
    type: "area",
  },
  colors: ["#F04438", "#FDA80C", "#FFD400", "#7BBD58", "#12B76A", "#1570EF"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.6,
      opacityTo: 0.8,
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
  },
  yaxis: {
    min: 4,
    max: 5.5,
  },
};
</script>
<template>
  <div class="flex flex-col bg-white rounded-t-xl p-5 shadow-md">
    <span class="text-18 font-bold text-gray-700 w-full"
      >CII Rating Evolution & Trendlines</span
    >
    <div class="flex relative mt-6">
      <div class="flex flex-col" :class="hide ? 'blur-sm' : ''">
        <div
          v-for="(grade, index) in grades"
          :key="grade.id"
          class="flex flex-row rounded-lg bg-gray-50 border border-gray-100 justify-between mb-3 px-3.5 py-3"
        >
          <div class="flex">
            <CIIGrade :grade="grade" />
            <span class="ml-2.5 text-16 text-gray-600">Grade {{ grade }}</span>
          </div>
          <span class="ml-14 text-gray-700 text-16 font-bold">{{
            percentages[index]
          }}</span>
        </div>
      </div>
      <div class="flex" :class="hide ? 'blur-sm' : ''">
        <apexchart
          type="area"
          height="400"
          width="900"
          :options="chartOptions"
          :series="series"
        />
      </div>
      <HazingBanner v-if="hide" />
    </div>
  </div>
</template>
