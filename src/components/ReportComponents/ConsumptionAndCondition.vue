<template>
    <div class="grid bg-white rounded-lg p-5 gap-4">
        <div class="flex items-center">
            <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
            <span class="text-blue-700 text-16">
                <slot></slot>    
            </span>
        </div>
        <div class="grid grid-cols-16">
            <div class="col-span-4 px-6 border-l border-t"></div>
            <div class="col-span-2 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("me") }}</div>
            <div class="col-span-2 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("ge") }}</div>
            <div class="col-span-2 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("blr") }}</div>
            <div class="col-span-2 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("igg") }}</div>
            <div class="col-span-2 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("totalConsumption") }}</div>
            <div class="col-span-2 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-x bg-gray-50 text-14">{{ $t("remainOnBoard") }}</div>

            <div class="col-span-2 row-span-2 flex p-3 border-l border-t border-green-200 bg-green-100/50">
                <div class="self-center text-green-800 text-12">{{ $t("fuelOilInMT") }}</div>
            </div>
                <div class="col-span-2 text-green-800 p-3 border-t border-l border-green-100 bg-green-25 text-14">{{ $t("lsfo") }}</div>
                <input v-model="lsfo_data.me_consumed" @keypress="preventNaN($event, lsfo_data.me_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="lsfo_data.aux_consumed" @keypress="preventNaN($event, lsfo_data.aux_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="lsfo_data.boiler_consumed" @keypress="preventNaN($event, lsfo_data.boiler_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="lsfo_data.gas_generator_consumed" @keypress="preventNaN($event, lsfo_data.gas_generator_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-2 text-gray-400 p-3 border-t border-l bg-gray-25 text-14">{{ cc_lsfo_total }}</div>
                <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ cc_lsfo_rob }}</div>
                
                <div class="col-span-2 text-green-800 p-3 border-t border-l border-green-100 bg-green-25 text-14">{{ $t("mgo") }}</div>
                <input v-model="mgo_data.me_consumed" @keypress="preventNaN($event, mgo_data.me_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="mgo_data.aux_consumed" @keypress="preventNaN($event, mgo_data.aux_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="mgo_data.boiler_consumed" @keypress="preventNaN($event, mgo_data.boiler_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="mgo_data.gas_generator_consumed" @keypress="preventNaN($event, mgo_data.gas_generator_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-2 text-gray-400 p-3 border-t border-l bg-gray-25 text-14">{{ cc_mgo_total }}</div>
                <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ cc_mgo_rob }}</div>

            <div class="col-span-2 row-span-4 flex p-3 border-t border-l border-yellow-200 bg-yellow-100/50">
                <div class="self-center text-yellow-800 text-12">{{ $t("lubricateOilInL") }}</div>
            </div>
                <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">{{ $t("meCylinder") }}</div>
                    <input v-model="cc_mecylinder_total" @keypress="preventNaN($event, cc_mecylinder_total)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ cc_mecylinder_rob }}</div>
                <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">{{ $t("meSystem") }}</div>
                    <input v-model="cc_mesystem_total" @keypress="preventNaN($event, cc_mesystem_total)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ cc_mesystem_rob }}</div>
                <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">{{ $t("meSump") }}</div>
                    <input v-model="cc_mesump_total" @keypress="preventNaN($event, cc_mesump_total)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ cc_mesump_rob }}</div>
                <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">{{ $t("geSystem") }}</div>
                    <input v-model="cc_gesystem_total" @keypress="preventNaN($event, cc_gesystem_total)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ cc_gesystem_rob }}</div>

            <div class="col-span-2 row-span-2 flex p-3 border-y border-l border-blue-200 bg-sysblue-100/50">
                <div class="self-center text-sysblue-800 text-12">{{ $t("freshWaterInTon") }}</div>
            </div>
                <div class="col-span-5 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">{{ $t("consumed") }}</div>
                <div class="col-span-5 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">{{ $t("generated") }}</div>
                <div class="col-span-2 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">+/-</div>
                <div class="col-span-2 text-sysblue-800 p-3 border-t border-x border-sysblue-100 bg-sysblue-25 text-14">{{ $t("rob") }}</div>
                
                <input v-model="freshwater_data.consumed" @keypress="preventNaN($event, freshwater_data.consumed)" placeholder="0" class="col-span-5 p-3 pl-4 border-y border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="freshwater_data.evaporated" @keypress="preventNaN($event, freshwater_data.evaporated)" placeholder="0" class="col-span-5 p-3 pl-4 border-y border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-2 text-gray-400 p-3 border-y border-l bg-gray-25 text-14">{{ cc_freshwater_change }}</div>
                <div class="col-span-2 text-gray-400 p-3 border-y border-x bg-gray-25 text-14">{{ cc_freshwater_rob }}</div>
        </div>
        
        <div class="grid grid-cols-8 border">
            <div class="col-span-2 text-blue-700 p-3 bg-gray-50 text-14">{{ $t("correction") }}</div>
            <!-- TODO: make dynamic -->
            <select v-model="cc_correction_type" class="col-span-3 p-3 border-l text-14 focus:border-0" :class="cc_correction_type === 'default' ? 'text-gray-400' : 'text-gray-700'" >
                <option selected disabled value="default">{{ $t("selectType") }}</option>
                <option value="lsfo">{{ $t("lsfo") }}</option>
                <option value="mgo">{{ $t("mgo") }}</option>
                <option value="mecylinder">{{ $t("mecylinder") }}</option>
                <option value="mesystem">{{ $t("mesystem") }}</option>
                <option value="mesump">{{ $t("mesump") }}</option>
                <option value="gesystem">{{ $t("gesystem") }}</option>
            </select>
            <div class="flex col-span-3 p-3 pl-4 border-l bg-white">
                <input v-model="cc_correction" @keypress="preventNaN($event, cc_correction)" placeholder="00,000.00" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                <MiniUnitDisplay>MT</MiniUnitDisplay>
            </div>
            <div class="col-span-2 row-span-2 text-blue-700 p-3 border-t bg-gray-50 text-14">{{ $t("remarks") }}</div>
            <textarea v-model.trim="cc_remarks" placeholder="Input description here" class="col-span-6 row-span-2 border-t border-l p-3 pl-4 bg-white text-14 text-gray-700 focus:outline-0"></textarea>
        </div>
    </div>
</template>

<script setup>
import preventNaN from '@/utils/helpers';
import { ref, reactive, computed } from 'vue';
import MiniUnitDisplay from '../../components/MiniUnitDisplay.vue'


const cc_lsfo_total = computed(() => +(Number(lsfo_data.me_consumed) + Number(lsfo_data.aux_consumed)
                                    + Number(lsfo_data.boiler_consumed) + Number(lsfo_data.gas_generator_consumed)));
const cc_lsfo_rob = computed(() => (staticValues.lsfoPrevROB - cc_lsfo_total.value));
const cc_mgo_total = computed(() => +(Number(mgo_data.me_consumed) + Number(mgo_data.aux_consumed) 
                                    + Number(mgo_data.boiler_consumed) + Number(mgo_data.gas_generator_consumed)).toFixed(2));;
const cc_mgo_rob = computed(() => (staticValues.mgoPrevROB - cc_mgo_total.value));

const cc_mecylinder_total = ref('');
const cc_mecylinder_rob = computed(() => +(staticValues.mecylPrevROB - cc_mecylinder_total.value).toFixed(2));
const cc_mesystem_total = ref('');
const cc_mesystem_rob = computed(() => +(staticValues.mesysPrevROB - cc_mesystem_total.value).toFixed(2));
const cc_mesump_total = ref('');
const cc_mesump_rob = computed(() => +(staticValues.mesumpPrevROB - cc_mesump_total.value).toFixed(2));
const cc_gesystem_total = ref('');
const cc_gesystem_rob = computed(() => +(staticValues.gesysPrevROB - cc_gesystem_total.value).toFixed(2));

const cc_freshwater_change = computed(() => +(freshwater_data.evaporated - freshwater_data.consumed).toFixed(2))
const cc_freshwater_rob = computed(() => (staticValues.freshwaterPrevROB + cc_freshwater_change.value))

const cc_correction_type = ref('default'), cc_correction = '', cc_remarks = '';

// add correction
const lsfo_data = reactive({
    "fuel_type": "LSFO", 
    "rob": '', 
    "me_consumed": '',
    "aux_consumed": '',
    "boiler_consumed": '',
    "gas_generator_consumed": '',
    "total_consumed": '',
});

const mgo_data = reactive({
    "fuel_type": "MGO", 
    "rob": '', 
    "me_consumed": '',
    "aux_consumed": '',
    "boiler_consumed": '',
    "gas_generator_consumed": '',
    "total_consumed": '',
});

const freshwater_data = reactive({
    "rob": '0', // staticValues.freshwaterPrevROB + cc_freshwater_change
    "consumed": '', // C&C: fresh water consumed
    "evaporated": '', // C&C: fresh water generated
    "correction": 0, // NOT NEEDED; remove from BE
    "remarks": "NIL" // NOT NEEDED; remove from BE
});

const staticValues = {
    distanceLeft: 2300,
    lsfoPrevROB: 200,
    mgoPrevROB: 200,
    mecylPrevROB: 200,
    mesysPrevROB: 200,
    mesumpPrevROB: 200,
    gesysPrevROB: 200,
    freshwaterPrevROB: 200
};
</script>