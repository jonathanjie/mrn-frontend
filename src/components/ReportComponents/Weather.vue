<template>
    <div class="grid bg-white rounded-lg p-5 gap-4">
        <div class="flex items-center">
            <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
            <span class="text-blue-700 text-16">
                <slot>{{ $t("weather") }}</slot>
            </span>
        </div>
        <div class="grid grid-cols-2">
            <div class="grid grid-cols-5 border mr-4">
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("sky") }}</div>
                <select v-model="weather_data.weather" class="col-span-3 p-3 text-14 focus:border-0" :class="weather_data.weather === 'default' ? 'text-gray-400' : 'text-gray-700'">
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
                <select v-model="weather_data.sea_state" class="col-span-3 p-3 text-14 focus:border-0" :class="weather_data.sea_state === 'default' ? 'text-gray-400' : 'text-gray-700'">
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
            <input v-model="weather_data.wind_direction" @keypress="preventNaN($event, weather_data.wind_direction)" placeholder="000 (Degrees)" class="col-span-6 xl:col-span-2 p-3 pl-4 border-b xl:border-b-0 xl:border-r bg-white text-14 text-gray-700 focus:outline-0"/>
            <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-b xl:border-b-0 border-r bg-gray-50 text-14">{{ $t("force") }}</div>
            <select v-model="weather_data.beaufort" class="col-span-6 xl:col-span-1 p-3 border-b xl:border-b-0 xl:border-r text-14 focus:border-0" :class="weather_data.beaufort === 'default' ? 'text-gray-400' : 'text-gray-700'">
                <option selected disabled value="default">{{ $t("select") }}</option>
                <option value="0">{{ $t("wind_force_0") }}</option>
                <option value="1">{{ $t("wind_force_1") }}</option>
                <option value="2">{{ $t("wind_force_2") }}</option>
                <option value="3">{{ $t("wind_force_3") }}</option>
                <option value="4">{{ $t("wind_force_4") }}</option>
                <option value="5">{{ $t("wind_force_5") }}</option>
                <option value="6">{{ $t("wind_force_6") }}</option>
                <option value="7">{{ $t("wind_force_7") }}</option>
                <option value="8">{{ $t("wind_force_8") }}</option>
                <option value="9">{{ $t("wind_force_9") }}</option>
                <option value="10">{{ $t("wind_force_10") }}</option>
                <option value="11">{{ $t("wind_force_11") }}</option>
                <option value="12">{{ $t("wind_force_12") }}</option>
            </select>
            <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("maxSpeed") }}</div>
            <div class="col-span-6 flex xl:col-span-2 p-2 pl-4 bg-white">
                <input v-model="weather_data.wind_speed" @keypress="preventNaN($event, weather_data.wind_speed)" placeholder="00.0" class="text-14 w-24 text-gray-700 focus:outline-0"/>
                <!-- value here (e.g. Ballast) is dynamic; fetch from departure report -->
                <MiniUnitDisplay>M/S</MiniUnitDisplay>
            </div>
        </div>

        <div class="grid grid-cols-10 border">
            <div class="col-span-10 xl:col-span-2 text-blue-700 p-3 border-b xl:border-b-0 xl:border-r bg-gray-50 text-14">{{ $t("wave") }}</div>
            <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r border-b xl:border-b-0 bg-gray-50 text-14">{{ $t("direction") }}</div>
            <input v-model="weather_data.wave_direction" @keypress="preventNaN($event, weather_data.wave_direction)" placeholder="000 (Degrees)" class="col-span-6 xl:col-span-2 p-3 pl-4 border-b xl:border-b-0 xl:border-r bg-white text-14 text-gray-700 focus:outline-0"/>
            <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r border-b xl:border-b-0 bg-gray-50 text-14">{{ $t("force") }}</div>
            <select v-model="weather_data.wave_force" class="col-span-6 xl:col-span-1 p-3 border-b xl:border-b-0 xl:border-r text-14 focus:border-0" :class="weather_data.wave_force === 'default' ? 'text-gray-400' : 'text-gray-700'">
                <option selected disabled value="default">{{ $t("select") }}</option>
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
            <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("maxHeight") }}</div>
            <div class="flex col-span-6 xl:col-span-2 p-2 pl-4 bg-white">
                <input v-model="weather_data.wave_height" @keypress="preventNaN($event, weather_data.wave_height)"  placeholder="00.0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                <MiniUnitDisplay>M</MiniUnitDisplay>
            </div>
        </div>
        <div class="grid grid-cols-10 border">
            <div class="col-span-10 xl:col-span-2 text-blue-700 p-3 border-b xl:border-b-0 xl:border-r bg-gray-50 text-14">{{ $t("swell") }}</div>
            <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-b xl:border-b-0 border-r bg-gray-50 text-14">{{ $t("direction") }}</div>
            <input v-model="weather_data.swell_direction" @keypress="preventNaN($event, weather_data.swell_direction)" placeholder="000 (Degrees)" class="col-span-6 xl:col-span-2 p-3 pl-4 border-b xl:border-b-0 xl:border-r bg-white text-14 text-gray-700 focus:outline-0"/>
            <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-b xl:border-b-0 border-r bg-gray-50 text-14">{{ $t("scale") }}</div>
            <select v-model="weather_data.swell_scale" class="col-span-6 xl:col-span-1 p-3 border-b xl:border-b-0 xl:border-r text-14 focus:border-0" :class="weather_data.swell_scale === 'default' ? 'text-gray-400' : 'text-gray-700'">
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
            <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("maxHeight") }}</div>
            <div class="col-span-6 flex xl:col-span-2 p-2 pl-4 bg-white">
                <input v-model="weather_data.swell_height" @keypress="preventNaN($event, weather_data.swell_height)" placeholder="00.0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                <MiniUnitDisplay>M</MiniUnitDisplay>
            </div>
        </div>

        <div class="xl:grid xl:grid-cols-2">
            <div class="grid grid-cols-5 border">
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("glacierIceCondition") }}</div>
                <select v-model="weather_data.ice_condition" class="col-span-3 p-3 text-14 focus:border-0" :class="weather_data.ice_condition === 'default' ? 'text-gray-400' : 'text-gray-700'">
                    <option selected disabled value="default">{{ $t("select") }}</option>
                    <option value="0">{{ $t("na") }}</option>
                    <option value="1">{{ $t("glacier_low") }}</option>
                    <option value="2">{{ $t("glacier_mod") }}</option>
                    <option value="3">{{ $t("glacier_high") }}</option>
                    <option value="4">{{ $t("glacier_ext") }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { preventNaN } from '@/utils/helpers';
import MiniUnitDisplay from '../MiniUnitDisplay.vue'

const weather_data = reactive({
    "weather": "default", // Weather: sky
    "sea_state": "default", // Weather: visibility
    "wind_direction": '', // Weather: wind dir 
    "wind_speed": '', // Weather: wind max speed
    "beaufort": "default", // Weather: wind force
    "wave_direction": '',
    "wave_height": '',
    "wave_force": 'default',
    "swell_direction": '',
    "swell_height": '',
    "swell_scale": 'default',
    "ice_condition": "default" // Weather: glacier ice condition
});
</script>
