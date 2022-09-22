<template>
  <div class="p-10 space-y-4">
    <div id="nav" class="px-8 flex flex-col space-y-2">
      <router-link :to="{ name: 'vessel-overview', params: { vesselname: 'Marina A' , imo: '9876543' } }">Marina A</router-link>
      <router-link :to="{ name: 'vessel-overview', params: { vesselname: 'Marina B' , imo: '7654321' } }">Marina B</router-link>
      <router-link :to="{ name: 'vessel-overview', params: { vesselname: 'Marina C' , imo: '1234567' } }">Marina C</router-link>
    </div>
  </div>
</template>
