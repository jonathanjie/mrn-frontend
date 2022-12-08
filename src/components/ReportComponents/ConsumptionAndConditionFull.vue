<template>
  <div
    class="grid bg-white rounded-lg p-5 gap-4 shadow-card"
    :class="isYellow ? 'border border-yellow-500' : ''"
  >
    <div>
      <div class="flex items-center">
        <img
          v-if="isYellow"
          src="@/assets/icons/selected_yellow_gradient.svg"
          class="h-5 w-5"
        />
        <img
          v-else
          src="@/assets/icons/selected_blue_gradient.svg"
          class="h-5 w-5"
        />
        <span
          class="text-16"
          :class="isYellow ? 'text-yellow-700' : 'text-blue-700'"
        >
          <slot>{{ $t("consumptionAndCondition") }}</slot>
        </span>
      </div>
      <span v-if="hasDetail" class="text-14 text-gray-600 mt-2">{{
        $t("lastReportToSbyForDeparture")
      }}</span>
    </div>

    <div class="grid divide-y divide-dashed gap-8">
      <div>
        <div class="self-center mb-4 text-16 text-gray-700">
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
            v-model="lsfo.me_consumed"
            @keypress="preventNaN($event, lsfo.me_consumed)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            v-model="lsfo.aux_consumed"
            @keypress="preventNaN($event, lsfo.aux_consumed)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            v-model="lsfo.boiler_consumed"
            @keypress="preventNaN($event, lsfo.boiler_consumed)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            v-model="lsfo.gas_generator_consumed"
            @keypress="preventNaN($event, lsfo.gas_generator_consumed)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-2 text-gray-400 p-3 border-t border-l bg-gray-25"
          >
            {{ lsfo_total }}
          </div>
          <input
            v-model="lsfo.receipt"
            @keypress="preventNaN($event, lsfo.receipt)"
            placeholder="0"
            class="col-span-2 text-gray-400 p-3 border-t border-l focus:outline-0"
          />
          <input
            v-model="lsfo.debunkering"
            @keypress="preventNaN($event, lsfo.debunkering)"
            placeholder="0"
            class="col-span-2 text-gray-400 p-3 border-t border-l focus:outline-0"
          />
          <div
            class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25"
          >
            {{ lsfo_rob }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-y border-l bg-gray-50"
          >
            {{ $t("mgo") }}
          </div>
          <input
            v-model="mgo.me_consumed"
            @keypress="preventNaN($event, mgo.me_consumed)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            v-model="mgo.aux_consumed"
            @keypress="preventNaN($event, mgo.aux_consumed)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            v-model="mgo.boiler_consumed"
            @keypress="preventNaN($event, mgo.boiler_consumed)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            v-model="mgo.gas_generator_consumed"
            @keypress="preventNaN($event, mgo.gas_generator_consumed)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-2 text-gray-400 p-3 border-y border-l bg-gray-25"
          >
            {{ mgo_total }}
          </div>
          <input
            v-model="mgo.receipt"
            @keypress="preventNaN($event, mgo.receipt)"
            placeholder="0"
            class="col-span-2 text-gray-400 p-3 border-y border-l focus:outline-0"
          />
          <input
            v-model="mgo.debunkering"
            @keypress="preventNaN($event, mgo.debunkering)"
            placeholder="0"
            class="col-span-2 text-gray-400 p-3 border-y border-l focus:outline-0"
          />
          <div class="col-span-2 text-gray-400 p-3 border bg-gray-25">
            {{ mgo_rob }}
          </div>
        </div>

        <div
          v-if="!isAdditionalRemarkFuel"
          class="bg-gray-25 flex items-center py-4 px-3 border border-gray-100 cursor-pointer"
          @click="isAdditionalRemarkFuel = !isAdditionalRemarkFuel"
        >
          <img src="@/assets/icons/unchecked.svg" class="pr-2" />
          <span class="text-gray-700">{{ $t("additionalRemarks") }}</span>
        </div>
        <div
          v-else
          class="bg-gray-25 flex-col py-4 px-3 border border-gray-100"
        >
          <div
            class="flex items-center mb-3 cursor-pointer"
            @click="isAdditionalRemarkFuel = !isAdditionalRemarkFuel"
          >
            <img src="@/assets/icons/checked.svg" class="pr-2" />
            <span class="text-gray-700">{{ $t("additionalRemarks") }}</span>
          </div>
          <div class="grid grid-cols-14 border text-14">
            <div class="col-span-2 text-blue-700 p-3 bg-gray-50">
              {{ $t("correction") }}
            </div>
            <!-- TODO: make dynamic -->
            <select
              v-model="correction_fo.type"
              class="col-span-6 p-3 border-l focus:border-0"
              :class="
                correction_fo.type === 'default'
                  ? 'text-gray-400'
                  : 'text-gray-700'
              "
            >
              <option selected disabled value="default">
                {{ $t("selectType") }}
              </option>
              <option value="lsfo">{{ $t("lsfo") }}</option>
              <option value="mgo">{{ $t("mgo") }}</option>
            </select>
            <div class="flex col-span-6 p-3 pl-4 border-l bg-white">
              <input
                v-model="correction_fo.change"
                @keypress="preventNaN($event, correction_fo.change)"
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
              v-model.trim="correction_fo.remarks"
              placeholder="Input description here"
              class="col-span-12 row-span-2 border-t border-l p-3 pl-4 bg-white text-gray-700 focus:outline-0"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="pt-8">
        <div class="self-center text-16 mb-4 text-gray-700">
          {{ $t("lubricateOilInL") }}
        </div>

        <div class="grid grid-cols-14 text-14 mb-4">
          <div
            class="col-span-2 border-yellow-100 bg-yellow-25 px-6 border-l border-t"
          ></div>
          <div
            class="col-span-6 flex items-center text-yellow-800 border-yellow-100 bg-yellow-25 p-3 border-t border-l bg-gray-50"
          >
            {{ $t("totalConsumption") }}
          </div>
          <div
            class="col-span-6 flex items-center text-yellow-800 border-yellow-100 bg-yellow-25 p-3 border-t border-x bg-gray-50"
          >
            {{ $t("remainOnBoard") }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-t border-l bg-gray-50"
          >
            {{ $t("meCylinder") }}
          </div>
          <input
            v-model="lubricate.mecylinder_total"
            @keypress="preventNaN($event, lubricate.mecylinder_total)"
            placeholder="0"
            class="col-span-6 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-6 text-gray-400 p-3 border-t border-x bg-gray-25"
          >
            {{ mecylinder_rob }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-t border-l bg-gray-50"
          >
            {{ $t("meSystem") }}
          </div>
          <input
            v-model="lubricate.mesystem_total"
            @keypress="preventNaN($event, lubricate.mesystem_total)"
            placeholder="0"
            class="col-span-6 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-6 text-gray-400 p-3 border-t border-x bg-gray-25"
          >
            {{ mesystem_rob }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-t border-l bg-gray-50"
          >
            {{ $t("meSump") }}
          </div>
          <input
            v-model="lubricate.mesump_total"
            @keypress="preventNaN($event, lubricate.mesump_total)"
            placeholder="0"
            class="col-span-6 p-3 pl-4 border-t border-l bg-white text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-6 text-gray-400 p-3 border-t border-x bg-gray-25"
          >
            {{ mesump_rob }}
          </div>

          <div
            class="col-span-2 p-3 text-blue-700 border-y border-l bg-gray-50"
          >
            {{ $t("geSystem") }}
          </div>
          <input
            v-model="lubricate.gesystem_total"
            @keypress="preventNaN($event, lubricate.gesystem_total)"
            placeholder="0"
            class="col-span-6 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-6 text-gray-400 p-3 border-y border-x bg-gray-25"
          >
            {{ gesystem_rob }}
          </div>
        </div>

        <div
          v-if="!isAdditionalRemarkLubricate"
          class="bg-gray-25 flex items-center py-4 px-3 border border-gray-100 cursor-pointer"
          @click="isAdditionalRemarkLubricate = !isAdditionalRemarkLubricate"
        >
          <img src="@/assets/icons/unchecked.svg" class="pr-2" />
          <span class="text-gray-700">{{ $t("additionalRemarks") }}</span>
        </div>
        <div
          v-else
          class="bg-gray-25 flex-col py-4 px-3 border border-gray-100"
        >
          <div
            class="flex items-center mb-3 cursor-pointer"
            @click="isAdditionalRemarkLubricate = !isAdditionalRemarkLubricate"
          >
            <img src="@/assets/icons/checked.svg" class="pr-2" />
            <span class="text-gray-700">{{ $t("additionalRemarks") }}</span>
          </div>
          <div class="grid grid-cols-14 border text-14">
            <div class="col-span-2 text-blue-700 p-3 bg-gray-50">
              {{ $t("correction") }}
            </div>
            <select
              v-model="correction_lo.type"
              class="col-span-6 p-3 border-l focus:border-0"
              :class="
                correction_lo.type === 'default'
                  ? 'text-gray-400'
                  : 'text-gray-700'
              "
            >
              <option selected disabled value="default">
                {{ $t("selectType") }}
              </option>
              <option value="mecylinder">{{ $t("mecylinder") }}</option>
              <option value="mesystem">{{ $t("mesystem") }}</option>
              <option value="mesump">{{ $t("mesump") }}</option>
              <option value="gesystem">{{ $t("gesystem") }}</option>
            </select>
            <div class="flex col-span-6 p-3 pl-4 border-l bg-white">
              <input
                v-model="correction_lo.change"
                @keypress="preventNaN($event, correction_lo.change)"
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
              v-model.trim="correction_lo.remarks"
              placeholder="Input description here"
              class="col-span-12 row-span-2 border-t border-l p-3 pl-4 bg-white text-gray-700 focus:outline-0"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="pt-8">
        <div class="self-center text-16 text-gray-700">
          {{ $t("freshWaterInTon") }}
        </div>
        <div class="grid grid-cols-4 pt-8 text-14">
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
            class="col-span-1 text-sysblue-800 p-3 border-t border-x border-sysblue-100 bg-sysblue-25"
          >
            {{ $t("rob") }}
          </div>
          <input
            v-model="freshwater.consumed"
            @keypress="preventNaN($event, freshwater.consumed)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <input
            v-model="freshwater.evaporated"
            @keypress="preventNaN($event, freshwater.evaporated)"
            placeholder="0"
            class="col-span-1 p-3 pl-4 border-y border-l bg-white text-gray-700 focus:outline-0"
          />
          <div
            class="col-span-1 text-gray-400 p-3 border-y border-l bg-gray-25"
          >
            {{ freshwater_change }}
          </div>
          <div
            class="col-span-1 text-gray-400 p-3 border-y border-x bg-gray-25"
          >
            {{ freshwater_rob }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { preventNaN } from "@/utils/helpers";
import { ref, reactive, computed, defineProps } from "vue";
import MiniUnitDisplay from "../../components/MiniUnitDisplay.vue";

const isAdditionalRemarkFuel = ref(false);
const isAdditionalRemarkLubricate = ref(false);

// TODO: incorporate receipt / debunkering to formula
const lsfo_total = computed(
  () =>
    +(
      Number(lsfo.me_consumed) +
      Number(lsfo.aux_consumed) +
      Number(lsfo.boiler_consumed) +
      Number(lsfo.gas_generator_consumed)
    )
);
const lsfo_rob = computed(
  () =>
    tempValues.lsfoPrevROB -
    lsfo_total.value +
    Number(lsfo.receipt) -
    Number(lsfo.debunkering)
);

const mgo_total = computed(
  () =>
    +(
      Number(mgo.me_consumed) +
      Number(mgo.aux_consumed) +
      Number(mgo.boiler_consumed) +
      Number(mgo.gas_generator_consumed)
    ).toFixed(2)
);
const mgo_rob = computed(
  () =>
    tempValues.mgoPrevROB -
    mgo_total.value +
    Number(mgo.receipt) -
    Number(mgo.debunkering)
);

const mecylinder_rob = computed(
  () => +(tempValues.mecylPrevROB - lubricate.mecylinder_total).toFixed(2)
);
const mesystem_rob = computed(
  () => +(tempValues.mesysPrevROB - lubricate.mesystem_total).toFixed(2)
);
const mesump_rob = computed(
  () => +(tempValues.mesumpPrevROB - lubricate.mesump_total).toFixed(2)
);
const gesystem_rob = computed(
  () => +(tempValues.gesysPrevROB - lubricate.gesystem_total).toFixed(2)
);

const freshwater_change = computed(
  () => +(freshwater.evaporated - freshwater.consumed).toFixed(2)
);
const freshwater_rob = computed(
  () =>
    tempValues.freshwaterPrevROB +
    freshwater_change.value +
    Number(freshwater.receiving) -
    Number(freshwater.discharging)
);

const lsfo = reactive({
  fuel_type: "LSFO",
  rob: "",
  me_consumed: "",
  aux_consumed: "",
  boiler_consumed: "",
  gas_generator_consumed: "",
  total_consumed: "",
  receipt: "",
  debunkering: "",
});

const mgo = reactive({
  fuel_type: "MGO",
  rob: "",
  me_consumed: "",
  aux_consumed: "",
  boiler_consumed: "",
  gas_generator_consumed: "",
  total_consumed: "",
  receipt: "",
  debunkering: "",
});

const lubricate = reactive({
  mecylinder_total: "",
  mesystem_total: "",
  mesump_total: "",
  gesystem_total: "",
});

const correction_fo = reactive({
  type: "default",
  change: "",
  remarks: "",
});

const correction_lo = reactive({
  type: "default",
  change: "",
  remarks: "",
});

const freshwater = reactive({
  rob: "0",
  consumed: "",
  evaporated: "",
  correction: 0,
  remarks: "NIL",
  receiving: "",
  discharging: "",
});

const tempValues = {
  distanceLeft: 2300,
  lsfoPrevROB: 200,
  mgoPrevROB: 200,
  mecylPrevROB: 200,
  mesysPrevROB: 200,
  mesumpPrevROB: 200,
  gesysPrevROB: 200,
  freshwaterPrevROB: 200,
};

const props = defineProps({
  isYellow: {
    type: Boolean,
    required: false,
    default: false,
  },
  hasDetail: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
