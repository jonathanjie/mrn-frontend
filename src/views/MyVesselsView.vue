<template>
  <div class="p-10 space-y-4">
    <button @click="getShips">Get Ships</button>
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
        // const DUMMY_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjYxbl96VlI1WmFoZ0hLcy1QOEx5MyJ9.eyJpc3MiOiJodHRwczovL2Rldi14eXJoczYwOS5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjM1MGUzZWY2MmNiNTRiMmU5MTcwYjI0IiwiYXVkIjpbImh0dHBzOi8vZGphbmdvLWp3dC10ZXN0LWRhbi9hcGkiLCJodHRwczovL2Rldi14eXJoczYwOS5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjY2MjQ5MzIzLCJleHAiOjE2NjYzMzU3MjMsImF6cCI6ImhuTnRMa0lKQmxuSExEVGhTTDc3Q1lUdTlRRWFXaWpOIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.hMXcvjne_ig6e0_BQbA2vNhxm_cZICEPPZJn9xohGeC0tk6JtzLUr6uRn7gPSuj0nknOx5CadpQkUzFvrK21EC8aF3IixF7-HfyEuq3b2Grc1GgEH-B6kI5ckKf7A87ADYkmSfudDQm04kSx8oAdJGesMtRn0zraXn4nwVKweYEYIXIa6eB9VHMon05GSI7mrknAbHRAjcYMUmhJ1L4TafAonK-SUe4PUQJyniYDCleeA7Bmm-IgychhG7x6szO2Duk6AZxfoXn-QRjv2zVXTh63_9r391N8MAx3gF-qF780Y4tVonZGbHXeHw2yJyGsJC7DCE98R1ddUKw9LCcuZA"
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