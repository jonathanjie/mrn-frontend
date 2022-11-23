<template>
    <div class="grid bg-white rounded-lg p-5 gap-4 shadow-card" :class="isYellow ? 'border border-yellow-500' : ''">
        <div>
            <div class="flex items-center">
                <img v-if="isYellow" src="@/assets/icons/selected_yellow_gradient.svg" class="h-5 w-5"/>
                <img v-else src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-16" :class="isYellow ? 'text-yellow-700' : 'text-blue-700'">
                    <slot>{{ $t("consumptionAndCondition") }}</slot>    
                </span>
            </div>
            <span v-if="hasDetail" class="text-14 text-gray-600 mt-2">{{ $t('lastReportToSbyForDeparture') }}</span>
        </div>
        
        <div class="grid grid-cols-30">
            <div class="col-span-6 px-6 border-l border-t"></div>
            <div class="col-span-2 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("me") }}</div>
            <div class="col-span-2 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("ge") }}</div>
            <div class="col-span-2 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("blr") }}</div>
            <div class="col-span-2 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("igg") }}</div>
            <div class="col-span-4 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("totalConsumption") }}</div>
            <div class="col-span-4 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("receipt") }}</div>
            <div class="col-span-4 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("debunkering") }}</div>
            <div class="col-span-4 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-x bg-gray-50 text-14">{{ $t("remainOnBoard") }}</div>

            <div class="col-span-4 row-span-2 flex p-3 border-l border-t border-green-200 bg-green-100/50">
                <div class="self-center text-green-800 text-12">{{ $t("fuelOilInMT") }}</div>
            </div>
                <div class="col-span-2 text-green-800 p-3 border-t border-l border-green-100 bg-green-25 text-14">{{ $t("lsfo") }}</div>
                <input v-model="lsfo.me_consumed" @keypress="preventNaN($event, lsfo.me_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="lsfo.aux_consumed" @keypress="preventNaN($event, lsfo.aux_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="lsfo.boiler_consumed" @keypress="preventNaN($event, lsfo.boiler_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="lsfo.gas_generator_consumed" @keypress="preventNaN($event, lsfo.gas_generator_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-4 text-gray-400 p-3 border-t border-l bg-gray-25 text-14">{{ lsfo_total }}</div>
                <input v-model="lsfo.receipt" @keypress="preventNaN($event, lsfo.receipt)" placeholder="0" class="col-span-4 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="lsfo.debunkering" @keypress="preventNaN($event, lsfo.debunkering)" placeholder="0" class="col-span-4 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-4 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ lsfo_rob }}</div>
                
                <div class="col-span-2 text-green-800 p-3 border-t border-l border-green-100 bg-green-25 text-14">{{ $t("mgo") }}</div>
                <input v-model="mgo.me_consumed" @keypress="preventNaN($event, mgo.me_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="mgo.aux_consumed" @keypress="preventNaN($event, mgo.aux_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="mgo.boiler_consumed" @keypress="preventNaN($event, mgo.boiler_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="mgo.gas_generator_consumed" @keypress="preventNaN($event, mgo.gas_generator_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-4 text-gray-400 p-3 border-t border-l bg-gray-25 text-14">{{ mgo_total }}</div>
                <input v-model="mgo.receipt" @keypress="preventNaN($event, mgo.receipt)" placeholder="0" class="col-span-4 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="mgo.debunkering" @keypress="preventNaN($event, mgo.debunkering)" placeholder="0" class="col-span-4 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-4 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ mgo_rob }}</div>

            <div class="col-span-4 row-span-4 flex p-3 border-t border-l border-yellow-200 bg-yellow-100/50">
                <div class="self-center text-yellow-800 text-12">{{ $t("lubricateOilInL") }}</div>
            </div>
                <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">{{ $t("meCylinder") }}</div>
                    <input v-model="lubricate.mecylinder_total" @keypress="preventNaN($event, lubricate.mecylinder_total)" placeholder="0" class="col-span-4 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="lubricate.mecylinder_receipt" @keypress="preventNaN($event, lubricate.mecylinder_receipt)" placeholder="0" class="col-span-4 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="lubricate.mecylinder_debunkering" @keypress="preventNaN($event, lubricate.mecylinder_debunkering)" placeholder="0" class="col-span-4 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-4 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ mecylinder_rob }}</div>
                <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">{{ $t("meSystem") }}</div>
                    <input v-model="lubricate.mesystem_total" @keypress="preventNaN($event, lubricate.mesystem_total)" placeholder="0" class="col-span-4 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="lubricate.mesystem_receipt" @keypress="preventNaN($event, lubricate.mesystem_receipt)" placeholder="0" class="col-span-4 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="lubricate.mesystem_debunkering" @keypress="preventNaN($event, lubricate.mesystem_debunkering)" placeholder="0" class="col-span-4 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-4 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ mesystem_rob }}</div>
                <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">{{ $t("meSump") }}</div>
                    <input v-model="lubricate.mesump_total" @keypress="preventNaN($event, lubricate.mesump_total)" placeholder="0" class="col-span-4 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="lubricate.mesump_receipt" @keypress="preventNaN($event, lubricate.mesump_receipt)" placeholder="0" class="col-span-4 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="lubricate.mesump_debunkering" @keypress="preventNaN($event, lubricate.mesump_debunkering)" placeholder="0" class="col-span-4 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-4 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ mesump_rob }}</div>
                <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">{{ $t("geSystem") }}</div>
                    <input v-model="lubricate.gesystem_total" @keypress="preventNaN($event, lubricate.gesystem_total)" placeholder="0" class="col-span-4 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="lubricate.gesystem_receipt" @keypress="preventNaN($event, lubricate.gesystem_receipt)" placeholder="0" class="col-span-4 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="lubricate.gesystem_debunkering" @keypress="preventNaN($event, lubricate.gesystem_debunkering)" placeholder="0" class="col-span-4 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-4 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ gesystem_rob }}</div>

            <div class="col-span-4 row-span-2 flex p-3 border-y border-l border-blue-200 bg-sysblue-100/50">
                <div class="self-center text-sysblue-800 text-12">{{ $t("freshWaterInTon") }}</div>
            </div>
                <div class="col-span-5 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">{{ $t("consumed") }}</div>
                <div class="col-span-5 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">{{ $t("generated") }}</div>
                <div class="col-span-4 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">+/-</div>
                <div class="col-span-4 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">{{ $t("receiving") }}</div>
                <div class="col-span-4 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">{{ $t("discharging") }}</div>
                <div class="col-span-4 text-sysblue-800 p-3 border-t border-x border-sysblue-100 bg-sysblue-25 text-14">{{ $t("rob") }}</div>
                <input v-model="freshwater.consumed" @keypress="preventNaN($event, freshwater.consumed)" placeholder="0" class="col-span-5 p-3 pl-4 border-y border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="freshwater.evaporated" @keypress="preventNaN($event, freshwater.evaporated)" placeholder="0" class="col-span-5 p-3 pl-4 border-y border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-4 text-gray-400 p-3 border-y border-l bg-gray-25 text-14">{{ freshwater_change }}</div>
                <input v-model="freshwater.receiving" @keypress="preventNaN($event, freshwater.receiving)" placeholder="0" class="col-span-4 p-3 pl-4 border-y border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="freshwater.discharging" @keypress="preventNaN($event, freshwater.discharging)" placeholder="0" class="col-span-4 p-3 pl-4 border-y border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-4 text-gray-400 p-3 border-y border-x bg-gray-25 text-14">{{ freshwater_rob }}</div>
        </div>
        
        <div class="grid grid-cols-8 border">
            <div class="col-span-2 text-blue-700 p-3 bg-gray-50 text-14">{{ $t("correction") }}</div>
            <!-- TODO: make dynamic -->
            <select v-model="correction.type" class="col-span-3 p-3 border-l text-14 focus:border-0" :class="correction.type === 'default' ? 'text-gray-400' : 'text-gray-700'" >
                <option selected disabled value="default">{{ $t("selectType") }}</option>
                <option value="lsfo">{{ $t("lsfo") }}</option>
                <option value="mgo">{{ $t("mgo") }}</option>
                <option value="mecylinder">{{ $t("mecylinder") }}</option>
                <option value="mesystem">{{ $t("mesystem") }}</option>
                <option value="mesump">{{ $t("mesump") }}</option>
                <option value="gesystem">{{ $t("gesystem") }}</option>
            </select>
            <div class="flex col-span-3 p-3 pl-4 border-l bg-white">
                <input v-model="correction.change" @keypress="preventNaN($event, correction.change)" placeholder="00,000.00" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                <MiniUnitDisplay>MT</MiniUnitDisplay>
            </div>
            <div class="col-span-2 row-span-2 text-blue-700 p-3 border-t bg-gray-50 text-14">{{ $t("remarks") }}</div>
            <textarea v-model.trim="correction.remarks" placeholder="Input description here" class="col-span-6 row-span-2 border-t border-l p-3 pl-4 bg-white text-14 text-gray-700 focus:outline-0"></textarea>
        </div>
    </div>
</template>

<script setup>
import { preventNaN } from '@/utils/helpers';
import { ref, reactive, computed, defineProps } from 'vue';
import MiniUnitDisplay from '../../components/MiniUnitDisplay.vue'

// TODO: incorporate receipt / debunkering to formula
const lsfo_total = computed(() => +(Number(lsfo.me_consumed) + Number(lsfo.aux_consumed)
                                    + Number(lsfo.boiler_consumed) + Number(lsfo.gas_generator_consumed)));
const lsfo_rob = computed(() => (tempValues.lsfoPrevROB - lsfo_total.value + Number(lsfo.receipt) - Number(lsfo.debunkering)));

const mgo_total = computed(() => +(Number(mgo.me_consumed) + Number(mgo.aux_consumed) 
                                    + Number(mgo.boiler_consumed) + Number(mgo.gas_generator_consumed)).toFixed(2));;
const mgo_rob = computed(() => (tempValues.mgoPrevROB - mgo_total.value + Number(mgo.receipt) - Number(mgo.debunkering)));

const mecylinder_rob = computed(() => +(tempValues.mecylPrevROB - lubricate.mecylinder_total 
                                        + Number(lubricate.mecylinder_receipt) - Number(lubricate.mecylinder_debunkering)).toFixed(2));
const mesystem_rob = computed(() => +(tempValues.mesysPrevROB - lubricate.mesystem_total 
                                        + Number(lubricate.mesystem_receipt) - Number(lubricate.mesystem_receipt)).toFixed(2));
const mesump_rob = computed(() => +(tempValues.mesumpPrevROB - lubricate.mesump_total
                                    + Number(lubricate.mesump_receipt) - Number(lubricate.mesump_debunkering)).toFixed(2));
const gesystem_rob = computed(() => +(tempValues.gesysPrevROB - lubricate.gesystem_total
                                    + Number(lubricate.gesystem_receipt) - Number(lubricate.gesystem_debunkering)).toFixed(2));

const freshwater_change = computed(() => +(freshwater.evaporated - freshwater.consumed).toFixed(2))
const freshwater_rob = computed(() => (tempValues.freshwaterPrevROB + freshwater_change.value + Number(freshwater.receiving) - Number(freshwater.discharging)))

const lsfo = reactive({
    "fuel_type": "LSFO", 
    "rob": '', 
    "me_consumed": '',
    "aux_consumed": '',
    "boiler_consumed": '',
    "gas_generator_consumed": '',
    "total_consumed": '',
    "receipt": '',
    "debunkering": '',
});

const mgo = reactive({
    "fuel_type": "MGO", 
    "rob": '', 
    "me_consumed": '',
    "aux_consumed": '',
    "boiler_consumed": '',
    "gas_generator_consumed": '',
    "total_consumed": '',
    "receipt": '',
    "debunkering": '',
});

const lubricate = reactive({
    "mecylinder_total": '',
    "mecylinder_receipt": '',
    "mecylinder_debunkering": '',
    "mesystem_total": '',
    "mesystem_receipt": '',
    "mesystem_debunkering": '',
    "mesump_total": '',
    "mesump_receipt": '',
    "mesump_debunkering": '',
    "gesystem_total": '',
    "gesystem_receipt": '',
    "gesystem_debunkering": '',
})

const correction = reactive({
    "type": 'default',
    "change": '',
    "remarks": ''
})

const freshwater = reactive({
    "rob": '0', 
    "consumed": '',
    "evaporated": '',
    "correction": 0,
    "remarks": "NIL",
    "receiving": '',
    "discharging": ''
});

const tempValues = {
    distanceLeft: 2300,
    lsfoPrevROB: 200,
    mgoPrevROB: 200,
    mecylPrevROB: 200,
    mesysPrevROB: 200,
    mesumpPrevROB: 200,
    gesysPrevROB: 200,
    freshwaterPrevROB: 200
};

const props = defineProps({
    isYellow: {
        type: Boolean,
        required: false,
        default: false,
    },
    hasDetail: {
        type: Boolean,
        required: false,
        default: false,
    },
})
</script>
