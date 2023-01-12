<template>
  <div>
    <div
      class="bg-slate-400 overflow-auto fixed inset-0 z-50 justify-center items-center flex"
    >
      <div class="relative my-6 mx-auto w-4/12 h-5/6">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white"
        >
          <!--header-->
          <div
            class="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t"
          >
            <h3 class="text-3xl font-semibold">{{ $t("generalInfo") }}</h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold"
              @click="close"
            >
              <span class="h-6 w-6 text-3xl block"> x </span>
            </button>
          </div>
          <!--body-->
          <div class="relative flex-auto w-auto text-14 m-6 space-y-6">
            <!-- Vessel name and imo number -->
            <div class="grid grid-cols-2 bg-white rounded-lg gap-4">
              <div>
                <p class="leading-relaxed mb-2 text-gray-700">
                  {{ $t("vesselName") }}
                </p>
                <input
                  class="w-full bg-gray-50 px-3 py-3 rounded border border-gray-300 text-gray-500"
                  :disabled="true"
                  :placeholder="props.vesselname"
                />
              </div>
              <div>
                <p class="leading-relaxed mb-2 text-gray-700">
                  {{ $t("imoNo") }}
                </p>
                <input
                  class="w-full bg-gray-50 px-3 py-3 rounded border border-gray-300 text-gray-500"
                  :disabled="true"
                  :placeholder="props.imo"
                />
              </div>
            </div>
            <!-- Vessel type and Cargo unit -->
            <div class="grid grid-cols-2 bg-white rounded-lg gap-5">
              <div>
                <p class="leading-relaxed mb-2 text-gray-700">
                  {{ $t("vesselType") }}
                </p>
                <select
                  class="w-full bg-gray-0 px-3 py-3 rounded border border-gray-300 text-gray-500"
                  v-model="ship_type"
                >
                  <option value="" selected hidden>
                    {{ $t("selectAnOption") }}
                  </option>
                  <option value="BULK">{{ $t("bulkCarrier") }}</option>
                  <option value="GAS">{{ $t("gasCarrier") }}</option>
                  <option value="OIL">{{ $t("tanker") }}</option>
                  <option value="CNTR">{{ $t("container") }}</option>
                  <option value="GCGO">{{ $t("generalCargo") }}</option>
                  <option value="REFC">
                    {{ $t("refrigeratedCargo") }}
                  </option>
                  <option value="COMB">{{ $t("combiCarrier") }}</option>
                  <option value="LNGC">{{ $t("lngCarrier") }}</option>
                  <option value="RORV">
                    {{ $t("roroCargoVehicle") }}
                  </option>
                  <option value="RORO">{{ $t("roroCargo") }}</option>
                  <option value="RORP">
                    {{ $t("roroPassenger") }}
                  </option>
                  <option value="CRUZ">
                    {{ $t("cruisePassenger") }}
                  </option>
                </select>
              </div>
              <div>
                <p class="leading-relaxed mb-2 text-gray-700">
                  {{ $t("cargoUnit") }}
                </p>
                <select
                  class="w-full bg-gray-0 px-3 py-3 rounded border border-gray-300 text-gray-500"
                  v-model="cargo_unit"
                >
                  <option value="" selected hidden>
                    {{ $t("selectAnOption") }}
                  </option>
                  <option value="cargoM3">{{ $t("cargoM3") }}</option>
                  <option value="cargoMt">{{ $t("cargoMt") }}</option>
                  <option value="cargoTeu">{{ $t("cargoTeu") }}</option>
                  <option value="cargoCeu">{{ $t("cargoCeu") }}</option>
                </select>
              </div>
            </div>
            <!-- Fuel option -->
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="leading-relaxed mb-4 text-gray-700">
                {{ $t("fuelOilOption") }}
              </p>
              <div class="grid grid-cols-3 gap-2">
                <div class="flex align-center">
                  <input
                    v-model="fuel_options[0]"
                    type="checkbox"
                    id="lsfo"
                    name="lsfo"
                    value="lsfo"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="lsfo">
                    {{ $t("LSFO") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="fuel_options[1]"
                    type="checkbox"
                    id="hfo"
                    name="hfo"
                    value="hfo"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="hfo">
                    {{ $t("HFO") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="fuel_options[2]"
                    type="checkbox"
                    id="mdo"
                    name="mdo"
                    value="mdo"
                  />
                  <label class="ml-2 text-14 text-gray-700">
                    {{ $t("MDO") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="fuel_options[3]"
                    type="checkbox"
                    id="mgo"
                    name="mgo"
                    value="mgo"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="mgo">
                    {{ $t("MGO") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="fuel_options[4]"
                    type="checkbox"
                    id="lpgp"
                    name="lpgp"
                    value="lpgp"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="lpgp">
                    {{ $t("LPGP") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="fuel_options[5]"
                    type="checkbox"
                    id="lpgb"
                    name="lpgb"
                    value="lpgb"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="lpgb">
                    {{ $t("LPGB") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="fuel_options[6].LNG"
                    type="checkbox"
                    id="lng"
                    name="lng"
                    value="lng"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="lng">
                    {{ $t("LNG") }}
                  </label>
                </div>
              </div>
            </div>
            <!-- Lubricating oil type -->
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="leading-relaxed mb-4 text-gray-700">
                {{ $t("lubricatingOilType") }}
              </p>
              <div class="grid grid-cols-3 gap-5">
                <div class="flex align-center">
                  <input
                    v-model="lubricating_oil_options[0]"
                    type="checkbox"
                    id="mec"
                    name="mec"
                    value="mec"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="mec">
                    {{ $t("meCylinderOil") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="lubricating_oil_options[1]"
                    type="checkbox"
                    id="meSys"
                    name="meSys"
                    value="meSys"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="meSys">
                    {{ $t("meSystemOil") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="lubricating_oil_options[2]"
                    type="checkbox"
                    id="mesp"
                    name="mesp"
                    value="mesp"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="mesp">
                    {{ $t("meSumpTank") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="lubricating_oil_options[3]"
                    type="checkbox"
                    id="geso"
                    name="geso"
                    value="geso"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="geso">
                    {{ $t("geSystemOil") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="lubricating_oil_options[4]"
                    type="checkbox"
                    id="tgso"
                    name="tgso"
                    value="tgso"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="tgso">
                    {{ $t("tgSystemOil") }}
                  </label>
                </div>
                <div class="hidden flex align-center">
                  <input
                    type="checkbox"
                    id="othersOil"
                    name="othersOil"
                    value="othersOil"
                    v-on:click="lubricatingOthersFlag = !lubricatingOthersFlag"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="othersOil">
                    {{ $t("others") }}
                  </label>
                </div>
              </div>
              <br />
              <input
                v-model.lazy="lubricatingOthers"
                :disabled="lubricatingOthersFlag"
                placeholder="Other lubricating oil type"
                class="hidden w-full p-3 pl-4 border bg-white text-14 text-gray-500"
              />
            </div>
            <!-- Machinery -->
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="leading-relaxed mb-4 text-gray-700">
                {{ $t("machineryType") }}
              </p>
              <div class="grid grid-cols-3 gap-5">
                <div class="flex align-center">
                  <input
                    v-model="machinery_options[0]"
                    type="checkbox"
                    id="mainEngine"
                    name="mainEngine"
                    value="mainEngine"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="mainEngine">
                    {{ $t("mainEngine") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="machinery_options[1]"
                    type="checkbox"
                    id="generatorEngine"
                    name="generatorEngine"
                    value="generatorEngine"
                  />
                  <label
                    class="ml-2 text-14 text-gray-700"
                    for="generatorEngine"
                  >
                    {{ $t("generatorEngine") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="machinery_options[2]"
                    type="checkbox"
                    id="boilerEngine"
                    name="boilerEngine"
                    value="boilerEngine"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="boilerEngine">
                    {{ $t("boilerEngine") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="machinery_options[3]"
                    type="checkbox"
                    id="inertGasEngine"
                    name="inertGasEngine"
                    value="inertGasEngine"
                  />
                  <label
                    class="ml-2 text-14 text-gray-700"
                    for="inertGasEngine"
                  >
                    {{ $t("inertGasEngine") }}
                  </label>
                </div>
                <div class="hidden flex align-center">
                  <input
                    type="checkbox"
                    id="othersMachinery"
                    name="othersMachinery"
                    value="othersMachinery"
                    @click="machineryOthersFlag = !machineryOthersFlag"
                  />
                  <label
                    class="ml-2 text-14 text-gray-700"
                    for="othersMachinery"
                  >
                    {{ $t("others") }}
                  </label>
                </div>
              </div>
              <br />
              <input
                v-model.lazy="machineryOthers"
                :disabled="machineryOthersFlag"
                placeholder="Other machinery"
                class="hidden w-full p-3 pl-4 border bg-white text-14 text-gray-500"
              />
            </div>
            <div class="bg-gray-50 rounded-lg p-4 w-full">
              <label class="text-14 text-gray-700" for="propellerPitch">{{
                $t("propellerPitch")
              }}</label>
              <input
                input="number"
                v-model.lazy="propeller_pitch"
                id="propellerPitch"
                placeholder="Input number"
                class="w-full p-3 pl-4 border bg-white text-14 text-gray-500 mt-2"
              />
            </div>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-4 bg-gray-50 rounded-b space-x-3"
          >
            <CustomButton
              class="px-6 py-3 text-14 mr-1 mb-1"
              type="button"
              @click="$emit('close-modal')"
            >
              <template v-slot:content>{{ $t("cancel") }}</template>
            </CustomButton>
            <GradientButton
              class="px-6 py-2 text-14 mr-1 mb-1"
              type="button"
              v-on:click="addSettings()"
            >
              <template v-slot:content>{{ $t("saveDetails") }}</template>
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
    <div class="opacity-80 fixed inset-0 z-40 bg-gray-900"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import GradientButton from "@/components/Buttons/GradientButton.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";
import axios from "axios";
import { UrlDomain } from "@/constants";

// List to export options from checkboxes
let lubricatingOthersFlag = ref(true);
let machineryOthersFlag = ref(true);
const lubricatingOthers = ref("");
const machineryOthers = ref("");

const propeller_pitch = ref(0);
const ship_type = ref("");
const cargo_unit = ref("");

const fuelOrder = ["LSFO", "HFO", "MDO", "MGO", "LPGP", "LPGB", "LNG"];

const lubricatingOilOrder = [
  "me_cylinder_oil",
  "me_system_oil",
  "me_system_oil",
  "me_sump_tank",
  "ge_system_oil",
  "tg_system_oil",
];

const machineryOrder = [
  "main_engine",
  "generator_engine",
  "boiler",
  "inert_gas_generator",
];
const fuel_options = ref([false, false, false, false, false, false, false]);

const lubricating_oil_options = ref([true, true, false, true, false]);

const machinery_options = ref([true, true, true, false]);

const props = defineProps({
  flag: String,
  deadweight_tonnage: String,
  vesselname: String,
  imo: String,
});

const emit = defineEmits(["close-modal"]);

const close = () => {
  console.log("Close modal");
  emit("close-modal");
};
const addSettings = () => {
  const settings = {
    flag: "Panama",
    deadweight_tonnage: "2000.0",
    ship_type: ship_type.value,
    cargo_unit: cargo_unit.value,
    fuel_options: fuelOrder.filter(
      (fuel) => fuel_options.value[fuelOrder.indexOf(fuel)] == true
    ),
    lubricating_oil_options: lubricatingOilOrder.filter(
      (lubricatingOil) =>
        lubricating_oil_options.value[
          lubricatingOilOrder.indexOf(lubricatingOil)
        ] == true
    ),
    machinery_options: machineryOrder.filter(
      (machinery) =>
        machinery_options.value[machineryOrder.indexOf(machinery)] == true
    ),
    propeller_pitch: propeller_pitch.value,
  };

  axios
    .post(`${UrlDomain.DEV}/marinanet/ships/`, settings)
    .then(() => {
      emit("close-modal");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
</script>
