<template>
    <div class="bg-gray-50 min-h-screen">
        <div class="relative flex bg-gray-100 h-36 justify-between">
            <div>
                <span class="absolute text-blue font-extrabold text-huge m-10">{{this.$route.params.vesselname}} (IMO No. {{this.$route.params.imo}})</span>
                <div class="absolute inset-x-0 bottom-5 space-x-8 text-gray-500 text-sm pl-11">
                    <!-- TODO: need to change focus to actual onclick events -->
                    <router-link to="overview" class="pb-5 hover:text-lightblue hover:border-b-2 hover:border-lightblue" :class="$route.name=='vessel-overview'?'border-b-2 border-lightblue text-lightblue':''"> Overview </router-link>
                    <router-link to="submitted" class="pb-5 hover:text-lightblue hover:border-b-2 hover:border-lightblue" :class="$route.name=='vessel-submitted'?'border-b-2 border-lightblue text-lightblue':''"> Submitted </router-link>
                    <router-link to="draft" class="pb-5 hover:text-lightblue hover:border-b-2 hover:border-lightblue" :class="$route.name=='vessel-draft'?'border-b-2 border-lightblue text-lightblue':''"> Draft </router-link>
                    <router-link to="cancelled" class="pb-5 hover:text-lightblue hover:border-b-2 hover:border-lightblue" :class="$route.name=='vessel-cancelled'?'border-b-2 border-lightblue text-lightblue':''"> Cancelled </router-link>
                </div>  
            </div>
            <GradientButton class="m-10" type="button" v-on:click="$refs.modal.toggleModal()">
                <template v-slot:content>Create New Voyage</template>  
            </GradientButton>   
        </div>
        <AddVoyageModal ref="modal" v-bind:vesselname="this.$route.params.vesselname" v-bind:imo="this.$route.params.imo"></AddVoyageModal>
        <router-view></router-view>
    </div>
    
</template>  

<script>
import GradientButton from '../../components/GradientButton.vue'
import AddVoyageModal from '../../components/AddVoyageModal.vue'

export default {
    name: 'VesselView',
    components: {
        GradientButton,
        AddVoyageModal,
    },
};
</script>
