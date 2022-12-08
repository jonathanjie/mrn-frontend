<template>
  <div class="flex p-5">
    <img
      v-if="type === 'reminder'"
      src="@/assets/icons/Speed_Graph/reminder_icon.svg"
      class="w-10 h-10"
    />
    <img
      v-if="type === 'arrival'"
      src="@/assets/icons/Speed_Graph/arrival_icon.svg"
      class="w-10 h-10"
    />
    <img
      v-if="type === 'alert'"
      src="@/assets/icons/Speed_Graph/alert_icon_reminder.svg"
      class="w-10 h-10"
    />
    <div class="flex flex-wrap ml-3.5">
      <span class="text-14 text-gray-700 font-bold w-full">{{ title }}</span>
      <p class="mt-0.5 text-14 text-gray-600 w-full">
        {{ message }}
      </p>
      <span class="mt-1.5 text-12 text-gray-400 w-full">{{ date }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: String,
  title: String,
  message: String,
  date: String,
});
</script>
