<template>
    <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
        <div class="col-span-2 flex items-center">
            <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
            <span class="text-blue-700 text-16">{{ $t("overview") }}</span>
        </div>
        <div class="col-span-2 xl:col-span-1 grid grid-cols-5 border bg-gray-50 text-14">
            <div class="col-span-2 text-blue-700 p-3 border-r border-b">{{ $t("reportNo") }}</div>
            <input class="col-span-3 p-3 border-b text-gray-700 bg-gray-50" disabled v-model="tempValues.reportNo"/>
            <div class="col-span-2 text-blue-700 p-3 border-r">{{ $t("legNo") }}</div>
            <input class="col-span-3 p-3 text-gray-700 bg-gray-50" disabled v-model="tempValues.legNo"/>
        </div>
        <div class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-gray-50 text-14">
            <div class="col-span-2 text-blue-700 p-3 border-l border-y">{{ $t("voyageNo") }}</div>
            <div class="flex col-span-3 p-3 border">
                <input class="text-gray-700 bg-gray-50 w-8" disabled v-model="tempValues.voyageNo"/>
                <!-- value here (e.g. Ballast) should be dynamic -->
                <MiniUnitDisplay class="ml-0 mr-auto">{{ $t("ballast") }}</MiniUnitDisplay>
            </div>
            <!-- dummy div/input for formatting -->
            <div class="hidden xl:block bg-white col-span-2 row-span-1"></div>
            <input class="hidden xl:block bg-white col-span-3 p-3" disabled/> 
        </div>
        <div class="col-span-2 xl:col-span-1 items-center mt-2">
            <div class="flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700">{{ $t("departurePort") }}</span>
            </div>
            <div class="grid grid-cols-5 border bg-gray-50 text-14 mt-4">
                <div class="col-span-2 text-blue-700 p-3 border-r border-b">{{ $t("name") }}</div>
                <input class="col-span-3 p-3 border-b text-gray-700 bg-gray-50" disabled v-model="tempValues.departurePort"/>
                <div class="col-span-2 text-blue-700 p-3 border-r">{{ $t("dateAndTime") }}</div>
                <input class="col-span-3 p-3 text-gray-700 bg-gray-50" disabled v-model="tempValues.departureDateTime"/>
            </div>
        </div>

        <div class="col-span-2 xl:col-span-1 mt-2">
            <div class="flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700">{{ $t("destinationPort") }}</span>
            </div>
            <div class="grid grid-cols-5 border bg-gray-50 text-14 mt-4">
                <div class="col-span-2 text-blue-700 p-3 border-r border-b">{{ $t("name") }}</div>
                <select v-model="destination.port_name" 
                    class="col-span-3 p-3 border-b text-14 focus:border-0 text-gray-600" 
                >
                    <option selected disabled value="default">{{ $t("selectPort") }}</option>
                    <option value="dummy">Ras Tanura, Saudi Arabia</option> 
                    <!-- Add port names here -->
                </select>
                <div class="col-span-2 text-blue-700 p-3 border-r border-b">{{ $t("estDateAndTime") }}</div>
                <DatePicker 
                    v-model="destination.date_time" 
                    class="col-span-3 border-b" 
                    textInput :textInputOptions="textInputOptions"
                    :format="format"
                    :modelValue="string"
                    placeholder="Select date & time"
                >
                    <template #input-icon>
                        <img src=""/>
                    </template>
                </DatePicker>
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("timeZone") }}</div>
                <select v-model="destination.time_zone" 
                    class="col-span-3 p-3 border-b text-14 focus:border-0 text-gray-600" 
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
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("summerTime") }}</div>
                <select v-model="destination.summer_time" 
                    class="col-span-3 p-3 text-14 focus:border-0 text-gray-600" 
                >
                    <option selected disabled value="default">{{ $t("selectSummerTime") }}</option>
                    <option value="true">{{ $t("applied") }}</option>
                    <option value="false">{{ $t("notApplied") }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import MiniUnitDisplay from '@/components/MiniUnitDisplay.vue'

// TODO: retrieve from backend or generate as needed
const tempValues = {
    reportNo: '2',
    legNo: '2',
    voyageNo: '1',
    departurePort: 'Singapore, Singapore',
    departureDateTime: '2022.06.01 12:23 (LT)',
};

const destination = {
    port_name: 'dummy',
    date_time: '2022.06.01 12:23 (LT)',
    time_zone: '3',
    summer_time: 'false',
}

const dpEditable = ref(false);
const ddtEditable = ref(false);
</script>

<style scoped>
.dp__theme_light {
	--dp-text-color: #667085;
}
</style>