<template>
  <div class="flex flex-col p-24 pb-52 justify-center items-center w-full">
    <img src="@/assets/icons/unauthorized_logo.svg" class="h-75 w-75" />
    <span class="text-30 font-bold text-gray-700 pt-3">{{
      $t("unauthorizedAccess")
    }}</span>
    <span class="text-18 text-gray-700"
      >Sorry, the page you are looking for is not publicly available.</span
    >
    <GradientButton
      class="px-3.5 py-3 text-16 mt-6"
      type="button"
      @click="home()"
    >
      <template v-slot:content>Back to Home</template>></GradientButton
    >
  </div>
</template>

<script setup>
import GradientButton from "@/components/Buttons/GradientButton.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const home = () => {
  router.push({ path: "/" });
};
</script>
