<template>
	<div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
		<div class="col-span-2 flex items-center">
			<img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
			<span class="text-blue-700 text-16">
				<slot>{{ $t("budgetTransOceanPilotToPilot") }}</slot>
			</span>
		</div>
		<div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50 text-14">
			<span class="col-span-2 text-blue-700 border-b p-3 self-center">{{ $t("distance") }}</span>
			<div class="flex col-span-3 p-2 pl-4 border-b border-l bg-white">
				<input v-model="data.distance" 
					@keypress="preventNaN($event, data.distance)" 
					placeholder="00000" 
					class="w-24 text-gray-700 focus:outline-0"
				/>
				<MiniUnitDisplay>NM</MiniUnitDisplay>
			</div>
			<span class="col-span-2 text-blue-700 p-3 self-center">{{ $t("speed") }}</span>
			<div class="flex col-span-3 p-2 pl-4 border-l bg-white">
				<input v-model="data.speed" 
					@keypress="preventNaN($event, data.speed)" 
					placeholder="00.00" 
					class="w-24 text-gray-700 focus:outline-0"
				/>
				<MiniUnitDisplay>KNOTS</MiniUnitDisplay>
			</div>
		</div>
        <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50 text-14">
			<span class="col-span-2 text-blue-700 border-b p-3 self-center">{{ $t("meDailyFOCons") }}</span>
			<div class="flex col-span-3 p-2 pl-4 border-b border-l bg-white">
				<input v-model="data.daily_FO_cons" 
					@keypress="preventNaN($event, data.daily_FO_cons)" 
					placeholder="000.00" 
					class="w-24 text-gray-700 focus:outline-0"
				/>
				<MiniUnitDisplay>M/T</MiniUnitDisplay>
			</div>
			<span class="col-span-2 text-blue-700 p-3 self-center">{{ $t("meRPM") }}</span>
			<div class="flex col-span-3 p-2 pl-4 border-l bg-white">
				<input v-model="data.rpm" 
					@keypress="preventNaN($event, data.rpm)" 
					placeholder="000.00" 
					class="w-24 text-gray-700 focus:outline-0"
				/>
				<MiniUnitDisplay>RPM</MiniUnitDisplay>
			</div>
		</div>
	</div>
</template>

<script setup>
import { preventNaN } from '@/utils/helpers.js'
import { reactive } from 'vue';
import MiniUnitDisplay from '../../components/MiniUnitDisplay.vue'

const data = reactive({
    "distance": '', 
    "speed": '', 
    "daily_FO_cons": '',
    "rpm": '',
});
</script>
