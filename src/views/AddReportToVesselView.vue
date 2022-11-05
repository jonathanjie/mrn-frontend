<template>
    <div class="bg-gray-50 min-h-screen">
        <!-- <div class="relative bg-gray-100 h-36"> TODO: buggy line, will fix later-->
            <div class="flex flex-col px-24 pt-11">
                <div class="flex items-center mx-5 mb-6">
                    <button @click="$router.push({name: 'vessel-overview'})">
                        <img 
                            src="@/assets/icons/back_arrow.svg" 
                            class="fill-blue float-left" 
                            type="button"
                        >
                    </button>
                    <span class="mx-5 text-20 text-blue">{{ $t("submitNewReport") }}</span>
                </div>
                <div class="grid grid-cols-2 xl:grid-cols-4 gap-5 justify-items-stretch pb-8">
                    <RadioBtnIcon 
                        class="min-w-[188px]"
                        :icon="require('@/assets/icons/noon_report.svg')" 
                        content="Noon" 
                        :active="reportType"
                        @onUpdateBtn="updateActiveReportType">
                    </RadioBtnIcon>
                    <RadioBtnIcon 
                        class="min-w-[188px]"
                        :icon="require('@/assets/icons/depart_report.svg')" 
                        content="Departure" 
                        :active="reportType"
                        @onUpdateBtn="updateActiveReportType">
                    </RadioBtnIcon>
                    <RadioBtnIcon 
                        class="min-w-[188px]"
                        :icon="require('@/assets/icons/arrival_report.svg')" 
                        content="Arrival" 
                        :active="reportType"
                        @onUpdateBtn="updateActiveReportType">
                    </RadioBtnIcon>
                    <RadioBtnIcon 
                        class="min-w-[188px]"
                        :icon="require('@/assets/icons/bunker_report.svg')" 
                        content="Bunker Delivery" 
                        :active="reportType"
                        @onUpdateBtn="updateActiveReportType">
                    </RadioBtnIcon>

                    <!-- TODO: when this page is refrehsed, it should discard any child path -->
                    <!-- NOON -->
                        <!-- TODO: replace detail icons with actual responsive elements? -->
                        <span v-if="reportType == 'Noon'" class="col-span-4 text-blue pt-4">{{ $t("selectCase") }}:</span>
                        <RadoioBtnDetail v-if="reportType == 'Noon'" class="col-span-2"
                            :icon="require('@/assets/icons/report_subtype_sailing_at_sea.svg')" 
                            content="Sailing at sea" 
                            :active="subReportType"
                            @onUpdateBtn="updateActiveSubReportType" 
                            :class="'Sailing at sea' == subReportType ? 'border-green-500 border text-gray-700' :''">
                        </RadoioBtnDetail>
                        <div></div>
                        <RadoioBtnDetail v-if="reportType == 'Noon'" class="col-span-2"
                            :icon="require('@/assets/icons/report_subtype_coastal_water.svg')" 
                            content="Coastal water" 
                            :active="subReportType"
                            @onUpdateBtn="updateActiveSubReportType"
                            :class="'Coastal water' == subReportType ? 'border-green-500 border text-gray-700' :''">
                        </RadoioBtnDetail>
                        <RadoioBtnDetail v-if="reportType == 'Noon'" class="col-span-2"
                            :icon="require('@/assets/icons/report_subtype_in_port.svg')" 
                            content="In port (Berthing, Dry Docking)" 
                            :active="subReportType"
                            @onUpdateBtn="updateActiveSubReportType"
                            :class="'In port (Berthing, Dry Docking)' == subReportType ? 'border-green-500 border text-gray-700' :''">
                        </RadoioBtnDetail>

                    <!-- DEPARTURE: TODO -->
                        <span v-if="reportType == 'Departure'" class="col-span-4 text-blue pt-4">{{ $t("selectDepartureType") }}:</span>
                    
                    <!-- ARRIVAL: TODO -->
                        <span v-if="reportType == 'Arrival'" class="col-span-4 text-blue pt-4">{{ $t("arrivalPort") }}:</span>
                        
                </div>

                <!-- Vue router -->
                <router-view></router-view>
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
import RadioBtnIcon from '../components/RadioBtnIcon.vue'
import RadoioBtnDetail from '../components/RadioBtnDetail.vue'
import router from '@/router'

export default {
    components: {
        RadioBtnIcon,
        RadoioBtnDetail
    }, 
    data() {
        return {
            reportType: '',
            subReportType: '',
        }
    },
    methods: {
        updateActiveReportType(type) {
            this.reportType = type
            router.push({name: 'vessel-report'})
            this.subReportType = ''
        },
        updateActiveSubReportType(type) {
            this.subReportType = type
            if(type=='Sailing at sea') {
                router.push({name: 'noon-sailing-at-sea'})
            } else if(type=='Coastal water') {
                router.push({name: 'noon-coastal-water'})
            } else if(type=='In port (Berthing, Dry Docking)') {
                router.push({name: 'noon-in-port'})
            }
        }
    }
}
</script>