<template>
    <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
        <div class="col-span-2 flex items-center">
            <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
            <span class="text-blue-700 text-16">{{ $t("pilotStationArrival") }}</span>
        </div>
        <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
            <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("name") }}</div>
            <input v-model="data.name" 
                @keypress="preventNaN($event, data.name)" 
                :placeholder="$t('inputName')" 
                class="col-span-3 p-3 pl-4 border-b bg-white text-14 text-gray-700 focus:outline-0"
            />
            <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("dateAndTime") }}</div>
            <DatePicker 
                v-model="data.date_time" 
                class="col-span-3" 
                textInput :textInputOptions="textInputOptions"
                :format="format"
                :modelValue="string"
                :placeholder="$t('pleaseSelectDateAndTime')">
                <template #input-icon>
                    <img src=""/>
                </template>
            </DatePicker>
        </div>
        <div></div>
        <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
            <span class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center">{{ $t("latitude") }}</span>
            <input v-model="data.lat_degree" 
                @keypress="preventNaN($event, data.lat_degree)" 
                placeholder="000 (Degree)" 
                class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
            />
            <input v-model="data.lat_minutes" 
                @keypress="preventNaN($event, data.lat_minutes)" 
                placeholder="000 (Minutes)" 
                class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
            />
            <select v-model="data.lat_dir" 
                class="col-span-3 p-3 text-14 border-l focus:border-0 focus:outline-0" 
                :class="data.lat_dir === 'default' ? 'text-gray-400' : 'text-gray-700'"
            >
                <option selected disabled value="default">{{ $t("southAndNorth") }}</option>
                <option value="S">{{ $t("south") }}</option>
                <option value="N">{{ $t("north") }}</option>
            </select>
        </div>
        <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
            <span class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center">{{ $t("longitude") }}</span>
            <input v-model="data.long_degree" 
                @keypress="preventNaN($event, data.long_degree)" 
                placeholder="000 (Degree)" 
                class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
            />
            <input v-model="data.long_minutes" 
                @keypress="preventNaN($event, data.long_minutes)" 
                placeholder="000 (Minutes)" 
                class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
            />
            <select v-model="data.long_dir" 
                class="col-span-3 p-3 text-14 border-l focus:border-0" 
                :class="data.long_dir === 'default' ? 'text-gray-400' : 'text-gray-700'"
            >
                <option selected disabled value="default">{{ $t("eastAndWest") }}</option>
                <option value="E">{{ $t("east") }}</option>
                <option value="W">{{ $t("west") }}</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { preventNaN, textInputOptions, format } from '../../utils/helpers.js'
import { reactive } from 'vue';

const data = reactive({
    "name": '',
    "date_time": '',
    "lat_dir": 'default',
    "lat_degree": '',
    "lat_minutes": '',
    "long_dir": 'default',
    "long_degree": '',
    "long_minutes": ''
})
</script>
