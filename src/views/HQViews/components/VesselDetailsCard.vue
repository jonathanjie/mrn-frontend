<template>
  <div class="flex">
    <div class="flex flex-col w-28 mt-4 mr-4">
      <span class="text-12 text-gray-500">{{ $t("cubicCapacity") }}</span>
      <span class="text-14 text-gray-700">{{ cubicCapacity }}</span>
    </div>
    <div class="flex flex-col w-28 mt-4 mr-4">
      <span class="text-12 text-gray-500">{{ $t("speed") }}</span>
      <span class="text-14 text-gray-700">{{ vesselSpeed }} knots</span>
    </div>
    <div class="flex flex-col w-28 mt-4 mr-4">
      <span class="text-12 text-gray-500">{{ $t("vesselAge") }}</span>
      <span class="text-14 text-gray-700">{{ vesselAge }}</span>
    </div>
    <div class="flex flex-col w-28 mt-4 mr-4">
      <span class="text-12 text-gray-500">{{ $t("vesselOwnership") }}</span>
      <span class="text-14 text-gray-700">{{ vesselOwnership }}</span>
    </div>
    <div class="flex flex-col w-28 mt-4 mr-4">
      <span class="text-12 text-gray-500">{{ $t("mainEngineImo") }}</span>
      <span class="text-14 text-gray-700">{{ mainEngineImo }}</span>
    </div>
    <div class="flex flex-col w-28 mt-4 mr-4">
      <span class="text-12 text-gray-500">{{ $t("fuelType") }}</span>
      <span class="text-14 text-gray-700">{{ fuelType }}</span>
    </div>
    <div class="flex flex-col w-28 mt-4 mr-4">
      <span class="text-12 text-gray-500">{{ $t("percentActive") }}</span>
      <span class="text-14 text-gray-700">{{ percentActive }}</span>
    </div>
  </div>
  <div class="flex">
    <div class="flex flex-col w-28 mt-4 mr-4">
      <span class="text-12 text-gray-500">{{ $t("percentIdle") }}</span>
      <span class="text-14 text-gray-700">{{ percentIdle }}</span>
    </div>
    <div class="flex flex-col w-28 mt-4 mr-4">
      <span class="text-12 text-gray-500">{{ $t("reportedEedi") }}</span>
      <span class="text-14 text-gray-700">{{ reportedEedi }}</span>
    </div>
    <div class="flex flex-col w-28 mt-4 mr-4">
      <span class="text-12 text-gray-500">{{ $t("bwts") }}</span>
      <span class="text-14 text-gray-700">{{ bwts }}</span>
    </div>
    <div class="flex flex-col w-28 mt-4 mr-4">
      <span class="text-12 text-gray-500">{{ $t("scrubber") }}</span>
      <span class="text-14 text-gray-700">{{ scrubber }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cubicCapacity: String,
  vesselSpeed: String,
  vesselAge: String,
  vesselOwnership: String,
  mainEngineImo: String,
  fuelType: String,
  percentActive: String,
  percentIdle: String,
  reportedEedi: String,
  bwts: String,
  scrubber: String,
});

// console.log("Card details was opened");
</script>
