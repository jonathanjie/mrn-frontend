<script setup>
import { computed } from "vue";
import { preventNaN } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const draftFwd = computed(
  () => props.report.departurevesselcondition.draft_fwd || "NA"
);
const draftMid = computed(
  () => props.report.departurevesselcondition.draft_mid || "NA"
);
const draftAft = computed(
  () => props.report.departurevesselcondition.draft_aft || "NA"
);
const constant = computed(
  () => props.report.departurevesselcondition.constant || "NA"
);
const gm = computed(() => props.report.departurevesselcondition.gm || "NA");
const ballast = computed(
  () => props.report.departurevesselcondition.ballast || "NA"
);
const displacement = computed(
  () => props.report.departurevesselcondition.displacement || "NA"
);
</script>

<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        <slot>{{ $t("vesselConditionAtDeparture") }}</slot>
      </span>
    </div>
    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-10 border-t bg-gray-50 text-14"
    >
      <div
        class="col-span-4 row-span-3 text-blue-700 border-x p-3 py-16 my-auto self-center"
      >
        {{ $t("draft") }}
      </div>
      <div class="col-span-1 text-blue-700 p-3 border-b my-auto self-center">
        {{ $t("fwd") }}
      </div>
      <div class="flex col-span-5 p-2 pl-4 border-b border-x bg-gray-50">
        <input
          disabled
          v-model="draftFwd"
          @keypress="preventNaN($event, draftFwd)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>M</MiniUnitDisplay>
      </div>
      <div class="col-span-1 text-blue-700 p-3 border-b my-auto self-center">
        {{ $t("mid") }}
      </div>
      <div class="flex col-span-5 p-2 pl-4 border-b border-x bg-gray-50">
        <input
          disabled
          v-model="draftMid"
          @keypress="preventNaN($event, draftMid)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>M</MiniUnitDisplay>
      </div>
      <div class="col-span-1 text-blue-700 p-3 my-auto self-center">
        {{ $t("aft") }}
      </div>
      <div class="flex col-span-5 p-2 pl-4 border-x bg-gray-50">
        <input
          disabled
          v-model="draftAft"
          @keypress="preventNaN($event, draftAft)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>M</MiniUnitDisplay>
      </div>
      <input
        disabled
        class="bg-white col-span-10 row-span-1 h-0 lg:h-max lg:block lg:p-3 border-t border-x-0"
      />
    </div>
    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <span class="col-span-2 text-blue-700 border-b p-3 self-center">{{
        $t("constant")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 border-b border-l bg-gray-50">
        <input
          disabled
          v-model="constant"
          @keypress="preventNaN($event, constant)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>M/T</MiniUnitDisplay>
      </div>
      <span class="col-span-2 text-blue-700 border-b p-3 self-center">{{
        $t("gm")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 border-b border-l bg-gray-50">
        <input
          disabled
          v-model="gm"
          @keypress="preventNaN($event, gm)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>M</MiniUnitDisplay>
      </div>
      <span class="col-span-2 text-blue-700 border-b p-3 self-center">{{
        $t("ballast")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 border-b border-l bg-gray-50">
        <input
          disabled
          v-model="ballast"
          @keypress="preventNaN($event, ballast)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>M/T</MiniUnitDisplay>
      </div>
      <span class="col-span-2 text-blue-700 p-3 self-center">{{
        $t("displacement")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 border-l bg-gray-50">
        <input
          disabled
          v-model="displacement"
          @keypress="preventNaN($event, displacement)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>M/T</MiniUnitDisplay>
      </div>
    </div>
  </div>
</template>
