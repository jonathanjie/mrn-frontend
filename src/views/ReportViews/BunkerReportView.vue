<template>
    <div class="flex flex-col space-y-6 my-2 mb-6">
        <div class="flex text-gray-700 space-x-3 text-16">
            <span class="text-gray-500">{{ $t("arrivalPort") + ":" }}</span>
            <input type="radio" name="arrival_port" id="beforeArrival" value="0" v-model="data.arrival_port">
			<label for="beforeArrival" class="mr-1">{{ $t("beforeArrival") }}</label>
            <input type="radio" name="arrival_port" id="afterArrival" value="1" v-model="data.arrival_port">
			<label for="afterArrival">{{ $t("afterArrival") }}</label>
        </div>

        <!-- Overview -->
        <Overview></Overview>

        <!-- Bunkering Port -->
        <BunkeringPort></BunkeringPort>

        <!-- Received Bunker Detail -->
        <ReceivedBunkerDetail></ReceivedBunkerDetail>

        <!-- Bunker Date and Time & Supplier -->
        <DateAndTimeBunker></DateAndTimeBunker>

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
import GradientButton from '@/components/Buttons/GradientButton.vue'
import CustomButton from '@/components/Buttons/CustomButton.vue'

import Overview from  '@/components/ReportComponents/Overview.vue'
import BunkeringPort from  '@/components/ReportComponents/BunkeringPort.vue'
import ReceivedBunkerDetail from  '@/components/ReportComponents/ReceivedBunkerDetail.vue'
import DateAndTimeBunker from  '@/components/ReportComponents/DateAndTimeBunker.vue'

const data = {
    "arrival_port": ''
}

</script>

<style lang="scss">
$dp__font_family: "Manrope";
$dp__font_size: 0.875rem;
$dp__border_radius: 0px;
$dp__input_padding: 12px 12px;
$dp__input_icon_padding: 14px;

@import 'node_modules/@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss';

.dp__theme_light {
	--dp-background-color: #ffffff;
	--dp-text-color: #212121;
	--dp-hover-color: #f3f3f3;
	--dp-hover-text-color: #0093B8;
	--dp-hover-icon-color: #0093B8;
	--dp-primary-color: #0093B8;
	--dp-primary-text-color: #f8f5f5;
	--dp-secondary-color: #c0c4cc;
	--dp-border-color: #FFFFFF;
	--dp-menu-border-color: #ddd;
	--dp-border-color-hover: #FFFFFF;
	--dp-disabled-color: #f6f6f6;
	--dp-scroll-bar-background: #f3f3f3;
	--dp-scroll-bar-color: #959595;
	--dp-success-color: #0093B8;
	--dp-success-color-disabled: #a3d9b1;
	--dp-icon-color: #959595;
	--dp-danger-color: #ff6f60;
	--dp-highlight-color: rgba(25, 118, 210, 0.1);
}
</style>