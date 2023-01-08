<template>
  <!-- if there are no voyages in backend -->
  <!-- <div
    v-if="lastVoyageNo === 0"
    class="flex flex-col bg-gray-100 p-24 pb-52 m-12 justify-center content-center items-center space-y-2 rounded-xl"
  >
    <img src="@/assets/icons/empty.svg" class="h-28 w-28" />
    <span class="text-lg font-bold text-gray-800 pt-3">{{
      $t("noVoyageCreated")
    }}</span>
    <span class="text-14 text-gray-500">{{
      $t("clickOnCreateNewVoyageAboveToBegin")
    }}</span>
  </div> -->
  <div class="relative bg-gray-50 flex flex-col mt-12">
    <GradientButton
      class="m-10 absolute right-0 -top-48"
      type="button"
      :disabled="isAddVoyageLoading"
      @click="addVoyage()"
    >
      <template v-slot:content>{{ $t("createNewVoyage") }}</template>
    </GradientButton>
    <div v-if="isFetching" class="contents">Loading...</div>
    <div v-else-if="isSuccess" class="contents">
      <VoyageCard
        v-for="(voyage, index) in voyages"
        :key="index"
        :voyage="voyage"
        :is-initially-open="index == 0"
      >
      </VoyageCard>
    </div>
    <div v-else></div>
  </div>
</template>

<script setup>
import VoyageCard from "../../components/VoyageCard.vue";
import { useShipStore } from "@/stores/useShipStore";
import { storeToRefs } from "pinia";
import GradientButton from "../../components/Buttons/GradientButton.vue";
import axios from "axios";
import { ref } from "vue";
import { UrlDomain } from "@/constants";
// import { useCrewStore } from "@/stores/useCrewStore";

const props = defineProps({
  imo: { type: String, require: true },
});

// const crewStore = useCrewStore();
const shipStore = useShipStore();
const {
  isSuccess,
  isFetching,
  data: voyages,
  refetch,
} = shipStore.getAllReports(props.imo);
const { lastVoyageNo, nextVoyageNo } = storeToRefs(shipStore);

// TODO: remove after MVP demo
const isAddVoyageLoading = ref(false);

// TODO: make this work instead of the addVoyage below
// const addVoyageAndRefresh = async () => {
//   lastVoyageNo.value = Math.max(...voyages.value.map((v) => v.voyage_num));
//   const voyageData = {
//     voyage_num: nextVoyageNo.value,
//     imo_reg: props.imo,
//   };
//   const { isSuccess, data } = crewStore.addVoyage(voyageData);
//   refetch.value();
// };

// TODO: use addVoyage in crewStore; temp fix to make add voyage work
const addVoyage = async () => {
  isAddVoyageLoading.value = true;
  lastVoyageNo.value = Math.max(...voyages.value.map((v) => v.voyage_num));
  const voyageData = {
    voyage_num: nextVoyageNo.value,
    imo_reg: props.imo,
  };
  await axios
    .post(`${UrlDomain.DEV}/marinanet/voyages/`, voyageData)
    .then((response) => {
      console.log(response);
      refetch.value();
      isAddVoyageLoading.value = false;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
</script>