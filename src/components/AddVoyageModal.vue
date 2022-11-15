<template>
  <div>
    <div
      class="bg-slate-400 overflow-auto fixed inset-0 z-50 justify-center items-center flex"
    >
      <div class="relative my-6 mx-auto w-5/12 h-5/6">
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
                  :placeholder="vesselname"
                />
              </div>
              <div>
                <p class="leading-relaxed mb-2 text-gray-700">
                  {{ $t("imoNo") }}
                </p>
                <input
                  class="w-full bg-gray-50 px-3 py-3 rounded border border-gray-300 text-gray-500"
                  :disabled="true"
                  :placeholder="imo"
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
                  v-model="vesselType"
                >
                  <option value="" selected hidden>
                    {{ $t("selectAnOption") }}
                  </option>
                  <option value="bulkCarrier">{{ $t("bulkCarrier") }}</option>
                  <option value="gasCarrier">{{ $t("gasCarrier") }}</option>
                  <option value="tanker">{{ $t("tanker") }}</option>
                  <option value="container">{{ $t("container") }}</option>
                  <option value="generalCargo">{{ $t("generalCargo") }}</option>
                  <option value="refrigeratedCargo">
                    {{ $t("refrigeratedCargo") }}
                  </option>
                  <option value="combiCarrier">{{ $t("combiCarrier") }}</option>
                  <option value="lngCarrier">{{ $t("lngCarrier") }}</option>
                  <option value="roroCargoVehicle">
                    {{ $t("roroCargoVehicle") }}
                  </option>
                  <option value="roroCargo">{{ $t("roroCargo") }}</option>
                  <option value="roroPassenger">
                    {{ $t("roroPassenger") }}
                  </option>
                  <option value="cruisePassenger">
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
                  v-model="cargoUnit"
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
                    v-model="fuelOptions"
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
                    v-model="fuelOptions"
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
                    v-model="fuelOptions"
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
                    v-model="fuelOptions"
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
                    v-model="fuelOptions"
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
                    v-model="fuelOptions"
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
                    v-model="fuelOptions"
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
                    v-model="lubricateOptions"
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
                    v-model="lubricateOptions"
                    type="checkbox"
                    id="mgo"
                    name="mgo"
                    value="mgo"
                  />
                  <label class="ml-2 text-14 text-gray-700" for="mgo">
                    {{ $t("meSystemOil") }}
                  </label>
                </div>
                <div class="flex align-center">
                  <input
                    v-model="lubricateOptions"
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
                    v-model="lubricateOptions"
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
                class="w-full p-3 pl-4 border bg-white text-14 text-gray-500"
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
                    v-model="machineryOptions"
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
                    v-model="machineryOptions"
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
                    v-model="machineryOptions"
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
                    v-model="machineryOptions"
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
                <div class="flex align-center">
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
                class="w-full p-3 pl-4 border bg-white text-14 text-gray-500"
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
              v-on:click="printValues()"
            >
              <!-- TODO: need alternate function for saving changes to backend -->
              <template v-slot:content>{{ $t("saveChanges") }}</template>
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
import GradientButton from "./GradientButton.vue";
import CustomButton from "./CustomButton.vue";

// List to export options from checkboxes
const fuelOptions = ref([]);
const lubricateOptions = ref([]);
const machineryOptions = ref([]);
let lubricateOthersFlag = ref(true);
let machineryOthersFlag = ref(true);

const lubricateOthers = ref("");
const machineryOthers = ref("");

const vesselType = ref("");
const cargoUnit = ref("");

// Need to be passed into this modal from vessel view or somewhere
const vesselname = "Marina A";
const imo = "9876543";

const printValues = () => {
  // console.log(fuelOptions);
  // console.log(lubricateOptions);
  // console.log(machineryOptions);
  console.log(lubricateOthersFlag)
  console.log(machineryOthersFlag)
};

const addVoyage = (voyageData) => {
  const DUMMY_TOKEN = localStorage.getItem("jwt");
  const response = fetch("https://testapi.marinachain.io/marinanet/voyages/", {
    headers: {
      Authorization: "Bearer " + DUMMY_TOKEN,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(voyageData),
  });
  console.log(response);
};
</script>
