<template>
  <div class="flex flex-row w-full ml-3.5 bg-white rounded-xl">
    <Line id="line-chart" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script setup>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register LineElement with ChartJS
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);
const chartData = {
  labels: ["16/7", "17/7", "18/7", "19/7", "20/7", "21/7", "22/7"],
  datasets: [
    {
      data: [4500, 4800, 4700, 4850, 4400, 4600, 4500],
      fill: true,
      backgroundColor: ["#77CEFF", "#0079AF", "#123E6B"],
    },
  ],
};
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Custom Chart Title",
    },
  },
  scales: {
    y: {
      min: 0,
    },
    x: {
      ticks: {},
    },
  },
};
</script>
