<template>
  <button
    @click="onClick"
    class="text-gradientblue bg-blue-50 font-bold text-14 py-2 px-4 rounded-lg inline-flex items-center border border-gradientblue"
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
  },
};
</script>

<style></style>
