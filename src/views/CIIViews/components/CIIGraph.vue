<script setup>
import { ref, reactive, watch } from "vue";
const props = defineProps({
  data: Object,
});
const grades = ["Grade A", "Grade B", "Grade C", "Grade D", "Grade E"];
const series = reactive({});

let years = ref([]);
watch(
  () => props.data,
  () => {
    for (let year in props.data) {
      years.value.push(year);
      series[year] = props.data[year];
    }
    console.log(series);
  }
);

const yearButton = reactive({});
for (let year in years) {
  if (year == 0) {
    yearButton[years[year]] = true;
  } else yearButton[years[year]] = false;
}
let selectedYear = years[0];

const switchColor = (year) => {
  for (let item in yearButton) {
    if (item == year) {
      selectedYear = year;
      yearButton[item] = true;
    } else {
      yearButton[item] = false;
    }
  }
};

const chartOptions = {
  dataLabels: {
    enabled: false,
  },
  labels: grades,
  colors: ["#12B76A", "#7BBD58", "#FFD400", "#FDA80C", "#F04438"],
  legend: {
    position: "bottom",
    offsetX: 50,
    horizontalAlign: "left",
    itemMargin: {
      horizontal: 18,
      vertical: 5,
    },
  },
  stroke: {
    show: false,
  },
  plotOptions: {
    donut: {
      size: "100%",
    },
  },
};
</script>

<template>
  <div class="flex flex-col bg-white rounded-xl w-full px-6 pt-5 mt-4">
    <div class="flex w-full justify-between items-center">
      <div class="flex">
        <span class="text-18 font-bold text-gray-700">{{
          $t("gradeRatingOverview")
        }}</span>
        <div class="flex rounded-xl h-7 w-auto bg-red-50 ml-2">
          <ul class="list-disc p-0.5 text-14 ml-6 mr-3">
            <li class="text-red-500 font-bold">
              <span class="text-red-700 font-bold">{{
                $t("currentStats")
              }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex rounded-lg bg-gray-100 p-1 space-x-2">
        <button
          class="flex px-2.5 py-0.5 items-center"
          :class="yearButton[year] ? 'bg-white rounded-xl' : ''"
          @click="switchColor(year)"
          v-for="year in years"
          :key="year.id"
        >
          <span
            class="text-14 font-semibold"
            :class="yearButton[year] ? 'text-blue-700' : 'text-gray-500'"
            >{{ year }}</span
          >
        </button>
      </div>
    </div>
    <div class="flex w-full mt-4">
      <div class="flex bg-gray-100 rounded-xl px-8 py-12">
        <apexchart
          width="400"
          type="donut"
          :options="chartOptions"
          :series="series[selectedYear]"
        />
      </div>
      <div
        class="flex flex-col w-full p-4 bg-gray-100 ml-5 rounded-xl align-middle"
      >
        <span class="text-14 text-gray-700 font-bold">{{
          $t("vesselGrade")
        }}</span>
        <div
          class="flex justify-between w-full rounded-l bg-white px-3 py-2.5 mt-3"
          v-for="(value, index) in series[selectedYear]"
          :key="value.id"
        >
          <span class="text-14 text-gray-600 ml-2.5">{{ grades[index] }}</span>
          <span class="text-14 text-gray-700 font-bold"
            >{{ value }} Vessel</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
