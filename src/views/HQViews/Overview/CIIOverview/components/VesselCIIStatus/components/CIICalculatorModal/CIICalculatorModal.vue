<script setup>
import BaseModal from "@/components/Modals/BaseModal.vue";

import GradientButton from "@/components/Buttons/GradientButton.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";
import { useCIICalculatorStore } from "@/stores/useCIICalculatorStore.js";
import { storeToRefs } from "pinia";
import CIICalculatorInput from "./CIICalculatorInput.vue";
import CIICalculatorResult from "./CIICalculatorResult.vue";

const store = useCIICalculatorStore();
const { showModal, resultsCalculated } = storeToRefs(store);

const calculateCII = () => {
  resultsCalculated.value = true;
};
</script>

<template>
  <Teleport to="body">
    <BaseModal :show="showModal" @close="showModal = false">
      <template #header>
        <div v-if="!resultsCalculated" class="text-gray-800 text-16">
          {{ $t("ciiCalculator") }}
        </div>
        <div v-else class="text-gray-800 text-16">
          {{ $t("ciiResult") }}
        </div>
      </template>
      <template #body>
        <CIICalculatorInput v-if="!resultsCalculated" />
        <CIICalculatorResult v-else />
      </template>
      <template #footer>
        <div v-if="!resultsCalculated" class="flex justify-end space-x-4">
          <CustomButton @click="store.resetValues()"
            ><template #content>{{ $t("resetAll") }}</template></CustomButton
          >
          <GradientButton @click="calculateCII"
            ><template #content>{{
              $t("calculateMyCII")
            }}</template></GradientButton
          >
        </div>
        <div v-else class="flex justify-end space-x-4">
          <CustomButton @click="resultsCalculated = false"
            ><template #content>{{
              $t("editCalculation")
            }}</template></CustomButton
          >
          <GradientButton @click="store.$reset()"
            ><template #content>{{ $t("complete") }}</template></GradientButton
          >
        </div>
      </template>
    </BaseModal>
  </Teleport>
</template>
