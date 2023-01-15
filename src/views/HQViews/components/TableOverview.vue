<template>
  <div
    v-if="latestData != undefined"
    class="flex flex-col w-full bg-gray-100 rounded-lg mt-4 p-4"
  >
    <div class="grid grid-cols-2 gap-x-3.5 w-full">
      <!-- Speed/Distance To Go -->
      <button
        @click="selectSpeed"
        class="grid relative grid-cols-2 gap-x-2.5 rounded-lg w-full p-2.5 items-center"
        :class="selectedSpeed ? 'bg-blue-800' : 'bg-white'"
      >
        <img
          src="@/assets/icons/Speed_Graph/selected.svg"
          class="absolute h-5 w-0.5"
        />
        <div
          class="flex rounded-lg justify-between px-3 py-4 items-center"
          :class="selectedSpeed ? 'bg-white bg-opacity-10' : 'bg-gray-100'"
        >
          <span
            class="text-12"
            :class="selectedSpeed ? 'text-white' : 'text-gray-700'"
            >{{ $t("speed") }}</span
          >
          <span
            class="text-16 font-bold"
            :class="selectedSpeed ? 'text-white' : 'text-blue-600'"
            >{{ latestData.speed ?? "0" }} knots</span
          >
        </div>
        <div
          class="flex rounded-lg justify-between px-3 py-4 items-center"
          :class="selectedSpeed ? 'bg-white bg-opacity-10' : 'bg-gray-100'"
        >
          <span
            class="text-12"
            :class="selectedSpeed ? 'text-white' : 'text-gray-700'"
            >{{ $t("distanceToGo") }}</span
          >
          <span
            class="text-16 font-bold"
            :class="selectedSpeed ? 'text-white' : 'text-blue-500'"
            >{{ latestData.distance_observed ?? "0" }} nm</span
          >
        </div>
      </button>
      <!-- FOC/ROB -->
      <button
        @click="selectFuel"
        class="grid relative grid-cols-2 gap-x-2.5 rounded-lg w-full p-2.5 items-center"
        :class="!selectedSpeed ? 'bg-blue-800' : 'bg-white'"
      >
        <img
          src="@/assets/icons/Speed_Graph/selected.svg"
          class="absolute h-5 w-0.5"
        />
        <div class="flex rounded-lg justify-between px-3 py-4 items-center">
          <span
            class="text-14"
            :class="!selectedSpeed ? 'text-white' : 'text-gray-700'"
            >{{ $t("foc") }}:</span
          >
          <div
            class="grid grid-cols-2 w-full"
            :class="latestData.fuel_stats.length > 2 ? 'grid-rows-2' : ''"
          >
            <div v-for="value in latestData.fuel_stats" :key="value.id">
              <div
                class="flex rounded-xl bg-gray-100 ml-2 py-1.5 px-2.5 justify-center"
                :class="!selectedSpeed ? 'bg-opacity-10' : ''"
              >
                <span
                  class="text-12"
                  :class="!selectedSpeed ? 'text-white' : 'text-gray-700'"
                  >{{ value.fuel_oil_type }}:</span
                >
                <span
                  class="text-12 ml-2"
                  :class="!selectedSpeed ? 'text-white' : 'text-blue-600'"
                  >{{ value.total_consumption }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <img
          src="@/assets/icons/Speed_Graph/fuel_divider.svg"
          class="absolute h-4 justify-self-center"
        />
        <div class="flex rounded-lg justify-between px-3 py-4 items-center">
          <span
            class="text-14"
            :class="!selectedSpeed ? 'text-white' : 'text-gray-700'"
            >{{ $t("rob") }}:</span
          >
          <div
            class="grid grid-cols-2 w-full"
            :class="latestData.fuel_stats.length > 2 ? 'grid-rows-2' : ''"
          >
            <div v-for="value in latestData.fuel_stats" :key="value.id">
              <div
                class="flex rounded-xl bg-gray-100 ml-2 py-1.5 px-2.5 justify-center"
                :class="!selectedSpeed ? 'bg-opacity-10' : ''"
              >
                <span
                  class="text-12"
                  :class="!selectedSpeed ? 'text-white' : 'text-gray-700'"
                  >{{ value.fuel_oil_type }}:</span
                >
                <span
                  class="text-12 ml-2"
                  :class="!selectedSpeed ? 'text-white' : 'text-blue-600'"
                  >{{ value.rob }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
    <div class="flex flex-col bg-white w-full rounded-lg p-3.5 mt-3.5 mb-0.5">
      <TableOverviewRow
        :header="'Date'"
        :values="dateList"
        :reportType="reportType"
      />
      <div class="flex flex-col w-full" v-if="selectedSpeed">
        <TableOverviewRow :header="'Speed'" :values="speedList" />
        <TableOverviewRow
          :header="'Distance'"
          :distanceToGo="distanceToGoList"
          :distanceOBS="distanceOBSList"
        />
      </div>
      <div v-else>
        <div v-for="(value, key) in fuelObject" :key="value.id">
          <TableOverviewRow
            :header="key.toUpperCase()"
            :fuelFoc="value.foc"
            :fuelRob="value.rob"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TableOverviewRow from "./TableOverviewRow.vue";

const props = defineProps({
  stats: Array,
});

let selectedSpeed = ref(true);

const selectSpeed = () => {
  selectedSpeed.value = true;
};

const selectFuel = () => {
  selectedSpeed.value = false;
};

const data = props.stats;
// const data = [
//   {
//     report_date: "2022-12-27T18:00:02Z",
//     report_type: "ASBY",
//     speed: "5.00",
//     distance_observed: "30",
//     distance_to_go: "10",
//     fuel_stats: [
//       {
//         fuel_oil_type: "HFO",
//         total_consumption: "100.00",
//         rob: "100.00",
//       },
//       {
//         fuel_oil_type: "LSFO",
//         total_consumption: "100.00",
//         rob: "900.00",
//       },
//     ],
//   },
//   {
//     report_date: "2022-12-21T12:00:00Z",
//     report_type: "NOON",
//     speed: "1.50",
//     distance_observed: "20",
//     distance_to_go: "4000",
//     fuel_stats: [
//       {
//         fuel_oil_type: "HFO",
//         total_consumption: "0",
//         rob: "200.00",
//       },
//       {
//         fuel_oil_type: "LSFO",
//         total_consumption: "200.00",
//         rob: "200.00",
//       },
//     ],
//   },
//   {
//     report_date: "2022-12-21T12:00:00Z",
//     report_type: "NOON",
//     speed: "1.50",
//     distance_observed: "20",
//     distance_to_go: "4000",
//     fuel_stats: [
//       // {
//       //   fuel_oil_type: "HFO",
//       //   total_consumption: "300.00",
//       //   rob: "300.00",
//       // },
//       {
//         fuel_oil_type: "LSFO",
//         total_consumption: "300.00",
//         rob: "300.00",
//       },
//     ],
//   },
//   {
//     report_date: "2022-12-21T12:00:00Z",
//     report_type: "NOON",
//     speed: "1.50",
//     distance_observed: "20",
//     distance_to_go: "4000",
//     fuel_stats: [
//       {
//         fuel_oil_type: "HFO",
//         total_consumption: "400.00",
//         rob: "400.00",
//       },
//       {
//         fuel_oil_type: "LSFO",
//         total_consumption: "400.00",
//         rob: "400.00",
//       },
//     ],
//   },
//   {
//     report_date: "2022-12-21T12:00:00Z",
//     report_type: "NOON",
//     speed: "1.50",
//     distance_observed: "20",
//     distance_to_go: "4000",
//     fuel_stats: [
//       {
//         fuel_oil_type: "HFO",
//         total_consumption: "500.00",
//         rob: "500.00",
//       },
//       {
//         fuel_oil_type: "LSFO",
//         total_consumption: "500.00",
//         rob: "500.00",
//       },
//     ],
//   },
//   {
//     report_date: "2022-12-21T12:00:00Z",
//     report_type: "NOON",
//     speed: "1.50",
//     distance_observed: "20",
//     distance_to_go: "4000",
//     fuel_stats: [
//       {
//         fuel_oil_type: "HFO",
//         total_consumption: "600.00",
//         rob: "600.00",
//       },
//       {
//         fuel_oil_type: "LSFO",
//         total_consumption: "600.00",
//         rob: "600.00",
//       },
//     ],
//   },
//   {
//     report_date: "2022-12-21T12:00:00Z",
//     report_type: "NOON",
//     speed: "1.50",
//     distance_observed: "20",
//     distance_to_go: "4000",
//     fuel_stats: [
//       {
//         fuel_oil_type: "HFO",
//         total_consumption: "100.00",
//         rob: "900.00",
//       },
//       // {
//       //   fuel_oil_type: "LSFO",
//       //   total_consumption: "100.00",
//       //   rob: "900.00",
//       // },
//     ],
//   },
// ];
const latestData = data[0];
let dateList = [];
let reportType = [];
let speedList = [];
let distanceOBSList = [];
let distanceToGoList = [];
let fuelObject = {};
for (let report in data.reverse()) {
  let obj = data[report];
  let date = new Date(obj.report_date).toDateString().split(" ");
  dateList.push(date[2] + " " + date[1]);
  reportType.push(obj.report_type ?? "");
  speedList.push(obj.speed ?? "0");
  distanceOBSList.push(obj.distance_observed ?? "0");
  distanceToGoList.push(obj.distance_to_go ?? "0");
  for (let fuel_type in obj.fuel_stats) {
    if (!(obj.fuel_stats[fuel_type].fuel_oil_type in fuelObject)) {
      fuelObject[obj.fuel_stats[fuel_type].fuel_oil_type] = {
        foc: [],
        rob: [],
      };
    }
  }
}

// for (let fuel in fuelObject) {
//   fuelObject[fuel].fob.length = 0;
//   fuelObject[fuel].rob.length = 0;
// }
let tempCount = 0;
for (let report in data) {
  let obj = data[report];
  for (let fuel_type in obj.fuel_stats) {
    let fuel_item = obj.fuel_stats[fuel_type];
    if (fuel_item.fuel_oil_type in fuelObject) {
      fuelObject[fuel_item.fuel_oil_type]["foc"].push(
        fuel_item.total_consumption
      );
      fuelObject[fuel_item.fuel_oil_type]["rob"].push(fuel_item.rob);
      tempCount = fuelObject[fuel_item.fuel_oil_type]["rob"].length;
    }
  }
  for (let tempFuel in fuelObject) {
    if (fuelObject[tempFuel].foc.length < tempCount) {
      fuelObject[tempFuel].foc.push("0");
      fuelObject[tempFuel].rob.push("0");
    }
  }
}

dateList = dateList.reverse();
reportType = reportType.reverse();
speedList = speedList.reverse();
distanceOBSList = distanceOBSList.reverse();
distanceToGoList = distanceToGoList.reverse();

for (let fuel in fuelObject) {
  fuelObject[fuel].foc = fuelObject[fuel].foc.reverse();
  fuelObject[fuel].rob = fuelObject[fuel].rob.reverse();
}
</script>
