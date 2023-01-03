<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="relative flex bg-gray-100 h-36 justify-between">
      <div>
        <!-- <span class="absolute text-blue font-extrabold text-20 m-10">{{this.$route.params.vesselname}} (IMO No. {{this.$route.params.imo}})</span> -->
        <span class="absolute text-blue font-extrabold text-20 m-10"
          >{{ vesselname }} ({{ $t("imoNo") }} {{ imo }})</span
        >
        <div
          class="absolute inset-x-0 bottom-5 space-x-8 text-gray-500 text-14 pl-11"
        >
          <!-- TODO: need to change focus to actual onclick events -->
          <!-- TODO: don't make these router-links; they shouldn't be separate URIs, just tabs -->
          <router-link
            :to="{
              name: 'vessel-overview',
              params: { vesselname: props.vesselname, imo: props.imo },
            }"
            class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700"
            :class="
              $route.name == 'vessel-overview'
                ? 'border-b-2 border-blue-700 text-blue-700'
                : ''
            "
            >{{ $t("overview") }}</router-link
          >
          <router-link
            :to="{
              name: 'vessel-reports',
              params: { vesselname: props.vesselname, imo: props.imo },
            }"
            class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700"
            :class="
              $route.name == 'vessel-reports'
                ? 'border-b-2 border-blue-700 text-blue-700'
                : ''
            "
            >{{ $t("reports") }}</router-link
          >
        </div>
      </div>
      <!-- Disabled modal until finalized design -->
      <!-- <GradientButton class="m-10" type="button" @click="showModal = true">>
                <template v-slot:content>{{ $t("createNewVoyage") }}</template>  
            </GradientButton> -->
      <GradientButton
        class="m-10"
        type="button"
        :disabled="isFetchingVoyages"
        @click="addVoyage(voyageData)"
      >
        <template v-slot:content>{{ $t("createNewVoyage") }}</template>
      </GradientButton>
      <InitializationModal
        ref="modal"
        v-show="showModal"
        @close-modal="showModal = false"
        :vesselname="vesselname"
        :imo="imo"
      ></InitializationModal>
    </div>
    <suspense>
      <router-view :key="update"></router-view>
    </suspense>
  </div>
</template>

<script setup>
import { ref } from "vue";
import GradientButton from "../../components/Buttons/GradientButton.vue";
import InitializationModal from "@/components/Modals/InitializationModal.vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useShipStore } from "@/stores/useShipStore";
import { storeToRefs } from "pinia";

const auth = useAuthStore();
const store = useShipStore();
const { isFetchingVoyages, lastVoyageNo, nextVoyageNo } = storeToRefs(store);

// Variable to force replacement of router-view
const update = ref(0);

const props = defineProps({
  vesselname: String,
  imo: String,
  specs: String,
});

let showModal = localStorage.getItem("addSpec") == true;

// POST request to add in a new voyage
const addVoyage = async (voyageData) => {
  isFetchingVoyages.value = true;

  const response = await fetch(
    "https://testapi.marinachain.io/marinanet/voyages/",
    {
      headers: {
        Authorization: "Bearer " + auth.jwt,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        voyage_num: nextVoyageNo.value,
        imo_reg: props.imo,
      }),
    }
  );
  console.log(response);

  if (response.ok) {
    lastVoyageNo.value += 1;
    update.value += 1;
  } else {
    window.alert("ERROR: " + JSON.stringify(response.text()));
  }
};
</script>
