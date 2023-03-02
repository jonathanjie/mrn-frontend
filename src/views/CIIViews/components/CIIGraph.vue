<script setup>
import { reactive, toRefs } from "vue";
const props = defineProps({
  data: Object,
  years: Array,
});
const { data, years } = toRefs(props);
if (data.value === undefined || data.value === null) {
  throw new Error("Prop has issues: data");
}

if (years.value === undefined || years.value === null) {
  throw new Error("Prop has issues: yearsList");
}
const yearsList = years.value.sort();
const grades = ["Grade A", "Grade B", "Grade C", "Grade D", "Grade E"];

let shipData = reactive({});

for (let index in years.value) {
  let year = years.value[index];
  let yearCount = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
  };
  for (let ship in data.value) {
    let shipGrade = data.value[ship].ciiGrade[year];
    if (shipGrade != undefined) {
      yearCount[shipGrade]++;
    }
  }
  let gradeKeys = Object.keys(yearCount).sort();
  let tempList = [];
  for (let grade in gradeKeys) {
    tempList.push(yearCount[gradeKeys[grade]]);
  }
  shipData[year] = tempList;
}

const yearButton = reactive({});
for (let year in years.value) {
  if (year == 0) {
    yearButton[years.value[year]] = true;
  } else yearButton[years.value[year]] = false;
}

let selectedYear = years.value[0];

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

let chartOptions = {
  dataLabels: {
    enabled: false,
  },
  labels: grades,
  colors: ["#12B76A", "#7BBD58", "#FFD400", "#FDA80C", "#F04438"],
  legend: {
    // showForZeroSeries: false,
    labels: {
      colors: ["#12B76A", "#7BBD58", "#FFD400", "#FDA80C", "#F04438"],
    },
    position: "bottom",
    offsetX: 50,
    horizontalAlign: "left",
    itemMargin: {
      horizontal: 18,
      vertical: 5,
    },
    onItemClick: {
      toggleDataSeries: true,
    },
    OnItemHover: {
      highlightDataSeries: true,
    },
  },
  stroke: {
    show: false,
  },
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        labels: {
          show: true,
          name: {
            show: true,
            offsetY: -10,
          },
          value: {
            show: true,
          },
          total: {
            show: true,
            showAlways: true,
            color: "#667085",
            label: "Total Vessels",
          },
        },
      },
    },
  },
  tooltip: {
    enabled: true,
  },
};

if (Object.keys(shipData).length == 0) {
  chartOptions.legend.onItemClick.toggleDataSeries = false;
  chartOptions.legend.OnItemHover.highlightDataSeries = false;
  chartOptions.tooltip.enabled = false;
  chartOptions.plotOptions.pie.donut.labels.name.offsetY = 10;
  chartOptions.plotOptions.pie.donut.labels.value.show = false;
  chartOptions.plotOptions.pie.donut.labels.total.label = "No Data";
}
</script>

<template>
  <div class="flex flex-col bg-white rounded-xl w-full p-5 mt-4">
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
      <div
        v-if="years.length != 0"
        class="flex rounded-lg bg-gray-100 p-1 space-x-2"
      >
        <button
          class="flex px-2.5 py-0.5 items-center"
          :class="yearButton[year] ? 'bg-white rounded-xl' : ''"
          @click="switchColor(year)"
          v-for="year in yearsList"
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
          :series="Object.keys(shipData) != 0 ? shipData[selectedYear] : [1]"
        />
      </div>
      <div
        class="flex flex-col w-full p-4 bg-gray-100 ml-5 rounded-xl align-middle"
      >
        <span class="text-14 text-gray-700 font-bold">{{
          $t("vesselGrade")
        }}</span>
        <div v-if="Object.keys(shipData) != 0">
          <div
            class="flex justify-between w-full rounded-l bg-white px-3 py-2.5 mt-3"
            v-for="(value, index) in shipData[selectedYear]"
            :key="value.id"
          >
            <div class="flex">
              <img
                v-if="grades[index].split(' ')[1] == 'A'"
                src="@/assets/icons/Cii/Grades/Graph/A.svg"
              />
              <img
                v-else-if="grades[index].split(' ')[1] == 'B'"
                src="@/assets/icons/Cii/Grades/Graph/B.svg"
              />
              <img
                v-else-if="grades[index].split(' ')[1] == 'C'"
                src="@/assets/icons/Cii/Grades/Graph/C.svg"
              />
              <img
                v-else-if="grades[index].split(' ')[1] == 'D'"
                src="@/assets/icons/Cii/Grades/Graph/D.svg"
              />
              <img v-else src="@/assets/icons/Cii/Grades/Graph/E.svg" />

              <span class="text-14 text-gray-600 ml-2.5">{{
                grades[index]
              }}</span>
            </div>
            <span class="text-14 text-gray-700 font-bold"
              >{{ value }} Vessel</span
            >
          </div>
        </div>
        <div v-else>
          <div
            class="flex justify-between w-full rounded-l bg-white px-3 py-2.5 mt-3 items-center"
            v-for="value in grades"
            :key="value.id"
          >
            <div class="flex">
              <img
                v-if="value.split(' ')[1] == 'A'"
                src="@/assets/icons/Cii/Grades/Graph/A.svg"
              />
              <img
                v-else-if="value.split(' ')[1] == 'B'"
                src="@/assets/icons/Cii/Grades/Graph/B.svg"
              />
              <img
                v-else-if="value.split(' ')[1] == 'C'"
                src="@/assets/icons/Cii/Grades/Graph/C.svg"
              />
              <img
                v-else-if="value.split(' ')[1] == 'D'"
                src="@/assets/icons/Cii/Grades/Graph/D.svg"
              />
              <img v-else src="@/assets/icons/Cii/Grades/Graph/E.svg" />
              <span class="text-14 text-gray-600 ml-2.5">{{ value }}</span>
            </div>
            <span class="text-14 text-gray-700 font-bold">-</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
