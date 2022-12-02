<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="flex flex-col px-12 pt-14">
      <div class="flex items-center mx-5 mb-6">
        <button @click="$router.push({ name: 'my-vessels' })">
          <img
            src="@/assets/icons/Speed_Graph/back_arrow.svg"
            class="fill-blue float-left"
            type="button"
          />
        </button>
        <span class="ml-2 text-20 text-blue-800 font-bold">{{
          $t("backToMyVessel")
        }}</span>
      </div>
      <div class="inset-x-0 bottom-5 space-x-8 text-gray-500 text-14 pl-11">
        <router-link
          :to="{
            name: 'overview',
            params: { vesselname: vesselname, imo: imo },
          }"
          class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700"
          :class="
            $route.name == 'overview'
              ? 'border-b-2 border-blue-700 text-blue-700'
              : ''
          "
          >{{ $t("overview") }}</router-link
        >
        <router-link
          :to="{
            name: 'vessel-spec',
            params: { vesselname: vesselname, imo: imo },
          }"
          class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700"
          :class="
            $route.name == 'vessel-spec'
              ? 'border-b-2 border-blue-700 text-blue-700'
              : ''
          "
          >{{ $t("vesselSpec") }}</router-link
        >
        <router-link
          :to="{
            name: 'uploaded-reports',
            params: { vesselname: vesselname, imo: imo },
          }"
          class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700"
          :class="
            $route.name == 'uploaded-reports'
              ? 'border-b-2 border-blue-700 text-blue-700'
              : ''
          "
          >{{ $t("uploadedReports") }}</router-link
        >
      </div>
    </div>
    <suspense>
      <router-view :key="update"></router-view>
    </suspense>
  </div>
</template>

<script setup>
import { ref } from "vue";
const update = ref(0);
defineProps({
  vesselname: String,
  imo: String,
});
</script>
