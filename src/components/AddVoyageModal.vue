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
              @click="$emit('close-modal')"
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
                    v-model="fuel_options.mdo"
                    type="checkbox"
                    id="mdo"
                    name="mdo"
                    value="mdo"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="mdo">
                    {{ $t("mdo") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="fuel_options.mgo"
                    type="checkbox"
                    id="mgo"
                    name="mgo"
                    value="mgo"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="mgo">
                    {{ $t("mgo") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="fuel_options.lsfo"
                    type="checkbox"
                    id="lsfo"
                    name="lsfo"
                    value="lsfo"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="lsfo">
                    {{ $t("lsfo") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="fuel_options.hfo"
                    type="checkbox"
                    id="hfo"
                    name="hfo"
                    value="hfo"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="hfo">
                    {{ $t("hfo") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="fuel_options.lpgPropane"
                    type="checkbox"
                    id="lpgp"
                    name="lpgp"
                    value="lpgp"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="lpgp">
                    {{ $t("lpgp") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="fuel_options.lpg_butane"
                    type="checkbox"
                    id="lpgb"
                    name="lpgb"
                    value="lpgb"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="lpgb">
                    {{ $t("lpgb") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="fuel_options.lng"
                    type="checkbox"
                    id="lng"
                    name="lng"
                    value="lng"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="lng">
                    {{ $t("lng") }}
                  </label>
                </div>
              </div>
            </div>
            <!-- Lubricate oil type -->
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="leading-relaxed mb-4 text-gray-700">
                {{ $t("lubricateOilType") }}
              </p>
              <div class="grid grid-cols-3 gap-5">
                <div class="flex align-center">
                  <input
                    v-model="lubricating_oil_options.me_cylinder_oil"
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
                    v-model="lubricating_oil_options.me_system_oil"
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
                    v-model="lubricating_oil_options.me_sump_tank"
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
                    v-model="lubricating_oil_options.ge_system_oil"
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
                    v-model="lubricating_oil_options.tg_system_oil"
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
                    v-on:click="lubricateOthersFlag = !lubricateOthersFlag"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="othersOil">
                    {{ $t("others") }}
                  </label>
                </div>
              </div>
              <br />
              <input
                v-model.lazy="lubricateOthers"
                :disabled="lubricateOthersFlag"
                placeholder="Other lubricate oil type"
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
                    v-model="machinery_options.main_engine"
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
                    v-model="machinery_options.generator_engine"
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
                    v-model="machinery_options.boiler"
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
                    v-model="machinery_options.inert_gas_generator"
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
import GradientButton from "./Buttons/GradientButton.vue";
import CustomButton from "./Buttons/CustomButton.vue";
import { useAuthStore } from "@/stores/useAuthStore";

const auth = useAuthStore();

// List to export options from checkboxes
let lubricateOthersFlag = ref(true);
let machineryOthersFlag = ref(true);
const lubricateOthers = ref("");
const machineryOthers = ref("");

const propeller_pitch = ref(0);
const flag = "Panama";
const deadweight_tonnage = "2000.00";
const ship_type = ref("");
const cargo_unit = ref("");
const fuel_options = ref({
  mdo: false,
  mgo: false,
  lsfo: false,
  hfo: false,
  lpg_propane: false,
  lpg_butane: false,
  lng: false,
});

const lubricating_oil_options = ref({
  me_cylinder_oil: false,
  me_system_oil: false,
  me_sump_tank: false,
  ge_system_oil: false,
  tg_system_oil: false,
});

const machinery_options = ref({
  main_engine: false,
  generator_engine: false,
  boiler: false,
  ge_system_oil: false,
  inert_gas_generator: false,
});

const props = defineProps({
  vesselname: String,
  imo: String,
});

const emit = defineEmits(["close-modal"]);

const addSettings = () => {
  const settings = {
    flag,
    deadweight_tonnage,
    ship_type: ship_type.value,
    cargo_unit: cargo_unit.value,
    fuel_options: fuel_options.value,
    lubricating_oil_options: lubricating_oil_options.value,
    machinery_options: machinery_options.value,
    propeller_pitch: propeller_pitch.value,
  };
  const response = fetch(
    "https://testapi.marinachain.io/marinanet/ships/" + props.imo + "/specs/",
    {
      headers: {
        Authorization: "Bearer " + auth.jwt,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(settings),
    }
  );
  console.log(settings);
  emit("close-modal");
};
</script>
