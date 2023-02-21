<script setup>
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { storeToRefs } from "pinia";
import { useCIISetupStore } from "@/stores/useCIISetupStore";

const store = useCIISetupStore();
const {
  shipIndexType,
  shipIndexVal,
  isEngineLimited,
  engineLimitType,
  engineLimitPercent,
  reportTypes,
  ciiTrials,
  applicableCII,
  IMODCSMethod,
  EUMRVMethod,
  fuelOilTypes,
  otherOilName,
  conversionFactor,
  targetCIIGrade,
} = storeToRefs(store);
</script>

<template>
  <!-- EEDI / EEXI -->
  <div class="grid grid-cols-2">
    <div class="flex flex-col space-y-3">
      <!-- Type selection -->
      <div class="flex space-x-4">
        <div class="flex space-x-2">
          <input type="radio" id="eedi" value="eedi" v-model="shipIndexType" />
          <label for="eedi" class="mr-4">EEDI</label>
        </div>
        <div class="flex space-x-2">
          <input type="radio" id="eexi" value="eexi" v-model="shipIndexType" />
          <label for="eexi">EEXI</label>
        </div>
      </div>
      <!-- Value input -->
      <div class="flex border rounded-lg py-2 px-3 text-gray-900">
        <input
          v-model="shipIndexVal"
          class="w-24 focus:outline-0"
          placeholder="0"
        />
        <MiniUnitDisplay>g CO₂/ton.NM</MiniUnitDisplay>
      </div>
    </div>
  </div>
  <!-- Engine power limit -->
  <div class="grid grid-cols-2">
    <div class="flex flex-col space-y-3">
      <!-- TODO: switch to toggle -->
      <div class="flex space-x-2">
        <input
          type="checkbox"
          id="enginePowerLimited"
          v-model="isEngineLimited"
        />
        <label for="enginePowerLimited">Is engine power limited?</label>
      </div>
      <!-- Type selection -->
      <div v-if="isEngineLimited" class="flex space-x-4">
        <div class="flex space-x-2">
          <input type="radio" id="epl" value="epl" v-model="engineLimitType" />
          <label for="epl" class="mr-4">EPL</label>
        </div>
        <div class="flex space-x-2">
          <input
            type="radio"
            id="shapoli"
            value="shapoli"
            v-model="engineLimitType"
          />
          <label for="shapoli">Shapoli</label>
        </div>
      </div>
      <!-- Value input -->
      <div
        v-if="isEngineLimited"
        class="flex border rounded-lg py-2 px-3 text-gray-900"
      >
        <input
          v-model="engineLimitPercent"
          class="w-24 focus:outline-0"
          placeholder="0"
        />
        <MiniUnitDisplay>MCR of Main Engine</MiniUnitDisplay>
      </div>
    </div>
  </div>
  <!-- Report Type / Applicable CII -->
  <div class="grid grid-cols-2 gap-3">
    <div class="flex flex-col space-y-3">
      <span>Report Type:</span>
      <!-- Report Type selection -->
      <div class="flex space-x-4">
        <div
          class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
          :class="
            reportTypes.includes('imodcs')
              ? 'border border-gradientblue bg-paleblue'
              : ''
          "
        >
          <input
            type="checkbox"
            id="imodcs"
            value="imodcs"
            v-model="reportTypes"
            disabled
          />
          <label for="imodcs" class="mr-4">IMO DCS</label>
        </div>
        <div
          class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
          :class="
            reportTypes.includes('eumrv')
              ? 'border border-gradientblue bg-paleblue'
              : ''
          "
        >
          <input
            type="checkbox"
            id="eumrv"
            value="eumrv"
            v-model="reportTypes"
          />
          <label for="eumrv">EU MRV</label>
        </div>
      </div>
    </div>
    <div class="flex flex-col space-y-3">
      <span>Applicable CII:</span>
      <!-- Applicable CII selection -->
      <div class="flex space-x-4">
        <div
          class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
          :class="
            applicableCII === 'aer'
              ? 'border border-gradientblue bg-paleblue'
              : ''
          "
        >
          <input type="radio" id="aer" value="aer" v-model="applicableCII" />
          <label for="aer" class="mr-4">AER</label>
        </div>
        <div
          class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
          :class="
            applicableCII === 'cgdist'
              ? 'border border-gradientblue bg-paleblue'
              : ''
          "
        >
          <input
            type="radio"
            id="cgdist"
            value="cgdist"
            v-model="applicableCII"
          />
          <label for="cgdist">cgDIST</label>
        </div>
      </div>
    </div>
  </div>
  <!--CII for trial purposes -->
  <div class="flex flex-col space-y-3">
    <div>
      <span>CII for trial purposes </span>
      <span class="text-gray-500">(Optional):</span>
    </div>
    <!-- Report Type selection -->
    <div class="flex space-x-4">
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          ciiTrials.includes('eepi')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="eepi" value="eepi" v-model="ciiTrials" />
        <label for="eepi" class="mr-4">EEPI</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          ciiTrials.includes('cbdist')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="cbdist" value="cbdist" v-model="ciiTrials" />
        <label for="cbdist">cbDIST</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          ciiTrials.includes('cidist')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="cidist" value="cidist" v-model="ciiTrials" />
        <label for="cidist">cIDIST</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          ciiTrials.includes('eeoi')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="eeoi" value="eeoi" v-model="ciiTrials" />
        <label for="eeoi">EEOI</label>
      </div>
    </div>
  </div>
  <div class="flex flex-col space-y-3">
    <span>IMO DCS</span>
    <!-- IMO DCS method  selection -->
    <div class="flex space-x-4">
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          IMODCSMethod === '1' ? 'border border-gradientblue bg-paleblue' : ''
        "
      >
        <input type="radio" id="1" value="1" v-model="IMODCSMethod" />
        <div class="flex flex-col">
          <label for="1" class="mr-4">Method 1</label>
          <span class="text-gray-500 text-12">Bunker delivery notes (BDN)</span>
        </div>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          IMODCSMethod === '2' ? 'border border-gradientblue bg-paleblue' : ''
        "
      >
        <input type="radio" id="2" value="2" v-model="IMODCSMethod" />
        <div class="flex flex-col">
          <label for="2" class="mr-4">Method 2</label>
          <span class="text-gray-500 text-12">Flow meters</span>
        </div>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          IMODCSMethod === '3' ? 'border border-gradientblue bg-paleblue' : ''
        "
      >
        <input type="radio" id="3" value="3" v-model="IMODCSMethod" />
        <div class="flex flex-col">
          <label for="3" class="mr-4">Method 3</label>
          <span class="text-gray-500 text-12"
            >Bunker fuel tank monitoring on board</span
          >
        </div>
      </div>
      <div class="px-3 py-2 flex-1"></div>
    </div>
  </div>
  <div v-if="reportTypes.includes('eumrv')" class="flex flex-col space-y-3">
    <span>EU MRV</span>
    <!-- EU MRV method selection -->
    <div class="flex space-x-4">
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          EUMRVMethod === 'a' ? 'border border-gradientblue bg-paleblue' : ''
        "
      >
        <input type="radio" id="a" value="a" v-model="EUMRVMethod" />
        <div class="flex flex-col">
          <label for="a" class="mr-4">Method A</label>
          <span class="text-gray-500 text-12"
            >BDN and periodic stocktakes of fuel tanks</span
          >
        </div>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          EUMRVMethod === 'b' ? 'border border-gradientblue bg-paleblue' : ''
        "
      >
        <input type="radio" id="b" value="b" v-model="EUMRVMethod" />
        <div class="flex flex-col">
          <label for="b" class="mr-4">Method B</label>
          <span class="text-gray-500 text-12"
            >Bunker fuel tank monitoring on board</span
          >
        </div>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          EUMRVMethod === 'c' ? 'border border-gradientblue bg-paleblue' : ''
        "
      >
        <input type="radio" id="c" value="c" v-model="EUMRVMethod" />
        <div class="flex flex-col">
          <label for="c" class="mr-4">Method C</label>
          <span class="text-gray-500 text-12"
            >Flow meters for applicable combustion processes</span
          >
        </div>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          EUMRVMethod === 'd' ? 'border border-gradientblue bg-paleblue' : ''
        "
      >
        <input type="radio" id="d" value="d" v-model="EUMRVMethod" />
        <div class="flex flex-col">
          <label for="d" class="mr-4">Method D</label>
          <span class="text-gray-500 text-12"
            >Direct CO2 emission measurements</span
          >
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col space-y-3">
    <span>Fuel oil type</span>
    <!-- Fuel oil type selection -->
    <div class="grid grid-cols-4 gap-4">
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
        :class="
          fuelOilTypes.includes('mdomgo')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input
          type="checkbox"
          id="mdomgo"
          value="mdomgo"
          v-model="fuelOilTypes"
        />
        <label for="mdomgo" class="mr-4">MDO / MGO</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
        :class="
          fuelOilTypes.includes('lsfo')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="lsfo" value="lsfo" v-model="fuelOilTypes" />
        <label for="lsfo">LSFO</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
        :class="
          fuelOilTypes.includes('hfo')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="hfo" value="hfo" v-model="fuelOilTypes" />
        <label for="hfo">HFO</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
        :class="
          fuelOilTypes.includes('lpgpropane')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input
          type="checkbox"
          id="lpgpropane"
          value="lpgpropane"
          v-model="fuelOilTypes"
        />
        <label for="lpgpropane">LPG-Propane</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
        :class="
          fuelOilTypes.includes('lpgbutane')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input
          type="checkbox"
          id="lpgbutane"
          value="lpgbutane"
          v-model="fuelOilTypes"
        />
        <label for="lpgbutane">LPG-Butane</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
        :class="
          fuelOilTypes.includes('lng')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="lng" value="lng" v-model="fuelOilTypes" />
        <label for="lng">LNG</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
        :class="
          fuelOilTypes.includes('methanol')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input
          type="checkbox"
          id="methanol"
          value="methanol"
          v-model="fuelOilTypes"
        />
        <label for="methanol">Methanol</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
        :class="
          fuelOilTypes.includes('ethanol')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input
          type="checkbox"
          id="ethanol"
          value="ethanol"
          v-model="fuelOilTypes"
        />
        <label for="ethanol">Ethanol</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
        :class="
          fuelOilTypes.includes('others')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input
          type="checkbox"
          id="others"
          value="others"
          v-model="fuelOilTypes"
        />
        <label for="others">Others</label>
      </div>
    </div>
    <!-- Others additional information -->
    <div v-if="fuelOilTypes.includes('others')" class="flex space-x-4">
      <div class="flex flex-col">
        <span>Name of the oil</span>
        <input
          v-model="otherOilName"
          placeholder="Input oil type"
          class="flex border rounded-lg py-2 px-3 text-gray-900"
        />
      </div>
      <div class="flex flex-col">
        <span>Conversion factor</span>
        <input
          v-model="conversionFactor"
          placeholder="Input conversion factor"
          class="flex border rounded-lg py-2 px-3 text-gray-900"
        />
      </div>
    </div>
  </div>
  <div class="grid grid-cols-2">
    <div class="flex flex-col space-y-3">
      <!-- Target CII grade selection -->
      <span>2023 Target CII Grade</span>
      <!-- Value input -->
      <div class="flex border rounded-lg py-2 px-3 text-gray-900">
        <select
          v-model="targetCIIGrade"
          class="w-full flex focus:outline-0"
          :class="targetCIIGrade === 'default' ? 'text-gray-500' : ''"
        >
          <option selected disabled value="default">Select grade</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
      </div>
    </div>
  </div>
</template>
