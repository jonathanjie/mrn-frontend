<template>
    <div class="grid bg-white rounded-lg p-5 gap-4 shadow-card">
        <div class="flex items-center">
            <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
            <span class="text-blue-700 text-16">
                <slot>{{ $t("weather") }}</slot>
            </span>
        </div>

        <div class="grid grid-cols-2">
            <div class="grid grid-cols-5 border mr-4">
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("weatherNotation") }}</div>
                <select v-model="data.weather" class="col-span-3 p-3 text-14 focus:border-0" :class="data.weather === 'default' ? 'text-gray-400' : 'text-gray-700'">
                    <option selected disabled value="default">{{ $t("select") }}</option>
                    <option value="B">{{ $t("sky_b") }}</option>
                    <option value="BC">{{ $t("sky_bc") }}</option>
                    <option value="C">{{ $t("sky_c") }}</option>
                    <option value="D">{{ $t("sky_d") }}</option>
                    <option value="F">{{ $t("sky_f") }}</option>
                    <option value="G">{{ $t("sky_g") }}</option>
                    <option value="H">{{ $t("sky_h") }}</option>
                    <option value="L">{{ $t("sky_l") }}</option>
                    <option value="M">{{ $t("sky_m") }}</option>
                    <option value="O">{{ $t("sky_o") }}</option>
                    <option value="P">{{ $t("sky_p") }}</option>
                    <option value="Q">{{ $t("sky_q") }}</option>
                    <option value="R">{{ $t("sky_r") }}</option>
                    <option value="S">{{ $t("sky_s") }}</option>
                    <option value="T">{{ $t("sky_t") }}</option>
                    <option value="U">{{ $t("sky_u") }}</option>
                    <option value="V">{{ $t("sky_v") }}</option>
                    <option value="W">{{ $t("sky_w") }}</option>
                    <option value="Z">{{ $t("sky_z") }}</option>
                </select>
            </div>
            <div class="grid grid-cols-5 border">
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("visibility") }}</div>
                <select v-model="data.sea_state" class="col-span-3 p-3 text-14 focus:border-0" :class="data.sea_state === 'default' ? 'text-gray-400' : 'text-gray-700'">
                    <option selected disabled value="default">{{ $t("select") }}</option>
                    <option value="1">{{ $t("visibility_1") }}</option>
                    <option value="2">{{ $t("visibility_2") }}</option>
                    <option value="3">{{ $t("visibility_3") }}</option>
                    <option value="4">{{ $t("visibility_4") }}</option>
                    <option value="5">{{ $t("visibility_5") }}</option>
                    <option value="6">{{ $t("visibility_6") }}</option>
                    <option value="7">{{ $t("visibility_7") }}</option>
                    <option value="8">{{ $t("visibility_8") }}</option>
                    <option value="9">{{ $t("visibility_9") }}</option>
                    <option value="10">{{ $t("visibility_10") }}</option>
                </select>
            </div>
        </div>
        
        <div class="grid grid-cols-10 border">
            <div class="col-span-10 xl:col-span-2 text-blue-700 p-3 border-b xl:border-b-0 xl:border-r bg-gray-50 text-14">{{ $t("wind") }}</div>
            <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-b xl:border-b-0 border-r bg-gray-50 text-14">{{ $t("direction") }}</div>
            <select v-model="data.wind_direction" class="col-span-6 xl:col-span-3 p-3 pl-4 border-b xl:border-b-0 xl:border-r bg-white text-14 text-gray-700 focus:outline-0" :class="data.wind_direction === 'default' ? 'text-gray-400' : 'text-gray-700'">
                <option selected disabled value="default">{{ $t("dir_16_placeholder") }}</option>
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
            <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("force") }}</div>
            <div class="col-span-3 flex xl:col-span-2 p-2 pl-4 border-r bg-white">
                <input v-model="data.wind_speed" @keypress="preventNaN($event, data.wind_speed)" placeholder="00.0" class="text-14 w-24 text-gray-700 focus:outline-0"/>
                <MiniUnitDisplay>KNOT</MiniUnitDisplay>
            </div>
            <input v-model="data.wind_speed_2" @keypress="preventNaN($event, data.wind_speed_2)" placeholder="00.0" class="col-span-2 xl:col-span-1 text-14 w-24 text-gray-700 focus:outline-0 p-2 pl-4"/>
        </div>

        <div class="grid grid-cols-10 border">
            <div class="col-span-10 xl:col-span-2 text-blue-700 p-3 border-b xl:border-b-0 xl:border-r bg-gray-50 text-14">{{ $t("wave") }}</div>
            <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r border-b xl:border-b-0 bg-gray-50 text-14">{{ $t("direction") }}</div>
            <select v-model="data.wave_direction" class="col-span-6 xl:col-span-3 p-3 pl-4 border-b xl:border-b-0 xl:border-r bg-white text-14 text-gray-700 focus:outline-0" :class="data.wave_direction === 'default' ? 'text-gray-400' : 'text-gray-700'">                
                <option selected disabled value="default">{{ $t("dir_8_placeholder") }}</option>
                <option value="N">{{ $t("dir_8_N") }}</option>
                <option value="NE">{{ $t("dir_8_NE") }}</option>
                <option value="E">{{ $t("dir_8_E") }}</option>
                <option value="SE">{{ $t("dir_8_SE") }}</option>
                <option value="S">{{ $t("dir_8_S") }}</option>
                <option value="SW">{{ $t("dir_8_SW") }}</option>
                <option value="W">{{ $t("dir_8_W") }}</option>
                <option value="NW">{{ $t("dir_8_NW") }}</option>
            </select>
            <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("force") }}</div>
            <select v-model="data.wave_force" class="col-span-6 xl:col-span-3 p-3 text-14 focus:border-0" :class="data.wave_force === 'default' ? 'text-gray-400' : 'text-gray-700'">
                <option selected disabled value="default">{{ $t("douglasScale") }}</option>
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

        <div class="grid grid-cols-10 border">
            <div class="col-span-10 xl:col-span-2 text-blue-700 p-3 border-b xl:border-b-0 xl:border-r bg-gray-50 text-14">{{ $t("swell") }}</div>
            <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-b xl:border-b-0 border-r bg-gray-50 text-14">{{ $t("direction") }}</div>
            <select v-model="data.swell_direction" class="col-span-6 xl:col-span-3 p-3 pl-4 border-b xl:border-b-0 xl:border-r bg-white text-14 text-gray-700 focus:outline-0" :class="data.swell_direction === 'default' ? 'text-gray-400' : 'text-gray-700'">                
                <option selected disabled value="default">{{ $t("dir_8_placeholder") }}</option>
                <option value="N">{{ $t("dir_8_N") }}</option>
                <option value="NE">{{ $t("dir_8_NE") }}</option>
                <option value="E">{{ $t("dir_8_E") }}</option>
                <option value="SE">{{ $t("dir_8_SE") }}</option>
                <option value="S">{{ $t("dir_8_S") }}</option>
                <option value="SW">{{ $t("dir_8_SW") }}</option>
                <option value="W">{{ $t("dir_8_W") }}</option>
                <option value="NW">{{ $t("dir_8_NW") }}</option>
            </select>
            <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("scale") }}</div>
            <select v-model="data.swell_scale" class="col-span-6 xl:col-span-3 p-3 text-14 focus:border-0" :class="data.swell_scale === 'default' ? 'text-gray-400' : 'text-gray-700'">
                <option selected disabled value="default">{{ $t("select") }}</option>
                <option value="0">{{ $t("swell_0") }}</option>
                <option value="1">{{ $t("swell_1") }}</option>
                <option value="2">{{ $t("swell_2") }}</option>
                <option value="3">{{ $t("swell_3") }}</option>
                <option value="4">{{ $t("swell_4") }}</option>
                <option value="5">{{ $t("swell_5") }}</option>
                <option value="6">{{ $t("swell_6") }}</option>
                <option value="7">{{ $t("swell_7") }}</option>
                <option value="8">{{ $t("swell_8") }}</option>
                <option value="9">{{ $t("swell_9") }}</option>
            </select>
        </div>

        <div class="grid grid-cols-10 border">
            <div class="col-span-10 xl:col-span-2 text-blue-700 p-3 border-b xl:border-b-0 xl:border-r bg-gray-50 text-14">{{ $t("airTemperature") }}</div>
            <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-b xl:border-b-0 border-r bg-gray-50 text-14">{{ $t("dry") }}</div>
            <div class="col-span-6 flex xl:col-span-3 xl:border-r border-b xl:border-b-0 p-2 pl-4 bg-white">
                <input v-model="data.dry_temp" @keypress="preventNaN($event, data.dry_temp)" placeholder="00.0" class="text-14 w-24 text-gray-700 focus:outline-0"/>
                <MiniUnitDisplay>°C</MiniUnitDisplay>
            </div>
            <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("wet") }}</div>
            <div class="col-span-6 flex xl:col-span-3 p-2 pl-4 bg-white">
                <input v-model="data.wet_temp" @keypress="preventNaN($event, data.wet_temp)" placeholder="00.0" class="text-14 w-24 text-gray-700 focus:outline-0"/>
                <MiniUnitDisplay>°C</MiniUnitDisplay>
            </div>
        </div>

        <div class="grid grid-cols-10">
            <div class="col-span-4 xl:col-span-2 text-blue-700 p-3 border bg-gray-50 text-14">{{ $t("barometer") }}</div>
            <div class="col-span-6 xl:col-span-4 flex border-y border-r p-2 pl-4 bg-white">
                <input v-model="data.barometer" @keypress="preventNaN($event, data.barometer)" placeholder="00.0" class="text-14 w-24 text-gray-700 focus:outline-0"/>
                <MiniUnitDisplay>mbar</MiniUnitDisplay>
            </div>
        </div>

        <div class="grid grid-cols-10">
            <div class="col-span-4 xl:col-span-2 text-blue-700 p-3 border bg-gray-50 text-14">{{ $t("seaWaterTemperature") }}</div>
            <div class="col-span-6 xl:col-span-4 flex border-y border-r p-2 pl-4 bg-white">
                <input v-model="data.sw_temp" @keypress="preventNaN($event, data.sw_temp)" placeholder="00.0" class="text-14 w-24 text-gray-700 focus:outline-0"/>
                <MiniUnitDisplay>°C</MiniUnitDisplay>
            </div>
        </div>

        <div class="grid grid-cols-10">
            <div class="col-span-4 xl:col-span-2 text-blue-700 p-3 border bg-gray-50 text-14">{{ $t("glacierIceCondition") }}</div>
            <select v-model="data.ice_condition" class="col-span-6 xl:col-span-4 p-3 border-y border-r text-14 focus:border-0" :class="data.ice_condition === 'default' ? 'text-gray-400' : 'text-gray-700'">
                <option selected disabled value="default">{{ $t("select") }}</option>
                <option value="0">{{ $t("na") }}</option>
                <option value="1">{{ $t("glacier_low") }}</option>
                <option value="2">{{ $t("glacier_mod") }}</option>
                <option value="3">{{ $t("glacier_high") }}</option>
                <option value="4">{{ $t("glacier_ext") }}</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { preventNaN } from '@/utils/helpers';
import MiniUnitDisplay from '../MiniUnitDisplay.vue'

const data = reactive({
    "weather": "default",
    "sea_state": "default",
    "wind_direction": 'default',
    "wind_speed": '',
    "wind_speed_2": '',
    "wave_direction": 'default',
    "wave_force": 'default',
    "swell_direction": 'default',
    "swell_height": '',
    "swell_scale": 'default',
    "dry_temp": '',
    "wet_temp": '',
    "barometer": '',
    "sw_temp": '',
    "ice_condition": "default"
});
</script>
