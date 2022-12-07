<template>
  <div
    class="flex w-auto rounded-xl bg-white ml-6 shadow-md divide-y divide-solid flex-wrap"
  >
    <div class="flex py-4 pl-6 w-full">
      <span class="text-16 text-gray-800 font-bold">Reminders</span>
    </div>
    <div>
      <ReminderCard
        v-for="reminder in reminders"
        :type="reminder.type"
        :title="reminder.title"
        :message="reminder.message"
        :date="reminder.date"
      ></ReminderCard>
    </div>
  </div>
</template>

<script setup>
import ReminderCard from "@/components/ReminderCard.vue";

const reminders = [
  {
    type: "reminder",
    title: "PSC Inspection",
    message: "Highly expected. Kindly check all your safety devices",
    date: "1 month ago",
  },
  {
    type: "arrival",
    title: "Expected Arrival",
    message: "Vessel expected arrival in a day. EYA June 19, 03:00 LT",
    date: "18 June 2022",
  },
  {
    type: "alert",
    title: "Maintenance Alert",
    message: "Your vessel major inspection is almost due",
    date: "19 June 2022",
  },
];
</script>
