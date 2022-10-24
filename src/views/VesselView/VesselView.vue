<template>
    <div class="bg-gray-50 min-h-screen">
        <div class="relative flex bg-gray-100 h-36 justify-between">
            <div>
                <!-- <span class="absolute text-blue font-extrabold text-20 m-10">{{this.$route.params.vesselname}} (IMO No. {{this.$route.params.imo}})</span> -->
                <span class="absolute text-blue font-extrabold text-20 m-10">{{vesselname}} (IMO No. {{imo}})</span>
                <div class="absolute inset-x-0 bottom-5 space-x-8 text-gray-500 text-14 pl-11">
                    <!-- TODO: need to change focus to actual onclick events -->
                    <!-- TODO: don't make these router-links; they shouldn't be separate URIs, just tabs -->
                    <router-link to="overview" class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700" :class="$route.name=='vessel-overview'?'border-b-2 border-blue-700 text-blue-700':''"> Overview </router-link>
                    <router-link to="submitted" class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700" :class="$route.name=='vessel-submitted'?'border-b-2 border-blue-700 text-blue-700':''"> Submitted </router-link>
                    <router-link to="draft" class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700" :class="$route.name=='vessel-draft'?'border-b-2 border-blue-700 text-blue-700':''"> Draft </router-link>
                    <router-link to="cancelled" class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700" :class="$route.name=='vessel-cancelled'?'border-b-2 border-blue-700 text-blue-700':''"> Cancelled </router-link>
                </div>  
            </div>
            <!-- <GradientButton class="m-10" type="button" v-on:click="$refs.modal.toggleModal()">
                <template v-slot:content>Create New Voyage</template>  
            </GradientButton>    -->
            <GradientButton class="m-10" type="button" v-on:click="addVoyage(voyageData)">
                <template v-slot:content>Create New Voyage</template>  
            </GradientButton>
        </div>
        <!-- <AddVoyageModal ref="modal" v-bind:vesselname="this.$route.params.vesselname" v-bind:imo="this.$route.params.imo"></AddVoyageModal> -->
        <suspense>
            <router-view :key="update"></router-view>
        </suspense>
    </div>
    
</template>  

<script setup>
import { ref, onUpdated } from 'vue'

const update = ref(0)
const isEmpty = true
let voyageNum = 1

const vesselname = 'Marina A'
const imo = '9876543'

const voyageData = {
    'voyage_num': voyageNum,
    'ship_uuid': '4f0d7595-656a-4849-83ba-af6207d587d6'
}

const addVoyage = async (voyageData) => {
    voyageNum += 1
    const DUMMY_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjYxbl96VlI1WmFoZ0hLcy1QOEx5MyJ9.eyJpc3MiOiJodHRwczovL2Rldi14eXJoczYwOS5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjM1MGUzZWY2MmNiNTRiMmU5MTcwYjI0IiwiYXVkIjpbImh0dHBzOi8vZGphbmdvLWp3dC10ZXN0LWRhbi9hcGkiLCJodHRwczovL2Rldi14eXJoczYwOS5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjY2MzM5Mzg2LCJleHAiOjE2NjY0MjU3ODYsImF6cCI6ImhuTnRMa0lKQmxuSExEVGhTTDc3Q1lUdTlRRWFXaWpOIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.kKPkLOSHUZXYZuEqcAqVT7isB2zcc8sLrbx28LOcdDi3WY6rG56kC-W3w0E8WSn0Km5rl-15YGF0L_p6l-rmnxXRDvvMKRiKbjw407SNdZDlyLDjD6cV_Js2nF1RjSHXTyriTWN70sFVuUeGPDBQWcIw1GA-uGK5sVMtyMT_nmCsiNY8onoxZDqxpUPuH9gIhuzpN5zOxcd-b1NM2AnzHQuyNmOVyqlankYbwS1FnajH3HLt0EUsMC0cvOlbSPUN6XOgOqA3Y12_zSEK41oJnsquozB9YWNC1RmH6--ehMOTDet_2uDD56EopPlhYR7vt_sYnHULt60EO5Q_Ip3bKg"
    const response = fetch('https://testapi.marinachain.io/marinanet/voyages/', {
        headers: {
            Authorization: 'Bearer ' + DUMMY_TOKEN,
            "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(voyageData)
    });
    console.log(response);

    update.value += 1
}

onUpdated(() => {
    console.log('updated')
})
</script>

<script>
import GradientButton from '../../components/GradientButton.vue'

export default {
    components: {
        GradientButton,
    }
};
</script>
