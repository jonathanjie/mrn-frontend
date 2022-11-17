<template>
    <!-- need to put below two components under one big div and then set min width to child -->
    <!-- <div class="min-w-max"> WHY DOES ADDING THIS PARENT COMPONENT CAUSE EXPANDED SECTION TO OVERLAP?--> 
        <div class="flex h-20 mx-12 items-center rounded-xl min-w-max z-10" :class="expanded?'bg-blue':'bg-white drop-shadow-md mb-6'">
            <img src="@/assets/icons/selected_blue_gradient.svg" class="h-6 w-6 -m-0.5"/>
            <span class="text-14 font-bold px-1 min-w-fit" :class="expanded?'text-white':'text-gray-700'">{{ $t("voyageNo") }} {{ num }}</span>
            <div class="flex bg-gray-50 h-12 m-3 items-center rounded-xl w-full min-w-fit ml-20">
                <div class="flex justify-between items-center h-px bg-sysblue-800 ml-5 w-full mx-4 my-3">
                    <!-- TODO: need to add light blue "already traveled" indicator -->
                    <!-- BUG: one voyage card has a thinner line; doesn't look like h-px although all of them have the same h -->
                    <CustomButton class="p-1 h-7 text-12 text-blue min-w-fit rounded-xl z-10">
                        <template v-slot:content>{{ start }}</template> 
                    </CustomButton>                
                    <img src="@/assets/icons/forward.svg" class="h-4 w-4 z-10"/>
                    <CustomButton class="p-1 h-7 text-12 text-blue min-w-fit rounded-xl z-10">
                        <template v-slot:content>{{ mid }}</template> 
                    </CustomButton>             
                    <img src="@/assets/icons/forward.svg" class="h-4 w-4 z-10"/>
                    <CustomButton class="p-1 h-7 text-12 text-blue min-w-fit rounded-xl z-10">
                        <template v-slot:content>{{ dest }}</template> 
                    </CustomButton>     
                </div>
                <img src="@/assets/icons/forward.svg" class="h-6 w-6 mr-auto"/>
                <span class="text-14 text-sysblue ml-16 mr-5 min-w-fit">{{ $t("viewJourney") }}</span>
            </div>
            <button @click="expanded = !expanded" class="ml-3 mr-4">
                <img src="@/assets/icons/dropdown.svg"/>
            </button>
        </div>
        <div v-show="expanded" class="min-h-fit bg-darkgray mx-12 mb-6 rounded-xl -mt-4 p-5">
            <div class="flex items-center py-5 ">
                <button class="bg-gray-100 rounded-xl h-7 px-2 mr-4 text-gray-700 text-14">{{ $t("allReports") }}</button>
                <button class="bg-gray-100 rounded-xl h-7 px-2 mr-4 text-gray-700 text-14">{{ $t("departure") }}</button>
                <button class="bg-gray-100 rounded-xl h-7 px-2 mr-4 text-gray-700 text-14">{{ $t("arrival") }}</button>
                <button class="bg-gray-100 rounded-xl h-7 px-2 mr-4 text-gray-700 text-14">{{ $t("noon") }}</button>
                <button class="bg-gray-100 rounded-xl h-7 px-2 mr-4 text-gray-700 text-14">{{ $t("bunkerDelivery") }}</button>
                <CustomButton @click="$router.push('add-report')" class="h-9 text-14 text-blue-700 rounded-xl ml-auto">
                    <template v-slot:content>+{{ $t("addNewReport") }}</template> 
                </CustomButton>
            </div>
        
            <!-- TODO: restrict upto 5 most recent reports? -->
            <div class="flex flex-col space-y-4"> 
                <div v-for="(report, index) in reports" :key="index">
                    <ReportCard :report_no="report.report_no" :report_type="report.report_type" :departure="report.departure" :arrival="report.arrival" :status="report.status" :cargold="report.cargold" :distance_to_go="report.distance_to_go" :date_of_submission="report.date_of_submission"></ReportCard>
                </div>
                <ReportCard :report_no="'DEPARTURE'" :report_type="'DEPART'" :departure="'Singapore'" :arrival="'Ulsan'" :status="'Anchoring'" :cargold="'Ballast'" :distance_to_go="'2503'" :date_of_submission="'2022-10-19'"></ReportCard>
                <!-- TEST ITEMS -->
                <!-- <ReportCard :report_no="'ARRIVAL'" :report_type="'ARRIVAL'" :departure="'Singapore'" :arrival="'Ulsan'" :status="'Anchoring'" :cargold="'Ballast'" :distance_to_go="'2503'" :date_of_submission="'2022-10-19'"></ReportCard>
                <ReportCard :report_no="'NOON'" :report_type="'NOON'" :departure="'Singapore'" :arrival="'Ulsan'" :status="'Anchoring'" :cargold="'Ballast'" :distance_to_go="'2503'" :date_of_submission="'2022-10-19'"></ReportCard> -->
            </div>
        </div>
    <!-- </div> -->
</template>  

<script>
import CustomButton from "./Buttons/CustomButton.vue";
import ReportCard from ".//ReportCard.vue";

export default {
    name: "VoyageCard",
    props: {
        num: {
            type: Number,
            required: true,
            default: 0
        },
        start: {
            type: String,
            required: true,
            default: "Singapore"
        },
        mid: {
            type: String,
            required: true,
            default: "Singapore"
        },
        dest: {
            type: String,
            required: true,
            default: "Ulsan, Korea"
        },
        expanded: {
            type: Boolean,
            required: false,
            default: false
        },
        reports: {
            type: Object,
            required: true,
            default: {}
        }
    },
    components: {
        CustomButton,
        ReportCard,
    },
};
</script>
