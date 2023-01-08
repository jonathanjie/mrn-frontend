import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { FuelOil, LubricatingOil, Machinery } from "@/constants";
import { useGetAllReportsQuery } from "@/queries/useGetAllReportsQuery";

const temp = {
  // Temporary values to pass in before can fetch data from backend
  fuelOils: [FuelOil.MDO, FuelOil.MGO, FuelOil.LSFO],
  lubricatingOils: [
    LubricatingOil.ME_SYSTEM,
    LubricatingOil.GE_SYSTEM,
    LubricatingOil.ME_CYLINDER,
    LubricatingOil.TC_SYSTEM,
  ],
  machinery: [Machinery.ME, Machinery.GE, Machinery.BLR, Machinery.IGG],
};

export const useShipStore = defineStore("ship", () => {

  const crewShipDetails = ref({});
  const companyUuid = ref("");
  const imoReg = ref("");
  const shipUuid = ref("");
  const lastVoyageNo = ref(0);
  const nextVoyageNo = computed(() => {
    return lastVoyageNo.value + 1;
  });

  const getAllReports = (imoReg) => {
    return useGetAllReportsQuery(imoReg);
  };

  const fuelOils = ref(temp.fuelOils);
  const lubricatingOils = ref(temp.lubricatingOils);
  const machinery = ref(temp.machinery);

  // TODO: relocate this variable to other store
  const isFetchingVoyages = ref(false);

  return {
    crewShipDetails,
    companyUuid,
    imoReg,
    shipUuid,
    lastVoyageNo,
    nextVoyageNo,
    fuelOils,
    lubricatingOils,
    machinery,
    isFetchingVoyages,
    getAllReports,
  };
});
