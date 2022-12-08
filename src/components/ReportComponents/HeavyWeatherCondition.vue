<template>
  <div class="grid lg:grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">{{
        $t("heavyWeatherCondition")
      }}</span>
    </div>
    <div class="grid col-span-2 lg:col-span-1 grid-cols-5 border text-14">
      <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50">
        {{ $t("totalHours") }}
      </div>
      <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
        <input
          v-model="hours"
          @keypress="preventNaN($event, hours)"
          placeholder="00.0"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>HRS</MiniUnitDisplay>
      </div>
      <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50">
        {{ $t("distanceOBS") }}
      </div>
      <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
        <input
          v-model="dist"
          @keypress="preventNaN($event, dist)"
          placeholder="00.0"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>NM</MiniUnitDisplay>
      </div>
      <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50">
        {{ $t("fuelConsumption") }}
      </div>
      <div class="flex col-span-3 p-2 pl-4 bg-white">
        <input
          v-model="consumption"
          @keypress="preventNaN($event, consumption)"
          placeholder="00.0"
          class="w-24 text-14 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>MT</MiniUnitDisplay>
      </div>
    </div>
    <div></div>

    <div class="col-span-1 grid grid-cols-5 border text-14">
      <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50">
        {{ $t("weatherNotation") }}
      </div>
      <select
        v-model="weather"
        class="col-span-3 p-3 focus:border-0"
        :class="weather === 'default' ? 'text-gray-400' : 'text-gray-700'"
      >
        <option selected disabled value="default">{{ $t("select") }}</option>
        <option value="B">{{ $t("weather_b") }}</option>
        <option value="BC">{{ $t("weather_bc") }}</option>
        <option value="C">{{ $t("weather_c") }}</option>
        <option value="D">{{ $t("weather_d") }}</option>
        <option value="F">{{ $t("weather_f") }}</option>
        <option value="G">{{ $t("weather_g") }}</option>
        <option value="H">{{ $t("weather_h") }}</option>
        <option value="L">{{ $t("weather_l") }}</option>
        <option value="M">{{ $t("weather_m") }}</option>
        <option value="O">{{ $t("weather_o") }}</option>
        <option value="P">{{ $t("weather_p") }}</option>
        <option value="Q">{{ $t("weather_q") }}</option>
        <option value="R">{{ $t("weather_r") }}</option>
        <option value="S">{{ $t("weather_s") }}</option>
        <option value="T">{{ $t("weather_t") }}</option>
        <option value="U">{{ $t("weather_u") }}</option>
        <option value="V">{{ $t("weather_v") }}</option>
        <option value="W">{{ $t("weather_w") }}</option>
        <option value="Z">{{ $t("weather_z") }}</option>
      </select>
    </div>
    <div></div>

    <div class="col-span-2 grid grid-cols-10 border text-14">
      <div
        class="col-span-10 xl:col-span-2 text-blue-700 p-3 border-b xl:border-b-0 xl:border-r bg-gray-50"
      >
        {{ $t("wind") }}
      </div>
      <div
        class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-b xl:border-b-0 border-r bg-gray-50"
      >
        {{ $t("direction") }}
      </div>
      <select
        v-model="wind_direction"
        class="col-span-6 xl:col-span-3 p-3 pl-4 border-b xl:border-b-0 xl:border-r bg-white text-gray-700 focus:outline-0"
        :class="
          wind_direction === 'default' ? 'text-gray-400' : 'text-gray-700'
        "
      >
        <option selected disabled value="default">
          {{ $t("dir_16_placeholder") }}
        </option>
        <option value="N">{{ $t("dir_16_N") }}</option>
        <option value="NNE">{{ $t("dir_16_NNE") }}</option>
        <option value="NE">{{ $t("dir_16_NE") }}</option>
        <option value="ENE">{{ $t("dir_16_ENE") }}</option>
        <option value="E">{{ $t("dir_16_E") }}</option>
        <option value="ESE">{{ $t("dir_16_ESE") }}</option>
        <option value="SE">{{ $t("dir_16_SE") }}</option>
        <option value="SSE">{{ $t("dir_16_SSE") }}</option>
        <option value="S">{{ $t("dir_16_S") }}</option>
        <option value="SSW">{{ $t("dir_16_SSW") }}</option>
        <option value="SW">{{ $t("dir_16_SW") }}</option>
        <option value="WSW">{{ $t("dir_16_WSW") }}</option>
        <option value="W">{{ $t("dir_16_W") }}</option>
        <option value="NWN">{{ $t("dir_16_NWN") }}</option>
        <option value="NW">{{ $t("dir_16_NW") }}</option>
        <option value="NNW">{{ $t("dir_16_NNW") }}</option>
      </select>
      <div
        class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r bg-gray-50"
      >
        {{ $t("force") }}
      </div>
      <div class="col-span-3 flex xl:col-span-2 p-2 pl-4 border-r bg-white">
        <input
          v-model="wind_speed"
          @keypress="preventNaN($event, wind_speed)"
          placeholder="00.0"
          class="text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>KNOT</MiniUnitDisplay>
      </div>
      <input
        v-model="wind_speed_2"
        @keypress="preventNaN($event, wind_speed_2)"
        placeholder="00.0"
        class="col-span-2 xl:col-span-1 text-gray-700 focus:outline-0 p-2 pl-4"
      />
    </div>

    <div class="col-span-2 grid grid-cols-10 border text-14">
      <div
        class="col-span-10 xl:col-span-2 text-blue-700 p-3 border-b xl:border-b-0 xl:border-r bg-gray-50 text-14"
      >
        {{ $t("wave") }}
      </div>
      <div
        class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r border-b xl:border-b-0 bg-gray-50 text-14"
      >
        {{ $t("direction") }}
      </div>
      <select
        v-model="sea_direction"
        class="col-span-6 xl:col-span-3 p-3 pl-4 border-b xl:border-b-0 xl:border-r bg-white text-14 text-gray-700 focus:outline-0"
        :class="sea_direction === 'default' ? 'text-gray-400' : 'text-gray-700'"
      >
        <option selected disabled value="default">
          {{ $t("dir_8_placeholder") }}
        </option>
        <option value="N">{{ $t("dir_8_N") }}</option>
        <option value="NE">{{ $t("dir_8_NE") }}</option>
        <option value="E">{{ $t("dir_8_E") }}</option>
        <option value="SE">{{ $t("dir_8_SE") }}</option>
        <option value="S">{{ $t("dir_8_S") }}</option>
        <option value="SW">{{ $t("dir_8_SW") }}</option>
        <option value="W">{{ $t("dir_8_W") }}</option>
        <option value="NW">{{ $t("dir_8_NW") }}</option>
      </select>
      <div
        class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r bg-gray-50"
      >
        {{ $t("force") }}
      </div>
      <select
        v-model="sea_state"
        class="col-span-6 xl:col-span-3 p-3 focus:border-0"
        :class="sea_state === 'default' ? 'text-gray-400' : 'text-gray-700'"
      >
        <option selected disabled value="default">
          {{ $t("douglasScale") }}
        </option>
        <option value="0">{{ $t("wave_force_0") }}</option>
        <option value="1">{{ $t("wave_force_1") }}</option>
        <option value="2">{{ $t("wave_force_2") }}</option>
        <option value="3">{{ $t("wave_force_3") }}</option>
        <option value="4">{{ $t("wave_force_4") }}</option>
        <option value="5">{{ $t("wave_force_5") }}</option>
        <option value="6">{{ $t("wave_force_6") }}</option>
        <option value="7">{{ $t("wave_force_7") }}</option>
        <option value="8">{{ $t("wave_force_8") }}</option>
        <option value="9">{{ $t("wave_force_9") }}</option>
      </select>
    </div>

    <div class="col-span-2 row-span-2 grid grid-cols-10 text-14 border">
      <div class="col-span-2 row-span-2 text-blue-700 p-3 border-r bg-gray-50">
        {{ $t("remarks") }}
      </div>
      <textarea
        v-model.trim="remarks"
        placeholder="Input description here"
        class="col-span-8 row-span-2 p-3 pl-4 bg-white text-gray-700 focus:outline-0"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { preventNaN } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { useNoonReportStore } from "@/store/useNoonReportStore";
import { storeToRefs } from "pinia";

const store = useNoonReportStore();
const {
  heavyWeatherHours: hours,
  heavyWeatherDist: dist,
  heavyWeatherConsumption: consumption,
  heavyWeatherNotation: weather,
  heavyWindDirection: wind_direction,
  heavyWindSpeed: wind_speed,
  heavySeaDirection: sea_direction,
  heavySeaState: sea_state,
  heavyRemarks: remarks,
} = storeToRefs(store);

// const data = reactive({
//   hours: "", // HWC: total hours
//   dist: "", // HWC: distance (OBS)
//   consumption: "", // HWC: fuel consumption
//   wind_direction: "", // HWC: wind direction
//   wind_speed: "0", // HWC: wind force; missing from BE
//   max_wave_ht: "", // HWC: max wave height
//   wave_force: "default", // missing from BE
// });
</script>
