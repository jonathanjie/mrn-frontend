<template>
  <div>
    <div
      class="bg-slate-400 overflow-auto fixed inset-0 z-50 justify-center items-center flex"
    >
      <div class="relative my-6 mx-auto w-5/12 h-2/6">
        <!--content-->
        <div
          class="rounded-lg shadow-lg relative flex flex-col w-full bg-white"
        >
          <!--header-->
          <div
            class="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t"
          >
            <h3 v-if="!isSubmissionSuccessful" class="text-3xl font-semibold">
              {{ $t("reportSubmissionFailed") }}
            </h3>
            <h3 v-else class="text-3xl font-semibold">
              {{ $t("reportSubmissionSuccess") }}
            </h3>
          </div>
          <!--body-->
          <div class="relative flex-auto w-auto text-14 m-3 space-y-6">
            <div v-if="!isSubmissionSuccessful" class="m-2 rounded-xl">
              <ul
                v-for="(error, index) in errorMessage"
                :key="index"
                class="mb-4 p-4 bg-red-50 rounded-xl"
              >
                <div class="flex items-center space-x-2 mb-2">
                  <img src="@/assets/icons/alert_circle.svg" />
                  <div class="text-14 text-red-500">{{ index }}</div>
                </div>
                <div class="bg-white p-3 px-4">
                  <li
                    v-for="(val, key) in error"
                    :key="key"
                    class="text-12 mb-2 flex space-x-1"
                  >
                    <div class="text-blue-700">
                      {{ !Number.isInteger(key) ? key + ": " : "" }}
                    </div>
                    <div class="text-gray-700">
                      {{ Array.isArray(val) ? val[0] : val }}
                    </div>
                  </li>
                </div>
              </ul>
            </div>
            <div v-else class="m-2 rounded-xl">
              <div
                class="p-5 rounded-xl border border-green-500 bg-green-50 text-gray-800"
              >
                {{ $t("successfullyUploadedReport") }}
              </div>
            </div>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-4 bg-gray-50 rounded-b space-x-3"
          >
            <!-- when submission was unsuccessful -->
            <CustomButton
              v-if="!isSubmissionSuccessful"
              class="px-6 py-2 text-14 border-red-500 text-red-500"
              type="button"
              @click="$emit('close-modal')"
              :isWarning="true"
            >
              <template v-slot:content>{{ $t("returnToReport") }}</template>
            </CustomButton>
            <!-- when submission was successful -->
            <GradientButton
              v-else
              class="px-6 py-2 text-14"
              type="button"
              v-on:click="returnToVesselOverview"
            >
              <template v-slot:content>{{ $t("proceed") }}</template>
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
    <div class="opacity-80 fixed inset-0 z-40 bg-gray-900"></div>
  </div>
</template>

<script setup>
import GradientButton from "@/components/Buttons/GradientButton.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";
import { useRouter } from "vue-router";
import { useSubmissionStatusStore } from "@/stores/useSubmissionStatusStore.js";
import { storeToRefs } from "pinia";

const router = useRouter();

const submissionStatusStore = useSubmissionStatusStore();
const { isSubmissionSuccessful, errorMessage } = storeToRefs(
  submissionStatusStore
);

const emit = defineEmits(["close-modal"]);

const returnToVesselOverview = () => {
  emit("close-modal");
  router.push({ name: "vessel-overview" });
};
</script>
