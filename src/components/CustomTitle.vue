<script setup>
defineProps({
  content: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <!-- TODO: update all occurrences of titles with blue gradients to use this class -->
  <div class="flex items-center">
    <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
    <span class="text-blue-700 text-16">{{ content }}</span>
  </div>
</template>
