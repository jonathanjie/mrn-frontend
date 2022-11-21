<template>
  <div
    class="flex h-20 mx-12 items-center rounded-xl min-w-max z-10"
    :class="expanded ? 'bg-blue' : 'bg-white drop-shadow-md mb-6'"
  >
    <img
      v-if="expanded"
      src="@/assets/icons/My_Vessels/selected.svg"
      class="h-11 w-3 -m-1"
    />
    <div
      class="flex mr-16"
      :class="expanded ? 'm-4' : 'ml-5'"
      v-on:click="expanded = !expanded"
    >
      <div class="flex flex-col w-28 mr-4">
        <span
          class="text-12"
          :class="expanded ? 'text-white/50' : 'text-gray-500'"
          >{{ $t("name") }}</span
        >
        <span
          class="text-14"
          :class="expanded ? 'text-white' : 'text-gray-700'"
          >{{ marinaName }}</span
        >
      </div>
      <div class="flex flex-col w-28 mr-4">
        <span
          class="text-12"
          :class="expanded ? 'text-white/50' : 'text-gray-500'"
          >{{ $t("type") }}</span
        >
        <span
          class="text-14"
          :class="expanded ? 'text-white' : 'text-gray-700'"
          >{{ vesselType }}</span
        >
      </div>
      <div class="flex flex-col w-28 mr-4">
        <span
          class="text-12"
          :class="expanded ? 'text-white/50' : 'text-gray-500'"
          >{{ $t("flag") }}</span
        >
        <span
          class="text-14"
          :class="expanded ? 'text-white' : 'text-gray-700'"
          >{{ flag }}</span
        >
      </div>
      <div class="flex flex-col w-28 mr-4">
        <span
          class="text-12"
          :class="expanded ? 'text-white/50' : 'text-gray-500'"
          >{{ $t("imoNo") }}</span
        >
        <span
          class="text-14"
          :class="expanded ? 'text-white' : 'text-gray-700'"
          >{{ imoNo }}</span
        >
      </div>
      <div class="flex flex-col w-28 mr-4">
        <span
          class="text-12"
          :class="expanded ? 'text-white/50' : 'text-gray-500'"
          >{{ $t("shipSize") }}</span
        >
        <span class="text-14" :class="expanded ? 'text-white' : 'text-gray-700'"
          >{{ shipSize }} DWT</span
        >
      </div>
      <div class="flex flex-col w-28 mr-4">
        <span
          class="text-12"
          :class="expanded ? 'text-white/50' : 'text-gray-500'"
          >{{ $t("dwt") }}</span
        >
        <span
          class="text-14"
          :class="expanded ? 'text-white' : 'text-gray-700'"
          >{{ dwt }}</span
        >
      </div>
      <div class="flex flex-col w-28 mr-4">
        <span
          class="text-12"
          :class="expanded ? 'text-white/50' : 'text-gray-500'"
          >{{ $t("grossTonnage") }}</span
        >
        <span
          class="text-14"
          :class="expanded ? 'text-white' : 'text-gray-700'"
          >{{ grossTonnage }}</span
        >
      </div>
    </div>
    <div class="flex justify-items-end">
      <button
        class="m-8 rounded-xl p-1.5"
        :class="expanded ? 'bg-blue-75' : 'bg-gray-50'"
      >
        <img
          class="h-6 w-6"
          src="@/assets/icons/My_Vessels/dashboard_icon.svg"
        />
      </button>
    </div>
  </div>
  <div
    v-show="expanded"
    class="min-h-fit bg-gray-50 mx-12 mb-6 rounded-xl -mt-4 p-5"
  >
    <VesselDetailsCard
      :cubicCapacity="cubicCapacity"
      :vesselSpeed="speed"
      :vesselAge="vesselAge"
      :vesselOwnership="vesselOwnership"
      :mainEngineImo="mainEngineImo"
      :fuelType="fuelType"
      :percentActive="percentActive"
      :percentIdle="percentIdle"
      :reportedEedi="reportedEedi"
      :bwts="bwts"
      :scrubber="scrubber"
    ></VesselDetailsCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VesselDetailsCard from "./VesselDetailsCard.vue";

defineProps({
  marinaName: String,
  vesselType: String,
  flag: String,
  imoNo: String,
  shipSize: String,
  dwt: String,
  grossTonnage: String,
  cubicCapacity: String,
  speed: String,
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
let expanded = ref(false);

console.log("Managed to open vue card");
</script>
