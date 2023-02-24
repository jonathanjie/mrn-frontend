<script setup>
import { toRefs } from "vue";

const props = defineProps({
  box: Boolean,
});

const { box } = toRefs(props);
</script>
<template>
  <div
    class="flex absolute w-full h-full rounded-xl justify-center items-center"
  >
    <div
      class="flex p-5 bg-white rounded-2xl shadow-md border"
      :class="box ? '' : ''"
    >
      <span class="text-30 text-sysblue-600 font-bold"
        >Features are coming soon!</span
      >
    </div>
  </div>
</template>
