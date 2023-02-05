<script setup>
import { reactive } from "vue";
// const props = defineProps({
//   data: Object,
// });

const inputData = [
  {
    uuid: "0e58c71e-3a0b-484e-8f24-120885f3b1ce",
    name: "Test Ship 4",
    imo_reg: 4234567,
    company: {
      uuid: "46e39081-dbdf-4816-8c09-5a40a36626b8",
      name: "MarinaChain",
      link: "https://www.marinachain.io/",
    },
    ship_type: "GAS",
    shipspecs: {
      flag: "Panama",
      deadweight_tonnage: "2000.00",
      cargo_unit: "cargoMt",
      fuel_options: ["LSFO", "MGO"],
      lubricating_oil_options: [
        "me_cylinder_oil",
        "me_system_oil",
        "ge_system_oil",
      ],
      machinery_options: ["main_engine", "generator_engine", "boiler"],
      propeller_pitch: "2.8740",
    },
    builtYear: 2002,
    setupCii: true,
    ciiGrade: {
      2021: "B",
      2022: "C",
      2020: "A",
      2023: "E",
    },
  },
  {
    uuid: "0d1de952-a361-4b18-95ec-dbaa7a0ca7d8",
    name: "Test Ship 5",
    imo_reg: 5234567,
    company: {
      uuid: "46e39081-dbdf-4816-8c09-5a40a36626b8",
      name: "MarinaChain",
      link: "https://www.marinachain.io/",
    },
    ship_type: "GEN",
    shipspecs: {
      flag: "Panama",
      deadweight_tonnage: "2000.00",
      cargo_unit: "cargoMt",
      fuel_options: ["LSFO", "MGO"],
      lubricating_oil_options: [
        "me_cylinder_oil",
        "me_system_oil",
        "ge_system_oil",
      ],
      machinery_options: ["main_engine", "generator_engine", "boiler"],
      propeller_pitch: "2.8740",
    },
    builtYear: 2002,
    setupCii: true,
    ciiGrade: {
      2020: "A",
      2021: "A",
      2022: "B",
      2023: "E",
    },
  },
  {
    uuid: "6c1a1e8c-4dfb-4fef-b98c-f43db4576b12",
    name: "Test Ship 1",
    imo_reg: 1234567,
    company: {
      uuid: "46e39081-dbdf-4816-8c09-5a40a36626b8",
      name: "MarinaChain",
      link: "https://www.marinachain.io/",
    },
    ship_type: "OIL",
    shipspecs: {
      flag: "Panama",
      deadweight_tonnage: "2000.00",
      cargo_unit: "cargoMt",
      fuel_options: ["LSFO", "MGO"],
      lubricating_oil_options: [
        "me_cylinder_oil",
        "me_system_oil",
        "ge_system_oil",
      ],
      machinery_options: ["main_engine", "generator_engine", "boiler"],
      propeller_pitch: "2.7839",
    },
    builtYear: 2002,
    setupCii: true,
    ciiGrade: {
      2020: "A",
      2021: "B",
      2022: "C",
      2023: "D",
    },
  },
  {
    uuid: "45f5fc6d-c600-419e-94f0-ae6b6df5b62a",
    name: "Test Ship 2",
    imo_reg: 2234567,
    company: {
      uuid: "46e39081-dbdf-4816-8c09-5a40a36626b8",
      name: "MarinaChain",
      link: "https://www.marinachain.io/",
    },
    ship_type: "OIL",
    shipspecs: {
      flag: "Panama",
      deadweight_tonnage: "2000.00",
      cargo_unit: "cargoMt",
      fuel_options: ["HFO", "MDO"],
      lubricating_oil_options: [
        "me_cylinder_oil",
        "me_system_oil",
        "ge_system_oil",
      ],
      machinery_options: [
        "main_engine",
        "generator_engine",
        "boiler",
        "inert_gas_generator",
      ],
      propeller_pitch: "2.3000",
    },
    builtYear: 2002,
    setupCii: true,
    ciiGrade: {
      2020: "A",
      2021: "B",
      2022: "C",
      2023: "E",
    },
  },
  {
    uuid: "cd408268-cbee-4edc-8c36-d1ed720cb69b",
    name: "Test Ship 3",
    imo_reg: 3234567,
    company: {
      uuid: "46e39081-dbdf-4816-8c09-5a40a36626b8",
      name: "MarinaChain",
      link: "https://www.marinachain.io/",
    },
    ship_type: "OIL",
    shipspecs: {
      flag: "Panama",
      deadweight_tonnage: "2000.00",
      cargo_unit: "cargoMt",
      fuel_options: ["LSFO", "MGO"],
      lubricating_oil_options: [
        "me_cylinder_oil",
        "me_system_oil",
        "ge_system_oil",
      ],
      machinery_options: ["main_engine", "generator_engine", "boiler"],
      propeller_pitch: "2.8740",
    },
    builtYear: 2002,
    setupCii: true,
    ciiGrade: {
      2020: "A",
      2021: "B",
      2022: "C",
      2023: "D",
    },
  },
];

// const inputData = [];
const grades = ["Grade A", "Grade B", "Grade C", "Grade D", "Grade E"];
let years = [];
for (let i in inputData) {
  let keys = Object.keys(inputData[i].ciiGrade);
  for (let key in keys) {
    if (!years.includes(keys[key])) {
      years.push(keys[key]);
    }
  }
}
years.reverse();
let shipData = reactive({});

for (let index in years) {
  let year = years[index];
  let yearCount = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
  };
  for (let ship in inputData) {
    let shipGrade = inputData[ship].ciiGrade[year];
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

// watch(
//   () => props.data,
//   () => {
//     for (let year in props.data) {
//       years.value.push(year);
//       series[year] = props.data[year];
//     }
//     console.log(series);
//   }
// );

// const data = {
//   2020: [11, 15, 16, 1, 1],
//   2021: [1, 2, 3, 4, 5],
//   2022: [10, 1, 6, 10, 20],
//   2023: [0],
// };

// for (let year in data) {
//   if (data[year].length == 0) {
//     series[year] = 1;
//   } else series[year] = data[year];
// }
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
            class="flex justify-between w-full rounded-l bg-white px-3 py-2.5 mt-3"
            v-for="value in grades"
            :key="value.id"
          >
            <div>
              <span
                class="bg-grades-a text-white text-12 font-bold rounded-2xl"
                >{{ value.split(" ")[1] }}</span
              >
              <span class="text-14 text-gray-600 ml-2.5">{{ value }}</span>
            </div>
            <div>
              <span class="text-14 text-gray-700 font-bold">-</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
