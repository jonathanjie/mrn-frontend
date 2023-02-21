<script setup>
import { computed } from "vue";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import {
  textInputOptions,
  format,
  preventNaN,
  convertUTCToLT,
  parsePositionFromString,
} from "@/utils/helpers.js";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const beginning = computed(() =>
  convertUTCToLT(
    new Date(props.report.stoppagedata.start_date),
    props.report.report_tz
  )
);
const ending = computed(() =>
  convertUTCToLT(
    new Date(props.report.stoppagedata.end_date),
    props.report.report_tz
  )
);

const duration = computed(() => props.report.stoppagedata.duration);
const changed_RPM = computed(() => props.report.stoppagedata.reduced_rpm);
const reason = computed(() => props.report.stoppagedata.reason);
const remarks = computed(() => props.report.stoppagedata.remarks);
const position = computed(() =>
  parsePositionFromString(props.report.stoppagedata.position)
);
</script>

<template>
  <!-- <div
    v-if="!stoppage_is_active"
    @click="stoppage_is_active = !stoppage_is_active"
    class="flex items-center bg-white rounded-lg p-5 shadow-card cursor-pointer"
  >
    <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
    <img
      src="@/assets/icons/checkboxes/unchecked_square.svg"
      class="mr-2 h-5 w-5"
    />
    <span class="text-blue-700 text-16">{{
      $t("stoppageOrReductionOfRPM")
    }}</span>
  </div> -->
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div
      class="col-span-2 flex items-center cursor-pointer"
      @click="stoppage_is_active = !stoppage_is_active"
    >
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <img
        src="@/assets/icons/checkboxes/checked_square.svg"
        class="mr-2 h-5 w-5"
      />
      <span class="text-blue-700 text-16">{{
        $t("stoppageOrChangeInRPM")
      }}</span>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span
        class="col-span-2 text-blue-700 p-3 text-14 self-center border-b border-r"
        >{{ $t("beginningDateAndTime") }}</span
      >
      <DatePicker
        disabled
        v-model="beginning"
        class="col-span-3 border-b"
        textInput
        :textInputOptions="textInputOptions"
        :format="format"
        :modelValue="string"
        :placeholder="$t('selectDateAndTime')"
      >
        <template #input-icon>
          <img src="" />
        </template>
      </DatePicker>
      <span class="col-span-2 text-blue-700 p-3 text-14 self-center border-r">{{
        $t("endingDateAndTime")
      }}</span>
      <DatePicker
        disabled
        v-model="ending"
        class="col-span-3"
        textInput
        :textInputOptions="textInputOptions"
        :format="format"
        :modelValue="string"
        :placeholder="$t('selectDateAndTime')"
      >
        <template #input-icon>
          <img src="" />
        </template>
      </DatePicker>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span class="col-span-2 text-blue-700 p-3 border-b text-14 self-center">{{
        $t("duration")
      }}</span>
      <div
        class="flex col-span-3 p-2 pl-4 bg-gray-50 text-14 border-l border-b"
      >
        <input
          disabled
          v-model="duration"
          @keypress="preventNaN($event, duration)"
          placeholder="0"
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>HRS</MiniUnitDisplay>
      </div>
      <span class="col-span-2 text-blue-700 p-3 text-14">{{
        $t("changedRPM")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 bg-gray-50 text-14 border-l">
        <input
          disabled
          v-model="changed_RPM"
          @keypress="preventNaN($event, changed_RPM)"
          placeholder="0"
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>RPM</MiniUnitDisplay>
      </div>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span class="col-span-2 text-blue-700 p-3 text-14 self-center">{{
        $t("latitude")
      }}</span>
      <input
        disabled
        v-model="position.latDegree"
        placeholder="000 (Deg)"
        class="p-3 pl-4 border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <input
        disabled
        v-model="position.latMinutes"
        placeholder="000 (Min)"
        class="p-3 pl-4 border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <select
        disabled
        v-model="position.latDir"
        class="p-3 text-14 border-l focus:outline-0 bg-gray-50 text-gray-700"
      >
        <option selected disabled value="default">
          {{ $t("southAndNorth") }}
        </option>
        <option value="S">{{ $t("south") }}</option>
        <option value="N">{{ $t("north") }}</option>
      </select>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span class="col-span-2 text-blue-700 p-3 text-14 self-center">{{
        $t("longitude")
      }}</span>
      <input
        disabled
        v-model="position.longDegree"
        placeholder="000 (Deg)"
        class="p-3 pl-4 border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <input
        disabled
        v-model="position.longMinutes"
        placeholder="000 (Min)"
        class="p-3 pl-4 border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <select
        disabled
        v-model="position.longDir"
        class="p-3 text-14 border-l focus:outline-0 bg-gray-50 text-gray-700"
      >
        <option selected disabled value="default">
          {{ $t("eastAndWest") }}
        </option>
        <option value="E">{{ $t("east") }}</option>
        <option value="W">{{ $t("west") }}</option>
      </select>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
      <div class="col-span-2 text-blue-700 p-3 bg-gray-50 text-14">
        {{ $t("reason") }}
      </div>
      <select
        disabled
        v-model="reason"
        class="col-span-3 p-3 border-l text-14 focus:outline-0 bg-gray-50"
        :class="reason === 'default' ? 'text-gray-400' : 'text-gray-700'"
      >
        <option selected disabled value="default">{{ $t("select") }}</option>
        <option value="ENGINE_PROBLEM">{{ $t("engineProblem") }}</option>
        <option value="ACCIDENT">{{ $t("accident") }}</option>
        <option value="COLLISION">{{ $t("collision") }}</option>
        <option value="GROUNDING">{{ $t("grounding") }}</option>
        <option value="OIL_SPILL">{{ $t("oilSpill") }}</option>
        <option value="OTHER">{{ $t("other") }}</option>
      </select>
      <div
        class="col-span-2 row-span-2 text-blue-700 p-3 border-t bg-gray-50 text-14"
      >
        {{ $t("remarks") }}
      </div>
      <textarea
        disabled
        v-model.trim="remarks"
        :placeholder="$t('inputRemarks')"
        class="col-span-3 row-span-2 border-t border-l p-3 pl-4 bg-gray-50 text-14 text-gray-700 focus:outline-0"
      ></textarea>
    </div>
    <div></div>
  </div>
</template>
