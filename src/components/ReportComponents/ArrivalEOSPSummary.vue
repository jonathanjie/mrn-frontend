<template>
    <div class="grid bg-gray-25 border border-yellow-500 rounded-lg p-5 gap-4 divide-y divide-dashed shadow-card">
        <div class="grid grid-cols-2 gap-4 mb-4">

            <!-- Actual Performance at Sea -->
            <div class="col-span-2 flex items-center">
                <img src="@/assets/icons/selected_yellow_gradient.svg" class="h-5 w-5"/>
                <span class="text-yellow-700 text-16">{{ $t("actualPerformanceAtSea") }}</span>
            </div>
            <div class="col-span-2 lg:col-span-1">
                <div class="grid grid-cols-5 border">
                    <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("totalDistanceByOBS") }}</div>
                    <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                        <input v-model="data.total_distance_obs" @keypress="preventNaN($event, data.total_distance_obs)" placeholder="0" class="w-16 text-14 text-gray-700 focus:outline-0"/>
                        <MiniUnitDisplay>NM</MiniUnitDisplay>
                    </div>
                    <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("totalSailingTime") }}</div>
                    <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                        <input v-model="data.total_sailing_time" @keypress="preventNaN($event, data.total_sailing_time)" placeholder="0" class="w-16 text-14 text-gray-700 focus:outline-0"/>
                        <MiniUnitDisplay>HRS</MiniUnitDisplay>
                    </div>
                    <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("displacement") }}</div>
                    <div class="flex col-span-3 p-2 pl-4 bg-white">
                        <input v-model="data.displacement" @keypress="preventNaN($event, data.displacement)" placeholder="0" class="w-16 text-14 text-gray-700 focus:outline-0"/>
                        <MiniUnitDisplay>MT</MiniUnitDisplay>
                    </div>
                </div>
            </div>
            <div class="col-span-2 lg:col-span-1">
                <div class="grid grid-cols-5 border">
                    <div class="col-span-5 text-blue-700 p-3 border-b bg-gray-50 text-14">{{ $t("totalConsumptionAtSea") }}</div>
                    <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("lsfo") }}</div>
                    <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                        <input v-model="data.lsfo_total_at_sea" @keypress="preventNaN($event, data.lsfo_total_at_sea)" placeholder="0" class="w-16 text-14 text-gray-700 focus:outline-0"/>
                        <MiniUnitDisplay>MT</MiniUnitDisplay>
                    </div>
                    <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("mgo") }}</div>
                    <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                        <input v-model="data.mgo_total_at_sea" @keypress="preventNaN($event, data.mgo_total_at_sea)" placeholder="0" class="w-16 text-14 text-gray-700 focus:outline-0"/>
                        <MiniUnitDisplay>MT</MiniUnitDisplay>
                    </div>
                    <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("averageSpeed") }}</div>
                    <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                        <input v-model="data.avg_speed" @keypress="preventNaN($event, data.avg_speed)" placeholder="0" class="w-16 text-14 text-gray-700 focus:outline-0"/>
                        <MiniUnitDisplay>KNOTS</MiniUnitDisplay>
                    </div>
                    <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("averageRPM") }}</div>
                    <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                        <input v-model="data.avg_rpm" @keypress="preventNaN($event, data.avg_rpm)" placeholder="0" class="w-16 text-14 text-gray-700 focus:outline-0"/>
                        <MiniUnitDisplay>RPM</MiniUnitDisplay>
                    </div>
                    <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("mefoConsumptionPerDay") }}</div>
                    <div class="flex col-span-3 p-2 pl-4 bg-white">
                        <input v-model="data.me_fo_consumption" @keypress="preventNaN($event, data.me_fo_consumption)" placeholder="0" class="w-16 text-14 text-gray-700 focus:outline-0"/>
                        <MiniUnitDisplay>MT</MiniUnitDisplay>
                    </div>
                </div>
            </div>
        </div>

        <!-- Total Consumption (Pilot to Pilot) -->
        <div>
            <div class="flex items-center mb-5 mt-8">
                <img src="@/assets/icons/selected_yellow_gradient.svg" class="h-5 w-5"/>
                <span class="text-yellow-700 text-16">{{ $t("totalConsumptionPilotToPilot") }}</span>
            </div>
            <div class="grid grid-cols-6 border bg-gray-25 text-14">
                <div></div>
                <div class="p-3 border-l text-gray-700">{{ $t('me') }}</div>
                <div class="p-3 border-l text-gray-700">{{ $t('ge') }}</div>
                <div class="p-3 border-l text-gray-700">{{ $t('boiler') }}</div>
                <div class="p-3 border-l text-gray-700">{{ $t('igg') }}</div>
                <div class="p-3 border-l text-gray-700">{{ $t('total') }}</div>

                <div class="text-blue-700 p-3 border-t">{{ $t('lsfo') }}</div>
                <input v-model="data.lsfo_me" @keypress="preventNaN($event, data.lsfo_me)" placeholder="000.00" class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="data.lsfo_ge" @keypress="preventNaN($event, data.lsfo_ge)" placeholder="000.00" class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="data.lsfo_boiler" @keypress="preventNaN($event, data.lsfo_boiler)" placeholder="000.00" class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="data.lsfo_igg" @keypress="preventNaN($event, data.lsfo_igg)" placeholder="000.00" class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="data.lsfo_total" @keypress="preventNaN($event, data.lsfo_total)" placeholder="000.00" class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>

                <div class="text-blue-700 p-3 border-t">{{ $t('mgo') }}</div>
                <input v-model="data.mgo_me" @keypress="preventNaN($event, data.mgo_me)" placeholder="000.00" class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="data.mgo_ge" @keypress="preventNaN($event, data.mgo_ge)" placeholder="000.00" class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="data.mgo_boiler" @keypress="preventNaN($event, data.mgo_boiler)" placeholder="000.00" class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="data.mgo_igg" @keypress="preventNaN($event, data.mgo_igg)" placeholder="000.00" class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="data.mgo_total" @keypress="preventNaN($event, data.mgo_total)" placeholder="000.00" class="p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
            </div>
        </div>
    </div> 
</template>

<script setup>
import { reactive } from 'vue'
import { preventNaN } from '../../utils/helpers.js'
import MiniUnitDisplay from '../../components/MiniUnitDisplay.vue'

const data = reactive({
    "total_distance_obs": '', 
    "total_sailing_time": '', 
    "displacement": '',
    "lsfo_total_at_sea": '', 
    "mgo_total_at_sea": '', 
    "avg_speed": '', 
    "avg_rpm": '',
    "me_fo_consumption": '',
    "lsfo_me": '',
    "lsfo_ge": '',
    "lsfo_boiler": '',
    "lsfo_igg": '',
    "lsfo_total": '',
    "mgo_me": '',
    "mgo_ge": '',
    "mgo_boiler": '',
    "mgo_igg": '',
    "mgo_total": '',
});
</script>
