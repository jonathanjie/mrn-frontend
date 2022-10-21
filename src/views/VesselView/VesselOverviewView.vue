<template>
    <!-- if there are no voyages in backend -->
    <div v-if="isEmpty" class="flex flex-col bg-gray-100 p-24 pb-52 m-12 justify-center content-center items-center space-y-2 rounded-xl">
        <img src="@/assets/icons/empty.svg" class="h-28 w-28"/>
        <span class="text-lg font-bold text-gray-800 pt-3">No Voyage Created</span>
        <span class="text-14 text-gray-500">Click on 'Create New Voyage' above to begin</span>
    </div>
    <div v-else class="bg-gray-50 flex flex-col mt-12">
        <VoyageCard v-for="(voyage, index) in voyages" :key="index" :num="index + ''" :start="portCodeToPortName[voyage.departure_port]" :mid="'TBD'" :dest="portCodeToPortName[voyage.arrival_port]" :expanded="index==0"></VoyageCard>
    </div>
</template>

<script>
import VoyageCard from '../../components/VoyageCard.vue';
import { ref, onMounted } from 'vue';

export default {
    async setup() {
        let isEmpty = false;
        let portCodeToPortName = {
            'SG PPT': 'Singapore',
            'KR USN': 'Ulsan, South Korea'
        };

        const getVoyages = async () => {
            const DUMMY_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjYxbl96VlI1WmFoZ0hLcy1QOEx5MyJ9.eyJpc3MiOiJodHRwczovL2Rldi14eXJoczYwOS5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjM1MGUzZWY2MmNiNTRiMmU5MTcwYjI0IiwiYXVkIjpbImh0dHBzOi8vZGphbmdvLWp3dC10ZXN0LWRhbi9hcGkiLCJodHRwczovL2Rldi14eXJoczYwOS5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjY2MjQ5MzIzLCJleHAiOjE2NjYzMzU3MjMsImF6cCI6ImhuTnRMa0lKQmxuSExEVGhTTDc3Q1lUdTlRRWFXaWpOIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.hMXcvjne_ig6e0_BQbA2vNhxm_cZICEPPZJn9xohGeC0tk6JtzLUr6uRn7gPSuj0nknOx5CadpQkUzFvrK21EC8aF3IixF7-HfyEuq3b2Grc1GgEH-B6kI5ckKf7A87ADYkmSfudDQm04kSx8oAdJGesMtRn0zraXn4nwVKweYEYIXIa6eB9VHMon05GSI7mrknAbHRAjcYMUmhJ1L4TafAonK-SUe4PUQJyniYDCleeA7Bmm-IgychhG7x6szO2Duk6AZxfoXn-QRjv2zVXTh63_9r391N8MAx3gF-qF780Y4tVonZGbHXeHw2yJyGsJC7DCE98R1ddUKw9LCcuZA"
            const response = await fetch('https://testapi.marinachain.io/marinanet/ships/1234567/voyages/', {
                headers: {
                    Authorization: 'Bearer ' + DUMMY_TOKEN,
                    "Content-Type": "application/json"
                },
                method: 'GET'
            });

            const json = response.json()

            console.log(json)

            if (response.length == 0) {
                isEmpty = true;
                console.log("NO DATA")
            }
            return json
        };

        let voyages = await getVoyages()

        return {
            portCodeToPortName,
            isEmpty,
            voyages,
            getVoyages,
        }
    },
    data() {
        return {
            // liuheng: "Liuheng, China",
            // singapore: "Singapore",
            // juayimah: "Juayimah, Saudi Arabia",
            // onsan: "Onsan, South Korea",
            // ras_tanura: "Ras Tanura, Saudi Arabia",
            // busan: "Busan, South Korea",
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
