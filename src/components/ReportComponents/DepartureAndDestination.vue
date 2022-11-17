<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
        <!-- Departure -->
        <div class="col-span-1">
            <div class="flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">{{ $t("departure") }}</span>
            </div>
            <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
                <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">{{ $t("portName") }}</div>
                <select v-model="departure.port_country" 
                    class="col-span-3 p-3 text-gray-700 border-l border-b" 
                    :class="departure.port_country === 'default' ? 'text-gray-400' : 'text-gray-700'"
                >
                    <!-- TODO: fill up possible timezo -->
                    <option selected disabled value="default">{{ $t("selectCountry") }}</option>
                </select>
                <select v-model="departure.port_name" 
                    class="col-span-3 p-3 text-gray-700 border-l" 
                    :class="departure.port_name === 'default' ? 'text-gray-400' : 'text-gray-700'"
                >
                    <option selected disabled value="default">{{ $t("selectPort") }}</option>
                </select>
            </div>
            <div class="grid grid-cols-5 border bg-gray-50 text-14 mb-5">
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("timeZone") }}</div>
                <select v-model="departure.time_zone" 
                    class="col-span-3 p-3 border-b text-14 focus:border-0" 
                    :class="departure.time_zone === 'default' ? 'text-gray-400' : 'text-gray-700'"
                >
                    <option selected disabled value="default">{{ $t("selectTimeZone") }}</option>
                    <!-- TODO: select +1 or -1 timezone from previous report -->
                    <option value="0">UTC</option>
                    <option value="1">UTC+1:00</option>
                    <option value="2">UTC+2:00</option>
                    <option value="3">UTC+3:00</option>
                    <option value="4">UTC+4:00</option>
                    <option value="5">UTC+5:00</option>
                    <option value="6">UTC+6:00</option>
                    <option value="7">UTC+7:00</option>
                    <option value="8">UTC+8:00</option>
                    <option value="9">UTC+9:00</option>
                    <option value="10">UTC+10:00</option>
                    <option value="11">UTC+11:00</option>
                    <option value="12">UTC+12:00</option>
                    <option value="-11">UTC-11:00</option>
                    <option value="-10">UTC-10:00</option>
                    <option value="-9">UTC-9:00</option>
                    <option value="-8">UTC-8:00</option>
                    <option value="-7">UTC-7:00</option>
                    <option value="-6">UTC-6:00</option>
                    <option value="-5">UTC-5:00</option>
                    <option value="-4">UTC-4:00</option>
                    <option value="-3">UTC-3:00</option>
                    <option value="-2">UTC-2:00</option>
                    <option value="-1">UTC-1:00</option>
                </select>
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("summerTime") }}</div>
                <select v-model="departure.summer_time" 
                    class="col-span-3 p-3 border-b text-14 focus:border-0" 
                    :class="departure.summer_time === 'default' ? 'text-gray-400' : 'text-gray-700'"
                >
                    <option selected disabled value="default">{{ $t("selectSummerTime") }}</option>
                    <option value="true">{{ $t("applied") }}</option>
                    <option value="false">{{ $t("notApplied") }}</option>
                </select>
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("dateAndTime") }}</div>
                <DatePicker 
                    v-model="departure.date_time" 
                    class="col-span-3" 
                    textInput :textInputOptions="textInputOptions"
                    :format="format"
                    :disabled="departure.time_zone==='default' || departure.summer_time==='default'"
                    :modelValue="string"
                    :placeholder="$t('selectDateAndTime')"
                >
                    <template #input-icon>
                        <img src=""/>
                    </template>
                </DatePicker>
            </div>
        </div>

        <!-- Destination -->
        <div class="col-span-1">
            <div class="flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">{{ $t("destination") }}</span>
            </div>
            <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
                <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">{{ $t("portName") }}</div>
                <select v-model="destination.port_country" 
                    class="col-span-3 p-3 text-gray-700 border-l border-b" 
                    :class="destination.port_country === 'default' ? 'text-gray-400' : 'text-gray-700'"
                >
                    <!-- TODO: fill up possible timezo -->
                    <option selected disabled value="default">{{ $t("selectCountry") }}</option>
                </select>
                <select v-model="destination.port_name" 
                    class="col-span-3 p-3 text-gray-700 border-l" 
                    :class="destination.port_name === 'default' ? 'text-gray-400' : 'text-gray-700'"
                >
                    <option selected disabled value="default">{{ $t("selectPort") }}</option>
                </select>
            </div>
            <div class="grid grid-cols-5 border bg-gray-50 text-14 mb-5">
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("timeZone") }}</div>
                <select v-model="destination.time_zone" 
                    class="col-span-3 p-3 border-b text-14 focus:border-0" 
                    :class="destination.time_zone === 'default' ? 'text-gray-400' : 'text-gray-700'"
                >
                    <option selected disabled value="default">{{ $t("selectTimeZone") }}</option>
                    <!-- TODO: select +1 or -1 timezone from previous report -->
                    <option value="0">UTC</option>
                    <option value="1">UTC+1:00</option>
                    <option value="2">UTC+2:00</option>
                    <option value="3">UTC+3:00</option>
                    <option value="4">UTC+4:00</option>
                    <option value="5">UTC+5:00</option>
                    <option value="6">UTC+6:00</option>
                    <option value="7">UTC+7:00</option>
                    <option value="8">UTC+8:00</option>
                    <option value="9">UTC+9:00</option>
                    <option value="10">UTC+10:00</option>
                    <option value="11">UTC+11:00</option>
                    <option value="12">UTC+12:00</option>
                    <option value="-11">UTC-11:00</option>
                    <option value="-10">UTC-10:00</option>
                    <option value="-9">UTC-9:00</option>
                    <option value="-8">UTC-8:00</option>
                    <option value="-7">UTC-7:00</option>
                    <option value="-6">UTC-6:00</option>
                    <option value="-5">UTC-5:00</option>
                    <option value="-4">UTC-4:00</option>
                    <option value="-3">UTC-3:00</option>
                    <option value="-2">UTC-2:00</option>
                    <option value="-1">UTC-1:00</option>
                </select>
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("summerTime") }}</div>
                <select v-model="destination.summer_time" 
                    class="col-span-3 p-3 border-b text-14 focus:border-0" 
                    :class="destination.summer_time === 'default' ? 'text-gray-400' : 'text-gray-700'"
                >
                    <option selected disabled value="default">{{ $t("selectSummerTime") }}</option>
                    <option value="true">{{ $t("applied") }}</option>
                    <option value="false">{{ $t("notApplied") }}</option>
                </select>
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("estimatedTimeOfArrival") }}</div>
                <DatePicker 
                    v-model="destination.estimated_arrival" 
                    class="col-span-3" 
                    textInput :textInputOptions="textInputOptions"
                    :format="format"
                    :disabled="destination.time_zone==='default' || destination.summer_time==='default'"
                    :modelValue="string"
                    :placeholder="$t('selectDateAndTime')"
                >
                    <template #input-icon>
                        <img src=""/>
                    </template>
                </DatePicker>
            </div>

        </div>
    </div>
</template>

<script setup>
import { preventNaN, textInputOptions, format } from '@/utils/helpers.js'
import { reactive } from 'vue';

const departure = reactive({
    "port_country": 'default',
    "port_name": 'default',
    "time_zone": 'default', 
    "summer_time": 'default', 
    "date_time": '',
});

const destination = reactive({
    "port_country": 'default',
    "port_name": 'default',
    "time_zone": 'default', 
    "summer_time": 'default', 
    "estimated_arrival": '',
});
</script>