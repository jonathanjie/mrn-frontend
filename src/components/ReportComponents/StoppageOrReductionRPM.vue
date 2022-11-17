<template>
    <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
        <div class="col-span-2 flex items-center">
            <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
            <span class="text-blue-700 text-16">{{ $t("stoppageOrReductionOfRPM") }}</span>
        </div>
        <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
            <span class="col-span-2 text-blue-700 p-3 text-14 self-center border-b border-r">{{ $t("beginningDateAndTime") }}</span>
            <DatePicker 
                v-model="data.beginning" 
                class="col-span-3 border-b" 
                textInput :textInputOptions="textInputOptions"
                :format="format"
                :modelValue="string"
                placeholder="Select date & time">
                <template #input-icon>
                    <img src=""/>
                </template>
            </DatePicker>
            <span class="col-span-2 text-blue-700 p-3 text-14 self-center border-r">{{ $t("endingDateAndTime") }}</span>
            <DatePicker 
                v-model="data.ending" 
                class="col-span-3" 
                textInput :textInputOptions="textInputOptions"
                :format="format"
                :modelValue="string"
                placeholder="Select date & time">
                <template #input-icon>
                    <img src=""/>
                </template>
            </DatePicker>
        </div>
        <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
            <span class="col-span-2 text-blue-700 p-3 border-b text-14 self-center">{{ $t("duration") }}</span>
            <div class="flex col-span-3 p-2 pl-4 bg-white text-14 border-l border-b">
                <input v-model="data.duration" @keypress="preventNaN($event, data.duration)" placeholder="0" class="w-24 text-gray-700 focus:outline-0"/>
                <MiniUnitDisplay>HRS</MiniUnitDisplay>
            </div>
            <span class="col-span-2 text-blue-700 p-3 text-14">{{ $t("reducedRPM") }}</span>
            <div class="flex col-span-3 p-2 pl-4 bg-white text-14 border-l">
                <input v-model="data.reducedRPM" @keypress="preventNaN($event, data.reducedRPM)" placeholder="0" class="w-24 text-gray-700 focus:outline-0"/>
                <MiniUnitDisplay>RPM</MiniUnitDisplay>
            </div>
        </div>
        <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
            <span class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center">{{ $t("latitude") }}</span>
            <input v-model="data.lat_degree" @keypress="preventNaN($event, data.lat_degree)" placeholder="000 (Degree)" class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"/>
            <input v-model="data.lat_minutes" @keypress="preventNaN($event, data.lat_minutes)" placeholder="000 (Minutes)" class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"/>
            <select v-model="data.lat_dir" class="col-span-3 p-3 text-14 border-l focus:border-0 focus:outline-0" :class="data.lat_dir === 'default' ? 'text-gray-400' : 'text-gray-700'">
                <option selected disabled value="default">{{ $t("southAndNorth") }}</option>
                <option value="S">{{ $t("south") }}</option>
                <option value="N">{{ $t("north") }}</option>
            </select>
        </div>
        <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
            <span class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center">{{ $t("longitude") }}</span>
            <input v-model="data.long_degree" @keypress="preventNaN($event, data.long_degree)" placeholder="000 (Degree)" class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"/>
            <input v-model="data.long_minutes" @keypress="preventNaN($event, data.long_minutes)" placeholder="000 (Minutes)" class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"/>
            <select v-model="data.long_dir" class="col-span-3 p-3 text-14 border-l focus:border-0" :class="data.long_dir === 'default' ? 'text-gray-400' : 'text-gray-700'">
                <option selected disabled value="default">{{ $t("eastAndWest") }}</option>
                <option value="E">{{ $t("east") }}</option>
                <option value="W">{{ $t("west") }}</option>
            </select>
        </div>
        <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
            <div class="col-span-2 text-blue-700 p-3 bg-gray-50 text-14">{{ $t("reason") }}</div>
            <select v-model="data.reason" class="col-span-3 p-3 border-l text-14 focus:border-0" :class="data.reason === 'default' ? 'text-gray-400' : 'text-gray-700'" >
                <option selected disabled value="default">{{ $t("select") }}</option>
            </select>
            <div class="col-span-2 row-span-2 text-blue-700 p-3 border-t bg-gray-50 text-14">{{ $t("remarks") }}</div>
            <textarea v-model.trim="data.remarks" :placeholder="$t('inputRemarks')" class="col-span-3 row-span-2 border-t border-l p-3 pl-4 bg-white text-14 text-gray-700 focus:outline-0"></textarea>
        </div>
        <div></div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import MiniUnitDisplay from '../../components/MiniUnitDisplay.vue'
import { textInputOptions, format, preventNaN } from '../../utils/helpers.js'
    
const data = reactive({
    "beginning": '',
    "ending": '',
    "duration": '',
    "reducedRPM": '',
    "reason": 'default',
    "remarks": '',
    "lat_dir": 'default',
    "lat_degree": '',
    "lat_minutes": '',
    "long_dir": 'default',
    "long_degree": '',
    "long_minutes": ''
});
</script>
