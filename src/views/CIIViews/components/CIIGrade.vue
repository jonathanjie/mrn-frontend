<script setup>
import { toRefs } from "vue";

const props = defineProps({
  grade: String,
});

const { grade } = toRefs(props);

let gradeColor = "";
if (grade.value == "A") {
  gradeColor = "bg-grades-a";
} else if (grade.value == "B") {
  gradeColor = "bg-grades-b";
} else if (grade.value == "C") {
  gradeColor = "bg-grades-c";
} else if (grade.value == "D") {
  gradeColor = "bg-grades-d";
} else if (grade.value == "E") {
  gradeColor = "bg-grades-e";
}
</script>

<template>
  <div class="px-2.5 pb-1 rounded-2xl items-center" :class="gradeColor">
    <span class="text-white text-12 font-bold">{{ grade }}</span>
  </div>
</template>
