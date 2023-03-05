<template>
  <li class="flex bg-gray-50 py-2 px-4 items-center rounded-xl mt-4">
    <img src="@/assets/icons/bdn_icon.svg" class="w-4 h-5 mr-2" />
    {{ file.file.name }}
    <div
      v-if="isCiiReport"
      class="ml-auto rounded-lg border border-gray-300 py-1 px-3 bg-white"
    >
      <!-- 2020 to current year -->
      <select
        @change="
          (e) => $emit('selectYear', { file: file, year: e.target.value })
        "
        class="focus:outline-none text-gray-800"
      >
        <option selected disabled value="default">
          {{ $t("selectYear") }}
        </option>
        <option v-for="(year, index) in years" :value="year" :key="index">
          {{ year }}
        </option>
      </select>
    </div>
    <button
      @click="$emit('remove', file)"
      class="close-icon align-middle text-14 text-red-500"
      :class="{ 'ml-3': isCiiReport, 'ml-auto': !isCiiReport }"
      aria-label="Remove"
    >
      x
    </button>
  </li>
</template>

<script setup>
defineProps({
  file: { type: Object, required: true },
  isCiiReport: { type: Boolean, required: false, default: false },
});
defineEmits(["remove", "selectYear"]);

// list of years from 2020 to current year
const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 2020 + 1 },
  (_, i) => 2020 + i
);
</script>
