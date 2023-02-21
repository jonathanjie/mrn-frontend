<script setup>
import { toRefs } from "vue";
import { ref } from "vue";

const props = defineProps({
  ships: Object,
  buttonCols: String,
  numCols: String,
});
const showModal = ref(false);

const { ships, buttonCols, numCols } = toRefs(props);

const shipGrades = [];
for (let ship in ships.value) {
  const tempArr = [];
  let tempKeys = Object.keys(ships.value[ship].ciiGrade).sort();
  for (let i in tempKeys) {
    tempArr.push(ships.value[ship].ciiGrade[tempKeys[i]]);
  }
  shipGrades.push(tempArr);
}

</script>

<template>
  <div class="divide-y">
    <router-link
      :to="{
        name: 'speed-graph-overview',
        params: { vesselname: ship.name, imo: ship.imo_reg },
      }"
      v-for="(ship, index) in ships"
      class="flex grid px-3.5 py-3 my-3 justify-between items-center"
      :key="ship.id"
      :class="numCols"
    >
      <div>
        <span class="text-14 text-gray-700 font-semibold">{{ ship.name }}</span>
        <span
          v-if="ship.setupCii"
          class="text-12 text-blue-700 px-2 py-1.5 ml-2 rounded-2xl bg-blue-50"
          >{{ $t("new") }}</span
        >
      </div>
      <span class="text-14 text-gray-700 font-semibold"
        >{{ ship.shipspecs.deadweight_tonnage }} DWT</span
      >
      <span class="text-14 text-gray-700 font-semibold">{{
        ship.shipspecs.flag
      }}</span>
      <span class="text-14 text-gray-700 font-semibold">{{
        ship.builtYear
      }}</span>
      <button
        v-if="ship.setupCii"
        class="flex w-full justify-center bg-blue-50 rounded-l border border-blue-600 text-14 text-blue-700 font-bold"
        :class="buttonCols"
        @click.self.prevent="showModal=true"
      >
        {{ $t("setupCii") }}
      </button>
      <div
        v-else
        v-for="grade in shipGrades[index]"
        :key="grade.id"
        class="flex items-center"
      >
        <span
          v-if="grade === 'A'"
          class="text-white text-12 font-bold px-1 py-0.5 bg-grades-a rounded-2xl items-center"
          >{{ grade }}</span
        >
        <span
          v-else-if="grade == 'B'"
          class="text-white text-12 font-bold px-1 py-0.5 bg-grades-b rounded-2xl items-center"
          >{{ grade }}</span
        >
        <span
          v-else-if="grade == 'C'"
          class="text-white text-12 font-bold px-1 py-0.5 bg-grades-c rounded-2xl items-center"
          >{{ grade }}</span
        >
        <span
          v-else-if="grade == 'D'"
          class="text-white text-12 font-bold px-1 py-0.5 bg-grades-d rounded-2xl items-center"
          >{{ grade }}</span
        >
        <span
          v-else-if="grade == 'E'"
          class="text-white text-12 font-bold px-1 py-0.5 bg-grades-e rounded-2xl items-center"
          >{{ grade }}</span
        >
        <span v-else>{{ grade }}</span>
      </div>
    </router-link>
  </div>
</template>
