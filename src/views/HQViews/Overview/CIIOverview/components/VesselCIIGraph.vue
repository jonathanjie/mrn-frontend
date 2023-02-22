<script setup>
import CIIGrade from "@/views/CIIViews/components/CIIGrade.vue";
const grades = ["E", "D", "C", "B", "A"];
const percentages = ["> 28%", "8% to 28%", "-7% to 8%", "-18% to -7%", "<-18%"];

const data = [
  {
    year: 2019,
    ciiValue: 5.5,
  },
  {
    year: 2020,
    ciiValue: 5.0,
  },
  {
    year: 2021,
    ciiValue: 4.75,
  },
  {
    year: 2022,
    ciiValue: 4.5,
  },
];

const requiredCII = 4.6;
const series = [
  {
    name: "Grade A",
    data: [
      [2019, 5.0],
      [2020, 4.9],
      [2021, 4.8],
      [2022, 4.7],
    ],
  },
  {
    name: "Grade B",
    data: [
      [2019, 5.0],
      [2020, 4.9],
      [2021, 4.8],
      [2022, 4.7],
    ],
  },
  {
    name: "Grade C",
    data: [
      [2019, 5.0],
      [2020, 4.9],
      [2021, 4.8],
      [2022, 4.7],
    ],
  },
  {
    name: "Grade D",
    data: [
      [2019, 5.0],
      [2020, 4.9],
      [2021, 4.8],
      [2022, 4.7],
    ],
  },
  {
    name: "Grade E",
    data: [
      [2019, 5.0],
      [2020, 4.9],
      [2021, 4.8],
      [2022, 4.7],
    ],
  },
];

const labels = [2019, 2020, 2021, 2022];
let chartOptions = {
  chart: {
    labels: labels,
    type: "area",
    stacked: true,
  },
  colors: ["#12B76A", "#7BBD58", "#FFD400", "#FDA80C", "#F04438"],
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
};
</script>
<template>
  <div class="flex flex-col bg-white rounded-xl p-5">
    <span class="text-18 font-bold text-gray-700 w-full"
      >CII Rating Evolution & Trendlines</span
    >
    <div class="flex mt-6">
      <div class="flex flex-col">
        <div
          v-for="(grade, index) in grades"
          :key="grade.id"
          class="flex flex-row rounded-lg bg-gray-50 border border-gray-100 justify-between mb-3 px-3.5 py-3"
        >
          <div class="flex">
            <CIIGrade :grade="grade" />
            <span class="ml-2.5 text-16 text-gray-600">Grade {{ grade }}</span>
          </div>
          <span class="text-gray-700 text-16 font-bold">{{
            percentages[index]
          }}</span>
        </div>
      </div>
      <div class="flex bg-white w-full">
        <apexchart
          width="700"
          type="area"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </div>
  </div>
</template>
