<script setup>
import { toRefs } from "vue";
import CIIGrade from "./CIIGrade.vue";

const props = defineProps({
  gradeLimit: String,
  gradeLimitValue: String,
  currentGrade: String,
  currentGradeValue: String,
});

const { gradeLimit, gradeLimitValue, currentGrade, currentGradeValue } =
  toRefs(props);
// Dynamic css does not compile in time for render, although the html changes, the css does not change
// const gradeLimitColor = "bg-grades-" + gradeLimit.value.toLowerCase();
// const gradeLimitColor = "bg-grades-a";
let currentGradeColor = "";
let currentGradeText = "";
if (currentGrade.value === "A") {
  currentGradeColor = "bg-grades-a";
  currentGradeText = "text-grades-a";
} else if (currentGrade.value === "B") {
  currentGradeColor = "bg-grades-b";
  currentGradeText = "text-grades-b";
} else if (currentGrade.value === "C") {
  currentGradeColor = "bg-grades-c";
  currentGradeText = "text-grades-c";
} else if (currentGrade.value === "D") {
  currentGradeColor = "bg-grades-d";
  currentGradeText = "text-grades-d";
} else if (currentGrade.value === "E") {
  currentGradeColor = "bg-grades-e";
  currentGradeText = "text-grades-e";
}
</script>

<template>
  <div class="flex">
    <div class="flex bg-gray-100 rounded-l-2xl p-1 items-center">
      <CIIGrade :grade="gradeLimit" />
      <span class="text-12 text-gray-800 font-semibold"
        >{{ $t("gradeLimit") }}: {{ gradeLimitValue }}</span
      >
    </div>
    <div
      class="flex rounded-r-2xl p-1 items-center bg-opacity-10"
      :class="currentGradeColor === '' ? 'hidden' : currentGradeColor"
    >
      <span
        class="text-12 font-bold mx-2"
        :class="currentGradeText === '' ? 'hidden' : currentGradeText"
        >{{ currentGradeValue }}</span
      >
      <CIIGrade :grade="currentGrade" />
    </div>
  </div>
</template>
