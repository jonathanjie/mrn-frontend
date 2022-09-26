<template>
    <div class="flex h-20 mx-12 items-center rounded-xl min-w-max z-10" :class="expanded?'bg-blue':'bg-white drop-shadow-md mb-6'">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-6 w-6 -m-0.5"/>
        <span class="text-base font-bold px-1 min-w-fit" :class="expanded?'text-white':'text-gray-700'">VOYAGE NO {{ num }}</span>
        <div class="flex bg-gray-50 h-12 m-3 items-center rounded-xl w-full min-w-fit ml-20">
            <div class="flex justify-between items-center h-px bg-blue-sys800 ml-5 w-full mx-4 my-3">
                <!-- TODO: need to add light blue "already traveled" indicator -->
                <!-- BUG: one voyage card has a thinner line; doesn't look like h-px although all of them have the same h -->
                <CustomButton class="p-1 h-7 text-tiny text-blue min-w-fit rounded-xl z-10">
                    <template v-slot:content>{{ start }}</template> 
                </CustomButton>                
                <img src="@/assets/icons/forward.svg" class="h-4 w-4 z-10"/>
                <CustomButton class="p-1 h-7 text-tiny text-blue min-w-fit rounded-xl z-10">
                    <template v-slot:content>{{ mid }}</template> 
                </CustomButton>             
                <img src="@/assets/icons/forward.svg" class="h-4 w-4 z-10"/>
                <CustomButton class="p-1 h-7 text-tiny text-blue min-w-fit rounded-xl z-10">
                    <template v-slot:content>{{ dest }}</template> 
                </CustomButton>     
            </div>
            <img src="@/assets/icons/forward.svg" class="h-6 w-6 mr-auto"/>
            <span class="text-base text-blue-system ml-16 mr-5 min-w-fit">View journey</span>
        </div>
        <button @click="expanded = !expanded" class="ml-3 mr-4">
            <img src="@/assets/icons/dropdown.svg"/>
        </button>
    </div>
    <div v-show="expanded" class="min-h-fit bg-darkgray mx-12 mb-6 rounded-xl -mt-4 p-5">
        <div class="flex items-center py-5 ">
            <button class="bg-gray-100 rounded-xl h-7 px-2 mr-4 text-gray-700 text-base">All Reports</button>
            <button class="bg-gray-100 rounded-xl h-7 px-2 mr-4 text-gray-700 text-base">Departure</button>
            <button class="bg-gray-100 rounded-xl h-7 px-2 mr-4 text-gray-700 text-base">Arrival</button>
            <button class="bg-gray-100 rounded-xl h-7 px-2 mr-4 text-gray-700 text-base">Noon</button>
            <button class="bg-gray-100 rounded-xl h-7 px-2 mr-4 text-gray-700 text-base">Bunker Delivery</button>
            <CustomButton class="h-9 text-base text-blue-700 rounded-xl ml-auto">
                <template v-slot:content>+Add New Report</template> 
            </CustomButton>
        </div>
       
        <div class="flex flex-col space-y-4">
            <!-- TODO: get data from database -->
            <ReportCard v-bind="dummy"></ReportCard>
            <ReportCard v-bind="dummy2"></ReportCard>
            <ReportCard v-bind="dummy3"></ReportCard>
            <ReportCard v-bind="dummy4"></ReportCard>
            <ReportCard v-bind="dummy5"></ReportCard>
        </div>
    </div>
</template>  

<script>
import CustomButton from ".//CustomButton.vue";
import ReportCard from ".//ReportCard.vue";

export default {
    name: "VoyageCard",
    props: {
        num: {
            type: String,
            required: true,
            default: "0"
        },
        start: {
            type: String,
            required: true,
            default: "Liuheng, China"
        },
        mid: {
            type: String,
            required: true,
            default: "Singapore"
        },
        dest: {
            type: String,
            required: true,
            default: "Juayimah, Saudi Arabia"
        },
        expanded: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    components: {
        CustomButton,
        ReportCard,
    },
    data() {
        return {
            expanded: this.expanded,
            // TODO: need to get data from db 
            dummy: {
                report_type: 2, // Arrival
                report_no: 'Arrival 1',
                departure: 'Onsan',
                arrival: 'Singapore',
                status: 'Anchoring',
                cargold: 'Ballast',
                distance_to_go: '-',
                date_of_submission: '31 May 2022. 12:31 LT'
            },
            dummy2: {
                report_type: 4, // Bunker
                report_no: '2022-4',
                departure: '-',
                arrival: 'Singapore',
                status: 'Anchoring',
                cargold: 'Ballast',
                distance_to_go: '-',
                date_of_submission: '1 June 2022. 10:12 LT'
            },
            dummy3: {
                report_type: 1, // Departure
                report_no: 'Depart 2',
                departure: 'Singapore',
                arrival: 'Ras Tanura',
                status: '-',
                cargold: 'Ballast',
                distance_to_go: '3694',
                date_of_submission: '1 June 2022. 12:23 LT'
            },
            dummy4: {
                report_type: 3, // Noon
                report_no: 'Noon 1',
                departure: 'Singapore',
                arrival: 'Ras Tanura',
                status: 'Sailing',
                cargold: 'Ballast',
                distance_to_go: '3410',
                date_of_submission: '2 June 2022. 12:00 LT'
            },
            dummy5: {
                report_type: 3, // Noon
                report_no: 'Noon 2',
                departure: 'Singapore',
                arrival: 'Ras Tanura',
                status: 'Sailing',
                cargold: 'Ballast',
                distance_to_go: '3117',
                date_of_submission: '3 June 2022. 12:00 LT'
            },
        }
    },
};
</script>
