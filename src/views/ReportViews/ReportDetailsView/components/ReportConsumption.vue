<script setup>
import { preventNaN } from "@/utils/helpers";
import { computed } from "vue";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const isFuelOilRemarkEnabled = computed(() =>
  props.report.consumptionconditiondata.fueloildata_set.reduce(
    (accum, curr) => accum || curr.fueloildatacorrection,
    false
  )
    ? true
    : false
);
const isLubricatingOilRemarkEnabled = computed(() =>
  props.report.consumptionconditiondata.lubricatingoildata_set.reduce(
    (accum, curr) => accum || curr.lubricatingoildatacorrection,
    false
  )
    ? true
    : false
);

const fuelMachineTypes = computed(() =>
  Object.keys(
    props.report.consumptionconditiondata.fueloildata_set[0].breakdown
  )
);

// Fuel Consumption
const fuelOilDataSet = computed(
  () => props.report.consumptionconditiondata.fueloildata_set
);

const fuelOilDataCorrection = computed(() =>
  isFuelOilRemarkEnabled.value
    ? props.report.consumptionconditiondata.fueloildata_set.filter(
        (fuelData) => fuelData.fueloildatacorrection !== null
      )[0]
    : null
);

// Lubricating Oil
const lubricatingOilDataSet = computed(
  () => props.report.consumptionconditiondata.lubricatingoildata_set
);

const lubricatingOilDataCorrection = computed(() =>
  isLubricatingOilRemarkEnabled.value
    ? props.report.consumptionconditiondata.lubricatingoildata_set.filter(
        (fuelData) => fuelData.lubricatingoildatacorrection !== null
      )[0]
    : null
);

// console.log(
//   JSON.parse(
//     JSON.stringify(lubricatingOilDataCorrection.value.lubricating_oil_type)
//   )
// );
// Freshwater Consumption
const freshwaterConsumed = computed(
  () => props.report.consumptionconditiondata.freshwaterdata.consumed
);
const freshwaterGenerated = computed(
  () => props.report.consumptionconditiondata.freshwaterdata.generated
);
const freshwaterReceiving = computed(
  () => props.report.consumptionconditiondata.freshwaterdata.received
);
const freshwaterDischarging = computed(
  () => props.report.consumptionconditiondata.freshwaterdata.generated
);
const freshwaterChange = computed(
  () =>
    +props.report.consumptionconditiondata.freshwaterdata.received +
    props.report.consumptionconditiondata.freshwaterdata.generated -
    props.report.consumptionconditiondata.freshwaterdata.discharged -
    props.report.consumptionconditiondata.freshwaterdata.consumed
);
const freshwaterRob = computed(
  () => props.report.consumptionconditiondata.freshwaterdata.rob
);
// console.log(fuelMachineTypes.value.length);

const getFuelOilCols = () => "grid-cols-" + (fuelMachineTypes.value.length + 5);
</script>

<template>
  <div class="grid bg-white rounded-lg p-5 gap-4 shadow-card">
    <div>
      <div class="flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-16 text-blue-700">
          <slot name="header">{{ $t("consumptionAndCondition") }}</slot>
        </span>
      </div>
    </div>

    <div class="grid divide-y divide-dashed gap-8">
      <div>
        <div class="self-center mb-4 text-16 text-gray-700 pt-4">
          {{ $t("fuelOilInMT") }}
        </div>

        <div class="grid text-14" :class="getFuelOilCols()">
          <div
            class="col-span-1 border-green-100 bg-green-25 px-6 border-l border-t"
          ></div>
          <div
            v-for="(item, index) in fuelMachineTypes"
            :key="item + index"
            class="col-span-1 flex items-center text-blue-700 border-green-100 bg-green-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t(item) }}
          </div>
          <div
            class="col-span-1 flex items-center text-blue-700 border-green-100 bg-green-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("totalConsumption") }}
          </div>
          <div
            class="col-span-1 flex items-center text-blue-700 border-green-100 bg-green-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("receipt") }}
          </div>
          <div
            class="col-span-1 flex items-center text-blue-700 border-green-100 bg-green-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("debunkering") }}
          </div>
          <div
            class="col-span-1 flex items-center text-blue-700 border-green-100 bg-green-25 p-3 border-t border-x bg-gray-50"
          >
            {{ $t("remainOnBoard") }}
          </div>

          <span
            v-for="(fuelOilData, index) of fuelOilDataSet"
            :key="fuelOilData.fuel_oil_type + index"
            :class="
              'col-span-full grid ' +
              getFuelOilCols() +
              ' ' +
              (index == fuelOilDataSet.length - 1 ? 'border-b' : '')
            "
          >
            <div
              class="col-span-1 p-3 text-blue-700 border-t border-l bg-gray-50"
            >
              {{ $t(fuelOilData.fuel_oil_type) }}
            </div>
            <input
              v-for="entry of Object.entries(fuelOilData.breakdown)"
              disabled
              :key="entry"
              v-model="entry[1]"
              @keypress="preventNaN($event, entry[1])"
              placeholder="0"
              class="col-span-1 p-3 pl-4 border-t border-l bg-gray-50 text-gray-700 focus:outline-0"
            />
            <div
              class="col-span-1 text-gray-700 p-3 border-t border-l bg-gray-50"
            >
              {{ fuelOilData.total_consumption }}
            </div>
            <input
              disabled
              v-model="fuelOilData.receipt"
              @keypress="preventNaN($event, fuelOilData.receipt)"
              placeholder="0"
              class="col-span-1 p-3 pl-4 border-t border-l bg-gray-50 text-gray-700 focus:outline-0"
            />
            <input
              disabled
              v-model="fuelOilData.debunkering"
              @keypress="preventNaN($event, fuelOilData.debunkering)"
              placeholder="0"
              class="col-span-1 p-3 pl-4 border-t border-l bg-gray-50 text-gray-700 focus:outline-0"
            />
            <div
              class="col-span-1 text-gray-700 p-3 border-t border-x bg-gray-50"
            >
              {{ fuelOilData.rob }}
            </div>
          </span>
        </div>

        <!-- <div
          v-if="!isFuelOilRemarkEnabled"
          class="bg-gray-25 flex items-center py-4 px-3 border border-gray-100 cursor-pointer"
          @click="isFuelOilRemarkEnabled = !isFuelOilRemarkEnabled"
        >
          <img
            src="@/assets/icons/checkboxes/unchecked_square.svg"
            class="mr-2 h-5 w-5"
          />
          <span class="text-gray-700">{{ $t("additionalRemarks") }}</span>
        </div>
        <div
          v-else
          class="bg-gray-25 flex-col py-4 px-3 border border-gray-100"
        >
          <div
            class="flex items-center mb-3 cursor-pointer"
            @click="isFuelOilRemarkEnabled = !isFuelOilRemarkEnabled"
          >
            <img
              src="@/assets/icons/checkboxes/checked_square.svg"
              class="mr-2 h-5 w-5"
            />
            <span class="text-gray-700">{{ $t("additionalRemarks") }}</span>
          </div>
          <div class="grid grid-cols-10 border text-14">
            <div class="col-span-2 text-blue-700 p-3 bg-gray-50">
              {{ $t("correction") }}
            </div>
            <select
              disabled
              v-model="fuelOilDataCorrection.fuel_oil_type"
              class="col-span-4 p-3 border-l focus:outline-0 bg-gray-50 text-gray-700"
            >
              <option selected disabled value="default">
                {{ $t("selectType") }}
              </option>
              <option
                v-for="fuelOil of fuelOils"
                :value="fuelOil"
                :key="fuelOil"
              >
                {{ $t(fuelOil) }}
              </option>
            </select>
            <div class="flex col-span-4 p-3 pl-4 border-l bg-gray-50">
              <input
                disabled
                v-model="fuelOilDataCorrection.fueloildatacorrection.correction"
                @keypress="
                  preventNaN(
                    $event,
                    fuelOilDataCorrection.fueloildatacorrection.correction
                  )
                "
                placeholder="00,000.00"
                class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
              />
              <MiniUnitDisplay>MT</MiniUnitDisplay>
            </div>
            <div
              class="col-span-2 row-span-2 text-blue-700 p-3 border-t bg-gray-50"
            >
              {{ $t("remarks") }}
            </div>
            <textarea
              disabled
              v-model.trim="fuelOilDataCorrection.fueloildatacorrection.remarks"
              placeholder="Input description here"
              class="col-span-8 row-span-2 border-t border-l p-3 pl-4 bg-gray-50 text-gray-700 focus:outline-0"
            ></textarea>
          </div>
        </div> -->
      </div>

      <div class="pt-8">
        <div class="self-center text-16 mb-4 text-gray-700">
          {{ $t("lubricatingOilInL") }}
        </div>

        <div class="grid grid-cols-10 text-14">
          <div
            class="col-span-2 border-yellow-100 bg-yellow-25 px-6 border-l border-t"
          ></div>
          <div
            class="col-span-2 flex items-center text-yellow-800 border-yellow-100 bg-yellow-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("consumption") }}
          </div>
          <div
            class="col-span-2 flex items-center text-yellow-800 border-yellow-100 bg-yellow-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("receipt") }}
          </div>
          <div
            class="col-span-2 flex items-center text-yellow-800 border-yellow-100 bg-yellow-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("debunkering") }}
          </div>
          <div
            class="col-span-2 flex items-center text-yellow-800 border-yellow-100 bg-yellow-25 p-3 border-t border-x bg-gray-50"
          >
            {{ $t("remainOnBoard") }}
          </div>

          <span
            v-for="(lubricatingOilData, index) of lubricatingOilDataSet"
            :key="lubricatingOilData + index"
            :class="
              'col-span-10 grid grid-cols-10' +
              (index == lubricatingOilDataSet.length - 1 ? ' border-b' : '')
            "
          >
            <div
              class="col-span-2 p-3 text-blue-700 border-t border-l bg-gray-50"
            >
              {{ $t(lubricatingOilData.lubricating_oil_type) }}
            </div>
            <input
              disabled
              v-model="lubricatingOilData.total_consumption"
              @keypress="
                preventNaN($event, lubricatingOilData.total_consumption)
              "
              placeholder="0"
              class="col-span-2 p-3 pl-4 border-t border-l bg-gray-50 text-gray-700 focus:outline-0"
            />
            <input
              disabled
              v-model="lubricatingOilData.receipt"
              @keypress="preventNaN($event, lubricatingOilData.receipt)"
              placeholder="0"
              class="col-span-2 p-3 pl-4 border-t border-l bg-gray-50 text-gray-700 focus:outline-0"
            />
            <input
              disabled
              v-model="lubricatingOilData.debunkering"
              @keypress="preventNaN($event, lubricatingOilData.debunkering)"
              placeholder="0"
              class="col-span-2 p-3 pl-4 border-t border-l bg-gray-50 text-gray-700 focus:outline-0"
            />
            <div
              class="col-span-2 text-gray-700 p-3 border-t border-x bg-gray-50"
            >
              {{ lubricatingOilData.rob }}
            </div>
          </span>
        </div>

        <!-- <div
          v-if="!isLubricatingOilRemarkEnabled"
          class="bg-gray-25 flex items-center py-4 px-3 border border-gray-100 cursor-pointer"
          @click="
            isLubricatingOilRemarkEnabled = !isLubricatingOilRemarkEnabled
          "
        >
          <img
            src="@/assets/icons/checkboxes/unchecked_square.svg"
            class="mr-2 h-5 w-5"
          />
          <span class="text-gray-700">{{ $t("additionalRemarks") }}</span>
        </div>
        <div
          v-else
          class="bg-gray-25 flex-col py-4 px-3 border border-gray-100"
        >
          <div
            class="flex items-center mb-3 cursor-pointer"
            @click="
              isLubricatingOilRemarkEnabled = !isLubricatingOilRemarkEnabled
            "
          >
            <img
              src="@/assets/icons/checkboxes/checked_square.svg"
              class="mr-2 h-5 w-5"
            />
            <span class="text-gray-700">{{ $t("additionalRemarks") }}</span>
          </div>
          <div class="grid grid-cols-14 border text-14">
            <div class="col-span-2 text-blue-700 p-3 bg-gray-50">
              {{ $t("correction") }}
            </div>
            <div
              class="col-span-6 p-3 border-l focus:outline-0 bg-gray-50 text-gray-700"
            >
              {{ $t(lubricatingOilDataCorrection.lubricating_oil_type) }}
            </div>
            <div class="flex col-span-6 p-3 pl-4 border-l bg-gray-50">
              <input
                disabled
                v-model="
                  lubricatingOilDataCorrection.lubricatingoildatacorrection
                    .correction
                "
                @keypress="
                  preventNaN(
                    $event,
                    lubricatingOilDataCorrection.lubricatingoildatacorrection
                      .correction
                  )
                "
                placeholder="00,000.00"
                class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
              />
              <MiniUnitDisplay>MT</MiniUnitDisplay>
            </div>
            <div
              class="col-span-2 row-span-2 text-blue-700 p-3 border-t bg-gray-50"
            >
              {{ $t("remarks") }}
            </div>
            <textarea
              disabled
              v-model.trim="
                lubricatingOilDataCorrection.lubricatingoildatacorrection
                  .remarks
              "
              :placeholder="$t('inputDescriptionHere')"
              class="col-span-12 row-span-2 border-t border-l p-3 pl-4 bg-gray-50 text-gray-700 focus:outline-0"
            ></textarea>
          </div>
        </div> -->
      </div>

      <div class="pt-8">
        <div class="self-center text-16 text-gray-700">
          {{ $t("freshWaterInTon") }}
        </div>
        <div class="grid grid-cols-6 pt-8 text-14">
          <div
            class="col-span-1 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25"
          >
            {{ $t("consumed") }}
          </div>
          <div
            class="col-span-1 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25"
          >
            {{ $t("generated") }}
          </div>
          <div
            class="col-span-1 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25"
          >
            +/-
          </div>
          <div
            class="col-span-1 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25"
          >
            {{ $t("receipt") }}
          </div>
          <div
            class="col-span-1 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25"
          >
            {{ $t("discharging") }}
          </div>
          <div
            class="col-span-1 text-sysblue-800 p-3 border-t border-x border-sysblue-100 bg-sysblue-25"
          >
            {{ $t("remainOnBoard") }}
          </div>
          <input
            disabled
            v-model="freshwaterConsumed"
            @keypress="preventNaN($event, freshwaterConsumed)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="freshwaterGenerated"
            @keypress="preventNaN($event, freshwaterGenerated)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-1 text-gray-700 p-3 border-y border-l bg-gray-50"
          >
            {{ freshwaterChange }}
          </div>
          <input
            disabled
            v-model="freshwaterReceiving"
            @keypress="preventNaN($event, freshwaterReceiving)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="freshwaterDischarging"
            @keypress="preventNaN($event, freshwaterDischarging)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-1 text-gray-700 p-3 border-y border-x bg-gray-50"
          >
            {{ freshwaterRob }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
