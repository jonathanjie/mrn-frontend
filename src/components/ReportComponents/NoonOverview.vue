<template>
    <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4">
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
                <input class="text-gray-700 bg-gray-50 w-12" disabled v-model="tempValues.voyageNo"/>
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
                <div class="col-span-3 p-3 border-b flex" :class="dpEditable?'bg-white':'bg-gray-50'">
                    <input 
                        class="text-gray-700" 
                        :disabled="!dpEditable" 
                        v-model="tempValues.destinationPort"/>
                    <button @click="dpEditable.value = !dpEditable.value" class="ml-auto">
                        <img src="@/assets/icons/edit.svg"/>
                    </button>
                </div>
                <div class="col-span-2 text-blue-700 p-3 border-r">{{ $t("estDateAndTime") }}</div>
                <div class="col-span-3 p-3 flex" :class="ddtEditable?'bg-white':'bg-gray-50'">
                    <input 
                        class="text-gray-700" 
                        :disabled="!ddtEditable" 
                        v-model="tempValues.destinationDateTime"/>
                    <button @click="ddtEditable.value = !ddtEditable.value" class="ml-auto">
                        <img src="@/assets/icons/edit.svg"/>
                    </button>
                </div>
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
    destinationPort: 'Ras Tanura, Saudi Arabia',
    destinationDateTime: '2022.06.01 12:23 (LT)',
};

const dpEditable = ref(false);
const ddtEditable = ref(false);
</script>
