<template>
    <!-- TODO: button needs to only display icons and not the content when container grid size is smaller than content-->
    <button 
        @click="updateActiveBtn" 
        class="flex bg-white text-gray-700 font-bold text-14 py-3 px-4 h-16 min-w-fit rounded-xl inline-flex items-center"
        :class="this.type == this.active ?'border-gradientblue border-2 text-gradientblue':'text-gray-700'">
        <img v-if="active == this.type" src="@/assets/icons/checked.svg">
        <img v-else src="@/assets/icons/unchecked.svg">
        <img :src=icon class="mx-3" />
        <span>{{ content }}</span>
    </button>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: false
        },
        content: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        active: {
            type: String,
            required: true
        },
    },
    methods: {
        updateActiveBtn() {
            this.$emit('onUpdateBtn', this.type)
        }
    }
}
</script>

<style>
</style>
