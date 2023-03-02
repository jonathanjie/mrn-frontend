<script setup>
import { toRefs } from "vue";

const props = defineProps({
  currentGrade: String,
  alertVoyage: Number,
});

const { alertVoyage, currentGrade } = toRefs(props);

if (alertVoyage.value === undefined || alertVoyage.value === null) {
  throw new Error("Prop has issues: alertVoyage");
}

if (currentGrade.value === undefined || currentGrade.value === null) {
  throw new Error("Prop has issues: currentGrade");
}

let alertColor = "";
let textColor = "";
if (currentGrade.value == "C") {
  alertColor = "bg-yellow-50";
  textColor = "text-yellow-700";
} else if (currentGrade.value == "D") {
  alertColor = "bg-yellow-50";
  textColor = "text-yellow-700";
} else if (currentGrade.value == "E") {
  alertColor = "bg-red-50";
  textColor = "text-red-700";
}
</script>

<template>
  <div
    class="flex rounded-2xl items-center p-1"
    :class="alertColor + ' ' + textColor"
  >
    <span class="text-12 font-semibold rounded-2xl px-2 py-0.5 mr-8 bg-white"
      >Alert</span
    >
    <span class="text-12 mr-3" :class="textColor"
      >Voyage {{ alertVoyage }} has exceeded your CII limit.</span
    >
  </div>
</template>
