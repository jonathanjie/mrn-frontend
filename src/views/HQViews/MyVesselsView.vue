<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="flex flex-wrap px-12 pt-12 w-full">
      <div class="flex flex-wrap w-full mb-6">
        <h1 class="text-20 font-bold mb-4">Vessels Dashboard</h1>
        <!-- Vessels dashboard -->
        <div class="grid xl:grid-cols-4 grid-cols-2 gap-x-5 w-full">
          <MyVesselsDashboardIcon>
            <template v-slot:img>
              <img
                src="@/assets/icons/My_Vessels/total_vessels_dashboard.svg"
                class="rounded-full bg-blue-50 h-11 w-11 p-2.5"
              />
            </template>
            <template v-slot:itemHeader>
              <h1 class="text-gray-500 text-12">{{ $t("totalVessels") }}</h1>
            </template>
            <template v-slot:numVessels>
              <h2
                v-if="isSuccess && ships.length != 0"
                class="text-gray-700 text-18"
              >
                {{ ships.length }}
              </h2>
              <h2 v-else class="text-gray-700 text-18">-</h2>
            </template>
          </MyVesselsDashboardIcon>
          <MyVesselsDashboardIcon>
            <template v-slot:img>
              <img
                src="@/assets/icons/My_Vessels/sailing_dashboard.svg"
                class="rounded-full bg-blue-50 h-11 w-11 p-2.5"
              />
            </template>
            <template v-slot:itemHeader>
              <h1 class="text-gray-500 text-12">
                {{ $t("sailingVessels") }}
              </h1>
            </template>
            <template v-slot:numVessels>
              <h2 v-if="sailingVessels != 0" class="text-gray-700 text-18">
                {{ sailingVessels }}
              </h2>
              <h2 v-else class="text-gray-700 text-18">-</h2>
            </template>
          </MyVesselsDashboardIcon>
          <MyVesselsDashboardIcon>
            <template v-slot:img>
              <img
                src="@/assets/icons/My_Vessels/in_port._dashboard.svg"
                class="rounded-full bg-blue-50 h-11 w-11 p-2.5"
              />
            </template>
            <template v-slot:itemHeader>
              <h1 class="text-gray-500 text-12">{{ $t("inPortVessels") }}</h1>
            </template>
            <template v-slot:numVessels>
              <h2 v-if="inPortVessels != 0" class="text-gray-700 text-18">
                {{ inPortVessels }}
              </h2>
              <h2 v-else class="text-gray-700 text-18">-</h2>
            </template>
          </MyVesselsDashboardIcon>
          <MyVesselsDashboardIcon>
            <template v-slot:img>
              <img
                src="@/assets/icons/My_Vessels/etc_dashboard.svg"
                class="rounded-full bg-blue-50 h-11 w-11 p-2.5"
              />
            </template>
            <template v-slot:itemHeader>
              <h1 class="text-gray-500 text-12">{{ $t("etcVessels") }}</h1>
            </template>
            <template v-slot:numVessels>
              <h2 v-if="etcVessels != 0" class="text-gray-700 text-18">
                {{ etcVessels }}
              </h2>
              <h2 v-else class="text-gray-700 text-18">-</h2>
            </template>
          </MyVesselsDashboardIcon>
        </div>
      </div>
      <hr class="w-full bg-gray-200" />
      <div
        class="flex bg-white w-full h-16 rounded-xl items-center p-3.5 mt-6 justify-evenly shadow"
      >
        <!-- Sailing Icon -->
        <div class="flex">
          <img
            src="@/assets/icons/My_Vessels/sailing_icon.svg"
            class="rounded-full bg-blue-50 h-11 w-11 py-2.5 px-3"
          />
          <div class="my-3 ml-2">
            <span class="text-12 text-gray-700"
              >{{ $t("sailingVessels") }}:
            </span>
            <span class="text-12 font-bold text-gray-700"
              >{{ sailingVessels }} vessels</span
            >
          </div>
        </div>
        <!-- Cargo operation icon (Need to check background color) -->
        <div class="flex">
          <img
            src="@/assets/icons/My_Vessels/cargo_icon.svg"
            class="rounded-full bg-blue-50 h-11 w-11 py-2.5 px-3"
          />
          <div class="my-3 ml-2">
            <span class="text-12 text-gray-700"
              >{{ $t("cargoOperation") }}:
            </span>
            <span class="text-12 font-bold text-gray-700"
              >{{ cargoVessels }} vessels</span
            >
          </div>
        </div>
        <!-- Bunkering Icon (Need to check background color) -->
        <div class="flex">
          <img
            src="@/assets/icons/My_Vessels/bunkering_icon.svg"
            class="rounded-full bg-blue-50 h-11 w-11 py-2.5 px-3"
          />
          <div class="my-3 ml-2">
            <span class="text-12 text-gray-700">{{ $t("bunkering") }}: </span>
            <span class="text-12 font-bold text-gray-700"
              >{{ bunkeringVessels }} vessels</span
            >
          </div>
        </div>
        <!-- Waiting Icon -->
        <div class="flex">
          <img
            src="@/assets/icons/My_Vessels/waiting_icon.svg"
            class="rounded-full bg-yellow-25 h-11 w-11 py-2.5 px-3"
          />
          <div class="my-3 ml-2">
            <span class="text-12 text-gray-700">{{ $t("waiting") }}: </span>
            <span class="text-12 font-bold text-gray-700"
              >{{ waitingVessels }} vessels</span
            >
          </div>
        </div>
        <!-- Etc Icon -->
        <div class="flex">
          <img
            src="@/assets/icons/My_Vessels/etc_icon.svg"
            class="rounded-full bg-gray-25 h-11 w-11 py-2.5 px-3"
          />
          <div class="my-3 ml-2">
            <span class="text-12 text-gray-700">{{ $t("etcVessels") }}: </span>
            <span class="text-12 font-bold text-gray-700"
              >{{ etcVessels }} vessels</span
            >
          </div>
        </div>
      </div>
      <!-- Vessels list header -->
      <div class="flex mt-12 w-full items-center">
        <h1 v-if="isSuccess" class="text-20 font-bold w-full">
          {{ $t("vesselList") }} ({{ ships.length }})
        </h1>
        <div class="flex justify-end">
          <div
            class="hidden flex bg-white border border-gray-300 w-60 h-10 rounded-lg mr-4"
          >
            <img class="w-6 m-2" src="@/assets/icons/search_icon.svg" />
            <input
              class="w-32 text-14 text-gray-400 focus:outline-none"
              :placeholder="$t('searchVessels')"
              icon="search"
            />
          </div>
          <!-- Need to figure out table filter and export CSV -->
          <CustomButton
            class="hidden text-14 text-sm font-bold mr-4 pr-7 whitespace-nowrap text-blue-700"
            type="button"
          >
            <template v-slot:icon
              ><img
                src="@/assets/icons/My_Vessels/table_filter.svg"
                class="w-4 h-4 mr-1.5"
            /></template>
            <template v-slot:content>{{ $t("tableFilter") }}</template>
          </CustomButton>
          <CustomButton
            class="hidden text-14 text-sm font-bold mr-4 pr-7 whitespace-nowrap text-blue-700"
            type="button"
          >
            <template v-slot:icon
              ><img
                src="@/assets/icons/My_Vessels/csv.svg"
                class="w-4 h-4 mr-1.5"
            /></template>
            <template v-slot:content>{{ $t("exportCSV") }}</template>
          </CustomButton>
        </div>
      </div>
    </div>
    <!-- Vessels list content -->
    <!-- if there are no voyages in backend -->
    <div v-if="isSuccess" class="flex flex-col">
      <VesselCard
        v-for="(ship, i) in ships"
        :key="i"
        :vesselName="ship.name == null ? 'Invalid Ship' : ship.name"
        :loadType="
          ship.ship_type == null ? 'Invalid Ship' : shipRef[ship.ship_type]
        "
        :imoNo="ship.imo_reg == null ? 'Invalid Ship' : ship.imo_reg"
        :vesselStatus="
          ship_last_report_type == null
            ? 'No report uploaded'
            : vesselStatus(ship_last_report_type)
        "
        :flag="ship.flag == null ? 'Invalid Ship' : ship_flag"
        :shipSize="
          ship.deadweight_tonnage == null
            ? 'Invalid Ship'
            : ship.deadweight_tonnage
        "
        :loadingCondition="
          ship.load_condition != null
            ? ship.load_condition
            : 'No report uploaded'
        "
        :reportStatus="reportStatus(ship.last_report_date)"
        :updatedDate="dateConverter(ship.last_report_date)"
      />
    </div>
    <div
      v-else
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
    <hr class="mt-6 w-full bg-gray-200" />
    <!-- Pagination module -->
    <div class="hidden flex justify-center">12345678910</div>
    <!-- <div class="class flex px-12 pt-12-w-full">
      <span class="text-20 font-strong text-blue-800"
        >Vessel Report Summary</span
      >
      <VesselReportCard
        v-for="(vessel, index) in vesselReport"
        :key="index"
        :Something="vessel"
      />
    </div> -->
  </div>
</template>

<script setup>
import MyVesselsDashboardIcon from "@/views/HQViews/components/MyVesselsDashboardIcon.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";
import VesselCard from "@/views/HQViews/components/VesselCard.vue";
// import VesselReportCard from "./components/VesselReportCard.vue";
import { useHQStore } from "@/stores/useHQStore";
import constants from "@/constants";

const store = useHQStore();
// To be pulled from backend
const sailingVessels = 0;
const inPortVessels = 0;
const etcVessels = 0;

const cargoVessels = 0;
const bunkeringVessels = 0;
const waitingVessels = 0;

const shipRef = constants.shipRefs;

const vessel = {
  vesselStatus: "sailing", // sailing, cargo, bunkering, waiting, etc
};

const reportStatus = (lastReportDate) => {
  if (lastReportDate === undefined) {
    return undefined;
  } else {
    let reportTimeDiff =
      (new Date().getTime() - new Date(lastReportDate).getTime()) /
      (1000 * 3600 * 24);
    if (reportTimeDiff > 1) {
      return "pending";
    } else {
      return "uploaded";
    }
  }
};

// const reportType = {
//   NOON: "sailing",
//   DSBY: "sailing",
//   DCSP: "sailing",
//   ASBY: "sailing",
//   AFWE: "waiting",
//   BDN: "waiting",

//   EVPO: "waiting" -> follow operation,
//   EVHB: "waiting" -> follow operation,
//   NNPO: "waiting" -> follow operation,
//   NNHB: "in port" -> follow operation,
// };

const vesselStatus = (lastReportType) => {};

const vesselReport = {
  vessel_name: "FC ADONIS",
  date: "0900LT 20 OCT 2022",
  arrival_port: "Yokkaichi, Japan",
  arrival_date: "20000LT, 24 OCT 2022",
  speed_since_last: "12.8",
  rpm_since_last: "170",
  speed_average: "12.57",
  weather: "Cloudy",
  wind_direction: "ENE",
  wind_speed: "7kn(BF3)",
  sea_direction: "EN",
  sea_state: "6kn(Condition 3)",
  distance_to_go: "700",
  distance_total: "1000",
  fuel_type: {
    lsfo: {
      foc: "14.2",
      rob: "132.36",
    },
    mgo: {
      foc: "0",
      rob: "58.71",
    },
  },
};

const dateConverter = (date) => {
  if (date === undefined) {
    return "No value";
  } else {
    const init = new Date(date).toDateString().split(" ");
    return init[2] + " " + init[1] + " " + init[3];
  }
};

const { isSuccess, data: ships } = store.shipsQuery();
</script>
