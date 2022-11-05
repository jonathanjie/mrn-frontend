<template>
  <div class="p-10 space-y-4">
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
  </div>
</template>

<script>

export default {
    async setup() {
      const getShips = async function() {
        const DUMMY_TOKEN = localStorage.getItem('jwt');
        console.log(DUMMY_TOKEN)
              const response = await fetch('https://testapi.marinachain.io/marinanet/ships/', {
                  headers: {
                      Authorization: 'Bearer ' + DUMMY_TOKEN,
                      "Content-Type": "application/json"
                  },
                  method: 'GET'
              });

              const ships = await response.json()
              console.log("SHIPS: ", ships)
              return ships;
        }

      const ships = await getShips();

      return {
          ships,
          getShips
      }
    }
};
</script>