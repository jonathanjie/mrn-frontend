<script setup>
import { toRefs } from "vue";
import CIIVesselRow from "@/views/CIIViews/components/CIIVesselList/components/CIIVesselRow.vue";

const props = defineProps({
  data: Object,
  yearsList: Array,
});

const { data, yearsList } = toRefs(props);
let colYears = 0;
let ships = [];
let buttonCols,
  numCols = "";

if (yearsList.value === undefined || yearsList.value === null) {
  throw new Error("Prop has issues: yearsList");
} else {
  colYears = yearsList.value;
  buttonCols = "col-span-" + colYears.length.toString();
  numCols = "grid-cols-" + (5 + colYears.length).toString();
}

if (data.value === undefined || data.value === null) {
  throw new Error("Prop has issues: data");
} else {
  ships = data.value;
}
</script>

<template>
  <div class="flex flex-col bg-white rounded-xl p-5 mt-6 w-full">
    <span class="text-18 text-blue-800 font-bold w-full">{{
      $t("vesselList")
    }}</span>
    <div
      v-if="ships.length != 0"
      class="flex grid mt-4 rounded-xl bg-gray-50 p-3.5 justify-between"
      :class="numCols"
    >
      <span class="text-12 text-gray-500 font-bold">{{
        $t("vesselName").toUpperCase()
      }}</span>
      <span class="text-12 text-gray-500 font-bold">{{
        $t("shipSize").toUpperCase()
      }}</span>
      <span class="text-12 text-gray-500 font-bold">{{
        $t("flag").toUpperCase()
      }}</span>
      <span class="text-12 text-gray-500 font-bold">{{
        $t("builtYear").toUpperCase()
      }}</span>
      <div
        v-for="(year, index) in colYears"
        :key="year.id"
        :class="index == colYears.length - 1 ? '' : 'justify-self-center'"
      >
        <span class="text-12 text-gray-500 font-bold">{{
          index == colYears.length - 1 ? year + " LIVE VALUE" : year
        }}</span>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col p-24 pb-52 m-12 justify-center items-center space-y-2 rounded-xl"
    >
      <img src="@/assets/icons/empty.svg" class="h-28 w-28" />
      <span class="text-lg font-bold text-gray-800 pt-3">{{
        $t("noVesselCreated")
      }}</span>
    </div>
    <CIIVesselRow :ships="ships" :buttonCols="buttonCols" :numCols="numCols" />
  </div>
</template>
