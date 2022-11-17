<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
        <!-- Date & Time -->
        <div class="col-span-1">
            <div class="flex items-center mb-5">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">{{ $t("dateAndTime") }}</span>
            </div>
            <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("alongside") }}</div>
                <DatePicker 
                    v-model="data.alongside" 
                    class="col-span-3 border-b" 
                    textInput :textInputOptions="textInputOptions"
                    :format="format"
                    :modelValue="string"
                    :placeholder="$t('selectDateAndTime')"
                >
                    <template #input-icon>
                        <img src=""/>
                    </template>
                </DatePicker>

                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("hoseConnection") }}</div>
                <DatePicker 
                    v-model="data.hose_connection" 
                    class="col-span-3 border-b" 
                    textInput :textInputOptions="textInputOptions"
                    :format="format"
                    :modelValue="string"
                    :placeholder="$t('selectDateAndTime')"
                >
                    <template #input-icon>
                        <img src=""/>
                    </template>
                </DatePicker>

                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("pumpStart") }}</div>
                <DatePicker 
                    v-model="data.pump_start" 
                    class="col-span-3 border-b" 
                    textInput :textInputOptions="textInputOptions"
                    :format="format"
                    :modelValue="string"
                    :placeholder="$t('selectDateAndTime')"
                >
                    <template #input-icon>
                        <img src=""/>
                    </template>
                </DatePicker>

                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("pumpStop") }}</div>
                <DatePicker 
                    v-model="data.pump_stop" 
                    class="col-span-3 border-b" 
                    textInput :textInputOptions="textInputOptions"
                    :format="format"
                    :modelValue="string"
                    :placeholder="$t('selectDateAndTime')"
                >
                    <template #input-icon>
                        <img src=""/>
                    </template>
                </DatePicker>

                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("hoseDisconnection") }}</div>
                <DatePicker 
                    v-model="data.hose_disconnection" 
                    class="col-span-3 border-b" 
                    textInput :textInputOptions="textInputOptions"
                    :format="format"
                    :modelValue="string"
                    :placeholder="$t('selectDateAndTime')"
                >
                    <template #input-icon>
                        <img src=""/>
                    </template>
                </DatePicker>

                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("awayside") }}</div>
                <DatePicker 
                    v-model="data.awayside" 
                    class="col-span-3" 
                    textInput :textInputOptions="textInputOptions"
                    :format="format"
                    :modelValue="string"
                    :placeholder="$t('selectDateAndTime')"
                >
                    <template #input-icon>
                        <img src=""/>
                    </template>
                </DatePicker>
            </div>
            
        </div>

        <!-- Supplier -->
        <div class="col-span-1">
            <div class="flex items-center mb-5">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">{{ $t("supplier") }}</span>
            </div>
            <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("purchaser") }}</div>
                <input v-model="data.purchaser" 
                    @keypress="preventNaN($event, data.purchaser)" 
                    placeholder="" 
                    class="col-span-3 p-3 pl-4 bg-white text-14 text-gray-700 focus:outline-0"
                />

                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("bargeName") }}</div>
                <input v-model="data.barge_name" 
                    @keypress="preventNaN($event, data.bargeName)" 
                    placeholder="" 
                    class="col-span-3 p-3 pl-4 border-t bg-white text-14 text-gray-700 focus:outline-0"
                />

                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("supplierName") }}</div>
                <input v-model="data.supplier_name" 
                    @keypress="preventNaN($event, data.supplierName)" 
                    placeholder="" 
                    class="col-span-3 p-3 pl-4 border-t bg-white text-14 text-gray-700 focus:outline-0"
                />

                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("address") }}</div>
                <input v-model="data.address" 
                    @keypress="preventNaN($event, data.address)" 
                    placeholder="" 
                    class="col-span-3 p-3 pl-4 border-t bg-white text-14 text-gray-700 focus:outline-0"
                />

                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("telephoneNumber") }}</div>
                <input v-model="data.telephone_number" 
                    @keypress="preventNaN($event, data.telephoneNumber)" 
                    placeholder="" 
                    class="col-span-3 p-3 pl-4 border-t bg-white text-14 text-gray-700 focus:outline-0"
                />
            </div>

        </div>
    </div>
</template>

<script setup>
import { preventNaN, textInputOptions, format } from '@/utils/helpers.js'
import { reactive } from 'vue';

const data = reactive({
    "alongside": '',
    "hose_connection": '',
    "pump_start": '', 
    "pump_stop": '', 
    "hose_disconnection": '',
    "awayside": '',
    "purchaser": '',
    "barge_name": '',
    "supplier_name": '',
    "address": '',
    "telephone_number": '',
});
</script>