<template>
    <!-- TODO: button needs to only display content and not the details when viewport is small -->
    <!-- Can do more than one things in one onclick? -->
    <!-- Need to make behavior for text color match for RadioBtnDetail and RadioBtnIcon -->
    <button 
        @click="updateActiveBtn" 
        class="flex flex-col bg-white text-gray-700 font-bold text-14 py-3 px-4 h-min-fit min-w-fit rounded-xl inline-flex"
        :class="this.content == this.active ?'border-gradientblue border-2':''">
            <div class="flex">
                <img v-if="active==this.content" src="@/assets/icons/checked.svg">
                <img v-else src="@/assets/icons/unchecked.svg">
                <span class="pl-2">{{ content }}</span>
            </div>
            <img :src=icon class="my-3 self-center" />
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
        active: {
            type: String,
            required: true
        },
    },
    methods: {
        updateActiveBtn() {
            this.$emit('onUpdateBtn', this.content)
        }
    }
}
</script>

<style>
</style>
