<template>
  <div
    class="flex bg-white rounded-xl py-5 px-4 shadow-md items-center flex-wrap mb-5 w-full"
  >
    <div class="flex justify-between w-full items-center">
      <div class="flex">
        <span class="text-14 text-gray-500">Port:</span>
        <!-- TODO: Insert Flag -->
        <span class="ml-2 text-14 text-gray-700 font-bold">{{
          portCountry
        }}</span>
      </div>
      <!-- InPort Variable -->
      <div
        class="hidden bg-gradient-to-r from-gradientblue to-gradientgreen rounded-xl px-2 py-1"
      >
        <span class="text-white text-10">InPort:ID</span>
      </div>
    </div>
    <!-- TODO: alignment for svg needs to be fixed -->
    <div
      class="flex relative items-center mt-3 p-3.5 rounded-xl bg-blue-700 text-14 text-white font-bold w-full justify-between"
    >
      <span>{{ origin }}</span>
      <div class="flex absolute w-full justify-center">
        <img src="@/assets/icons/Speed_Graph/port_timeline.svg" />
      </div>
      <span>{{ destination }}</span>
    </div>
    <div class="flex mt-3.5 w-full justify-between text-12 text-gray-500">
      <span>{{ depart }}</span>
      <span>{{ arrive }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  portCountry: String,
  origin: String,
  destination: String,
  departureTime: String,
  arrivalTime: String,
});

const depart = new Date(props.departureTime).toUTCString();
const arrive = new Date(props.arrivalTime).toUTCString();
</script>
