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
      @click="addVoyage()"
    >
      <template v-slot:content>{{ $t("createNewVoyage") }}</template>
    </GradientButton>
    <div v-if="isFetching" class="contents">Loading...</div>
    <div v-else-if="isSuccess" class="contents">
      <VoyageCard
        v-for="(voyage, index) in voyages.reverse()"
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
import { onUpdated } from "vue";
import VoyageCard from "../../components/VoyageCard.vue";
import { useShipStore } from "@/stores/useShipStore";
import { storeToRefs } from "pinia";
import GradientButton from "../../components/Buttons/GradientButton.vue";
import { useCrewStore } from "@/stores/useCrewStore";

const props = defineProps({
  imo: { type: String, require: true },
});

const shipStore = useShipStore();
const { lastVoyageNo, nextVoyageNo } = storeToRefs(shipStore);
const {
  isSuccess,
  isFetching,
  data: voyages,
} = shipStore.getAllReports(props.imo);

const crewStore = useCrewStore();
const voyageData = {
  voyage_num: nextVoyageNo.value,
  imo_reg: props.imo,
};
crewStore.addVoyage(voyageData);

onUpdated(() => {
  lastVoyageNo.value = voyages.value[voyages.value.length - 1].voyage_num;
});
</script>
