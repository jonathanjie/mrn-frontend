<template>
  <button
    @click="onClick"
    class="font-bold text-14 py-2 px-4 rounded-lg inline-flex items-center border"
    :disabled="isDisabled"
    :class="
      isDisabled
        ? 'border-gray-500 text-gray-700 bg-gray-100'
        : isWarning
        ? 'border-red-500 text-red-500 bg-red-50'
        : 'border-gradientblue text-gradientblue bg-paleblue'
    "
  >
    <slot name="icon"></slot>
    <slot name="content">{{ $t("fallbackContent") }}</slot>
  </button>
</template>

<script setup>
defineProps({
  onClick: {
    type: Function,
    required: false,
  },
  isWarning: {
    type: Boolean,
    required: false,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
