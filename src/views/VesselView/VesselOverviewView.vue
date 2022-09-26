<template>
    <!-- if there are no voyages in backend -->
    <div v-if="isEmpty" class="flex flex-col bg-gray-100 p-24 pb-52 m-12 justify-center content-center items-center space-y-2 rounded-xl">
        <img src="@/assets/icons/empty.svg" class="h-28 w-28"/>
        <span class="text-lg font-bold text-gray-800 pt-3">No Voyage Created</span>
        <span class="text-base text-gray-500">Click on 'Create New Voyage' above to begin</span>
    </div>
    <div v-else class="bg-gray-50 flex flex-col mt-12">
        <VoyageCard num="3" :start="busan" :mid="liuheng" :dest="juayimah" :expanded="true"></VoyageCard>
        <VoyageCard num="2" :start="liuheng" :mid="singapore" :dest="juayimah"></VoyageCard>
        <VoyageCard num="1" :start="onsan" :mid="singapore" :dest="ras_tanura"></VoyageCard>
    </div>
</template>

<script>
import VoyageCard from '../../components/VoyageCard.vue'
// import isEmpty from './/VesselView.vue'

export default {
    setup() {
        const isEmpty = false; // TODO: get from VesselView.vue; this is only for test/dev purposes
        return {
            isEmpty,
        }
    },
    data() {
        return {
            liuheng: "Liuheng, China",
            singapore: "Singapore",
            juayimah: "Juayimah, Saudi Arabia",
            onsan: "Onsan, South Korea",
            ras_tanura: "Ras Tanura, Saudi Arabia",
            busan: "Busan, South Korea",
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
    components: {
        VoyageCard,
    },
};
</script>
