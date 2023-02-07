<script setup>
import { toRefs } from "vue";
import CIIVesselRow from "@/views/CIIViews/components/CIIVesselList/components/CIIVesselRow.vue";

const props = defineProps({
  data: Object,
  yearsList: Array,
});

const { data, yearsList } = toRefs(props);
const colYears = yearsList.value;
const ships = data.value;
const buttonCols = "col-span-" + colYears.length.toString();
const numCols = "grid-cols-" + (4 + colYears.length).toString();
</script>

<template>
  <div class="flex flex-col bg-white rounded-xl p-5 mt-6 w-full">
    <span class="text-18 text-blue-800 font-bold w-full">{{
      $t("vesselList")
    }}</span>
    <div
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
        class="items-center"
      >
        <span class="text-12 text-gray-500 font-bold">{{
          index == colYears.length - 1 ? year + " LIVE VALUE" : year
        }}</span>
      </div>
    </div>
    <CIIVesselRow :ships="ships" :buttonCols="buttonCols" :numCols="numCols" />
  </div>
</template>
