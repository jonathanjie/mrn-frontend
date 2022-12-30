import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useShipStore = defineStore("ship", () => {
  const companyUuid = ref("");
  const imoReg = ref("");
  const shipUuid = ref("");
  const lastVoyageNo = ref(0);

  const nextVoyageNo = computed(() => {
    return lastVoyageNo.value + 1;
  });

  const isFetchingVoyages = ref(false);

  return {
    companyUuid,
    imoReg,
    shipUuid,
    lastVoyageNo,
    nextVoyageNo,
    isFetchingVoyages,
  };
});
