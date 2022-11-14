<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg p-5 gap-4">

        <!-- Departure -->
        <div class="col-span-1">
            <div class="flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">{{ $t("departure") }}</span>
            </div>
            <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
                <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">{{ $t("portName") }}</div>
                <input class="col-span-3 p-3 text-gray-700 bg-gray-50 border-l border-b" disabled v-model="staticValues.departurePortCountry"/>
                <input class="col-span-3 p-3 text-gray-700 bg-gray-50 border-l" disabled v-model="staticValues.departurePortName"/>
            </div>
            <div class="grid grid-cols-5 border bg-gray-50 text-14 mb-5">
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("dateAndTime") }}</div>
                <DatePicker 
                    v-model="departure_date_time" 
                    class="col-span-3" 
                    textInput :textInputOptions="textInputOptions"
                    :format="format"
                    :disabled=true
                    :modelValue="string"
                    placeholder="Select date & time">
                    <template #input-icon>
                        <img src=""/>
                    </template>
                </DatePicker>
            </div>
        </div>

        <!-- Arrival -->
        <div class="col-span-1">
            <div class="flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">{{ $t("arrival") }}</span>
            </div>
            <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
                <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">{{ $t("portName") }}</div>
                <input class="col-span-3 p-3 text-gray-700 bg-gray-50 border-l border-b" disabled v-model="staticValues.arrivalPortCountry"/>
                <input class="col-span-3 p-3 text-gray-700 bg-gray-50 border-l" disabled v-model="staticValues.arrivalPortName"/>
            </div>
            <div class="grid grid-cols-5 border bg-gray-50 text-14 mb-5">
                <div class="col-span-2 row-span-2 text-blue-700 p-3 border-r">{{ $t("plannedOperation") }}</div>
                <div class="col-span-3 bg-white flex flex-col space-y-2 p-3 text-gray-700">
                    <div class="flex align-center">
                        <input type="checkbox" id="cargoOpBerth" value="0" v-model="plannedOperations" class="mr-2">
                        <label for="cargoOpBerth">{{ $t("cargoOperationBerth") }}</label>
                    </div>
                    <div class="flex align-center">
                        <input type="checkbox" id="cargoOpSTSSTB" value="1" v-model="plannedOperations" class="mr-2">
                        <label for="cargoOpSTSSTB">{{ $t("cargoOperationSTSSTB") }}</label>
                    </div>
                    <div class="flex align-center">
                        <input type="checkbox" id="bunkeringDebunkering" value="2" v-model="plannedOperations" class="mr-2">
                        <label for="bunkeringDebunkering">{{ $t("bunkeringDebunkering") }}</label>
                    </div>
                    <div class="flex align-center">
                        <input type="checkbox" id="dryDocking" value="3" v-model="plannedOperations" class="mr-2">
                        <label for="dryDocking">{{ $t("dryDocking") }}</label>
                    </div>
                    <div class="flex align-center">
                        <input type="checkbox" id="crewChange" value="4" v-model="plannedOperations" class="mr-2">
                        <label for="crewChange">{{ $t("crewChange") }}</label>
                    </div>
                    <div class="flex align-center"> 
                        <input type="checkbox" id="receivingProvisionSpareParts" value="5" v-model="plannedOperations" class="mr-2">
                        <label for="receivingProvisionSpareParts">{{ $t("receivingProvisionSpareParts") }}</label>
                    </div>
                    <div class="flex align-center">
                        <input type="checkbox" id="survey" value="6" v-model="plannedOperations" class="mr-2">
                        <label for="survey">{{ $t("survey") }}</label>
                    </div>
                    <div class="flex align-center">
                        <input type="checkbox" id="others" value="7" v-model="plannedOperations" class="mr-2">
                        <label for="others">{{ $t("others") }}</label>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
                <div class="col-span-2 text-blue-700 p-3">{{ $t("others") }}</div>
                <input class="col-span-3 p-3 text-gray-700 border-l" :placeholder="$t('inputOtherPlannedOperation')" v-model="otherPlannedOperation"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { textInputOptions, format } from '../../utils/helpers.js'

// TODO: retrieve from backend or generate as needed
const staticValues = {
    departurePortCountry: 'Country A',
    departurePortName: 'Port A',
    arrivalPortCountry: 'Country A',
    arrivalPortName: 'Port A',
};

const departure_date_time = '2022-06-01T04:23:00Z'
let plannedOperations = []
let otherPlannedOperation = ''
</script>