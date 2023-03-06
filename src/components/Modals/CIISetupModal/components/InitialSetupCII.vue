<script setup>
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { storeToRefs } from "pinia";
import { useCIISetupStore } from "@/stores/useCIISetupStore";

const store = useCIISetupStore();
const {
  shipIndexVal,
  isEngineLimited,
  engineLimitPercent,
  reportTypes,
  trialCII,
  // shipIndexType,
  // shipIndexVal,
  // isEngineLimited,
  // engineLimitType,
  // engineLimitPercent,
  // ciiTrials,
  applicableCII,
  IMODCSMethod,
  EUMRVMethod,
  fuelOilTypes,
  otherOilName,
  conversionFactor,
  currentYearTargetCIIGrade,
} = storeToRefs(store);
</script>

<template>
  <!-- EEDI / EEXI -->
  <div class="grid grid-cols-2">
    <div class="flex flex-col space-y-3">
      <!-- Type selection -->
      <div class="flex space-x-4">
        <div class="flex space-x-2">
          <input
            type="radio"
            id="EEDI"
            value="EEDI"
            v-model="energyEfficiencyIndexType"
          />
          <label for="EEDI" class="mr-4">EEDI</label>
        </div>
        <div class="flex space-x-2">
          <input
            type="radio"
            id="EEXI"
            value="EEXI"
            v-model="energyEfficiencyIndexType"
          />
          <label for="EEXI">EEXI</label>
        </div>
      </div>
      <!-- Value input -->
      <div class="flex border rounded-lg py-2 px-3 text-gray-900">
        <input
          v-model="energyEfficiencyIndexVal"
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
          v-model="isEnginePowerLimited"
        />
        <label for="enginePowerLimited">Is engine power limited?</label>
      </div>
      <!-- Type selection -->
      <div v-if="isEnginePowerLimited" class="flex space-x-4">
        <div class="flex space-x-2">
          <input
            type="radio"
            id="EPL"
            value="EPL"
            v-model="enginePowerLimitType"
          />
          <label for="EPL" class="mr-4">EPL</label>
        </div>
        <div class="flex space-x-2">
          <input
            type="radio"
            id="SPL"
            value="SPL"
            v-model="enginePowerLimitType"
          />
          <label for="SPL">Shapoli</label>
        </div>
      </div>
      <!-- Value input -->
      <div
        v-if="isEnginePowerLimited"
        class="flex border rounded-lg py-2 px-3 text-gray-900"
      >
        <input
          v-model="enginePowerLimitVal"
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
  </div>

  <div class="flex flex-col space-y-3">
    <span>IMO DCS</span>
    <!-- IMO DCS method  selection -->
    <div class="flex space-x-4">
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          IMODCSMethod === 'DCS1'
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="radio" id="DCS1" value="DCS1" v-model="IMODCSMethod" />
        <div class="flex flex-col">
          <label for="DCS1" class="mr-4">Method 1</label>
          <span class="text-gray-500 text-12">Bunker delivery notes (BDN)</span>
        </div>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          IMODCSMethod === 'DCS2'
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="radio" id="DCS2" value="DCS2" v-model="IMODCSMethod" />
        <div class="flex flex-col">
          <label for="DCS2" class="mr-4">Method 2</label>
          <span class="text-gray-500 text-12">Flow meters</span>
        </div>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          IMODCSMethod === 'DCS3'
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="radio" id="DCS3" value="DCS3" v-model="IMODCSMethod" />
        <div class="flex flex-col">
          <label for="DCS3" class="mr-4">Method 3</label>
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
          EUMRVMethod === 'MRVA' ? 'border border-gradientblue bg-paleblue' : ''
        "
      >
        <input type="radio" id="MRVA" value="MRVA" v-model="EUMRVMethod" />
        <div class="flex flex-col">
          <label for="MRVA" class="mr-4">Method A</label>
          <span class="text-gray-500 text-12"
            >BDN and periodic stocktakes of fuel tanks</span
          >
        </div>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          EUMRVMethod === 'MRVB' ? 'border border-gradientblue bg-paleblue' : ''
        "
      >
        <input type="radio" id="MRVB" value="MRVB" v-model="EUMRVMethod" />
        <div class="flex flex-col">
          <label for="MRVB" class="mr-4">Method B</label>
          <span class="text-gray-500 text-12"
            >Bunker fuel tank monitoring on board</span
          >
        </div>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          EUMRVMethod === 'MRVC' ? 'border border-gradientblue bg-paleblue' : ''
        "
      >
        <input type="radio" id="MRVC" value="MRVC" v-model="EUMRVMethod" />
        <div class="flex flex-col">
          <label for="MRVC" class="mr-4">Method C</label>
          <span class="text-gray-500 text-12"
            >Flow meters for applicable combustion processes</span
          >
        </div>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          EUMRVMethod === 'MRVD' ? 'border border-gradientblue bg-paleblue' : ''
        "
      >
        <input type="radio" id="MRVD" value="MRVD" v-model="EUMRVMethod" />
        <div class="flex flex-col">
          <label for="MRVD" class="mr-4">Method D</label>
          <span class="text-gray-500 text-12"
            >Direct CO2 emission measurements</span
          >
        </div>
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
          applicableCII === 'AER'
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="radio" id="AER" value="AER" v-model="applicableCII" />
        <label for="AER" class="mr-4">AER</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          applicableCII === 'CGDIST'
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input
          type="radio"
          id="CGDIST"
          value="CGDIST"
          v-model="applicableCII"
        />
        <label for="CGDIST">cgDIST</label>
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
          trialCII.includes('EEPI')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="EEPI" value="EEPI" v-model="trialCII" />
        <label for="EEPI" class="mr-4">EEPI</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          trialCII.includes('CBDIST')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="CBDIST" value="CBDIST" v-model="trialCII" />
        <label for="CBDIST">cbDIST</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          trialCII.includes('CLDIST')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="CLDIST" value="CLDIST" v-model="trialCII" />
        <label for="CLDIST">clDIST</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
        :class="
          trialCII.includes('EEOI')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="EEOI" value="EEOI" v-model="trialCII" />
        <label for="EEOI">EEOI</label>
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
          fuelOilTypes.includes('MDGO')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="MDGO" value="MDGO" v-model="fuelOilTypes" />
        <label for="MDGO" class="mr-4">MDO / MGO</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
        :class="
          fuelOilTypes.includes('LSFO')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="LSFO" value="LSFO" v-model="fuelOilTypes" />
        <label for="LSFO">LSFO</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
        :class="
          fuelOilTypes.includes('HFO')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="HFO" value="HFO" v-model="fuelOilTypes" />
        <label for="HFO">HFO</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
        :class="
          fuelOilTypes.includes('LPGP')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="LPGP" value="LPGP" v-model="fuelOilTypes" />
        <label for="LPGP">LPG-Propane</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
        :class="
          fuelOilTypes.includes('LPGB')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="LPGB" value="LPGB" v-model="fuelOilTypes" />
        <label for="LPGB">LPG-Butane</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
        :class="
          fuelOilTypes.includes('LNG')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="LNG" value="LNG" v-model="fuelOilTypes" />
        <label for="LNG">LNG</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
        :class="
          fuelOilTypes.includes('METH')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="METH" value="METH" v-model="fuelOilTypes" />
        <label for="METH">Methanol</label>
      </div>
      <div
        class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
        :class="
          fuelOilTypes.includes('ETH')
            ? 'border border-gradientblue bg-paleblue'
            : ''
        "
      >
        <input type="checkbox" id="ETH" value="ETH" v-model="fuelOilTypes" />
        <label for="ETH">Ethanol</label>
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
          disabled
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
          v-model="currentYearTargetCIIGrade"
          class="w-full flex focus:outline-0"
          :class="
            currentYearTargetCIIGrade === 'default' ? 'text-gray-500' : ''
          "
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
