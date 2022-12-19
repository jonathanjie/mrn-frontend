import { defineStore } from "pinia";
import { ref } from "vue";

export const useAsyncStore = defineStore("async", () => {
  const ships = ref(undefined);
  const shipSpecs = ref(undefined);
  const voyages = ref(undefined);
  const reports = ref(undefined);

  return { ships, shipSpecs, voyages, reports };
});
