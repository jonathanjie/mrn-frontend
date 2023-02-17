<script setup>
import GradientButton from "@/components/Buttons/GradientButton.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";

// List to export options from checkboxes

const emit = defineEmits(["close-modal"]);

const closeModal = () => {
  emit("close-modal");
};
</script>
<template>
  <div>
    <div class="opacity-80 fixed inset-0 z-40 bg-gray-900"></div>
    <div
      class="overflow-auto fixed inset-0 z-50 justify-center items-center flex"
    >
      <div class="relative my-6 mx-auto w-4/12 h-5/6">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white"
        >
          <!--header-->
          <div
            class="flex items-center justify-end p-5 border-b border-solid border-slate-200 rounded-t"
          >
            <button
              class="p-1 bg-gray-100 border-0 text-black opacity-50 float-right text-100 leading-none font-semibold"
              @click="closeModal"
            >
              <span class="h-2.5 w-2.5 text-3xl block">x</span>
            </button>
          </div>
          <!--body-->
          <div class="relative flex-auto w-auto text-14 m-6 space-y-6">
            <!-- Vessel name and imo number -->
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-4 bg-gray-50 rounded-b space-x-3"
          >
            <CustomButton
              class="px-6 py-3 text-14 mr-1 mb-1"
              type="button"
              @click="closeModal"
            >
              <template v-slot:content>{{ $t("cancel") }}</template>
            </CustomButton>
            <GradientButton
              class="px-6 py-2 text-14 mr-1 mb-1"
              type="button"
              @click="addSettings()"
            >
              <template v-slot:content>{{ $t("saveDetails") }}</template>
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
