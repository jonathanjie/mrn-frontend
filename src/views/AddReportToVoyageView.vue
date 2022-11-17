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
                        :icon="require('@/assets/icons/noon_report.svg')" 
                        content="Noon" 
                        type="noon"
                        :active="reportType"
                        @onUpdateBtn="updateActiveReportType">
                    </RadioBtnIcon>
                    <RadioBtnIcon 
                        :icon="require('@/assets/icons/depart_report.svg')" 
                        content="Departure" 
                        type="departure"
                        :active="reportType"
                        @onUpdateBtn="updateActiveReportType">
                    </RadioBtnIcon>
                    <RadioBtnIcon 
                        :icon="require('@/assets/icons/arrival_report.svg')" 
                        content="Arrival" 
                        type="arrival"
                        :active="reportType"
                        @onUpdateBtn="updateActiveReportType">
                    </RadioBtnIcon>
                    <RadioBtnIcon 
                        :icon="require('@/assets/icons/bunker_report.svg')" 
                        content="Bunker Delivery" 
                        type="bdn"
                        :active="reportType"
                        @onUpdateBtn="updateActiveReportType">
                    </RadioBtnIcon>
                </div>

                <!-- TODO: when this page is refrehsed, it should discard any child path -->
                <!-- NOON -->
                    <span v-if="reportType == 'noon'" class="col-span-4 flex flex-col bg-green-25/[0.24] text-green-800 font-bold text-12 p-5 mb-6 h-min-fit min-w-fit rounded-xl inline-flex border-green-400 border">
                        <span class="pb-3">{{ $t('sailingAtSea') }}</span>
                        <img class="lg:hidden" src="@/assets/icons/report_subtype_sailing_at_sea.svg">
                        <img class="hidden lg:block" src="@/assets/icons/report_subtype_sailing_at_sea_long.svg">
                    </span>

                <!-- DEPARTURE: TODO -->
                    <!-- <span v-if="reportType == 'Departure'" class="col-span-4 text-blue pt-4">{{ $t("selectDepartureType") }}:</span> -->
                
                <!-- ARRIVAL: TODO -->
                    <!-- <span v-if="reportType == 'Arrival'" class="col-span-4 text-blue pt-4">{{ $t("arrivalPort") }}:</span> -->
                
                <!-- Vue router -->
                <router-view></router-view>
        </div>
    </div>
</template>

<script>
import RadioBtnIcon from '../components/Buttons/RadioBtnIcon.vue'
import RadoioBtnDetail from '../components/Buttons/RadioBtnDetail.vue'
import router from '@/router'

export default {
    components: {
        RadioBtnIcon,
        RadoioBtnDetail
    }, 
    data() {
        return {
            reportType: this.$route.name
        }
    },
    methods: {
        updateActiveReportType(type) {
            this.reportType = type
            router.push({name: type})
        },
    }
}
</script>