import { defineStore } from "pinia";
import { ref } from "vue";

export const useVoyageStore = defineStore("async", () => {
  const voyages = ref(undefined);
  const reports = ref(undefined);

  return { voyages, reports };
});
