<template>
	<TabsWrapper class="mt-5">
		<Tab :title="$t('sbyForDeparture')">
			<div class="flex flex-col space-y-6 my-6">
				<!-- Overview -->
                <Overview></Overview>

				<!-- Departure and Destination -->
                <DepartureAndDestination></DepartureAndDestination>

				<!-- Cargo Operation -->
                <CargoOperation></CargoOperation>

				<!-- Vessel Condition at Departure -->
                <VesselConditionAtDeparture></VesselConditionAtDeparture>

				<!-- Consumption & Condition (departure ver.) -->
                <ConsumptionAndConditionFull :has-detail="true"></ConsumptionAndConditionFull>

				<!-- Consumption & Condition (Harbour/In Port in Total) -->
                <ConsumptionAndConditionFull :is-yellow="true">{{ $t("consumptionAndConditionHarbourInPortInTotal") }}</ConsumptionAndConditionFull>
			</div>

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
		</Tab>

		<Tab :title="$t('cosp')">
			<div class="flex flex-col space-y-6 mt-6">
				<!-- Overview -->
                <Overview></Overview>

                <!-- Departure and Destination TODO: may need to disable some fields -->
                <DepartureAndDestination></DepartureAndDestination>

                <!-- Pilot Station - Departure (same format as arrival report's pilot arrival)-->
                <PilotStationArrival>{{ $t("pilotStationDeparture") }}</PilotStationArrival>

                <!-- Pilot Station - Arrival (component name is purposefully flipped)-->
                <PilotStationDeparture>{{ $t("pilotStationArrival") }}</PilotStationDeparture>

                <!-- Distance & Time (R/UP Engine) & S/BY to R/UP (In Harbour)-->
                <DistanceAndTimeCOSP></DistanceAndTimeCOSP>

                <!-- Budget Trans Ocean (Pilot to Pilot) -->
                <BudgetTransOcean></BudgetTransOcean>

                <!-- Consumption & Condition (S/BY to R/UP) -->
                <ConsumptionAndCondition>{{ $t('consumptionAndConditionSbyToRup') }}</ConsumptionAndCondition>
			</div>

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
		</Tab>
	</TabsWrapper>
</template>

<script setup>
import TabsWrapper from '../../components/Tabs/TabsWrapper.vue'
import Tab from '../../components/Tabs/Tab.vue'

import GradientButton from '@/components/Buttons/GradientButton.vue'
import CustomButton from '@/components/Buttons/CustomButton.vue'

import Overview from  '@/components/ReportComponents/Overview.vue'
import DepartureAndDestination from  '@/components/ReportComponents/DepartureAndDestination.vue'
import CargoOperation from  '@/components/ReportComponents/CargoOperation.vue'
import VesselConditionAtDeparture from  '@/components/ReportComponents/VesselConditionAtDeparture.vue'
import ConsumptionAndConditionFull from  '@/components/ReportComponents/ConsumptionAndConditionFull.vue'
import PilotStationArrival from  '@/components/ReportComponents/PilotStationArrival.vue'
import PilotStationDeparture from  '@/components/ReportComponents/PilotStationDeparture.vue'
import DistanceAndTimeCOSP from  '@/components/ReportComponents/DistanceAndTimeCOSP.vue'
import BudgetTransOcean from  '@/components/ReportComponents/BudgetTransOcean.vue'
import ConsumptionAndCondition from  '@/components/ReportComponents/ConsumptionAndCondition.vue'

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