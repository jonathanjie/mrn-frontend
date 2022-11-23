<template>
    <div class="flex flex-col space-y-6 my-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <RadioBtnDetail
                :icon="require('@/assets/icons/in_port.svg')"
                :content="$t('inPortBerthingShiftingDryDocking')" 
                type="in_port"
                :active="reportType"
                @onUpdateBtn="updateActiveReportType">
            </RadioBtnDetail>
            <RadioBtnDetail
                :icon="require('@/assets/icons/coastal_water.svg')"
                :content="$t('coastalWaterAnchoringDrifting')" 
                type="coastal_water"
                :active="reportType"
                @onUpdateBtn="updateActiveReportType">
            </RadioBtnDetail>
        </div>

        <!-- Overview -->
        <HarbourPortOverview></HarbourPortOverview>

        <!-- Report -->
        <HarbourPortReport></HarbourPortReport>

        <!-- Consumption & Condition -->
        <ConsumptionAndConditionFull>{{ $t("consumptionAndConditionLastReportEventNoon") }}</ConsumptionAndConditionFull>

         <!-- Save and Send -->
        <div class="flex justify-end space-x-4 my-6">
            <CustomButton class="p-3 text-14" type="button" v-on:click="saveChanges()">
                <!-- TODO: need alternate function for saving changes to backend -->
                <template v-slot:content>{{ $t("saveChanges") }}</template> 
            </CustomButton>
            <GradientButton class="p-3 text-14" type="button" v-on:click="sendReport()">
                <!-- TODO: need alternate function for saving changes to backend -->
                <template v-slot:content>{{ $t("sendReport") }}</template> 
            </GradientButton>
        </div>    
    </div>
</template>


<script setup>
import RadioBtnDetail from '../../components/Buttons/RadioBtnDetail.vue'
import HarbourPortOverview from '../../components/ReportComponents/HarbourPortOverview.vue'
import HarbourPortReport from '../../components/ReportComponents/HarbourPortReport.vue'
import ConsumptionAndConditionFull from '../../components/ReportComponents/ConsumptionAndConditionFull.vue'
import CustomButton from '../../components/Buttons/CustomButton.vue'
import GradientButton from '../../components/Buttons/GradientButton.vue'

import { ref } from 'vue'

let reportType = ref('')

const updateActiveReportType = (type) => {
    reportType.value = type
}
</script>
