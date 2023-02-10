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
    <div class="w-1/2 m-auto bg-white border border-2 drop-shadow rounded-xl">
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

<style>
/* .modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
} */

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

/* .modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
} */
</style>
