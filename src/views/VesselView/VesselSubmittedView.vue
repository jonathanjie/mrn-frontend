<template>
    <!-- if there are no voyages in backend -->
    <div v-if="isEmpty" class="flex flex-col bg-gray-100 m-12 p-24 pb-52 justify-center content-center items-center space-y-2 rounded-xl">
        <img src="@/assets/icons/empty.svg" class="h-28 w-28"/>
        <span class="text-lg font-bold text-gray-800 pt-3">{{ $t("noVoyageCreated") }}</span>
        <span class="text-14 text-gray-500">{{ $t("clickOnCreateNewVoyageAboveToBegin") }}</span>
    </div>
</template>

<script setup>
import isEmpty from './/VesselView.vue'
</script>