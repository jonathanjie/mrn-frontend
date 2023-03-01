<template>
  <div class="relative bg-gray-50 flex flex-col">
    <GradientButton
      v-if="isSuccessLatestReportDetails"
      class="m-10 absolute right-0 -top-32"
      type="button"
      :is-disabled="isAddVoyageLoading || !isAddVoyageEnabled"
      @click="addVoyage()"
    >
      <template v-slot:content>{{ $t("createNewVoyage") }}</template>
    </GradientButton>
    <div v-if="isFetching" class="flex items-center justify-center mt-40">
      <img src="@/assets/icons/loading.svg" class="animate-spin h-28 w-28" />
    </div>
    <div v-else-if="isSuccess && voyages.length !== 0" class="contents">
      <VoyageCard
        v-for="(voyage, index) in voyages"
        @refetch-data="refetchData()"
        :key="voyage.id"
        :voyage="voyage"
        :is-initially-open="index == 0"
      >
      </VoyageCard>
    </div>
    <!-- if there are no voyages in backend -->
    <div
      v-else
      class="flex flex-col p-24 pb-52 m-12 justify-center items-center space-y-2 rounded-xl"
    >
      <img src="@/assets/icons/empty.svg" class="h-28 w-28" />
      <span class="text-lg font-bold text-gray-800 pt-3">{{
        $t("noVoyageCreated")
      }}</span>
      <span class="text-14 text-gray-500">{{
        $t("clickOnCreateNewVoyageAboveToBegin")
      }}</span>
    </div>
  </div>
</template>

<script setup>
import VoyageCard from "../../components/VoyageCard.vue";
import { useShipStore } from "@/stores/useShipStore";
import { storeToRefs } from "pinia";
import GradientButton from "../../components/Buttons/GradientButton.vue";
import axios from "axios";
import { ref } from "vue";
import { useLatestReportDetailsStore } from "@/stores/useLatestReportDetailsStore";
// import { useCrewStore } from "@/stores/useCrewStore";

const props = defineProps({
  imo: { type: String, require: true },
});

const detailsStore = useLatestReportDetailsStore();
const { isSuccessLatestReportDetails, isAddVoyageEnabled } =
  storeToRefs(detailsStore);

// const crewStore = useCrewStore();
const shipStore = useShipStore();
const {
  isSuccess,
  isFetching,
  data: voyages,
  refetch,
} = shipStore.getAllReports(props.imo);
const { lastVoyageNo, nextVoyageNo } = storeToRefs(shipStore);

// // Temp fix until backend returns voyages in the right order; can delete once backend is updated
// const orderedVoyages = computed(() => {
//   return structuredClone(voyages.value);
// });

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

const refetchData = () => {
  refetch.value();
};

const addVoyage = async () => {
  if (!confirm("Are you sure? You may not be able to edit previous voyages.")) {
    return;
  } else {
    isAddVoyageLoading.value = true;
    if (voyages.value.length == 0) {
      do {
        var inputVoyage = parseInt(
          prompt("Enter initial voyage number above 0.", ""),
          10
        );
      } while (isNaN(inputVoyage) || inputVoyage < 1);
      lastVoyageNo.value = Number(inputVoyage) - 1;
    } else {
      lastVoyageNo.value = Math.max(...voyages.value.map((v) => v.voyage_num));
    }
    const voyageData = {
      voyage_num: nextVoyageNo.value,
      imo_reg: props.imo,
    };
    await axios
      .post(`${process.env.VUE_APP_URL_DOMAIN}/marinanet/voyages/`, voyageData)
      .then(() => {
        refetchData();
      })
      .catch((error) => {
        confirm(
          "Unable to add new voyage. Check if your previous leg has been completed or if your voyage number already exists"
        );
        console.log(error.message);
      })
      .finally(() => {
        isAddVoyageLoading.value = false;
      });
  }
};
</script>
