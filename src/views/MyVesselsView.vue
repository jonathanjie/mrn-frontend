<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="flex flex-wrap p-12 w-full">
      <h1 class="text-xl font-bold mb-6">Vessels Dashboard</h1>
      <!-- Box shadow need to fix -->
      <!-- Vessels dashboard -->
      <div class="grid xl:grid-cols-4 grid-cols-2 gap-x-5">
        <MyVesselsDashboardIconVue>
          <template v-slot:itemHeader>
            <h1 class="text-gray-500 text-xs">{{ $t("totalVessels") }}</h1>
          </template>
          <template v-slot:numVessels>
            <h2 v-if="totalVessels != 0" class="text-gray-700 text-lg">
              {{ totalVessels }}
            </h2>
            <h2 v-else class="text-gray-700 text-lg">-</h2>
          </template>
        </MyVesselsDashboardIconVue>
        <MyVesselsDashboardIconVue>
          <template v-slot:itemHeader>
            <h1 class="text-gray-500 text-xs">{{ $t("ownedVessels") }}</h1>
          </template>
          <template v-slot:numVessels>
            <h2 v-if="ownedVessels != 0" class="text-gray-700 text-lg">
              {{ ownedVessels }}
            </h2>
            <h2 v-else class="text-gray-700 text-lg">-</h2>
          </template>
        </MyVesselsDashboardIconVue>
        <MyVesselsDashboardIconVue>
          <template v-slot:itemHeader>
            <h1 class="text-gray-500 text-xs">{{ $t("chartVessels") }}</h1>
          </template>
          <template v-slot:numVessels>
            <h2 v-if="chartVessels != 0" class="text-gray-700 text-lg">
              {{ chartVessels }}
            </h2>
            <h2 v-else class="text-gray-700 text-lg">-</h2>
          </template>
        </MyVesselsDashboardIconVue>
        <MyVesselsDashboardIconVue>
          <template v-slot:itemHeader>
            <h1 class="text-gray-500 text-xs">{{ $t("etcVessels") }}</h1>
          </template>
          <template v-slot:numVessels>
            <h2 v-if="etcVessels != 0" class="text-gray-700 text-lg">
              {{ etcVessels }}
            </h2>
            <h2 v-else class="text-gray-700 text-lg">-</h2>
          </template>
        </MyVesselsDashboardIconVue>
      </div>
      <!-- Vessels list header -->
      <div class="flex mt-10 w-full items-center">
        <h1 class="text-xl font-bold w-full">
          {{ $t("vesselList") }} ({{ totalVessels }})
        </h1>
        <div class="flex justify-end">
          <div
            class="flex bg-white border border-gray-300 w-60 h-10 rounded-lg mr-4"
          >
            <img class="w-6 m-2" src="@/assets/icons/search_icon.svg" />
            <input
              class="w-32 text-14 text-gray-400"
              type="search"
              :placeholder="$t('searchVessels')"
              icon="search"
            />
          </div>
          <!-- Need to figure out table filter and export CSV -->
          <CustomButtonVue
            class="text-14 text-sm font-bold mr-4 pr-7 whitespace-nowrap text-blue-700"
            type="button"
            @click=""
          >
            <template v-slot:icon
              ><img
                src="@/assets/icons/My_Vessels/table_filter.svg"
                class="w-4 h-4"
            /></template>
            <template v-slot:content>{{ $t("tableFilter") }}</template>
          </CustomButtonVue>
          <CustomButtonVue
            class="text-14 text-sm font-bold mr-4 pr-7 whitespace-nowrap text-blue-700"
            type="button"
            @click=""
          >
            <template v-slot:icon
              ><img src="@/assets/icons/My_Vessels/csv.svg" class="w-4 h-4"
            /></template>
            <template v-slot:content>{{ $t("exportCSV") }}</template>
          </CustomButtonVue>
        </div>
      </div>
    </div>
    <!-- Vessels list content -->
    <!-- if there are no voyages in backend -->
    <div
      v-if="isEmpty"
      class="flex flex-col p-24 pb-52 m-12 justify-center items-center space-y-2 rounded-xl"
    >
      <img src="@/assets/icons/empty.svg" class="h-28 w-28" />
      <span class="text-lg font-bold text-gray-800 pt-3">{{
        $t("noVesselCreated")
      }}</span>
      <span class="text-14 text-gray-500">{{
        $t("clickOnCreateNewVoyageAboveToBegin")
      }}</span>
    </div>
    <div v-else class="flex flex-col">
      <VesselCard
        v-for="vessel in vessels"
        :marinaName="vessel.marinaName"
        :vesselType="vessel.vesselType"
        :flag="vessel.flag"
        :imoNo="vessel.imoNo"
        :shipSize="vessel.shipSize"
        :dwt="vessel.dwt"
        :grossTonnage="vessel.grossTonnage"
        :cubicCapacity="vessel.cubicCapacity"
        :speed="vessel.speed"
        :vesselAge="vessel.vesselAge"
        :vesselOwnership="vessel.vesselOwnership"
        :mainEngineImo="vessel.mainEngineImo"
        :fuelType="vessel.fuelType"
        :percentActive="vessel.percentActive"
        :percentIdle="vessel.percentIdle"
        :reportedEedi="vessel.reportedEedi"
        :bwts="vessel.bwts"
        :scrubber="vessel.scrubber"
      ></VesselCard>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MyVesselsDashboardIconVue from "@/components/MyVesselsDashboardIcon.vue";
import CustomButtonVue from "@/components/Buttons/CustomButton.vue";
import VesselCard from "@/components/VesselCard.vue";

// To be pulled from backend
const totalVessels = 33;
const ownedVessels = 20;
const chartVessels = 13;
const etcVessels = 0;
const isEmpty = false;

const vessels = ref([
  {
    marinaName: "MARINA A",
    vesselType: "Oil",
    flag: "Panama",
    imoNo: "9876543",
    shipSize: "300,000",
    dwt: "300,000",
    grossTonnage: "157,000",
    cubicCapacity: "-",
    speed: "10.6",
    vesselAge: "0.33",
    vesselOwnership: "Chartered",
    mainEngineImo: "Tier III",
    fuelType: "Conventional",
    percentActive: "98",
    percentIdle: "2",
    reportedEedi: "2.03",
    bwts: "Fitted",
    scrubber: "Installed",
  },
  {
    marinaName: "MARINA B",
    vesselType: "Oil Chemical",
    flag: "Marshall",
    imoNo: "9876542",
    shipSize: "12,900",
    dwt: "12,900",
    grossTonnage: "8,543",
    cubicCapacity: "12,374",
    speed: "-",
    vesselAge: "4.2",
    vesselOwnership: "Owned",
    mainEngineImo: "Tier II",
    fuelType: "Conventional",
    percentActive: "100",
    percentIdle: "-",
    reportedEedi: "Not Reported",
    bwts: "Fitted",
    scrubber: "-",
  },
  {
    marinaName: "MARINA C",
    vesselType: "Bulk Carrier",
    flag: "Panama",
    imoNo: "9876541",
    shipSize: "177,000",
    dwt: "177,000",
    grossTonnage: "91,000",
    cubicCapacity: "12,374",
    speed: "-",
    vesselAge: "4.2",
    vesselOwnership: "Owned",
    mainEngineImo: "Tier II",
    fuelType: "Conventional",
    percentActive: "100",
    percentIdle: "-",
    reportedEedi: "Not Reported",
    bwts: "Fitted",
    scrubber: "-",
  },
  {
    marinaName: "MARINA D",
    vesselType: "Container Ship",
    flag: "Singapore",
    imoNo: "9876540",
    shipSize: "16,000",
    dwt: "186,470",
    grossTonnage: "175,343",
    cubicCapacity: "12,374",
    speed: "-",
    vesselAge: "4.2",
    vesselOwnership: "Owned",
    mainEngineImo: "Tier II",
    fuelType: "Conventional",
    percentActive: "100",
    percentIdle: "-",
    reportedEedi: "Not Reported",
    bwts: "Fitted",
    scrubber: "-",
  },
  {
    marinaName: "MARINA E",
    vesselType: "LNG Carrier",
    flag: "South Korea",
    imoNo: "9876539",
    shipSize: "174,000",
    dwt: "95,200",
    grossTonnage: "113,500",
    cubicCapacity: "-",
    speed: "14.4",
    vesselAge: "0.2",
    vesselOwnership: "Owned",
    mainEngineImo: "Tier III",
    fuelType: "LNG DF",
    percentActive: "93",
    percentIdle: "7",
    reportedEedi: "Not Reported",
    bwts: "Fitted",
    scrubber: "-",
  }
])

// const getShips = async () => {
//   const DUMMY_TOKEN = localStorage.getItem("jwt");
//   // console.log(DUMMY_TOKEN)
//   const response = await fetch(
//     "https://testapi.marinachain.io/marinanet/ships/",
//     {
//       headers: {
//         Authorization: "Bearer " + DUMMY_TOKEN,
//         "Content-Type": "application/json",
//       },
//       method: "GET",
//     }
//   );

//   const ships = await response.json();
//   console.log("SHIPS: ", ships);
//   return ships;
// };
</script>
