<template>
  <div class="flex flex-col">
    <SpeedGraphNavItemVue
      :selected_speed="selected_speed"
      @click="selected_speed = !selected_speed"
    >
      <template v-slot:variable>
        {{ $t("speed") }}
      </template>
      <template v-slot:units>
        {{ $t("knots") }}
      </template>
      <template v-slot:value>
        {{ speed }}
      </template>
    </SpeedGraphNavItemVue>
    <SpeedGraphNavItemVue
      :selected_speed="!selected_speed"
      @click="selected_speed = !selected_speed"
    >
      <template v-slot:variable>
        {{ $t("focLabel") }}
      </template>
      <template v-slot:units>
        {{ $t("cargoMt") }}
      </template>
      <template v-slot:value>
        {{ focDay }}
      </template>
    </SpeedGraphNavItemVue>
    <SpeedGraphNavItemVue>
      <template v-slot:variable>
        {{ $t("distanceToGo") }}
      </template>
      <template v-slot:units>
        {{ $t("nauticalMiles") }}
      </template>
      <template v-slot:value>
        {{ distanceToGo }}
      </template>
    </SpeedGraphNavItemVue>
    <SpeedGraphNavItemVue>
      <template v-slot:variable>
        {{ $t("remainOnBoard") }}
      </template>
      <template v-slot:units>
        {{ $t("cargoMt") }}
      </template>
      <template v-slot:value>
        {{ remainOnBoard }}
      </template>
    </SpeedGraphNavItemVue>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SpeedGraphNavItemVue from "./SpeedGraphNavItem.vue";

// Need to change if there are more than 2 graphs
let selected_speed = ref(true);
const speed = "14.57";
const focDay = "63.4";
const distanceToGo = "10.367";
const remainOnBoard = "0,000.0";
</script>
