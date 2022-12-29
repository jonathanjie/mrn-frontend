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
  props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.reduce(
    (accum, curr) => accum || curr.fueloiltotalconsumptiondatacorrection,
    false
  )
    ? true
    : false
);
const isAdditionalRemarkLubricating = computed(() =>
  props.report.totalconsumptiondata.lubricatingoiltotalconsumptiondata_set.reduce(
    (accum, curr) => accum || curr.lubricatingoiltotalconsumptiondatacorrection,
    false
  )
    ? true
    : false
);

// Fuel Consumption
const lsfoTotalConsumptionSum = computed(
  () =>
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "LSFO"
    )[0].total_consumption
);
const lsfoRobSum = computed(
  () =>
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "LSFO"
    )[0].rob
);

const lsfoBreakdownSum = computed(
  () =>
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "LSFO"
    )[0].breakdown
);
const mgoTotalConsumptionSum = computed(
  () =>
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "MGO"
    )[0].total_consumption
);
const mgoRobSum = computed(
  () =>
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "MGO"
    )[0].total_consumption
);
const mgoBreakdownSum = computed(
  () =>
    props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "MGO"
    )[0].breakdown
);

const fuelOilDataCorrectionSum = computed(() =>
  isAdditionalRemarkFuel.value
    ? props.report.totalconsumptiondata.fueloiltotalconsumptiondata_set.filter(
        (fuelData) => fuelData.fueloildatacorrection != null
      )[0]
    : null
);
console.log("fuel correction value: ", fuelOilDataCorrectionSum.value);
// Lubricating Oil Consumption
const meCylinderBreakdownSum = computed(
  () =>
    props.report.totalconsumptiondata.lubricatingoiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "M/E Cylinder"
    )[0]
);
const meCylinderRobSum = computed(
  () =>
    props.report.totalconsumptiondata.lubricatingoiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "M/E Cylinder"
    )[0].rob
);
const meSystemBreakdownSum = computed(
  () =>
    props.report.totalconsumptiondata.lubricatingoiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "M/E System"
    )[0]
);
const meSystemRobSum = computed(
  () =>
    props.report.totalconsumptiondata.lubricatingoiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "M/E System"
    )[0].rob
);
const meSumpBreakdownSum = computed(
  () =>
    props.report.totalconsumptiondata.lubricatingoiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "M/E Sump"
    )[0]
);
const meSumpRobSum = computed(
  () =>
    props.report.totalconsumptiondata.lubricatingoiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "M/E Sump"
    )[0].rob
);
const geSystemBreakdownSum = computed(
  () =>
    props.report.totalconsumptiondata.lubricatingoiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "G/E System"
    )[0]
);
const geSystemRobSum = computed(
  () =>
    props.report.totalconsumptiondata.lubricatingoiltotalconsumptiondata_set.filter(
      (fuelData) => fuelData.fuel_oil_type == "G/E System"
    )[0].rob
);
const lubricatingOilDataCorrectionSum = computed(() =>
  isAdditionalRemarkFuel.value
    ? props.report.totalconsumptiondata.lubricatingoiltotalconsumptiondata_set.filter(
        (fuelData) => fuelData.lubricatingoildatacorrection != null
      )[0]
    : null
);

// Freshwater Consumption
const freshwaterConsumedSum = computed(
  () =>
    props.report.totalconsumptiondata.freshwatertotalconsumptiondata.consumed
);
const freshwaterGeneratedSum = computed(
  () =>
    props.report.totalconsumptiondata.freshwatertotalconsumptiondata.generated
);
const freshwaterReceivingSum = computed(
  () =>
    props.report.totalconsumptiondata.freshwatertotalconsumptiondata.received
);
const freshwaterDischargingSum = computed(
  () =>
    props.report.totalconsumptiondata.freshwatertotalconsumptiondata.generated
);
const freshwaterChangeSum = computed(
  () =>
    +props.report.totalconsumptiondata.freshwatertotalconsumptiondata.received +
    props.report.totalconsumptiondata.freshwatertotalconsumptiondata.generated -
    props.report.totalconsumptiondata.freshwatertotalconsumptiondata
      .discharged -
    props.report.totalconsumptiondata.freshwatertotalconsumptiondata.consumed
);
const freshwaterRobSum = computed(
  () => props.report.totalconsumptiondata.freshwatertotalconsumptiondata.rob
);
</script>

<template>
  <div
    class="grid bg-white rounded-lg p-5 gap-4 shadow-card border border-yellow-500"
  >
    <div>
      <div class="flex items-center">
        <img
          src="@/assets/icons/selected_yellow_gradient.svg"
          class="h-5 w-5"
        />
        <span class="text-16 text-yellow-700">
          {{ $t("consumptionAndConditionHarbourInPortInTotal") }}
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
            v-model="lsfoBreakdownSum.ME"
            @keypress="preventNaN($event, lsfoBreakdownSum.ME)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            disabled
            v-model="lsfoBreakdownSum.GE"
            @keypress="preventNaN($event, lsfoBreakdownSum.GE)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            disabled
            v-model="lsfoBreakdownSum.BLR"
            @keypress="preventNaN($event, lsfoBreakdownSum.BLR)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            disabled
            v-model="lsfoBreakdownSum.IGG"
            @keypress="preventNaN($event, lsfoBreakdownSum.IGG)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <div
            class="col-span-2 text-gray-400 p-3 border-t border-l bg-gray-25"
          >
            {{ lsfoTotalConsumptionSum }}
          </div>
          <input
            disabled
            v-model="lsfoBreakdownSum.receipt"
            @keypress="preventNaN($event, lsfoBreakdownSum.receipt)"
            placeholder="0"
            class="col-span-2 text-gray-400 p-3 border-t border-l focus:outline-0"
          />
          <input
            disabled
            v-model="lsfoBreakdownSum.debunkering"
            @keypress="preventNaN($event, lsfoBreakdownSum.debunkering)"
            placeholder="0"
            class="col-span-2 text-gray-400 p-3 border-t border-l focus:outline-0"
          />
          <div
            class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25"
          >
            {{ lsfoRobSum }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-y border-l bg-gray-50"
          >
            {{ $t("mgo") }}
          </div>
          <input
            disabled
            v-model="mgoBreakdownSum.ME"
            @keypress="preventNaN($event, mgoBreakdownSum.ME)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            disabled
            v-model="mgoBreakdownSum.GE"
            @keypress="preventNaN($event, mgoBreakdownSum.GE)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            disabled
            v-model="mgoBreakdownSum.BLR"
            @keypress="preventNaN($event, mgoBreakdownSum.BLR)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            disabled
            v-model="mgoBreakdownSum.IGG"
            @keypress="preventNaN($event, mgoBreakdownSum.IGG)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <div
            class="col-span-2 text-gray-400 p-3 border-y border-l bg-gray-25"
          >
            {{ mgoTotalConsumptionSum }}
          </div>
          <input
            disabled
            v-model="mgoBreakdownSum.receipt"
            @keypress="preventNaN($event, mgoBreakdownSum.receipt)"
            placeholder="0"
            class="col-span-2 text-gray-400 p-3 border-y border-l focus:outline-0"
          />
          <input
            disabled
            v-model="mgoBreakdownSum.debunkering"
            @keypress="preventNaN($event, mgoBreakdownSum.debunkering)"
            placeholder="0"
            class="col-span-2 text-gray-400 p-3 border-y border-l focus:outline-0"
          />
          <div class="col-span-2 text-gray-400 p-3 border bg-gray-25">
            {{ mgoRobSum }}
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
            <div class="col-span-2 text-blue-700 p-3">
              {{ $t("correction") }}
            </div>
            <!-- TODO: make dynamic -->
            <select
              disabled
              v-model="fuelOilDataCorrectionSum.type"
              class="col-span-6 p-3 border-l focus:outline-0"
              :class="
                fuelOilDataCorrectionSum.type === 'default'
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
                v-model="fuelOilDataCorrectionSum.correction"
                @keypress="
                  preventNaN($event, fuelOilDataCorrectionSum.correction)
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
              v-model.trim="fuelOilDataCorrectionSum.remarks"
              :placeholder="$t('inputDescriptionHere')"
              class="col-span-12 row-span-2 border-t border-l p-3 pl-4 text-gray-700 focus:outline-0"
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
            v-model="meCylinderBreakdownSum.total_consumption"
            @keypress="
              preventNaN($event, meCylinderBreakdownSum.total_consumption)
            "
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            disabled
            v-model="meCylinderBreakdownSum.receipt"
            @keypress="preventNaN($event, meCylinderBreakdownSum.receipt)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            disabled
            v-model="meCylinderBreakdownSum.debunkering"
            @keypress="preventNaN($event, meCylinderBreakdownSum.debunkering)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <div
            class="col-span-3 text-gray-400 p-3 border-t border-x bg-gray-25"
          >
            {{ meCylinderRobSum }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-t border-l bg-gray-50"
          >
            {{ $t("meSystem") }}
          </div>
          <input
            disabled
            v-model="meSystemBreakdownSum.total_consumption"
            @keypress="
              preventNaN($event, meSystemBreakdownSum.total_consumption)
            "
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            disabled
            v-model="meSystemBreakdownSum.receipt"
            @keypress="preventNaN($event, meSystemBreakdownSum.receipt)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            disabled
            v-model="meSystemBreakdownSum.debunkering"
            @keypress="preventNaN($event, meSystemBreakdownSum.debunkering)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <div
            class="col-span-3 text-gray-400 p-3 border-t border-x bg-gray-25"
          >
            {{ meSystemRobSum }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-t border-l bg-gray-50"
          >
            {{ $t("meSump") }}
          </div>
          <input
            disabled
            v-model="meSumpBreakdownSum.total_consumption"
            @keypress="preventNaN($event, meSumpBreakdownSum.total_consumption)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            disabled
            v-model="meSumpBreakdownSum.receipt"
            @keypress="preventNaN($event, meSumpBreakdownSum.receipt)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            disabled
            v-model="meSumpBreakdownSum.debunkering"
            @keypress="preventNaN($event, meSumpBreakdownSum.debunkering)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <div
            class="col-span-3 text-gray-400 p-3 border-t border-x bg-gray-25"
          >
            {{ meSumpRobSum }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-y border-l bg-gray-50"
          >
            {{ $t("geSystem") }}
          </div>
          <input
            disabled
            v-model="geSystemBreakdownSum.total_consumption"
            @keypress="preventNaN($event, gesystem_total_consumption)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            disabled
            v-model="geSystemBreakdownSum.receipt"
            @keypress="preventNaN($event, geSystemBreakdownSum.receipt)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            disabled
            v-model="geSystemBreakdownSum.debunkering"
            @keypress="preventNaN($event, geSystemBreakdownSum.debunkering)"
            placeholder="0"
            class="col-span-3 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <div
            class="col-span-3 text-gray-400 p-3 border-y border-x bg-gray-25"
          >
            {{ geSystemRobSum }}
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
              v-model="lubricatingOilDataCorrectionSum.type"
              class="col-span-6 p-3 border-l focus:outline-0"
              :class="
                lubricatingOilDataCorrectionSum.type === 'default'
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
                v-model="lubricatingOilDataCorrectionSum.correction"
                @keypress="
                  preventNaN($event, lubricatingOilDataCorrectionSum.correction)
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
              v-model.trim="lubricatingOilDataCorrectionSum.remarks"
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
            v-model="freshwaterConsumedSum"
            @keypress="preventNaN($event, freshwaterConsumedSum)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            disabled
            v-model="freshwaterGeneratedSum"
            @keypress="preventNaN($event, freshwaterGeneratedSum)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <div
            class="col-span-1 text-gray-400 p-3 border-y border-l bg-gray-25"
          >
            {{ freshwaterChangeSum }}
          </div>
          <input
            disabled
            v-model="freshwaterReceivingSum"
            @keypress="preventNaN($event, freshwaterReceivingSum)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            disabled
            v-model="freshwaterDischargingSum"
            @keypress="preventNaN($event, freshwaterDischargingSum)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <div
            class="col-span-1 text-gray-400 p-3 border-y border-x bg-gray-25"
          >
            {{ freshwaterRobSum }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
