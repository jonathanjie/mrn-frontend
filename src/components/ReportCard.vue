<template>
    <div class="flex h-20 items-center justify-between rounded-xl bg-gray-50">
        <img v-if="report_type=='DEPART'" src="@/assets/icons/depart_report.svg" class="h-10 w-10 m-5"/>
        <img v-if="report_type=='ARRIVAL'" src="@/assets/icons/arrival_report.svg" class="h-10 w-10 m-5"/>
        <img v-if="report_type=='NOON'" src="@/assets/icons/noon_report.svg" class="h-10 w-10 m-5"/>
        <img v-if="report_type=='BUNKER'" src="@/assets/icons/bunker_report.svg" class="h-10 w-10 m-5"/>
        <div class="flex flex-col w-28 mr-3">
            <span class="text-12 text-gray-400">Report no.</span>
            <span class="text-14 text-gray-700">{{ report_no }}</span>
        </div>
        <div class="flex flex-col w-20 mr-3">
            <span class="text-12 text-gray-400">Departure</span>
            <span class="text-14 text-gray-700">{{ departure }}</span>
        </div>
        <div class="flex flex-col w-20 mr-3">
            <span class="text-12 text-gray-400">Arrival</span>
            <span class="text-14 text-gray-700">{{ arrival }}</span>
        </div>
        <div class="flex flex-col w-24 mr-3">
            <span class="text-12 text-gray-400">Status</span>
            <span class="text-14 text-gray-700">{{ status }}</span>
        </div>
        <div class="flex flex-col w-24 mr-3">
            <span class="text-12 text-gray-400">Cargo L/D</span>
            <span class="text-14 text-gray-700">{{ cargold }}</span>
        </div>
        <div class="flex flex-col w-20 mr-3">
            <span class="text-12 text-gray-400">Distance left</span>
            <span class="text-14 text-gray-700">{{ distance_to_go }}</span>
        </div>
        <div class="flex flex-col w-28 mr-3">
            <span class="text-12 text-gray-400">Date of Submission</span>
            <span class="text-14 text-gray-700">{{ date_of_submission }}</span>
        </div>
        <!-- margin set to make total width of all icons equal, but may need to update if there is a better way to do this -->
        <!-- TODO: all margins should be set to match bunker -->
        <img v-if="report_type=='DEPART'" src="@/assets/icons/depart_icon.svg" class="mr-1"/>
        <img v-if="report_type=='ARRIVAL'" src="@/assets/icons/arrival_icon.svg" class="mr-7"/>
        <img v-if="report_type=='NOON'" src="@/assets/icons/noon_icon.svg" class="mr-[34px]"/>
        <img v-if="report_type=='BUNKER'" src="@/assets/icons/bunker_icon.svg" class="m-3"/>
        <img src="@/assets/icons/detail.svg" class="w-9 h-9 mr-5"/>   
    </div>
</template>

<script>
export default {
    name: "ReportCard",
    props: {
        report_type: {
            type: String,
            required: false,
            default: 'NOON'
        },
        report_no: {
            type: String,
            required: true,
            default: "REPORT"
        },
        departure: {
            type: String,
            required: false,
            default: "DEPARTURE"
        },
        arrival: {
            type: String,
            required: false,
            default: "ARRIVAL"
        },
        status: {
            type: String, // TODO: enum - Anchoring/Sailing/...
            required: false,
            default: "STATUS"
        },
        cargold: {
            type: String,
            required: false,
            default: "CARGO L/D"
        },
        distance_to_go: {
            type: String, // TODO: enum - change to Number after backend
            required: false,
            default: '-'
        },
        date_of_submission: {
            type: String, // TODO: enum - change to Date after backend
            required: false,
            default: 'DATE'
        },
    },
};
</script>
