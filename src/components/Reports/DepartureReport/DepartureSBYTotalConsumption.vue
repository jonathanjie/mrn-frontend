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

        <div class="grid grid-cols-14 text-14">
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
            v-model="lsfo_breakdown_sum.me"
            @keypress="preventNaN($event, lsfo_breakdown_sum.me)"
            placeholder="0"
            disabled
            class="col-span-1 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            v-model="lsfo_breakdown_sum.ge"
            @keypress="preventNaN($event, lsfo_breakdown_sum.ge)"
            placeholder="0"
            disabled
            class="col-span-1 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            v-model="lsfo_breakdown_sum.blr"
            @keypress="preventNaN($event, lsfo_breakdown_sum.blr)"
            placeholder="0"
            disabled
            class="col-span-1 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            v-model="lsfo_breakdown_sum.igg"
            @keypress="preventNaN($event, lsfo_breakdown_sum.igg)"
            placeholder="0"
            disabled
            class="col-span-1 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <div
            class="col-span-2 text-gray-400 p-3 border-t border-l bg-gray-25"
          >
            {{ lsfo_total_consumption_sum }}
          </div>
          <input
            v-model="lsfo_breakdown_sum.receipt"
            @keypress="preventNaN($event, lsfo_breakdown_sum.receipt)"
            placeholder="0"
            disabled
            class="col-span-2 text-gray-400 p-3 border-t border-l focus:outline-0"
          />
          <input
            v-model="lsfo_breakdown_sum.debunkering"
            @keypress="preventNaN($event, lsfo_breakdown_sum.debunkering)"
            placeholder="0"
            disabled
            class="col-span-2 text-gray-400 p-3 border-t border-l focus:outline-0"
          />
          <div
            class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25"
          >
            {{ lsfo_rob_sum }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-y border-l bg-gray-50"
          >
            {{ $t("mgo") }}
          </div>
          <input
            v-model="mgo_breakdown_sum.me"
            @keypress="preventNaN($event, mgo_breakdown_sum.me)"
            placeholder="0"
            disabled
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            v-model="mgo_breakdown_sum.ge"
            @keypress="preventNaN($event, mgo_breakdown_sum.ge)"
            placeholder="0"
            disabled
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            v-model="mgo_breakdown_sum.blr"
            @keypress="preventNaN($event, mgo_breakdown_sum.blr)"
            placeholder="0"
            disabled
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            v-model="mgo_breakdown_sum.igg"
            @keypress="preventNaN($event, mgo_breakdown_sum.igg)"
            placeholder="0"
            disabled
            class="col-span-1 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <div
            class="col-span-2 text-gray-400 p-3 border-y border-l bg-gray-25"
          >
            {{ mgo_total_consumption_sum }}
          </div>
          <input
            v-model="mgo_breakdown_sum.receipt"
            @keypress="preventNaN($event, mgo_breakdown_sum.receipt)"
            placeholder="0"
            disabled
            class="col-span-2 text-gray-400 p-3 border-y border-l focus:outline-0"
          />
          <input
            v-model="mgo_breakdown_sum.debunkering"
            @keypress="preventNaN($event, mgo_breakdown_sum.debunkering)"
            placeholder="0"
            disabled
            class="col-span-2 text-gray-400 p-3 border-y border-l focus:outline-0"
          />
          <div class="col-span-2 text-gray-400 p-3 border bg-gray-25">
            {{ mgo_rob_sum }}
          </div>
        </div>
      </div>

      <div class="pt-8">
        <div class="self-center text-16 mb-4 text-gray-700">
          {{ $t("lubricatingOilInL") }}
        </div>

        <div class="grid grid-cols-14 text-14">
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
            v-model="mecylinder_breakdown_sum.total_consumption"
            @keypress="
              preventNaN($event, mecylinder_breakdown_sum.total_consumption)
            "
            placeholder="0"
            disabled
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            v-model="mecylinder_breakdown_sum.receipt"
            @keypress="preventNaN($event, mecylinder_breakdown_sum.receipt)"
            placeholder="0"
            disabled
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            v-model="mecylinder_breakdown_sum.debunkering"
            @keypress="preventNaN($event, mecylinder_breakdown_sum.debunkering)"
            placeholder="0"
            disabled
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <div
            class="col-span-3 text-gray-400 p-3 border-t border-x bg-gray-25"
          >
            {{ mecylinder_rob_sum }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-t border-l bg-gray-50"
          >
            {{ $t("meSystem") }}
          </div>
          <input
            v-model="mesystem_breakdown_sum.total_consumption"
            @keypress="
              preventNaN($event, mesystem_breakdown_sum.total_consumption)
            "
            placeholder="0"
            disabled
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            v-model="mesystem_breakdown_sum.receipt"
            @keypress="preventNaN($event, mesystem_breakdown_sum.receipt)"
            placeholder="0"
            disabled
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            v-model="mesystem_breakdown_sum.debunkering"
            @keypress="preventNaN($event, mesystem_breakdown_sum.debunkering)"
            placeholder="0"
            disabled
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <div
            class="col-span-3 text-gray-400 p-3 border-t border-x bg-gray-25"
          >
            {{ mesystem_rob_sum }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-t border-l bg-gray-50"
          >
            {{ $t("meSump") }}
          </div>
          <input
            v-model="mesump_breakdown_sum.total_consumption"
            @keypress="
              preventNaN($event, mesump_breakdown_sum.total_consumption)
            "
            placeholder="0"
            disabled
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            v-model="mesump_breakdown_sum.receipt"
            @keypress="preventNaN($event, mesump_breakdown_sum.receipt)"
            placeholder="0"
            disabled
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            v-model="mesump_breakdown_sum.debunkering"
            @keypress="preventNaN($event, mesump_breakdown_sum.debunkering)"
            placeholder="0"
            disabled
            class="col-span-3 p-3 pl-4 border-t border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <div
            class="col-span-3 text-gray-400 p-3 border-t border-x bg-gray-25"
          >
            {{ mesump_rob_sum }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-y border-l bg-gray-50"
          >
            {{ $t("geSystem") }}
          </div>
          <input
            v-model="gesystem_breakdown_sum.total_consumption"
            @keypress="preventNaN($event, gesystem_total_consumption)"
            placeholder="0"
            disabled
            class="col-span-3 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            v-model="gesystem_breakdown_sum.receipt"
            @keypress="preventNaN($event, gesystem_breakdown_sum.receipt)"
            placeholder="0"
            disabled
            class="col-span-3 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <input
            v-model="gesystem_breakdown_sum.debunkering"
            @keypress="preventNaN($event, gesystem_breakdown_sum.debunkering)"
            placeholder="0"
            disabled
            class="col-span-3 p-3 pl-4 border-y border-l bg-gray-50 text-gray-400 focus:outline-0"
          />
          <div
            class="col-span-3 text-gray-400 p-3 border-y border-x bg-gray-25"
          >
            {{ gesystem_rob_sum }}
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

<script setup>
import { preventNaN } from "@/utils/helpers";
import { useDepartureSBYReportStore } from "@/stores/useDepartureSBYReportStore";
import { storeToRefs } from "pinia";

const store = useDepartureSBYReportStore();
const {
  // fuel oil
  lsfoTotalConsumptionSum: lsfo_total_consumption_sum,
  lsfoRobSum: lsfo_rob_sum,
  mgoTotalConsumptionSum: mgo_total_consumption_sum,
  mgoRobSum: mgo_rob_sum,
  lsfoBreakdownSum: lsfo_breakdown_sum,
  mgoBreakdownSum: mgo_breakdown_sum,
  // lubricating oil
  mecylinderBreakdownSum: mecylinder_breakdown_sum,
  mesystemBreakdownSum: mesystem_breakdown_sum,
  mesumpBreakdownSum: mesump_breakdown_sum,
  gesystemBreakdownSum: gesystem_breakdown_sum,
  mecylinderRobSum: mecylinder_rob_sum,
  mesystemRobSum: mesystem_rob_sum,
  mesumpRobSum: mesump_rob_sum,
  gesystemRobSum: gesystem_rob_sum,
  // fresh water
  freshwaterConsumedSum: freshwater_consumed_sum,
  freshwaterGeneratedSum: freshwater_generated_sum,
  freshwaterChangeSum: freshwater_change_sum,
  freshwaterReceivingSum: freshwater_receiving_sum,
  freshwaterDischargingSum: freshwater_discharging_sum,
  freshwaterRobSum: freshwater_rob_sum,
} = storeToRefs(store);
</script>
