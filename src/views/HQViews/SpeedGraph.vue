<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="flex flex-col px-12 pt-14 bg-gray-100">
      <div class="flex items-center mr-5 mb-6">
        <router-link
          :to="{
            name: 'my-vessels',
          }"
        >
          <img
            src="@/assets/icons/Speed_Graph/back_arrow.svg"
            class="fill-blue float-left"
            type="button"
          />
        </router-link>
        <span class="ml-2 text-20 text-blue-800 font-bold">{{
          $t("backToMyVessel")
        }}</span>
      </div>
      <div class="inset-x-0 bottom-5 space-x-6 text-gray-500 text-14 pb-5">
        <router-link
          :to="{
            name: 'speed-graph-overview',
            params: { vesselname: props.vesselname, imo: props.imo },
          }"
          class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700"
          :class="
            $route.name == 'speed-graph-overview'
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
          class="hidden pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700"
          :class="
            $route.name == 'vessel-spec'
              ? 'border-b-2 border-blue-700 text-blue-700'
              : ''
          "
          >{{ $t("vesselSpec") }}</router-link
        >
        <router-link
          :to="{
            name: 'vessel-cii-overview',
            params: { vesselname: props.vesselname, imo: props.imo },
          }"
          class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700"
          :class="
            $route.name == 'vessel-cii-overview'
              ? 'border-b-2 border-blue-700 text-blue-700'
              : ''
          "
          >{{ $t("ciiOverview") }}</router-link
        >
        <!-- <router-link
          :to="{
            name: 'cii-document',
            params: { vesselname: props.vesselname, imo: props.imo },
          }"
          class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700"
          :class="
            $route.name == 'cii-document'
              ? 'border-b-2 border-blue-700 text-blue-700'
              : ''
          "
          >{{ $t("ciiDocument") }}</router-link
        > -->
        <router-link
          :to="{
            name: 'uploaded-reports',
            params: { vesselname: props.vesselname, imo: props.imo },
          }"
          class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700"
          :class="
            $route.name == 'uploaded-reports'
              ? 'border-b-2 border-blue-700 text-blue-700'
              : ''
          "
          >{{ $t("dailyReport") }}</router-link
        >
      </div>
    </div>
    <suspense>
      <router-view></router-view>
    </suspense>
  </div>
</template>

<script setup>
const props = defineProps({
  vesselname: String,
  imo: String,
});
</script>
