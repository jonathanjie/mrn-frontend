import { defineStore } from "pinia";
import { ref } from "vue";

export const useSubmissionStatusStore = defineStore("submissionStatus", () => {
  const isSubmissionRequested = ref(false);
  const isSubmissionSuccessful = ref(false);
  const errorMessage = ref(""); // JSON

  return {
    isSubmissionRequested,
    isSubmissionSuccessful,
    errorMessage,
  };
});
