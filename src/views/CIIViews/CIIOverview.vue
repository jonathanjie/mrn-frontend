<script setup>
import CIIGraph from "./components/CIIGraph.vue";
import CIIVesselListCard from "./components/CIIVesselList/CIIVesselListCard.vue";
import CIIRatingAlertCard from "./components/CIIRatingAlertCard.vue";
// const inputData = [
//   {
//     uuid: "0e58c71e-3a0b-484e-8f24-120885f3b1ce",
//     name: "Test Ship 4",
//     imo_reg: 4234567,
//     company: {
//       uuid: "46e39081-dbdf-4816-8c09-5a40a36626b8",
//       name: "MarinaChain",
//       link: "https://www.marinachain.io/",
//     },
//     ship_type: "GAS",
//     shipspecs: {
//       flag: "Panama",
//       deadweight_tonnage: "2000.00",
//       cargo_unit: "cargoMt",
//       fuel_options: ["LSFO", "MGO"],
//       lubricating_oil_options: [
//         "me_cylinder_oil",
//         "me_system_oil",
//         "ge_system_oil",
//       ],
//       machinery_options: ["main_engine", "generator_engine", "boiler"],
//       propeller_pitch: "2.8740",
//     },
//     builtYear: 2002,
//     setupCii: true,
//     ciiGrade: {
//       2021: "B",
//       2022: "C",
//       2020: "A",
//       2023: "E",
//     },
//   },
//   {
//     uuid: "0d1de952-a361-4b18-95ec-dbaa7a0ca7d8",
//     name: "Test Ship 5",
//     imo_reg: 5234567,
//     company: {
//       uuid: "46e39081-dbdf-4816-8c09-5a40a36626b8",
//       name: "MarinaChain",
//       link: "https://www.marinachain.io/",
//     },
//     ship_type: "GEN",
//     shipspecs: {
//       flag: "Panama",
//       deadweight_tonnage: "2000.00",
//       cargo_unit: "cargoMt",
//       fuel_options: ["LSFO", "MGO"],
//       lubricating_oil_options: [
//         "me_cylinder_oil",
//         "me_system_oil",
//         "ge_system_oil",
//       ],
//       machinery_options: ["main_engine", "generator_engine", "boiler"],
//       propeller_pitch: "2.8740",
//     },
//     builtYear: 2002,
//     setupCii: true,
//     ciiGrade: {
//       2020: "A",
//       2021: "A",
//       2022: "B",
//       2023: "E",
//     },
//   },
//   {
//     uuid: "6c1a1e8c-4dfb-4fef-b98c-f43db4576b12",
//     name: "Test Ship 1",
//     imo_reg: 1234567,
//     company: {
//       uuid: "46e39081-dbdf-4816-8c09-5a40a36626b8",
//       name: "MarinaChain",
//       link: "https://www.marinachain.io/",
//     },
//     ship_type: "OIL",
//     shipspecs: {
//       flag: "Panama",
//       deadweight_tonnage: "2000.00",
//       cargo_unit: "cargoMt",
//       fuel_options: ["LSFO", "MGO"],
//       lubricating_oil_options: [
//         "me_cylinder_oil",
//         "me_system_oil",
//         "ge_system_oil",
//       ],
//       machinery_options: ["main_engine", "generator_engine", "boiler"],
//       propeller_pitch: "2.7839",
//     },
//     builtYear: 2002,
//     setupCii: true,
//     ciiGrade: {
//       2020: "A",
//       2021: "B",
//       2022: "C",
//       2023: "D",
//     },
//   },
//   {
//     uuid: "45f5fc6d-c600-419e-94f0-ae6b6df5b62a",
//     name: "Test Ship 2",
//     imo_reg: 2234567,
//     company: {
//       uuid: "46e39081-dbdf-4816-8c09-5a40a36626b8",
//       name: "MarinaChain",
//       link: "https://www.marinachain.io/",
//     },
//     ship_type: "OIL",
//     shipspecs: {
//       flag: "Panama",
//       deadweight_tonnage: "2000.00",
//       cargo_unit: "cargoMt",
//       fuel_options: ["HFO", "MDO"],
//       lubricating_oil_options: [
//         "me_cylinder_oil",
//         "me_system_oil",
//         "ge_system_oil",
//       ],
//       machinery_options: [
//         "main_engine",
//         "generator_engine",
//         "boiler",
//         "inert_gas_generator",
//       ],
//       propeller_pitch: "2.3000",
//     },
//     builtYear: 2002,
//     setupCii: true,
//     ciiGrade: {
//       2020: "A",
//       2021: "B",
//       2022: "C",
//       2023: "E",
//     },
//   },
//   {
//     uuid: "cd408268-cbee-4edc-8c36-d1ed720cb69b",
//     name: "Test Ship 3",
//     imo_reg: 3234567,
//     company: {
//       uuid: "46e39081-dbdf-4816-8c09-5a40a36626b8",
//       name: "MarinaChain",
//       link: "https://www.marinachain.io/",
//     },
//     ship_type: "OIL",
//     shipspecs: {
//       flag: "Panama",
//       deadweight_tonnage: "2000.00",
//       cargo_unit: "cargoMt",
//       fuel_options: ["LSFO", "MGO"],
//       lubricating_oil_options: [
//         "me_cylinder_oil",
//         "me_system_oil",
//         "ge_system_oil",
//       ],
//       machinery_options: ["main_engine", "generator_engine", "boiler"],
//       propeller_pitch: "2.8740",
//     },
//     builtYear: 2002,
//     setupCii: true,
//     ciiGrade: {
//       2020: "A",
//       2021: "B",
//       2022: "C",
//       2023: "D",
//     },
//   },
// ];
// Some api call to get the vessel and grade infomation
</script>
<template>
  <div class="flex flex-col px-12 pt-12 w-full">
    <span class="text-20 font-bold text-blue-800 w-full">{{
      $t("ciiOverview")
    }}</span>
    <CIIGraph :data="data" />

    <CIIVesselListCard></CIIVesselListCard>

    <CIIRatingAlertCard></CIIRatingAlertCard>
  </div>
</template>
