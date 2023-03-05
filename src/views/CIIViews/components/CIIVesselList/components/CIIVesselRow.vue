<script setup>
import { toRefs } from "vue";
import CIIAlert from "../../CIIAlert.vue";
import CIIGrade from "../../CIIGrade.vue";
const props = defineProps({
  ships: Object,
  buttonCols: String,
  numCols: String,
});

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

const setupCii = () => {
  console.log("Hello World");
};
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
          v-if="ship.calculated_ciis.length == 0"
          class="text-12 text-blue-700 px-2 py-1.5 ml-2 rounded-2xl bg-blue-50"
          >{{ $t("new") }}</span
        >
      </div>
      <span class="text-14 text-gray-700 font-semibold"
        >{{ ship.size }} DWT</span
      >
      <span class="text-14 text-gray-700 font-semibold">{{ ship.flag }}</span>
      <span class="text-14 text-gray-700 font-semibold">{{
        ship.delivery_year
      }}</span>
      <button
        v-if="ship.calculated_ciis.length == 0"
        class="flex w-full justify-center bg-blue-50 rounded-l border border-blue-600 text-14 text-blue-700 font-bold"
        :class="buttonCols"
        @click.self.prevent="setupCii"
      >
        {{ $t("setupCii") }}
      </button>
      <div
        v-else
        v-for="grade in shipGrades[index]"
        :key="grade.id"
        :class="
          typeof grade === 'string' ? 'justify-self-center' : 'col-span-2'
        "
      >
        <CIIGrade v-if="typeof grade === 'string'" :grade="grade" />
        <CIIAlert
          v-else
          :gradeLimit="grade.gradeLimit"
          :gradeLimitValue="grade.gradeLimitValue"
          :currentGrade="grade.currentGrade"
          :currentGradeValue="grade.currentGradeValue"
        />
      </div>
    </router-link>
  </div>
</template>
