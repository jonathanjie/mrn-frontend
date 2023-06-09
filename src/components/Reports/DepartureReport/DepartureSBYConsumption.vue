<template>
  <div class="grid bg-white rounded-lg p-5 gap-4 shadow-card">
    <div>
      <div class="flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-16 text-blue-700">
          <slot>
            <span>{{ $t("consumptionAndConditionLastReportToSby") }}</span>
            <span class="text-red-500 text-16 ml-1">*</span>
          </slot>
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
            v-for="item in machinery"
            :key="item"
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
              class="col-span-1 p-3 text-blue-700 border-t border-l bg-gray-50"
            >
              {{ $t(fuelOil) }}
            </div>
            <input
              v-for="item of machinery"
              :key="item"
              v-model="fuel_oil_breakdowns[fuelOil][item]"
              @keypress="preventNaN($event, fuel_oil_breakdowns[fuelOil][item])"
              placeholder="0"
              class="col-span-1 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
            />
            <div
              class="col-span-1 text-gray-400 p-3 border-t border-l bg-gray-25"
            >
              {{ fuel_oil_total_consumptions[fuelOil] }}
            </div>
            <input
              v-model="fuel_oil_receipts[fuelOil]"
              @keypress="preventNaN($event, fuel_oil_receipts[fuelOil])"
              placeholder="0"
              class="col-span-1 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
            />
            <input
              v-model="fuel_oil_debunkerings[fuelOil]"
              @keypress="preventNaN($event, fuel_oil_debunkerings[fuelOil])"
              placeholder="0"
              class="col-span-1 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
            />
            <input
              v-if="isFirstReport"
              v-model="fuelOilRobsStatic[fuelOil]"
              @keypress="preventNaN($event, fuelOilRobsStatic[fuelOil])"
              placeholder="0"
              class="col-span-1 p-3 pl-4 border-t border-x bg-white text-gray-700 focus:outline-0"
            />
            <div
              v-else
              class="col-span-1 text-gray-400 p-3 border-t border-x bg-gray-25"
            >
              {{ fuelOilRobsComputed[fuelOil] }}
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
              v-model="fuel_oil_data_correction.type"
              class="col-span-4 p-3 border-l focus:outline-0"
              :class="
                fuel_oil_data_correction.type === 'default'
                  ? 'text-gray-400'
                  : 'text-gray-700'
              "
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
            <div class="flex col-span-4 p-3 pl-4 border-l bg-white">
              <input
                v-model="fuel_oil_data_correction.correction"
                @keypress="
                  preventNaN($event, fuel_oil_data_correction.correction)
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
              v-model.trim="fuel_oil_data_correction.remarks"
              placeholder="Input description here"
              class="col-span-8 row-span-2 border-t border-l p-3 pl-4 bg-white text-gray-700 focus:outline-0"
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
              {{ $t(lubricatingOil) }}
            </div>
            <input
              v-model="
                lubricating_oil_breakdowns[lubricatingOil]['total_consumption']
              "
              @keypress="
                preventNaN(
                  $event,
                  lubricating_oil_breakdowns[lubricatingOil][
                    'total_consumption'
                  ]
                )
              "
              placeholder="0"
              class="col-span-2 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
            />
            <input
              v-model="lubricating_oil_breakdowns[lubricatingOil]['receipt']"
              @keypress="
                preventNaN(
                  $event,
                  lubricating_oil_breakdowns[lubricatingOil]['receipt']
                )
              "
              placeholder="0"
              class="col-span-2 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
            />
            <input
              v-model="
                lubricating_oil_breakdowns[lubricatingOil]['debunkering']
              "
              @keypress="
                preventNaN(
                  $event,
                  lubricating_oil_breakdowns[lubricatingOil]['debunkering']
                )
              "
              placeholder="0"
              class="col-span-2 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
            />
            <input
              v-if="isFirstReport"
              v-model="lubricatingOilRobsStatic[lubricatingOil]"
              @keypress="
                preventNaN($event, lubricatingOilRobsStatic[lubricatingOil])
              "
              placeholder="0"
              class="col-span-2 p-3 pl-4 border-t border-x bg-white text-gray-700 focus:outline-0"
            />
            <div
              v-else
              class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25"
            >
              {{ lubricatingOilRobsComputed[lubricatingOil] }}
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
            <select
              v-model="lubricating_oil_data_correction.type"
              class="col-span-6 p-3 border-l focus:outline-0"
              :class="
                lubricating_oil_data_correction.type === 'default'
                  ? 'text-gray-400'
                  : 'text-gray-700'
              "
            >
              <option selected disabled value="default">
                {{ $t("selectType") }}
              </option>
              <option
                v-for="lubricatingOil of lubricatingOils"
                :value="lubricatingOil"
                :key="lubricatingOil"
              >
                {{ $t(lubricatingOil) }}
              </option>
            </select>
            <div class="flex col-span-6 p-3 pl-4 border-l bg-white">
              <input
                v-model="lubricating_oil_data_correction.correction"
                @keypress="
                  preventNaN($event, lubricating_oil_data_correction.correction)
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
              v-model.trim="lubricating_oil_data_correction.remarks"
              :placeholder="$t('inputDescriptionHere')"
              class="col-span-12 row-span-2 border-t border-l p-3 pl-4 bg-white text-gray-700 focus:outline-0"
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
            v-model="freshwater_consumed"
            @keypress="preventNaN($event, freshwater_consumed)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            v-model="freshwater_generated"
            @keypress="preventNaN($event, freshwater_generated)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-1 text-gray-400 p-3 border-y border-l bg-gray-25"
          >
            {{ freshwater_change }}
          </div>
          <input
            v-model="freshwater_receiving"
            @keypress="preventNaN($event, freshwater_receiving)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            v-model="freshwater_discharging"
            @keypress="preventNaN($event, freshwater_discharging)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            v-if="isFirstReport"
            v-model="freshwaterRobStatic"
            @keypress="preventNaN($event, freshwater_discharging)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-x bg-white text-gray-700 focus:outline-0"
          />
          <div
            v-else
            class="col-span-1 text-gray-400 p-3 border-y border-x bg-gray-25"
          >
            {{ freshwaterRobComputed }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { preventNaN } from "@/utils/helpers";
import { useDepartureSBYReportStore } from "@/stores/useDepartureSBYReportStore";
import { storeToRefs } from "pinia";

// const isFuelOilRemarkEnabled = ref(false);
// const isLubricatingOilRemarkEnabled = ref(false);

const store = useDepartureSBYReportStore();
const {
  isFirstReport,
  fuelOils,
  lubricatingOils,
  machinery,
  // fuel oil
  fuelOilTotalConsumptions: fuel_oil_total_consumptions,
  // fuelOilRobs: fuel_oil_robs,
  fuelOilRobsComputed,
  fuelOilRobsStatic,
  // fuelOilRobs: fuel_oil_robs,
  fuelOilBreakdowns: fuel_oil_breakdowns,
  fuelOilReceipts: fuel_oil_receipts,
  fuelOilDebunkerings: fuel_oil_debunkerings,
  // fuelOilDataCorrection: fuel_oil_data_correction,
  // lubricating oil
  lubricatingOilBreakdowns: lubricating_oil_breakdowns,
  lubricatingOilRobsComputed,
  lubricatingOilRobsStatic,
  // lubricatingOilDataCorrection: lubricating_oil_data_correction,
  // fresh water
  freshwaterConsumed: freshwater_consumed,
  freshwaterGenerated: freshwater_generated,
  freshwaterChange: freshwater_change,
  freshwaterReceiving: freshwater_receiving,
  freshwaterDischarging: freshwater_discharging,
  freshwaterRobComputed,
  freshwaterRobStatic,
} = storeToRefs(store);

const getFuelOilCols = () => "grid-cols-" + (machinery.value.length + 5);
</script>
