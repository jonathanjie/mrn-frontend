<template>
    <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
        <div class="flex items-center col-span-2">
            <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
            <span class="text-blue-700 text-16">
                <slot>{{ $t('distanceAndTimeSbyToFwe') }}</slot>
            </span>
        </div>
        <div class="col-span-2 lg:col-span-1 grid grid-cols-5">
            <div class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14">{{ $t("time") }}</div>
            <div class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t bg-gray-50">
                <input v-model="data.hours_since_noon" 
                    @keypress="preventNaN($event, data.hours_since_noon)" 
                    placeholder="0" 
                    disabled
                    class="w-24 text-14 bg-gray-50 text-gray-700 focus:outline-0"
                />
                <MiniUnitDisplay>HRS</MiniUnitDisplay>
            </div>

            <div class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14">{{ $t("distanceByObservation") }}</div>
            <div class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t">
                <input v-model="data.distance_obs_since_noon" 
                    @keypress="preventNaN($event, data.distance_obs_since_noon)" 
                    placeholder="0" 
                    class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
                />
                <MiniUnitDisplay>NM</MiniUnitDisplay>
            </div>

            <div class="col-span-2 text-blue-700 p-3 border-l border-t lg:border-y bg-gray-50 text-14">{{ $t("distanceByEngine") }}</div>
            <div class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t lg:border bg-gray-50">
                <input v-model="data.distance_eng_since_noon" 
                    @keypress="preventNaN($event, data.distance_eng_since_noon)" 
                    placeholder="0" 
                    disabled
                    class="w-24 text-14 bg-gray-50 text-gray-700 focus:outline-0"
                />
                <MiniUnitDisplay>NM</MiniUnitDisplay>
            </div>

            <div class="col-span-2 text-blue-700 p-3 border-l border-y lg:border-t-0 bg-gray-50 text-14">{{ $t("revolutionCounter") }}</div>
            <input v-model="data.revolution_count" 
                @keypress="preventNaN($event, data.revolution_count)" 
                placeholder="0" 
                class="col-span-3 lg:col-span-3 p-3 pl-4 border-x border-y lg:border-t-0 bg-white text-14 text-gray-700 focus:outline-0"
            />
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { preventNaN } from '../../utils/helpers.js'
import MiniUnitDisplay from '../../components/MiniUnitDisplay.vue'

const data = reactive({
    // TODO: total distance in voyage - distance by observation? or engine?
    "hours_since_noon": '', // Distance & Time: time
    "distance_obs_since_noon": '', // Distance & Time: distance by observation
    "distance_eng_since_noon": '', // Distance & Time: distance by engine
    "revolution_count": '',
});
</script>
