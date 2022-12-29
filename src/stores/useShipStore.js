import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useShipStore = defineStore("ship", () => {
  const imoReg = ref("");
  const uuid = ref("");
  const lastVoyageNo = ref(0);

  const nextVoyageNo = computed(() => {
    return lastVoyageNo.value + 1;
  });

  const isFetchingVoyages = ref(false);

  return {
    imoReg,
    uuid,
    lastVoyageNo,
    nextVoyageNo,
    isFetchingVoyages,
  };
});
