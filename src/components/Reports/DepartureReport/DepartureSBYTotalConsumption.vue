<script setup>
import { preventNaN } from "@/utils/helpers";
import { useDepartureSBYReportStore } from "@/stores/useDepartureSBYReportStore";
import { storeToRefs } from "pinia";
import { useShipStore } from "@/stores/useShipStore";

const store = useDepartureSBYReportStore();
const {
  fuelOils,
  lubricatingOils,
  machinery,
  // fuel oil
  fuelOilTotalConsumptionsSum: fuel_oil_total_consumptions_sum,
  fuelOilRobsSum: fuel_oil_robs_sum,
  fuelOilBreakdownsSum: fuel_oil_breakdowns_sum,
  fuelOilReceiptsSum: fuel_oil_receipts_sum,
  fuelOilDebunkeringsSum: fuel_oil_debunkerings_sum,
  // lubricating oil
  lubricatingOilBreakdownsSum: lubricating_oil_breakdowns_sum,
  lubricatingOilRobsSum: lubricating_oil_robs_sum,
  // fresh water
  freshwaterConsumedSum: freshwater_consumed_sum,
  freshwaterGeneratedSum: freshwater_generated_sum,
  freshwaterChangeSum: freshwater_change_sum,
  freshwaterReceivingSum: freshwater_receiving_sum,
  freshwaterDischargingSum: freshwater_discharging_sum,
  freshwaterRobSum: freshwater_rob_sum,
  isSuccessPrevData,
  isFetchingPrevData,
  prevData,
} = storeToRefs(store);
// const { isSuccessPrevData, isFetchingPrevData, prevData } = store;

const getFuelOilCols = () => "grid-cols-" + (machinery.value.length + 10);
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

        <div class="grid mb-4 text-14" :class="getFuelOilCols()">
          <div
            class="col-span-2 border-green-100 bg-green-25 px-6 border-l border-t"
          ></div>
          <div
            v-for="item in machinery"
            :key="item"
            class="col-span-1 flex items-center text-blue-700 border-green-100 bg-green-25 p-3 border-t border-l bg-gray-50"
          >
            {{ item }}
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

          <span
            v-for="(fuelOil, index) of fuelOils"
            :key="index"
            :class="
              'col-span-full grid ' +
              getFuelOilCols() +
              ' ' +
              (index == fuelOils.length - 1 ? 'border-b' : '')
            "
          >
            <div
              class="col-span-2 p-3 text-blue-700 border-t border-l bg-gray-50"
            >
              {{ fuelOil }}
            </div>
            <input
              v-for="item of machinery"
              :key="item"
              v-model="fuel_oil_breakdowns_sum[fuelOil][item]"
              @keypress="
                preventNaN($event, fuel_oil_breakdowns_sum[fuelOil][item])
              "
              disabled
              placeholder="0"
              class="col-span-1 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
            />
            <div
              class="col-span-2 text-gray-400 p-3 border-t border-l bg-gray-25"
            >
              {{ fuel_oil_total_consumptions_sum[fuelOil] }}
            </div>
            <input
              v-model="fuel_oil_receipts_sum[fuelOil]"
              @keypress="preventNaN($event, fuel_oil_receipts_sum[fuelOil])"
              disabled
              placeholder="0"
              class="col-span-2 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
            />
            <input
              v-model="fuel_oil_debunkerings_sum[fuelOil]"
              @keypress="preventNaN($event, fuel_oil_debunkerings_sum[fuelOil])"
              disabled
              placeholder="0"
              class="col-span-2 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
            />
            <div
              class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25"
            >
              {{ fuel_oil_robs_sum[fuelOil] }}
            </div>
          </span>
        </div>
      </div>

      <div class="pt-8">
        <div class="self-center text-16 mb-4 text-gray-700">
          {{ $t("lubricatingOilInL") }}
        </div>

        <div class="grid grid-cols-10 text-14 mb-4">
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
            v-for="(lubricatingOil, index) of lubricatingOils"
            :key="index"
            :class="
              'col-span-10 grid grid-cols-10' +
              (index == lubricatingOils.length - 1 ? ' border-b' : '')
            "
          >
            <div
              class="col-span-2 p-3 text-blue-700 border-t border-l bg-gray-50"
            >
              {{ lubricatingOil }}
            </div>
            <input
              v-model="
                lubricating_oil_breakdowns_sum[lubricatingOil][
                  'total_consumption'
                ]
              "
              @keypress="
                preventNaN(
                  $event,
                  lubricating_oil_breakdowns_sum[lubricatingOil][
                    'total_consumption'
                  ]
                )
              "
              disabled
              placeholder="0"
              class="col-span-2 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
            />
            <input
              v-model="
                lubricating_oil_breakdowns_sum[lubricatingOil]['receipt']
              "
              @keypress="
                preventNaN(
                  $event,
                  lubricating_oil_breakdowns_sum[lubricatingOil]['receipt']
                )
              "
              placeholder="0"
              class="col-span-2 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
            />
            <input
              v-model="
                lubricating_oil_breakdowns_sum[lubricatingOil]['debunkering']
              "
              @keypress="
                preventNaN(
                  $event,
                  lubricating_oil_breakdowns_sum[lubricatingOil]['debunkering']
                )
              "
              placeholder="0"
              class="col-span-2 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
            />
            <div
              class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25"
            >
              {{ lubricating_oil_robs_sum[lubricatingOil] }}
            </div>
          </span>
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
            v-model="freshwater_consumed_sum"
            @keypress="preventNaN($event, freshwater_consumed_sum)"
            placeholder="0"
            disabled
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            v-model="freshwater_generated_sum"
            @keypress="preventNaN($event, freshwater_generated_sum)"
            placeholder="0"
            disabled
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <div
            class="col-span-1 text-gray-400 p-3 border-y border-l bg-gray-25"
          >
            {{ freshwater_change_sum }}
          </div>
          <input
            v-model="freshwater_receiving_sum"
            @keypress="preventNaN($event, freshwater_receiving_sum)"
            placeholder="0"
            disabled
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            v-model="freshwater_discharging_sum"
            @keypress="preventNaN($event, freshwater_discharging_sum)"
            placeholder="0"
            disabled
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <div
            class="col-span-1 text-gray-400 p-3 border-y border-x bg-gray-25"
          >
            {{ freshwater_rob_sum }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
