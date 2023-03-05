<script setup>
const props = defineProps({
  show: Boolean,
});
</script>

<template>
  <div
    v-show="props.show"
    class="fixed z-50 top-0 left-0 w-full h-full bg-black/50 flex"
  >
    <div
      class="w-1/2 m-auto bg-white border border-2 drop-shadow rounded-xl min-w-min"
    >
      <div class="py-5 px-7 border-b">
        <button class="float-right text-gray-800" @click="$emit('close')">
          X
        </button>

        <slot name="header">default header</slot>
      </div>

      <div class="max-h-[40rem] overflow-auto">
        <slot name="body">default body</slot>
      </div>

      <div class="bg-gray-50 px-7 py-4 rounded-b-xl">
        <slot name="footer">default footer</slot>
      </div>
    </div>
  </div>
</template>
