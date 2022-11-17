<template>
    <div class="grid lg:grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
        <div class="col-span-2 flex items-center">
            <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
            <span class="text-blue-700 text-16">{{ $t("heavyWeatherCondition") }}</span>
        </div>
        <div class="grid col-span-2 lg:col-span-1 grid-cols-5 border">
            <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("totalHours") }}</div>
            <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                <input v-model="data.hours" @keypress="preventNaN($event, data.hours)" placeholder="00.0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                <MiniUnitDisplay>HRS</MiniUnitDisplay>
            </div>
            <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("distance") }}</div>
            <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                <input v-model="data.dist" @keypress="preventNaN($event, data.dist)" placeholder="00.0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                <MiniUnitDisplay>NM</MiniUnitDisplay>
            </div>
            <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("fuelConsumption") }}</div>
            <div class="flex col-span-3 p-2 pl-4 bg-white">
                <input v-model="data.consumption" @keypress="preventNaN($event, data.consumption)" placeholder="00.0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                <MiniUnitDisplay>MT</MiniUnitDisplay>
            </div>
        </div>
        <div></div>
        <div class="col-span-2 grid grid-cols-10 border">
            <div class="col-span-10 lg:col-span-2 text-blue-700 p-3 border-b lg:border-b-0 lg:border-r bg-gray-50 text-14">{{ $t("wind") }}</div>
            <div class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-b lg:border-b-0 border-r bg-gray-50 text-14">{{ $t("direction") }}</div>
            <input v-model="data.wind_direction" @keypress="preventNaN($event, data.wind_direction)" placeholder="000 (Degrees)" class="col-span-6 lg:col-span-2 p-3 pl-4 border-b lg:border-b-0 lg:border-r bg-white text-14 text-gray-700 focus:outline-0"/>
            <div class="col-span-4 lg:col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("force") }}</div>
            <select v-model="data.wave_force" class="col-span-6 lg:col-span-3 p-3 text-14 focus:border-0" :class="data.wave_force === 'default' ? 'text-gray-400' : 'text-gray-700'">
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
        </div>
        <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
            <div class="col-span-2 text-blue-700 p-3 bg-gray-50 text-14">{{ $t("maxWaveHeight") }}</div>
            <div class="flex col-span-3 p-2 pl-4 border-l bg-white">
                <input v-model="data.max_wave_ht" @keypress="preventNaN($event, data.max_wave_ht)" placeholder="00.0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                <MiniUnitDisplay>M</MiniUnitDisplay>
            </div>
        </div>
        <div></div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { preventNaN } from '@/utils/helpers.js'
import MiniUnitDisplay from '@/components/MiniUnitDisplay.vue'

const data = reactive({
    "hours": '', // HWC: total hours
    "dist": '', // HWC: distance (OBS)
    "consumption": '', // HWC: fuel consumption
    "wind_direction": '', // HWC: wind direction
    "wind_speed": '0', // HWC: wind force; missing from BE
    "max_wave_ht": '', // HWC: max wave height
    "wave_force" : 'default' // missing from BE
});
</script>
