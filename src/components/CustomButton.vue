<template>
    <button @click="onClick" class="text-gradientblue bg-superlightblue font-bold text-sm py-2 px-4 h-10 rounded-lg inline-flex items-center border border-gradientblue">
        <slot name="icon"></slot>
        <slot name="content">Fallback Content</slot>
    </button>
</template>

<script>
    export default {
        props: {
            onClick: {
                type: Function,
                required: true
            }
        }
}
</script>

<style>
</style>
