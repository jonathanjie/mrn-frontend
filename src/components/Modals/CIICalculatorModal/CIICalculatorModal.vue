<script setup>
import BaseModal from "@/components/Modals/BaseModal.vue";

import { ref } from "vue";
import GradientButton from "@/components/Buttons/GradientButton.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";
import useCIICalculatorStore from "@/stores/useCIICalculatorStore.js";
import { storeToRefs } from "pinia";

const showModal = ref(false);

const resetAll = () => {};
const calculateCII = () => {};

const store = useCIICalculatorStore();
const {
  isOnlyUsingUserInput,
  referenceStartDate,
  referenceEndDate,
  distanceInPeriod,
  fuelDetails,
  totalEmissions,
  isESDEnabled,
  ESDType,
  improvedEmissionByESD,
  isTargetCIIGradeEnabled,
  targetCIIGrade,
} = storeToRefs(store);
</script>

<template>
  <button id="show-modal" @click="showModal = true">Show Modal</button>

  <Teleport to="body">
    <BaseModal :show="showModal" @close="cancel">
      <template #header> </template>
      <template #body>
        <!-- actual content per page -->
        <div class="px-7 py-8 text-gray-700 text-14 accent-blue-700">
          content
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end space-x-4">
          <CustomButton @click="resetAll"
            ><template #content>{{ $t("resetAll") }}</template></CustomButton
          >
          <GradientButton @click="calculateCII"
            ><template #content>{{
              $t("calculateMyCII")
            }}</template></GradientButton
          >
        </div>
      </template>
    </BaseModal>
  </Teleport>
</template>
