<template>
  <div
    class="flex relative h-14 p-4 w-64 items-center justify-between mb-3"
    :class="selected_speed ? 'bg-blue-800 rounded-lg' : 'bg-white'"
  >
    <!-- TODO: Color not changing upon selected -->
    <img
      src="@/assets/icons/Speed_Graph/selected.svg"
      class="absolute h-6 -ml-4"
      :class="selected_speed ? 'bg-red-500' : 'bg-blue-700'"
    />
    <div class="flex">
      <span
        class="text-14 font-bold"
        :class="selected_speed ? 'text-white' : 'text-gray-700'"
        ><slot name="variable"></slot
      ></span>
      <div
        class="flex px-2 py-0.5 rounded-2xl ml-1.5"
        :class="selected_speed ? 'bg-blue-500' : 'bg-gray-100'"
      >
        <span
          class="text-12 text-semibold"
          :class="selected_speed ? 'text-white' : 'text-gray-700'"
          ><slot name="units"></slot
        ></span>
      </div>
    </div>
    <div class="flex">
      <span
        class="text-14 text-bold mr-2.5"
        :class="selected_speed ? 'text-white' : 'text-blue-700'"
        ><slot name="value"></slot
      ></span>
      <img
        v-if="selected_speed"
        src="@/assets/icons/Speed_Graph/selected_arrow.svg"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  selected_speed: Boolean,
});
</script>
