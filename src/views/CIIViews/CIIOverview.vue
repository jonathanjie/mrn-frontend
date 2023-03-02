<script setup>
import { ref } from "vue";
import CIIGraph from "./components/CIIGraph.vue";
import CIIVesselListCard from "./components/CIIVesselList/CIIVesselListCard.vue";
import CIIRatingAlertCard from "./components/CIIRatingAlert/CIIRatingAlertCard.vue";

const inputData = [
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
    setupCii: false,
    ciiGrade: {
      2020: "A",
      2021: "B",
      2022: "C",
      2023: {
        gradeLimit: "B",
        gradeLimitValue: "4.87",
        currentGrade: "C",
        currentGradeValue: "3.62",
      },
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
      2023: {
        gradeLimit: "B",
        gradeLimitValue: "4.87",
        currentGrade: "A",
        currentGradeValue: "4.62",
      },
    },
  },
];
// Some api call to get the vessel and grade infomation

let years = [];
for (let i in inputData) {
  let keys = Object.keys(inputData[i].ciiGrade);
  for (let key in keys) {
    if (!years.includes(keys[key])) {
      years.push(keys[key]);
    }
  }
}

let hover = ref(false);
</script>
<template>
  <div class="flex flex-col px-12 pt-12 w-full divide-y relative">
    <div class="mb-10">
      <div class="flex items-center w-full">
        <div
          v-if="hover"
          class="bg-black absolute rounded-xl py-2 px-3 -mt-16 ml-16"
        >
          <span class="text-12 text-white"
            >View the CII overview of your fleet by voyage, past historical and
            current year</span
          >
        </div>
        <span class="text-20 font-bold text-blue-800 mr-2">{{
          $t("ciiOverview")
        }}</span>
        <img
          src="@/assets/icons/hover_icon.svg"
          @mouseover="hover = true"
          @mouseleave="hover = false"
        />
      </div>

      <CIIGraph :data="inputData" :years="years" />
      <CIIVesselListCard :data="inputData" :yearsList="years" />
    </div>

    <CIIRatingAlertCard />
  </div>
</template>
