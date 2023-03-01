<script setup>
import { useDepartureCOSPReportStore } from "@/stores/useDepartureCOSPReportStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const store = useDepartureCOSPReportStore();
let isActive = ref(false);
const { additionalRemarks: remarks } = storeToRefs(store);

const enableRemarks = () => {
  isActive.value = !isActive.value;
};
</script>

<template>
  <div
    v-if="!isActive"
    @click="enableRemarks()"
    class="flex items-center bg-white rounded-lg p-5 shadow-card cursor-pointer"
  >
    <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
    <img
      src="@/assets/icons/checkboxes/unchecked_square.svg"
      class="mr-2 h-5 w-5"
    />
    <span class="text-blue-700 text-16">{{ $t("additionalRemarks") }}</span>
  </div>
  <div
    v-else
    class="grid lg:grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card"
  >
    <div
      class="col-span-2 flex items-center cursor-pointer"
      @click="enableRemarks()"
    >
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <img
        src="@/assets/icons/checkboxes/checked_square.svg"
        class="mr-2 h-5 w-5"
      />
      <span class="text-blue-700 text-16">{{ $t("additionalRemarks") }}</span>
    </div>
    <div class="col-span-2 row-span-2 grid grid-cols-10 text-14 border">
      <div class="col-span-2 row-span-2 text-blue-700 p-3 border-r bg-gray-50">
        {{ $t("remarks") }}
      </div>
      <textarea
        v-model.trim="remarks"
        :placeholder="$t('inputDescriptionHere')"
        class="col-span-8 row-span-2 p-3 pl-4 bg-white text-gray-700 focus:outline-0"
      ></textarea>
    </div>
  </div>
</template>
