<script setup>
import CustomButton from "@/components/Buttons/CustomButton.vue";
</script>
<template>
  <div class="flex justify-between items-center">
    <span class="text-18 text-gray-700 font-bold">{{ $t("ciiStatus") }}</span>
    <CustomButton
      class="h-9 text-14 text-blue-700 rounded-xl ml-auto min-w-fit disabled:text-gray-500"
    >
      <template v-slot:content>+{{ $t("ciiCalculator") }}</template>
    </CustomButton>
  </div>
</template>
