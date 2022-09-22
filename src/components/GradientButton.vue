<template>
    <button @click="onClick" class="bg-gradient-to-r from-gradientblue to-gradientgreen text-white font-bold text-sm py-2 px-4 h-10 rounded-lg inline-flex items-center">
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
    .gradient {
        background: linear-gradient(90deg, #0093B8 0%, #09DBA9 100%);
        border-radius: 8px;
    }

</style>
