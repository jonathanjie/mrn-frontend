<template>
  <div v-if="isSuccess" class="bg-gray-100 min-h-screen">
    <div class="flex flex-wrap px-12 pt-12 w-full">
      <div class="flex flex-wrap w-full mb-6">
        <h1 class="text-20 font-bold mb-4">{{ $t("vesselsDashboard") }}</h1>
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
              <h2 v-if="ships.length != 0" class="text-gray-700 text-18">
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
              <h2
                v-if="shipCount.sailingVessels != 0"
                class="text-gray-700 text-18"
              >
                {{ shipCount.sailingVessels }}
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
              <h2
                v-if="shipCount.inPortVessels != 0"
                class="text-gray-700 text-18"
              >
                {{ shipCount.inPortVessels }}
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
              <h2
                v-if="shipCount.etcVessels != 0"
                class="text-gray-700 text-18"
              >
                {{ shipCount.etcVessels }}
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
              >{{ shipCount.sailingVessels }} vessels</span
            >
          </div>
        </div>
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
              >{{ shipCount.cargoVessels }} vessels</span
            >
          </div>
        </div>
        <div class="flex">
          <img
            src="@/assets/icons/My_Vessels/bunkering_icon.svg"
            class="rounded-full bg-blue-50 h-11 w-11 py-2.5 px-3"
          />
          <div class="my-3 ml-2">
            <span class="text-12 text-gray-700">{{ $t("bunkering") }}: </span>
            <span class="text-12 font-bold text-gray-700"
              >{{ shipCount.bunkeringVessels }} vessels</span
            >
          </div>
        </div>
        <div class="flex">
          <img
            src="@/assets/icons/My_Vessels/waiting_icon.svg"
            class="rounded-full bg-yellow-25 h-11 w-11 py-2.5 px-3"
          />
          <div class="my-3 ml-2">
            <span class="text-12 text-gray-700">{{ $t("waiting") }}: </span>
            <span class="text-12 font-bold text-gray-700"
              >{{ shipCount.waitingVessels }} vessels</span
            >
          </div>
        </div>
        <div class="flex">
          <img
            src="@/assets/icons/My_Vessels/etc_icon.svg"
            class="rounded-full bg-gray-25 h-11 w-11 py-2.5 px-3"
          />
          <div class="my-3 ml-2">
            <span class="text-12 text-gray-700">{{ $t("etcVessels") }}: </span>
            <span class="text-12 font-bold text-gray-700"
              >{{ shipCount.etcVessels }} vessels</span
            >
          </div>
        </div>
      </div>
      <div class="flex mt-12 w-full items-center">
        <h1 class="text-20 font-bold w-full">
          {{ $t("vesselList") }} ({{ ships.length }})
        </h1>
        <!-- <div class="flex justify-end">
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
        </div> -->
      </div>
    </div>
    <div class="flex flex-col">
      <VesselCard
        v-for="(ship, index) in ships"
        :key="ship.id"
        :vesselName="ship.name == null ? 'Invalid Ship' : ship.name"
        :imoNo="ship.imo_reg == null ? 'Invalid Ship' : ship.imo_reg"
        :loadType="
          ship.ship_type == null ? 'Invalid Ship' : shipRef[ship.ship_type]
        "
        :vesselStatus="
          ship.last_report_type === null
            ? 'No report uploaded'
            : shipStatus[index]
        "
        :flag="ship.flag == null ? 'Invalid Ship' : ship.flag"
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
    <hr class="mt-6 w-full bg-gray-200" />
    <div class="hidden flex justify-center">12345678910</div>
  </div>
  <div
    v-else
    class="flex flex-col p-24 pb-52 m-12 justify-center items-center space-y-2 rounded-xl"
  >
    <img src="@/assets/icons/empty.svg" class="h-28 w-28" />
    <span class="text-lg font-bold text-gray-800 pt-3">{{
      $t("noVesselCreated")
    }}</span>
  </div>
</template>

<script setup>
import MyVesselsDashboardIcon from "@/views/HQViews/components/MyVesselsDashboardIcon.vue";
import VesselCard from "@/views/HQViews/components/VesselCard.vue";
import { useHQStore } from "@/stores/useHQStore";
import constants from "@/constants";
import axios from "axios";

const shipRef = constants.shipRefs;
const reportStatus = (lastReportDate) => {
  if (lastReportDate === undefined) {
    return "";
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

const dateConverter = (date) => {
  if (date === undefined) {
    return "No value";
  } else {
    const init = new Date(date).toDateString().split(" ");
    return init[2] + " " + init[1] + " " + init[3];
  }
};

const getShips = async () => {
  return await axios
    .get(`${process.env.VUE_APP_URL_DOMAIN}/marinanet/ships-overview`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
const store = useHQStore();
const shipCount = store.shipCount;
const shipStatus = store.shipStatus;
const ships = await getShips();
shipCount.etcVessels = 0;
shipCount.bunkeringVessels = 0;
shipCount.cargoVessels = 0;
shipCount.inPortVessels = 0;
shipCount.sailingVessels = 0;
shipCount.waitingVessels = 0;
shipStatus.length = 0;
const eventTypes = { EVPO: "", EVHB: "", NNPO: "", NNHB: "" };

const reportType = {
  NOON: "sailing",
  DSBY: "sailing",
  DCSP: "sailing",
  ASBY: "sailing",
  AFWE: "waiting",
  BDN: "waiting",
};

for (let i in ships) {
  const ship = ships[i];
  // Sailing/Waiting
  if (ship.last_report_type in reportType) {
    const status = reportType[ship.last_report_type];
    store.shipStatus.push(reportType[ship.last_report_type]);
    if (status == "sailing") {
      store.shipCount.sailingVessels++;
    } else {
      store.shipCount.waitingVessels++;
    }
    // Event
  } else if (
    ship.last_report_type in eventTypes &&
    Object.keys(ship.last_operation).length != 0
  ) {
    const keys = Object.keys(ship.last_operation).sort();
    if (ship.last_operation[keys[1]] || ship.last_operation[keys[2]]) {
      store.shipCount.inPortVessels++;
      store.shipCount.cargoVessels++;
      store.shipStatus.push("cargo");
    } else if (ship.last_operation[keys[0]]) {
      store.shipCount.inPortVessels++;
      store.shipCount.bunkeringVessels++;
      store.shipStatus.push("bunkering");
    } else if (ship.last_operation[keys[4]] || ship.last_operation[keys[5]]) {
      store.shipCount.etcVessels++;
      store.shipStatus.push("etc");
    } else {
      store.shipCount.inPortVessels++;
      store.shipCount.waitingVessels++;
      store.shipStatus.push("waiting");
    }
    // ETC catch
  } else {
    store.shipCount.etcVessels++;
    store.shipStatus.push("etc");
  }
}

const isSuccess = true;
</script>
