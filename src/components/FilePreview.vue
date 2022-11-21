<template>
    <li class="flex bg-gray-50 py-3 px-4 items-center rounded-xl">
        <img src="@/assets/icons/bdn_icon.svg" class="w-4 h-5 mr-2"/>   
        {{ file.file.name }}
        <button @click="$emit('remove', file)" class="close-icon align-middle ml-auto text-14 text-red-500" aria-label="Remove">x</button>
    </li>
</template>

<script setup>
defineProps({
    file: { type: Object, required: true },
})
defineEmits(['remove'])
</script>
