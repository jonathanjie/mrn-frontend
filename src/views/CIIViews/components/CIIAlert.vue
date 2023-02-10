<script setup>
import { toRefs } from "vue";

const props = defineProps({
  gradeLimit: String,
  gradeLimitValue: Number,
  currentGrade: String,
  currentGradeValue: Number,
});

const { gradeLimit, gradeLimitValue, currentGrade, currentGradeValue } =
  toRefs(props);
const gradeLimitColor = "bg-grades-" + gradeLimit.value.toLowerCase();
const currentGradeColor = "bg-grades-" + currentGrade.value.toLowerCase();
const currentGradeText = "text-grades-" + currentGrade.value.toLowerCase();
</script>

<template>
  <div class="flex px-4">
    <div class="flex bg-gray-100 rounded-l-2xl p-1 items-center">
      <span
        class="text-white text-12 font-bold px-2 rounded-2xl mx-1.5"
        :class="gradeLimitColor"
        >{{ gradeLimit }}</span
      >
      <span class="text-12 text-gray-800 font-semibold"
        >{{ $t("gradeLimit") }}: {{ gradeLimitValue }}</span
      >
    </div>
    <div
      class="flex rounded-r-2xl p-1 items-center bg-opacity-10"
      :class="currentGradeColor"
    >
      <span class="text-12 font-bold mx-2" :class="currentGradeText">{{
        currentGradeValue
      }}</span>
      <span
        class="text-white text-12 font-bold px-2 rounded-2xl items-center"
        :class="currentGradeColor"
        >{{ currentGrade }}</span
      >
    </div>
  </div>
</template>
