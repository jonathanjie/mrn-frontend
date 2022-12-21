<template>
  <div class="flex flex-col w-full bg-gray-100 rounded-lg mt-4 p-4">
    <div class="grid grid-cols-2 gap-x-3.5 w-full">
      <div
        class="grid grid-cols-2 gap-x-2.5 bg-blue-800 rounded-lg w-full p-2.5"
      >
        <div
          class="flex bg-gray rounded-lg justify-between px-3 py-4 items-center"
        >
          <span class="text-white text-12">Speed:</span>
          <span class="text-white text-16 font-bold">14.57</span>
        </div>
        <div
          class="flex bg-gray rounded-lg justify-between px-3 py-4 items-center"
        >
          <span class="text-white text-12">Distance to go:</span>
          <span class="text-white text-16 font-bold">14.57</span>
        </div>
      </div>
      <div
        class="grid grid-cols-2 gap-x-2.5 bg-blue-800 rounded-lg w-full p-2.5"
      >
        <div
          class="flex bg-gray rounded-lg justify-between px-3 py-4 items-center"
        >
          <span class="text-white text-12">FOC:</span>
          <span class="text-white text-16 font-bold">14.57</span>
        </div>
        <div
          class="flex bg-gray rounded-lg justify-between px-3 py-4 items-center"
        >
          <span class="text-white text-12">ROB:</span>
          <span class="text-white text-16 font-bold">14.57</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col bg-white w-full rounded-lg p-3.5 mt-3.5 mb-0.5">
      <TableOverviewRow :header="'Date'" :values="Object.keys(data)" />
      <div class="flex flex-col w-full" v-if="false">
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
import TableOverviewRow from "@/components/TableOverviewRow.vue";

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
