<script setup>
import { preventNaN } from "@/utils/helpers";
import { computed, defineProps } from "vue";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { FuelOil, LubricatingOil } from "@/constants";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const isAdditionalRemarkFuel = computed(() =>
  props.report.consumptionconditiondata.fueloildata_set.reduce(
    (accum, curr) => accum || curr.fueloildatacorrection,
    false
  )
    ? true
    : false
);
const isAdditionalRemarkLubricating = computed(() =>
  props.report.consumptionconditiondata.lubricatingoildata_set.reduce(
    (accum, curr) => accum || curr.lubricatingoildatacorrection,
    false
  )
    ? true
    : false
);

// Fuel Consumption
const lsfoTotalConsumption = computed(
  () =>
    props.report.consumptionconditiondata.fueloildata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "LSFO"
    )[0].total_consumption
);
const lsfoRob = computed(
  () =>
    props.report.consumptionconditiondata.fueloildata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "LSFO"
    )[0].rob
);

const lsfoBreakdown = computed(
  () =>
    props.report.consumptionconditiondata.fueloildata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "LSFO"
    )[0].breakdown
);
const mgoTotalConsumption = computed(
  () =>
    props.report.consumptionconditiondata.fueloildata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "MGO"
    )[0].total_consumption
);
const mgoRob = computed(
  () =>
    props.report.consumptionconditiondata.fueloildata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "MGO"
    )[0].total_consumption
);
const mgoBreakdown = computed(
  () =>
    props.report.consumptionconditiondata.fueloildata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "MGO"
    )[0].breakdown
);

const fuelOilDataCorrection = computed(() =>
  isAdditionalRemarkFuel.value
    ? props.report.consumptionconditiondata.fueloildata_set.filter(
        (fuelData) => fuelData.fueloildatacorrection != null
      )[0]
    : null
);
// console.log("fuel correction value: ", fuelOilDataCorrection.value);
// Lubricating Oil Consumption
const meCylinderBreakdown = computed(
  () =>
    props.report.consumptionconditiondata.lubricatingoildata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "M/E Cylinder"
    )[0]
);
const meCylinderRob = computed(
  () =>
    props.report.consumptionconditiondata.lubricatingoildata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "M/E Cylinder"
    )[0].rob
);
const meSystemBreakdown = computed(
  () =>
    props.report.consumptionconditiondata.lubricatingoildata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "M/E System"
    )[0]
);
const meSystemRob = computed(
  () =>
    props.report.consumptionconditiondata.lubricatingoildata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "M/E System"
    )[0].rob
);
const meSumpBreakdown = computed(
  () =>
    props.report.consumptionconditiondata.lubricatingoildata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "M/E Sump"
    )[0]
);
const meSumpRob = computed(
  () =>
    props.report.consumptionconditiondata.lubricatingoildata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "M/E Sump"
    )[0].rob
);
const geSystemBreakdown = computed(
  () =>
    props.report.consumptionconditiondata.lubricatingoildata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "G/E System"
    )[0]
);
const geSystemRob = computed(
  () =>
    props.report.consumptionconditiondata.lubricatingoildata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "G/E System"
    )[0].rob
);
const lubricatingOilDataCorrection = computed(() =>
  isAdditionalRemarkFuel.value
    ? props.report.consumptionconditiondata.lubricatingoildata_set.filter(
        (fuelData) => fuelData.lubricatingoildatacorrection != null
      )[0]
    : null
);

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
</script>

<template>
  <div class="grid bg-white rounded-lg p-5 gap-4 shadow-card">
    <div>
      <div class="flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-16 text-blue-700">
          <slot>{{ $t("consumptionAndConditionLastReportToSby") }}</slot>
        </span>
      </div>
    </div>

    <div class="grid divide-y divide-dashed gap-8">
      <div>
        <div class="self-center mb-4 text-16 text-gray-700 pt-4">
          {{ $t("fuelOilInMT") }}
        </div>

        <div class="grid grid-cols-14 mb-4 text-14">
          <div
            class="col-span-2 border-green-100 bg-green-25 px-6 border-l border-t"
          ></div>
          <div
            class="col-span-1 flex items-center text-blue-700 border-green-100 bg-green-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("me") }}
          </div>
          <div
            class="col-span-1 flex items-center text-blue-700 border-green-100 bg-green-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("ge") }}
          </div>
          <div
            class="col-span-1 flex items-center text-blue-700 border-green-100 bg-green-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("blr") }}
          </div>
          <div
            class="col-span-1 flex items-center text-blue-700 border-green-100 bg-green-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("igg") }}
          </div>
          <div
            class="col-span-2 flex items-center text-blue-700 border-green-100 bg-green-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("totalConsumption") }}
          </div>
          <div
            class="col-span-2 flex items-center text-blue-700 border-green-100 bg-green-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("receipt") }}
          </div>
          <div
            class="col-span-2 flex items-center text-blue-700 border-green-100 bg-green-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("debunkering") }}
          </div>
          <div
            class="col-span-2 flex items-center text-blue-700 border-green-100 bg-green-25 p-3 border-t border-x bg-gray-50"
          >
            {{ $t("remainOnBoard") }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-t border-l bg-gray-50"
          >
            {{ $t("lsfo") }}
          </div>
          <input
            disabled
            v-model="lsfoBreakdown.ME"
            @keypress="preventNaN($event, lsfoBreakdown.ME)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="lsfoBreakdown.GE"
            @keypress="preventNaN($event, lsfoBreakdown.GE)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="lsfoBreakdown.BLR"
            @keypress="preventNaN($event, lsfoBreakdown.BLR)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="lsfoBreakdown.IGG"
            @keypress="preventNaN($event, lsfoBreakdown.IGG)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-2 text-gray-400 p-3 border-t border-l bg-gray-25"
          >
            {{ lsfoTotalConsumption }}
          </div>
          <input
            disabled
            v-model="lsfoBreakdown.receipt"
            @keypress="preventNaN($event, lsfoBreakdown.receipt)"
            placeholder="0"
            class="col-span-2 text-gray-700 p-3 border-t border-l focus:outline-0"
          />
          <input
            disabled
            v-model="lsfoBreakdown.debunkering"
            @keypress="preventNaN($event, lsfoBreakdown.debunkering)"
            placeholder="0"
            class="col-span-2 text-gray-700 p-3 border-t border-l focus:outline-0"
          />
          <div
            class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25"
          >
            {{ lsfoRob }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-y border-l bg-gray-50"
          >
            {{ $t("mgo") }}
          </div>
          <input
            disabled
            v-model="mgoBreakdown.ME"
            @keypress="preventNaN($event, mgoBreakdown.ME)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="mgoBreakdown.GE"
            @keypress="preventNaN($event, mgoBreakdown.GE)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="mgoBreakdown.BLR"
            @keypress="preventNaN($event, mgoBreakdown.BLR)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="mgoBreakdown.IGG"
            @keypress="preventNaN($event, mgoBreakdown.IGG)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-2 text-gray-400 p-3 border-y border-l bg-gray-25"
          >
            {{ mgoTotalConsumption }}
          </div>
          <input
            disabled
            v-model="mgoBreakdown.receipt"
            @keypress="preventNaN($event, mgoBreakdown.receipt)"
            placeholder="0"
            class="col-span-2 text-gray-700 p-3 border-y border-l focus:outline-0"
          />
          <input
            disabled
            v-model="mgoBreakdown.debunkering"
            @keypress="preventNaN($event, mgoBreakdown.debunkering)"
            placeholder="0"
            class="col-span-2 text-gray-700 p-3 border-y border-l focus:outline-0"
          />
          <div class="col-span-2 text-gray-400 p-3 border bg-gray-25">
            {{ mgoRob }}
          </div>
        </div>

        <!-- <div
          v-if="!isAdditionalRemarkFuel"
          class="bg-gray-25 flex items-center py-4 px-3 border border-gray-100 cursor-pointer"
          
        >
          <img
            src="@/assets/icons/checkboxes/unchecked_square.svg"
            class="mr-2 h-5 w-5"
          />
          <span class="text-gray-700">{{ $t("additionalRemarks") }}</span>
        </div> -->
        <div
          v-if="isAdditionalRemarkFuel"
          class="bg-gray-25 flex-col py-4 px-3 border border-gray-100"
        >
          <div class="flex items-center mb-3 cursor-pointer">
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
            <!-- TODO: make dynamic -->
            <select
              disabled
              v-model="fuelOilDataCorrection.fuel_oil_type"
              class="col-span-6 p-3 border-l focus:outline-0"
              :class="
                fuelOilDataCorrection.fuel_oil_type === 'default'
                  ? 'text-gray-400'
                  : 'text-gray-700'
              "
            >
              <option selected disabled value="default">
                {{ $t("selectType") }}
              </option>
              <option :value="FuelOil.LSFO">{{ $t("lsfo") }}</option>
              <option :value="FuelOil.MGO">{{ $t("mgo") }}</option>
            </select>
            <div class="flex col-span-6 p-3 pl-4 border-l bg-white">
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
                class="w-24 text-gray-700 focus:outline-0"
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
              :placeholder="$t('inputDescriptionHere')"
              class="col-span-12 row-span-2 border-t border-l p-3 pl-4 bg-white text-gray-700 focus:outline-0"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="pt-8">
        <div class="self-center text-16 mb-4 text-gray-700">
          {{ $t("lubricatingOilInL") }}
        </div>

        <div class="grid grid-cols-14 text-14 mb-4">
          <div
            class="col-span-2 border-yellow-100 bg-yellow-25 px-6 border-l border-t"
          ></div>
          <div
            class="col-span-3 flex items-center text-yellow-800 border-yellow-100 bg-yellow-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("consumption") }}
          </div>
          <div
            class="col-span-3 flex items-center text-yellow-800 border-yellow-100 bg-yellow-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("receipt") }}
          </div>
          <div
            class="col-span-3 flex items-center text-yellow-800 border-yellow-100 bg-yellow-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("debunkering") }}
          </div>
          <div
            class="col-span-3 flex items-center text-yellow-800 border-yellow-100 bg-yellow-25 p-3 border-t border-x bg-gray-50"
          >
            {{ $t("remainOnBoard") }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-t border-l bg-gray-50"
          >
            {{ $t("meCylinder") }}
          </div>
          <input
            disabled
            v-model="meCylinderBreakdown.total_consumption"
            @keypress="
              preventNaN($event, meCylinderBreakdown.total_consumption)
            "
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="meCylinderBreakdown.receipt"
            @keypress="preventNaN($event, meCylinderBreakdown.receipt)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="meCylinderBreakdown.debunkering"
            @keypress="preventNaN($event, meCylinderBreakdown.debunkering)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-3 text-gray-400 p-3 border-t border-x bg-gray-25"
          >
            {{ meCylinderRob }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-t border-l bg-gray-50"
          >
            {{ $t("meSystem") }}
          </div>
          <input
            disabled
            v-model="meSystemBreakdown.total_consumption"
            @keypress="preventNaN($event, meSystemBreakdown.total_consumption)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="meSystemBreakdown.receipt"
            @keypress="preventNaN($event, meSystemBreakdown.receipt)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="meSystemBreakdown.debunkering"
            @keypress="preventNaN($event, meSystemBreakdown.debunkering)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-3 text-gray-400 p-3 border-t border-x bg-gray-25"
          >
            {{ meSystemRob }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-t border-l bg-gray-50"
          >
            {{ $t("meSump") }}
          </div>
          <input
            disabled
            v-model="meSumpBreakdown.total_consumption"
            @keypress="preventNaN($event, meSumpBreakdown.total_consumption)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="meSumpBreakdown.receipt"
            @keypress="preventNaN($event, meSumpBreakdown.receipt)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="meSumpBreakdown.debunkering"
            @keypress="preventNaN($event, meSumpBreakdown.debunkering)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-3 text-gray-400 p-3 border-t border-x bg-gray-25"
          >
            {{ meSumpRob }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-y border-l bg-gray-50"
          >
            {{ $t("geSystem") }}
          </div>
          <input
            disabled
            v-model="geSystemBreakdown.total_consumption"
            @keypress="preventNaN($event, gesystem_total_consumption)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="geSystemBreakdown.receipt"
            @keypress="preventNaN($event, geSystemBreakdown.receipt)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="geSystemBreakdown.debunkering"
            @keypress="preventNaN($event, geSystemBreakdown.debunkering)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-3 text-gray-400 p-3 border-y border-x bg-gray-25"
          >
            {{ geSystemRob }}
          </div>
        </div>

        <!-- <div
          v-if="!isAdditionalRemarkLubricating"
          class="bg-gray-25 flex items-center py-4 px-3 border border-gray-100 cursor-pointer"
        
        >
          <img
            src="@/assets/icons/checkboxes/unchecked_square.svg"
            class="mr-2 h-5 w-5"
          />
          <span class="text-gray-700">{{ $t("additionalRemarks") }}</span>
        </div> -->
        <div
          v-if="isAdditionalRemarkLubricating"
          class="bg-gray-25 flex-col py-4 px-3 border border-gray-100"
        >
          <div class="flex items-center mb-3 cursor-pointer">
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
            <select
              disabled
              v-model="lubricatingOilDataCorrection.fuel_oil_type"
              class="col-span-6 p-3 border-l focus:outline-0"
              :class="
                lubricatingOilDataCorrection.fuel_oil_type === 'default'
                  ? 'text-gray-400'
                  : 'text-gray-700'
              "
            >
              <option selected disabled value="default">
                {{ $t("selectType") }}
              </option>
              <option :value="LubricatingOil.ME_CYLINDER">
                {{ $t("mecylinder") }}
              </option>
              <option :value="LubricatingOil.ME_SYSTEM">
                {{ $t("mesystem") }}
              </option>
              <option :value="LubricatingOil.ME_SUMP">
                {{ $t("mesump") }}
              </option>
              <option :value="LubricatingOil.GE_SYSTEM">
                {{ $t("gesystem") }}
              </option>
            </select>
            <div class="flex col-span-6 p-3 pl-4 border-l bg-white">
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
                class="w-24 text-gray-700 focus:outline-0"
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
              class="col-span-12 row-span-2 border-t border-l p-3 pl-4 bg-white text-gray-700 focus:outline-0"
            ></textarea>
          </div>
        </div>
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
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="freshwaterGenerated"
            @keypress="preventNaN($event, freshwaterGenerated)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-1 text-gray-400 p-3 border-y border-l bg-gray-25"
          >
            {{ freshwaterChange }}
          </div>
          <input
            disabled
            v-model="freshwaterReceiving"
            @keypress="preventNaN($event, freshwaterReceiving)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            disabled
            v-model="freshwaterDischarging"
            @keypress="preventNaN($event, freshwaterDischarging)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-1 text-gray-400 p-3 border-y border-x bg-gray-25"
          >
            {{ freshwaterRob }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
