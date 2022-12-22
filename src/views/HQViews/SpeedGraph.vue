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
            params: { vesselname: props.vesselname, imo: props.imo },
          }"
          class="hidden pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700"
          :class="
            $route.name == 'vessel-spec'
              ? 'border-b-2 border-blue-700 text-blue-700'
              : ''
          "
          >{{ $t("vesselSpec") }}</router-link
        >
        <button
          class="pb-5 hover:text-blue-700 hover:border-b-2 hover:border-blue-700"
          @click="uploadedReports"
          :class="
            $route.name == 'uploaded-reports'
              ? 'border-b-2 border-blue-700 text-blue-700'
              : ''
          "
        >
          {{ $t("uploadedReports") }}
        </button>
      </div>
    </div>
    <suspense>
      <router-view></router-view>
    </suspense>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";

const auth = useAuthStore();
const router = useRouter();

const props = defineProps({
  vesselname: String,
  imo: String,
});

const getReports = async (imo) => {
  const response = await fetch(
    `https://testapi.marinachain.io/marinanet/ships/${imo}/reports/`,
    {
      headers: {
        Authorization: "Bearer " + auth.jwt,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  const json = response.json();
  return json;
};

const getVoyages = async (imo) => {
  const DUMMY_TOKEN = auth.jwt;
  const response = await fetch(
    "https://testapi.marinachain.io/marinanet/ships/" + imo + "/voyages/",
    {
      headers: {
        Authorization: "Bearer " + DUMMY_TOKEN,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  const json = response.json();
  //   console.log(json);

  if (response.length == 0) {
    isEmpty = true;
    console.log("NO DATA");
  }
  return json;
};

const uploadedReports = async () => {
  const voyages = await getVoyages(props.imo);
  const reports = await getReports(props.imo);
  localStorage.setItem("voyages", JSON.stringify(voyages));
  let output = {};
  for (let i of reports) {
    for (let j of voyages) {
      if (i.uuid == j.uuid) {
        output[i.uuid] = i.reports.reverse();
      }
    }
  }
  localStorage.setItem("output", JSON.stringify(output));
  router.push({
    name: "uploaded-reports",
    params: { vesselname: props.vesselname, imo: props.imo },
  });
};
</script>
