<template>
  <button
    @click="onClick"
    class="text-white font-bold text-14 py-2 px-4 h-10 rounded-lg inline-flex items-center"
    :class="
      disabled
        ? 'bg-gray-500 '
        : 'bg-gradient-to-r from-gradientblue to-gradientgreen hover:bg-gradient-to-r hover:from-gradientgreen hover:to-gradientblue'
    "
    :disabled="disabled"
  >
    <slot name="icon"></slot>
    <slot name="content">{{ $t("fallbackContent") }}</slot>
  </button>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style></style>
