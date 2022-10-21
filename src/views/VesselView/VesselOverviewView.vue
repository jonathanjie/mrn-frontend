<template>
    <!-- if there are no voyages in backend -->
    <div v-if="isEmpty" class="flex flex-col bg-gray-100 p-24 pb-52 m-12 justify-center content-center items-center space-y-2 rounded-xl">
        <img src="@/assets/icons/empty.svg" class="h-28 w-28"/>
        <span class="text-lg font-bold text-gray-800 pt-3">No Voyage Created</span>
        <span class="text-14 text-gray-500">Click on 'Create New Voyage' above to begin</span>
    </div>
    <div v-else class="bg-gray-50 flex flex-col mt-12">
        <VoyageCard v-for="(voyage, index) in voyages" :key="index" :num="voyage.voyage_num" :start="portCodeToPortName[voyage.departure_port]" :mid="'At Sea'" :dest="portCodeToPortName[voyage.arrival_port]" :reports="reports[voyage.uuid]" :expanded="index==0"></VoyageCard>
    </div>
</template>

<script>
import VoyageCard from '../../components/VoyageCard.vue';

export default {
    async setup() {
        let isEmpty = false;
        let portCodeToPortName = {
            'SG PPT': 'Singapore',
            'KR USN': 'Ulsan, South Korea'
        };

        const getReports = async (voyage_uuid) => {
            const DUMMY_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjYxbl96VlI1WmFoZ0hLcy1QOEx5MyJ9.eyJpc3MiOiJodHRwczovL2Rldi14eXJoczYwOS5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjM1MGUzZWY2MmNiNTRiMmU5MTcwYjI0IiwiYXVkIjpbImh0dHBzOi8vZGphbmdvLWp3dC10ZXN0LWRhbi9hcGkiLCJodHRwczovL2Rldi14eXJoczYwOS5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjY2MzM5Mzg2LCJleHAiOjE2NjY0MjU3ODYsImF6cCI6ImhuTnRMa0lKQmxuSExEVGhTTDc3Q1lUdTlRRWFXaWpOIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.kKPkLOSHUZXYZuEqcAqVT7isB2zcc8sLrbx28LOcdDi3WY6rG56kC-W3w0E8WSn0Km5rl-15YGF0L_p6l-rmnxXRDvvMKRiKbjw407SNdZDlyLDjD6cV_Js2nF1RjSHXTyriTWN70sFVuUeGPDBQWcIw1GA-uGK5sVMtyMT_nmCsiNY8onoxZDqxpUPuH9gIhuzpN5zOxcd-b1NM2AnzHQuyNmOVyqlankYbwS1FnajH3HLt0EUsMC0cvOlbSPUN6XOgOqA3Y12_zSEK41oJnsquozB9YWNC1RmH6--ehMOTDet_2uDD56EopPlhYR7vt_sYnHULt60EO5Q_Ip3bKg"
            const response = await fetch(`https://testapi.marinachain.io/marinanet/voyages/${voyage_uuid}/reports`, {
                headers: {
                    Authorization: 'Bearer ' + DUMMY_TOKEN,
                    "Content-Type": "application/json"
                },
                method: 'GET'
            });

            const json = response.json()
            console.log(json)

            return json
        }

        const getVoyages = async () => {
            const DUMMY_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjYxbl96VlI1WmFoZ0hLcy1QOEx5MyJ9.eyJpc3MiOiJodHRwczovL2Rldi14eXJoczYwOS5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjM1MGUzZWY2MmNiNTRiMmU5MTcwYjI0IiwiYXVkIjpbImh0dHBzOi8vZGphbmdvLWp3dC10ZXN0LWRhbi9hcGkiLCJodHRwczovL2Rldi14eXJoczYwOS5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjY2MzM5Mzg2LCJleHAiOjE2NjY0MjU3ODYsImF6cCI6ImhuTnRMa0lKQmxuSExEVGhTTDc3Q1lUdTlRRWFXaWpOIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.kKPkLOSHUZXYZuEqcAqVT7isB2zcc8sLrbx28LOcdDi3WY6rG56kC-W3w0E8WSn0Km5rl-15YGF0L_p6l-rmnxXRDvvMKRiKbjw407SNdZDlyLDjD6cV_Js2nF1RjSHXTyriTWN70sFVuUeGPDBQWcIw1GA-uGK5sVMtyMT_nmCsiNY8onoxZDqxpUPuH9gIhuzpN5zOxcd-b1NM2AnzHQuyNmOVyqlankYbwS1FnajH3HLt0EUsMC0cvOlbSPUN6XOgOqA3Y12_zSEK41oJnsquozB9YWNC1RmH6--ehMOTDet_2uDD56EopPlhYR7vt_sYnHULt60EO5Q_Ip3bKg"
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

        const voyages = await getVoyages()
        const reports = {} // uuid : arr of reports

        for (let i = 0; i < voyages.length; i++) {
            const uuid = voyages[i].uuid
            const json = await getReports(uuid)
            reports[uuid] = []
            let distance = 1003 // TODO: REMOVE THIS HACK AFTER DEMO

            for (let j of json.reverse()) {
                const ret = {}
                distance += 300

                console.log(j)

                ret['report_type'] = j.report_type
                ret['report_no'] = j.report_type + ' ' + j.report_num
                ret['departure'] = 'Singapore' // TODO: dynamic
                ret['arrival'] = 'Ulsan' // TODO: dynamic
                ret['status'] = 'Sailing' // TODO: dynamic
                ret['cargold'] = 'Ballast' // TODO: dynamic
                ret['distance_to_go'] = distance + '' // TODO: dynamic; some info needs to be pulled from actual report object, not just the report header
                ret['date_of_submission'] = j.report_date.slice(0,10) // TODO: parse? modified vs created date?

                reports[uuid].push(ret)
            }
        }

        console.log(reports)
        return {
            portCodeToPortName,
            isEmpty,
            voyages,
            reports,
            getVoyages,
        }
    },
    components: {
        VoyageCard,
    },
};
</script>
