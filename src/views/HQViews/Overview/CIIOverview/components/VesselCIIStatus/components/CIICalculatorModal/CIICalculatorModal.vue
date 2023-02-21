<script setup>
import BaseModal from "@/components/Modals/BaseModal.vue";

import GradientButton from "@/components/Buttons/GradientButton.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";
import { useCIICalculatorStore } from "@/stores/useCIICalculatorStore.js";
import { storeToRefs } from "pinia";
import { preventNaN, format, textInputOptions } from "@/utils/helpers.js";
import Tab from "@/components/Tabs/Tab.vue";
import TabsWrapper from "@/components/Tabs/TabsWrapper.vue";
import { ALL_FUEL_OILS } from "@/utils/options";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";

const resetAll = () => {};
const calculateCII = () => {};

const store = useCIICalculatorStore();
const {
  showModal,
  isOnlyUsingUserInput,
  referenceStartDate,
  referenceEndDate,
  distanceInPeriod,
  fuelType1,
  fuelAmount1,
  totalEmissions,
  // isESDEnabled,
  // ESDType,
  // improvedEmissionByESD,
  isTargetCIIGradeEnabled,
  targetCIIGrade,
} = storeToRefs(store);
</script>

<template>
  <Teleport to="body">
    <BaseModal :show="showModal" @close="cancel">
      <template #header>
        <div class="font-bold text-gray-800 text-16">
          {{ $t("ciiCalculator") }}
        </div></template
      >
      <template #body>
        <div
          class="flex flex-col space-y-3 px-7 py-8 text-gray-800 text-14 accent-blue-700 bg-sysblue-25"
        >
          <!-- Using your input values only / also using YTD data -->
          <div v-if="isOnlyUsingUserInput === ''" class="font-bold text-18">
            Select the data you want to use for calculation
          </div>
          <div class="grid grid-cols-2 gap-5">
            <div
              class="flex items-center py-4 px-3 bg-white rounded-xl"
              :class="
                isOnlyUsingUserInput
                  ? 'border border-gradientblue bg-paleblue'
                  : ''
              "
            >
              <input
                type="radio"
                id="inputValuesOnly"
                v-model="isOnlyUsingUserInput"
                v-bind:value="true"
              />
              <label for="inputValuesOnly" class="ml-2 mr-4 font-medium"
                >Use my input values</label
              >
            </div>
            <div
              class="flex items-center py-4 px-3 bg-white rounded-xl"
              :class="
                !isOnlyUsingUserInput && isOnlyUsingUserInput !== ''
                  ? 'border border-gradientblue bg-paleblue'
                  : ''
              "
            >
              <input
                type="radio"
                id="includeYTDData"
                v-model="isOnlyUsingUserInput"
                v-bind:value="false"
              />
              <label for="includeYTDData" class="ml-2 mr-4 font-medium"
                >Use my input values + YTD data on our system</label
              >
            </div>
          </div>
          <div
            v-if="isOnlyUsingUserInput !== ''"
            class="bg-white rounded-xl p-3 flex space-x-3 text-gray-800"
          >
            <img src="@/assets/icons/info.svg" class="w-12 h-12" />
            <div>
              <div class="font-bold text-14">Voyage/Period</div>
              <div class="text-14">
                Calculate the CII based on the figures entered below
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="isOnlyUsingUserInput !== ''"
          class="bg-white p-7 grid grid-row-4 divide-y gap-10"
        >
          <!-- Reference period -->
          <div class="space-y-1">
            <div class="text-14">Reference period</div>
            <div class="grid grid-cols-2 gap-5">
              <div class="border border-gray-300 rounded-lg">
                <DatePicker
                  v-model="referenceStartDate"
                  class="grow"
                  textInput
                  :textInputOptions="textInputOptions"
                  :format="format"
                  :modelValue="string"
                  :placeholder="$t('startDate')"
                >
                  <template #input-icon>
                    <img src="" />
                  </template>
                </DatePicker>
              </div>
              <div class="border border-gray-300 rounded-lg">
                <DatePicker
                  v-model="referenceEndDate"
                  class="grow"
                  textInput
                  :textInputOptions="textInputOptions"
                  :format="format"
                  :modelValue="string"
                  :placeholder="$t('endDate')"
                >
                  <template #input-icon>
                    <img src="" />
                  </template>
                </DatePicker>
              </div>
            </div>
          </div>

          <!-- Distance in the period -->
          <div class="space-y-1">
            <div class="mt-10 text-14">Distance in the period</div>
            <div class="grid grid-cols-2">
              <input
                @keypress="preventNaN($event, distanceInPeriod)"
                class="py-2 px-3 border rounded-lg focus:outline-0"
                placeholder="0,000"
                v-model="distanceInPeriod"
              />
            </div>
          </div>

          <!-- Fuel Consumption / Speed -->
          <TabsWrapper class="pt-10" :expand="true">
            <Tab :title="$t('fuelConsumption')">
              <div class="grid grid-cols-2 gap-5 mt-5 text-gray-800">
                <div class="flex flex-col space-y-1">
                  <div class="text-14">Fuel type 1</div>
                  <div class="flex border rounded-lg py-2 px-3">
                    <select
                      v-model="fuelType1"
                      class="grow focus:outline-0"
                      :class="
                        fuelType1 === 'default'
                          ? 'text-gray-500'
                          : 'text-gray-900'
                      "
                    >
                      <option selected disabled value="default">
                        {{ $t("selectFuelType") }}
                      </option>
                      <option v-for="(val, key) in ALL_FUEL_OILS" :key="val">
                        {{ $t(key) }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="flex flex-col space-y-1">
                  <div class="text-14">Amount</div>
                  <input
                    @keypress="preventNaN($event, fuelAmount1)"
                    class="py-2 px-3 border rounded-lg focus:outline-0"
                    placeholder="0,000.00"
                    v-model="fuelAmount1"
                  />
                </div>
              </div>
              <div
                class="mt-8 border border-green-600 py-6 px-3 rounded-xl flex items-center"
              >
                <div class="text-18 text-gray-700 font-medium">
                  Total CO2 Emissions:
                </div>
                <div
                  class="text-18 font-bold ml-auto bg-gradient-to-r from-gradientblue to-gradientgreen inline-block text-black/[0] bg-clip-text"
                >
                  {{ totalEmissions ? totalEmissions : "000,000,000" }}
                </div>

                <MiniUnitDisplay class="bg-white border ml-2"
                  >TON</MiniUnitDisplay
                >
              </div>
            </Tab>
            <Tab :title="$t('speed')">
              <div></div>
            </Tab>
          </TabsWrapper>

          <!-- ESD / Target CII Grade -->
          <div class="pt-10">
            <div
              v-if="isTargetCIIGradeEnabled"
              class="flex p-4 bg-gray-25 rounded-xl"
            >
              <div class="grid gap-4 divide-y-dashed w-full">
                <div
                  class="flex"
                  @click="isTargetCIIGradeEnabled = !isTargetCIIGradeEnabled"
                >
                  <img
                    src="@/assets/icons/checkboxes/checked_square.svg"
                    class="mr-2 h-5 w-5"
                  />
                  <span class="text-gray-700 text-16">{{
                    $t("targetCIIGrade")
                  }}</span>
                </div>
                <div class="flex space-x-4 text-gray-600">
                  <div
                    class="grow flex items-center py-2 px-3 bg-white rounded-lg border cursor-pointer"
                    :class="
                      targetCIIGrade === 'a'
                        ? 'border border-gradientblue bg-paleblue'
                        : ''
                    "
                    @click="targetCIIGrade = 'a'"
                  >
                    <div
                      class="mr-2 flex justify-center items-center rounded-full bg-grades-a text-white w-7 h-7"
                    >
                      A
                    </div>
                    Grade A
                  </div>
                  <div
                    class="grow flex items-center py-2 px-3 bg-white rounded-lg border cursor-pointer"
                    :class="
                      targetCIIGrade === 'b'
                        ? 'border border-gradientblue bg-paleblue'
                        : ''
                    "
                    @click="targetCIIGrade = 'b'"
                  >
                    <div
                      class="mr-2 flex justify-center items-center rounded-full bg-grades-b text-white w-7 h-7"
                    >
                      B
                    </div>
                    Grade B
                  </div>
                  <div
                    class="grow flex items-center py-2 px-3 bg-white rounded-lg border cursor-pointer"
                    :class="
                      targetCIIGrade === 'c'
                        ? 'border border-gradientblue bg-paleblue'
                        : ''
                    "
                    @click="targetCIIGrade = 'c'"
                  >
                    <div
                      class="mr-2 flex justify-center items-center rounded-full bg-grades-c text-white w-7 h-7"
                    >
                      C
                    </div>
                    Grade C
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              @click="isTargetCIIGradeEnabled = !isTargetCIIGradeEnabled"
              class="flex p-4 bg-gray-25 rounded-xl"
            >
              <img
                src="@/assets/icons/checkboxes/unchecked_square.svg"
                class="mr-2 h-5 w-5"
              />
              <span class="text-gray-700 text-16">{{
                $t("targetCIIGrade")
              }}</span>
            </div>
          </div>
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
