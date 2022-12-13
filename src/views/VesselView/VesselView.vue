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
            to="overview"
            class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700"
            :class="
              $route.name == 'vessel-overview'
                ? 'border-b-2 border-blue-700 text-blue-700'
                : ''
            "
            >{{ $t("overview") }}</router-link
          >
          <router-link
            to="submitted"
            class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700"
            :class="
              $route.name == 'vessel-submitted'
                ? 'border-b-2 border-blue-700 text-blue-700'
                : ''
            "
            >{{ $t("submitted") }}</router-link
          >
          <router-link
            to="draft"
            class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700"
            :class="
              $route.name == 'vessel-draft'
                ? 'border-b-2 border-blue-700 text-blue-700'
                : ''
            "
            >{{ $t("draft") }}</router-link
          >
          <router-link
            to="cancelled"
            class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700"
            :class="
              $route.name == 'vessel-cancelled'
                ? 'border-b-2 border-blue-700 text-blue-700'
                : ''
            "
            >{{ $t("cancelled") }}</router-link
          >
        </div>
      </div>
      <!-- Disabled modal until finilized design -->
      <!-- <GradientButton class="m-10" type="button" @click="showModal = true">>
                <template v-slot:content>{{ $t("createNewVoyage") }}</template>  
            </GradientButton> -->
      <GradientButton
        class="m-10"
        type="button"
        v-on:click="addVoyage(voyageData)"
      >
        <template v-slot:content>{{ $t("createNewVoyage") }}</template>
      </GradientButton>
      <AddVoyageModal
        ref="modal"
        v-show="showModal"
        @close-modal="showModal = false"
        :vesselname="vesselname"
        :imo="imo"
      ></AddVoyageModal>
    </div>
    <!-- <router-view :key="update"></router-view> -->
    <suspense>
      <router-view></router-view>
    </suspense>
  </div>
</template>

<script setup>
import { ref } from "vue";
import GradientButton from "../../components/Buttons/GradientButton.vue";
import AddVoyageModal from "@/components/AddVoyageModal.vue";

// Variable to force replacement of router-view
const isEmpty = true;
let voyageNum = 1;

const props = defineProps({
  vesselname: String,
  imo: String,
  specs: String,
});

let showModal = ref(props.specs === "true");

// Backend Data
const voyageData = {
  voyage_num: voyageNum,
  ship_uuid: "9bbd38d8-b68a-4d46-8388-fc1fb5298e34",
};

// POST request to add in a new voyage
const addVoyage = async (voyageData) => {
  voyageNum += 1;
  const DUMMY_TOKEN = localStorage.getItem("jwt");
  const response = await fetch(
    "https://testapi.marinachain.io/marinanet/voyages/",
    {
      headers: {
        Authorization: "Bearer " + DUMMY_TOKEN,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(voyageData),
    }
  );

  console.log(response);
  update.value += 1;
};
</script>
