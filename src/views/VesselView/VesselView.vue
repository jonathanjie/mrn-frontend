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
  specs: String,
});
</script>
