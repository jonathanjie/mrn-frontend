<template>
    <!-- if there are no voyages in backend -->
    <div v-if="isEmpty" class="flex flex-col bg-gray-100 p-24 pb-52 m-12 justify-center content-center items-center space-y-2 rounded-xl">
        <img src="@/assets/icons/empty.svg" class="h-28 w-28"/>
        <span class="text-lg font-bold text-gray-800 pt-3">No Voyage Created</span>
        <span class="text-base text-gray-500">Click on 'Create New Voyage' above to begin</span>
    </div>
</template>

<script>
    export default {
        setup() {
            const isEmpty = true // TODO: get value from backend?
            return {
                isEmpty
            }
        },
    };
</script>