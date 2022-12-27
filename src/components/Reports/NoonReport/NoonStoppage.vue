<template>
  <div
    v-if="!is_stoppage_enabled"
    @click="is_stoppage_enabled = !is_stoppage_enabled"
    class="flex items-center bg-white rounded-lg p-5 shadow-card cursor-pointer"
  >
    <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
    <img
      src="@/assets/icons/checkboxes/unchecked_square.svg"
      class="mr-2 h-5 w-5"
    />
    <span class="text-blue-700 text-16">{{ $t("stoppageOrChangeInRPM") }}</span>
  </div>
  <div
    v-else
    class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card"
  >
    <div
      class="col-span-2 flex items-center cursor-pointer"
      @click="is_stoppage_enabled = !is_stoppage_enabled"
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
      <div class="flex col-span-3 p-2 pl-4 bg-white text-14 border-l border-b">
        <input
          v-model="duration"
          @keypress="preventNaN($event, duration)"
          placeholder="0"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>HRS</MiniUnitDisplay>
      </div>
      <span class="col-span-2 text-blue-700 p-3 text-14">{{
        $t("changedRPM")
      }}</span>
      <div class="flex col-span-3 p-2 pl-4 bg-white text-14 border-l">
        <input
          v-model="changed_RPM"
          @keypress="preventNaN($event, changed_RPM)"
          placeholder="0"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>RPM</MiniUnitDisplay>
      </div>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span
        class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center"
        >{{ $t("latitude") }}</span
      >
      <input
        v-model="lat_degree"
        @keypress="preventNaN($event, lat_degree)"
        placeholder="000 (Degree)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
      />
      <input
        v-model="lat_minutes"
        @keypress="preventNaN($event, lat_minutes)"
        placeholder="000 (Minutes)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
      />
      <select
        v-model="lat_dir"
        class="col-span-3 p-3 text-14 border-l focus:outline-0"
        :class="lat_dir === 'default' ? 'text-gray-400' : 'text-gray-700'"
      >
        <option selected disabled value="default">
          {{ $t("southAndNorth") }}
        </option>
        <option value="S">{{ $t("south") }}</option>
        <option value="N">{{ $t("north") }}</option>
      </select>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span
        class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center"
        >{{ $t("longitude") }}</span
      >
      <input
        v-model="long_degree"
        @keypress="preventNaN($event, long_degree)"
        placeholder="000 (Degree)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
      />
      <input
        v-model="long_minutes"
        @keypress="preventNaN($event, long_minutes)"
        placeholder="000 (Minutes)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
      />
      <select
        v-model="long_dir"
        class="col-span-3 p-3 text-14 border-l focus:outline-0"
        :class="long_dir === 'default' ? 'text-gray-400' : 'text-gray-700'"
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
        v-model="reason"
        class="col-span-3 p-3 border-l text-14 focus:outline-0"
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
        v-model.trim="remarks"
        :placeholder="$t('inputRemarks')"
        class="col-span-3 row-span-2 border-t border-l p-3 pl-4 bg-white text-14 text-gray-700 focus:outline-0"
      ></textarea>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { textInputOptions, format, preventNaN } from "@/utils/helpers.js";
import { useNoonReportStore } from "@/stores/useNoonReportStore";
import { storeToRefs } from "pinia";

const store = useNoonReportStore();

const {
  stoppageBeginning: beginning,
  stoppageEnding: ending,
  stoppageDuration: duration,
  stoppageChangedRPM: changed_RPM,
  stoppageReason: reason,
  stoppageRemarks: remarks,
  stoppageLatDir: lat_dir,
  stoppageLatDegree: lat_degree,
  stoppageLatMinutes: lat_minutes,
  stoppageLongDir: long_dir,
  stoppageLongDegree: long_degree,
  stoppageLongMinutes: long_minutes,
  isStoppageEnabled: is_stoppage_enabled,
} = storeToRefs(store);
</script>
