<script setup>
import { preventNaN, dateOnlyFormat } from "@/utils/helpers.js";
import Tab from "@/components/Tabs/Tab.vue";
import TabsWrapper from "@/components/Tabs/TabsWrapper.vue";
import HazingBanner from "@/components/HazingBanner.vue";
import { ref } from "vue";
import { useCIICalculatorStore } from "@/stores/useCIICalculatorStore.js";
import { storeToRefs } from "pinia";

const hide = ref(true);
const store = useCIICalculatorStore();
const {
  isOnlyUsingUserInput,
  referenceStartDate,
  referenceEndDate,
  distanceInPeriod,
  fuelOils,
  fuelAmounts,
  totalEmissions,
  isTargetCIIGradeEnabled,
  targetCIIGrade,
} = storeToRefs(store);

// const calculateCII = () => {};
</script>

<template>
  <div
    class="flex flex-col space-y-3 px-7 py-8 text-gray-800 text-14 accent-blue-700 bg-sysblue-25 overflow-auto"
  >
    <!-- Using your input values only / also using YTD data -->
    <div v-if="isOnlyUsingUserInput === ''" class="font-bold text-18">
      Select the data you want to use for calculation
    </div>
    <div class="grid grid-cols-2 gap-5">
      <div
        class="flex items-center py-4 px-3 bg-white rounded-xl"
        :class="
          isOnlyUsingUserInput ? 'border border-gradientblue bg-paleblue' : ''
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
        class="flex items-center py-4 px-3 rounded-xl bg-gray-50"
        :class="
          !isOnlyUsingUserInput && isOnlyUsingUserInput !== ''
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <!-- TODO: disabled for testing/demo -->
        <input
          type="radio"
          id="includeYTDData"
          v-model="isOnlyUsingUserInput"
          v-bind:value="false"
          disabled
        />
        <label for="includeYTDData" class="ml-2 mr-4 font-medium"
          >Use my input values + YTD data on our system</label
        >
      </div>
    </div>
    <!-- Using only user inputs -->
    <div
      v-if="isOnlyUsingUserInput"
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
    <!-- Using YTD Data on our system -->
    <div
      v-else-if="isOnlyUsingUserInput !== ''"
      class="bg-white rounded-xl p-3 flex space-x-3 text-gray-800"
    >
      <img src="@/assets/icons/info.svg" class="w-12 h-12" />
      <div>
        <div class="font-bold text-14">
          Calculate the CII by reflecting the year to date Actual Data of this
          year in the entered figures.
        </div>
        <div class="text-14">
          Please enter values from after the Year to Date specified below to the
          date you select.
        </div>
        <div class="mt-5 font-bold text-14">Year to Date Actual Data:</div>
        <div class="text-14">
          This is actual data of this year that is on our system. If you want to
          add more actual data, please upload the latest data in IMO DCS format
          via “CII Document” > Upload CII File.
        </div>
      </div>
    </div>
    <!-- Before selection of data source -->
    <div v-else></div>
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
            :format="dateOnlyFormat"
            :modelValue="string"
            :placeholder="$t('startDate')"
            :enable-time-picker="false"
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
            :format="dateOnlyFormat"
            :modelValue="string"
            :placeholder="$t('endDate')"
            :enable-time-picker="false"
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
        <div class="mt-5 text-gray-800 grid grid-cols-2 gap-5">
          <div
            v-for="(fuelType, index) in fuelOils"
            :key="index"
            class="contents"
          >
            <div class="flex flex-col space-y-1 items-center justify-start">
              <div class="flex text-14 justify-start min-w-full">
                Fuel Type {{ index + 1 }}
              </div>
              <div
                class="flex border rounded-lg py-2 px-3 min-w-full bg-gray-50"
              >
                <!-- TODO: should set v-model in select & remove disabled when we allow users to select fuel types -->
                <select class="grow focus:outline-0 bg-gray-50" disabled>
                  <!-- <option selected disabled value="default">
                          {{ $t("selectFuelType") }}
                        </option> -->
                  <!-- <option v-for="(val, key) in ALL_FUEL_OILS" :key="val">
                          {{ $t(key) }}
                        </option> -->
                  <option selected :value="fuelType">
                    {{ $t(fuelType) }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex flex-col space-y-1 items-center">
              <div class="flex text-14 justify-start min-w-full">Amount</div>
              <input
                @keypress="preventNaN($event, fuelAmounts[index])"
                class="py-2 px-3 border rounded-lg focus:outline-0 min-w-full"
                placeholder="0,000.00"
                v-model="fuelAmounts[index]"
              />
            </div>
          </div>
        </div>
        <div
          class="mt-8 border border-green-600 bg-green-25 py-6 px-3 rounded-xl flex items-center"
        >
          <div class="text-18 text-gray-700 font-medium">
            Total CO2 Emissions:
          </div>
          <div
            class="text-18 font-bold ml-auto bg-gradient-to-r from-gradientblue to-gradientgreen inline-block text-black/[0] bg-clip-text"
          >
            {{
              totalEmissions
                ? totalEmissions.toLocaleString("en-US")
                : "000,000,000"
            }}
          </div>

          <div
            class="flex font-bold self-center bg-white border text-gray-700 text-12 rounded-full ml-2 px-2 min-w-fit"
          >
            TON
          </div>
        </div>
      </Tab>
      <Tab :title="$t('speed')">
        <div class="flex relative mt-5">
          <div
            class="border border-green-600 bg-green-25 py-6 px-3 rounded-xl flex items-center min-w-full"
            :class="hide ? 'blur-sm' : ''"
          >
            <div class="text-18 text-gray-700 font-medium">
              Total CO2 Emissions:
            </div>
            <div
              class="text-18 font-bold ml-auto bg-gradient-to-r from-gradientblue to-gradientgreen inline-block text-black/[0] bg-clip-text"
            >
              {{ totalEmissions ? totalEmissions : "000,000,000" }}
            </div>

            <div
              class="flex font-bold self-center bg-white border text-gray-700 text-12 rounded-full ml-2 px-2 min-w-fit"
            >
              TON
            </div>
          </div>
          <HazingBanner class="content" />
        </div>
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
          <div class="flex space-x-3 text-gray-600 text-14 overflow-x-auto">
            <div
              class="grow flex items-center py-2 px-3 bg-white rounded-lg border cursor-pointer"
              :class="
                targetCIIGrade === 'a'
                  ? 'border border-gradientblue bg-paleblue'
                  : ''
              "
              @click="
                targetCIIGrade == 'a'
                  ? (targetCIIGrade = '')
                  : (targetCIIGrade = 'a')
              "
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
              @click="
                targetCIIGrade == 'b'
                  ? (targetCIIGrade = '')
                  : (targetCIIGrade = 'b')
              "
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
              @click="
                targetCIIGrade == 'c'
                  ? (targetCIIGrade = '')
                  : (targetCIIGrade = 'c')
              "
            >
              <div
                class="mr-2 flex justify-center items-center rounded-full bg-grades-c text-white w-7 h-7"
              >
                C
              </div>
              Grade C
            </div>
            <div
              class="grow flex items-center py-2 px-3 bg-white rounded-lg border cursor-pointer"
              :class="
                targetCIIGrade === 'd'
                  ? 'border border-gradientblue bg-paleblue'
                  : ''
              "
              @click="
                targetCIIGrade == 'd'
                  ? (targetCIIGrade = '')
                  : (targetCIIGrade = 'd')
              "
            >
              <div
                class="mr-2 flex justify-center items-center rounded-full bg-grades-d text-white w-7 h-7"
              >
                D
              </div>
              Grade D
            </div>
            <!-- <div
              class="grow flex items-center py-2 px-3 bg-white rounded-lg border cursor-pointer"
              :class="
                targetCIIGrade === 'e'
                  ? 'border border-gradientblue bg-paleblue'
                  : ''
              "
              @click="targetCIIGrade = 'e'"
            >
              <div
                class="mr-2 flex justify-center items-center rounded-full bg-grades-e text-white w-7 h-7"
              >
                E
              </div>
              Grade E
            </div> -->
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
        <span class="text-gray-700 text-16">{{ $t("targetCIIGrade") }}</span>
      </div>
    </div>
  </div>
</template>
