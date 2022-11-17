<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="bg-gray-100">
      <!-- content -->
      <div class="flex flex-wrap p-12">
        <h1 class="text-xl font-bold w-full mb-6">Vessels Dashboard</h1>
        <!-- Box shadow and color of svg need to fix -->
        <!-- Vessels dashboard -->
        <div class="grid xl:grid-cols-4 grid-cols-2 gap-x-5 w-full">
          <MyVesselsDashboardIconVue>
            <template v-slot:itemHeader>
              <h1 class="text-gray-500 text-xs">{{$t("totalVessels")}}</h1>
            </template>
            <template v-slot:numVessels>
              <h2 v-if="totalVessels!=0" class="text-gray-700 text-lg">{{totalVessels}}</h2>
              <h2 v-else class="text-gray-700 text-lg">-</h2>
            </template>
          </MyVesselsDashboardIconVue>
          <MyVesselsDashboardIconVue>
            <template v-slot:itemHeader>
              <h1 class="text-gray-500 text-xs">{{$t("ownedVessels")}}</h1>
            </template>
            <template v-slot:numVessels>
              <h2 v-if="ownedVessels!= 0" class="text-gray-700 text-lg">{{ownedVessels}}</h2>
              <h2 v-else class="text-gray-700 text-lg">-</h2>
            </template>
          </MyVesselsDashboardIconVue>
          <MyVesselsDashboardIconVue>
            <template v-slot:itemHeader>
              <h1 class="text-gray-500 text-xs">{{$t("chartVessels")}}</h1>
            </template>
            <template v-slot:numVessels>
              <h2 v-if="chartVessels!=0" class="text-gray-700 text-lg">{{chartVessels}}</h2>
              <h2 v-else class="text-gray-700 text-lg">-</h2>
            </template>
          </MyVesselsDashboardIconVue>
          <MyVesselsDashboardIconVue>
            <template v-slot:itemHeader>
              <h1 class="text-gray-500 text-xs">{{$t("etcVessels")}}</h1>
            </template>
            <template v-slot:numVessels>
              <h2 v-if="etcVessels!=0" class="text-gray-700 text-lg">{{etcVessels}}</h2>
              <h2 v-else class="text-gray-700 text-lg">-</h2>
            </template>
          </MyVesselsDashboardIconVue>
        </div>
        <!-- Vessels list -->
        <div class="flex mt-16">
          <h1 class="text-xl font-bold w-full mt-">
            {{ $t("vesselList") }} ({{totalVessels}})
          </h1>
          <div class="relative text-gray-600">
            <img
              class="absolute mr-2 w-10 px-2 py-2"
              src="@/assets/icons/search_icon.svg"
            />
            <input
              class="bg-gray-50 h-10 w-50 pl-11 pr-3 rounded-lg text-14 text-gray-700 focus:outline-none"
              type="search"
              name="search"
              :placeholder="$t('searchVessels')"
              icon="search"
            />
          </div>
          <!-- Need to figure out table filter and export CSV -->
          <CustomButton>
            
          </CustomButton>
        </div>
      </div>
      <!-- <GradientButton class="m-10" type="button" @click="showModal = true">>
                <template v-slot:content>{{ $t("createNewVoyage") }}</template>  
            </GradientButton>
            <AddVoyageModal ref="modal" v-show="showModal" @close-modal="showModal = false"></AddVoyageModal> -->
    </div>
    <!-- <suspense>
            <router-view :key="update"></router-view>
        </suspense> -->
  </div>
</template>

<!-- original code -->
<!-- <div class="p-10 space-y-4">
    <button @click="getShips">{{ $t("getShips") }}</button>
    <div v-for="ship in ships" :key="ship.name">
      {{ship.name}}
    </div>
    <div id="nav" class="px-8 flex flex-col space-y-2">
      <li v-for="ship in ships" :key="ship.name">
        {{ship.name}}
        <router-link :to="{ name: 'vessel-overview', params: { vesselname: ship.name , imo: ship.imo_reg } }">{{ship.name}}</router-link>
      </li>
      <router-link :to="{ name: 'vessel-overview', params: { vesselname: 'Marina A' , imo: '9876543' } }">Marina A</router-link>
      <router-link :to="{ name: 'vessel-overview', params: { vesselname: 'Marina B' , imo: '7654321' } }">Marina B</router-link>
      <router-link :to="{ name: 'vessel-overview', params: { vesselname: 'Marina C' , imo: '1234567' } }">Marina C</router-link>
    </div>
  </div> -->

<script setup>
import MyVesselsDashboardIconVue from '@/components/MyVesselsDashboardIcon.vue';

// To be pulled from backend
const totalVessels = 33
const ownedVessels = 20
const chartVessels = 13
const etcVessels = 0

const getShips = async () => {
  const DUMMY_TOKEN = localStorage.getItem("jwt");
  // console.log(DUMMY_TOKEN)
  const response = await fetch(
    "https://testapi.marinachain.io/marinanet/ships/",
    {
      headers: {
        Authorization: "Bearer " + DUMMY_TOKEN,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  const ships = await response.json();
  console.log("SHIPS: ", ships);
  return ships;
}


</script>
