<template>
  <div class="flex flex-col w-full bg-gray-100 rounded-lg mt-4 p-4">
    <div class="grid grid-cols-2 gap-x-3.5 w-full">
      <!-- Speed/Distance To Go -->
      <button
        @click="selectedSpeed = true"
        class="grid relative grid-cols-2 gap-x-2.5 rounded-lg w-full p-2.5 items-center"
        :class="selectedSpeed ? 'bg-blue-800' : 'bg-white'"
      >
        <img
          src="@/assets/icons/Speed_Graph/selected.svg"
          class="absolute h-5"
        />
        <div
          class="flex rounded-lg justify-between px-3 py-4 items-center"
          :class="selectedSpeed ? 'bg-white bg-opacity-10' : 'bg-gray-100'"
        >
          <span
            class="text-12"
            :class="selectedSpeed ? 'text-white' : 'text-gray-700'"
            >{{ $t("speed") }}:</span
          >
          <span
            class="text-16 font-bold"
            :class="selectedSpeed ? 'text-white' : 'text-blue-600'"
            >{{ speed }}</span
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
            >{{ distance }}</span
          >
        </div>
      </button>
      <!-- FOC/ROB -->
      <button
        @click="selectedSpeed = false"
        class="grid relative grid-cols-2 gap-x-2.5 rounded-lg w-full p-2.5 items-center"
        :class="!selectedSpeed ? 'bg-blue-800' : 'bg-white'"
      >
        <img
          src="@/assets/icons/Speed_Graph/selected.svg"
          class="absolute h-5"
        />
        <div class="flex rounded-lg justify-between px-3 py-4 items-center">
          <span
            class="text-14"
            :class="!selectedSpeed ? 'text-white' : 'text-gray-700'"
            >{{ $t("foc") }}:</span
          >
        </div>
        <div class="flex rounded-lg justify-between px-3 py-4 items-center">
          <span
            class="text-14"
            :class="!selectedSpeed ? 'text-white' : 'text-gray-700'"
            >{{ $t("rob") }}:</span
          >
        </div>
      </button>
    </div>
    <div class="flex flex-col bg-white w-full rounded-lg p-3.5 mt-3.5 mb-0.5">
      <TableOverviewRow :header="'Date'" :values="Object.keys(data)" />
      <div class="flex flex-col w-full" v-if="selectedSpeed">
        <TableOverviewRow :header="'Speed'" :values="speedList" />
        <TableOverviewRow
          :header="'Distance'"
          :distanceToGo="distanceToGoList"
          :distanceOBS="distanceOBSList"
        />
      </div>
      <div v-else>
        <div v-for="(value, key) in fuelObject">
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
import TableOverviewRow from "@/components/TableOverviewRow.vue";

const speed = 14.57;
const distance = 10.367;

const data = {
  16_7: {
    speed: 4.0,
    distanceObserved: 0.0,
    distanceToGo: 0.0,
    fuel: {
      mgo: {
        foc: 0.0,
        rob: 0.0,
      },
      lsfo: {
        foc: 0.0,
        rob: 0,
      },
    },
  },
  17_7: {
    speed: 5.0,
    distanceObserved: 0.0,
    distanceToGo: 0.0,
    fuel: {
      mgo: {
        foc: 0.0,
        rob: 0.0,
      },
      lsfo: {
        foc: 0.0,
        rob: 0,
      },
    },
  },
  18_7: {
    speed: 6.0,
    distanceObserved: 0.0,
    distanceToGo: 0.0,
    fuel: {
      mgo: {
        foc: 0.0,
        rob: 0.0,
      },
      lsfo: {
        foc: 0.0,
        rob: 0,
      },
    },
  },
  19_7: {
    speed: 7.0,
    distanceObserved: 0.0,
    distanceToGo: 0.0,
    fuel: {
      mgo: {
        foc: 0.0,
        rob: 0.0,
      },
      lsfo: {
        foc: 0.0,
        rob: 0,
      },
    },
  },
  20_7: {
    speed: 8.0,
    distanceObserved: 0.0,
    distanceToGo: 0.0,
    fuel: {
      mgo: {
        foc: 0.0,
        rob: 0.0,
      },
      lsfo: {
        foc: 0.0,
        rob: 0,
      },
    },
  },
  21_7: {
    speed: 9.0,
    distanceObserved: 0.0,
    distanceToGo: 0.0,
    fuel: {
      mgo: {
        foc: 0.0,
        rob: 0.0,
      },
      lsfo: {
        foc: 0.0,
        rob: 0,
      },
    },
  },
  22_7: {
    speed: 10.0,
    distanceObserved: 0.0,
    distanceToGo: 0.0,
    fuel: {
      mgo: {
        foc: 0.0,
        rob: 0.0,
      },
      lsfo: {
        foc: 0.0,
        rob: 0,
      },
    },
  },
};

let selectedSpeed = ref(true);
const speedList = [];
const distanceOBSList = [];
const distanceToGoList = [];
const fuelObject = {};
for (let item in data) {
  speedList.push(data[item].speed);
  distanceOBSList.push(data[item].distanceObserved);
  distanceToGoList.push(data[item].distanceToGo);
  for (let fuel_type in data[item].fuel) {
    if (fuelObject[fuel_type] == undefined) {
      fuelObject[fuel_type] = {};
      fuelObject[fuel_type]["foc"] = [];
      fuelObject[fuel_type]["rob"] = [];
    }
    fuelObject[fuel_type].foc.push(data[item].fuel[fuel_type].foc);
    fuelObject[fuel_type].rob.push(data[item].fuel[fuel_type].rob);
  }
}
// console.log(speedList);
// console.log(distanceOBSList);
// console.log(distanceToGoList);
// console.log(fuelObject);
</script>
