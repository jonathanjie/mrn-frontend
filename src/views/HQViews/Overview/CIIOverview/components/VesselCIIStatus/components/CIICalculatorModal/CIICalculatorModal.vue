<script setup>
import BaseModal from "@/components/Modals/BaseModal.vue";

import GradientButton from "@/components/Buttons/GradientButton.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";
import { useCIICalculatorStore } from "@/stores/useCIICalculatorStore.js";
import { storeToRefs } from "pinia";
import CIICalculatorInput from "./CIICalculatorInput.vue";
import CIICalculatorResult from "./CIICalculatorResult.vue";
import axios from "axios";
import { FuelOil } from "@/constants";

const store = useCIICalculatorStore();
const {
  imoReg,
  showModal,
  referenceStartDate,
  referenceEndDate,
  distanceInPeriod,
  fuelOils,
  resultsCalculated,
  ciiValue,
  ciiGrade,
  minCIIGrade,
  ciiBoundaries,
  fuelAmounts,
  targetCIIGrade,
  CO2EmissionForTargetGrade,
  CO2EmissionForMinGrade,
  targetFuelProjection,
  minFuelProjection,
} = storeToRefs(store);

const createFuelConsumptionObject = (fuelOils, fuelAmounts) => {
  const fuelConsumption = {};
  for (let i = 0; i < fuelOils.length; i++) {
    const fuelType = fuelOils[i];
    const fuelAmount = fuelAmounts[i];
    if (fuelType === FuelOil.MDO || fuelType === FuelOil.MGO) {
      fuelConsumption["MDGO"] =
        (fuelConsumption["MDGO"] || 0) + Number(fuelAmount);
    } else {
      fuelConsumption[fuelType] = Number(fuelAmount);
    }
  }
  return fuelConsumption;
};

const dateToString = (date) => {
  console.log(date);
  if (!date) {
    return null;
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

console.log(referenceStartDate.value);
// TODO: replace with store values

const calculateCII = async () => {
  const requestBody = {
    ship: imoReg.value,
    // ship: 1234567,
    start_date: dateToString(referenceStartDate.value),
    end_date: dateToString(referenceEndDate.value),
    distance_in_period: Number(distanceInPeriod.value),
    fuel_consumption: createFuelConsumptionObject(
      fuelOils.value,
      fuelAmounts.value
    ),
    target_cii_grade: targetCIIGrade.value
      ? targetCIIGrade.value.toUpperCase()
      : null,
  };
  console.log(requestBody);

  return await axios
    .post(`${process.env.VUE_APP_URL_DOMAIN}/cii/calculator/`, requestBody)
    .then((response) => {
      const data = response.data;

      ciiGrade.value = data["estimated_cii_grade"].toLowerCase();
      ciiValue.value = data["estimated_cii_value"];

      if (targetCIIGrade.value) {
        minCIIGrade.value = data["minimum_cii_grade"].toLowerCase();
        ciiBoundaries.value[targetCIIGrade.value] = data["target_cii_boundary"];
        ciiBoundaries.value[minCIIGrade.value] = data["minimum_cii_boundary"];
        CO2EmissionForTargetGrade.value = data["target_emission_max"];
        CO2EmissionForMinGrade.value = data["minimum_emission_max"];
        targetFuelProjection.value = data["target_fuel_projection"];
        minFuelProjection.value = data["minimum_fuel_projection"];
      }
      resultsCalculated.value = true;
    })
    .catch((error) => {
      console.log(error.message);
      window.alert(
        "Please check your inputs.\n\nIf the inputs are correct and you are experiencing this issue, CII configurations may not be set up correctly. Please check CII configurations in the CII Overview page."
      );
    });
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
