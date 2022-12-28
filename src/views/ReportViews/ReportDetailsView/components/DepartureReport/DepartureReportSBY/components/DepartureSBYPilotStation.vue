
<script setup>
import { preventNaN, textInputOptions, format } from "@/utils/helpers.js";
import { ref } from "vue";
import { useDepartureSBYReportStore } from "@/stores/useDepartureSBYReportStore";
import { storeToRefs } from "pinia";

const isActive = ref(false);

const store = useDepartureSBYReportStore();
const {
  pilotDepName: pilot_dep_name,
  pilotDepDate: pilot_dep_date,
  pilotDepLatDir: pilot_dep_lat_dir,
  pilotDepLatDegree: pilot_dep_lat_degree,
  pilotDepLatMinute: pilot_dep_lat_minute,
  pilotDepLongDir: pilot_dep_long_dir,
  pilotDepLongDegree: pilot_dep_long_degree,
  pilotDepLongMinute: pilot_dep_long_minute,
} = storeToRefs(store);
</script>

<template>
  <div
    v-if="!isActive"
    @click="isActive = !isActive"
    class="flex items-center bg-white rounded-lg p-5 shadow-card cursor-pointer"
  >
    <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
    <img
      src="@/assets/icons/checkboxes/unchecked_square.svg"
      class="mr-2 h-5 w-5"
    />
    <span class="text-blue-700 text-16">{{ $t("pilotStationDeparture") }}</span>
  </div>
  <div
    v-else
    class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card"
  >
    <div
      class="col-span-2 flex items-center cursor-pointer"
      @click="isActive = !isActive"
    >
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <img
        src="@/assets/icons/checkboxes/checked_square.svg"
        class="mr-2 h-5 w-5"
      />
      <span class="text-blue-700 text-16">
        {{ $t("pilotStationDeparture") }}
      </span>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
      <div
        class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
      >
        {{ $t("name") }}
      </div>
      <input
        v-model="pilot_dep_name"
        :placeholder="$t('inputName')"
        class="col-span-3 p-3 pl-4 border-b bg-white text-14 text-gray-700 focus:outline-0"
      />
      <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
        {{ $t("dateAndTime") }}
      </div>
      <DatePicker
        v-model="pilot_dep_date"
        class="col-span-3"
        textInput
        :textInputOptions="textInputOptions"
        :format="format"
        :modelValue="string"
        :placeholder="$t('pleaseSelectDateAndTime')"
      >
        <template #input-icon>
          <img src="" />
        </template>
      </DatePicker>
    </div>
    <div></div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span
        class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center"
        >{{ $t("latitude") }}</span
      >
      <input
        v-model="pilot_dep_lat_degree"
        @keypress="preventNaN($event, pilot_dep_lat_degree)"
        placeholder="000 (Degree)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
      />
      <input
        v-model="pilot_dep_lat_minute"
        @keypress="preventNaN($event, pilot_dep_lat_minute)"
        placeholder="000 (Minutes)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
      />
      <select
        v-model="pilot_dep_lat_dir"
        class="col-span-3 p-3 text-14 border-l focus:outline-0 focus:outline-0"
        :class="
          pilot_dep_lat_dir === 'default' ? 'text-gray-400' : 'text-gray-700'
        "
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
        v-model="pilot_dep_long_degree"
        @keypress="preventNaN($event, pilot_dep_long_degree)"
        placeholder="000 (Degree)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
      />
      <input
        v-model="pilot_dep_long_minute"
        @keypress="preventNaN($event, pilot_dep_long_minute)"
        placeholder="000 (Minutes)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
      />
      <select
        v-model="pilot_dep_long_dir"
        class="col-span-3 p-3 text-14 border-l focus:outline-0"
        :class="
          pilot_dep_long_dir === 'default' ? 'text-gray-400' : 'text-gray-700'
        "
      >
        <option selected disabled value="default">
          {{ $t("eastAndWest") }}
        </option>
        <option value="E">{{ $t("east") }}</option>
        <option value="W">{{ $t("west") }}</option>
      </select>
    </div>
  </div>
</template>

