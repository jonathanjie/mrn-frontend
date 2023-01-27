<script setup>
import { computed } from "vue";
import { preventNaN, textInputOptions, format } from "@/utils/helpers.js";
import { parsePositionFromString } from "@/utils/helpers.js";
// import { UTCPlaceholder } from "@/constants";
// import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const isActive = computed(() =>
  props.report.departurepilotstation ? true : false
);
const pilot_dep_name = computed(() =>
  props.report.departurepilotstation.name === null
    ? ""
    : props.report.departurepilotstation.name
);
const pilot_dep_date_time = computed(
  () => props.report.departurepilotstation.date
);
const position = computed(() =>
  parsePositionFromString(props.report.departurepilotstation.position)
);

// const pilot_dep_date_time_utc = computed(() =>
//   pilotDepDateTimeUTC.value
//     ? formatUTC(new Date(pilotDepDateTimeUTC.value))
//     : UTCPlaceholder
// );
</script>

<template>
  <div
    v-if="!isActive"
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
    <div class="col-span-2 flex items-center cursor-pointer">
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
        disabled
        v-model="pilot_dep_name"
        :placeholder="$t('inputName')"
        class="col-span-3 p-3 pl-4 border-b bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
        {{ $t("dateAndTime") }}
      </div>
      <div class="col-span-3 relative flex items-center">
        <DatePicker
          disabled
          v-model="pilot_dep_date_time"
          class="grow"
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
        <!-- <MiniUnitDisplay
          class="absolute right-0 min-w-fit"
          :class="pilot_dep_date_time ? 'mr-9' : 'mr-2'"
          >{{ pilot_dep_date_time_utc }}</MiniUnitDisplay
        > -->
      </div>
    </div>
    <div></div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span class="col-span-2 text-blue-700 p-3 text-14 self-center">{{
        $t("latitude")
      }}</span>
      <input
        disabled
        v-model="position.latDegree"
        @keypress="preventNaN($event, position.latDegree)"
        placeholder="000 (Deg)"
        class="p-3 pl-4 border-l border-b bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <input
        disabled
        v-model="position.latMinutes"
        @keypress="preventNaN($event, position.latMinutes)"
        placeholder="000 (Min)"
        class="p-3 pl-4 border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <select
        disabled
        v-model="position.latDir"
        class="p-3 text-14 border-l focus:outline-0 focus:outline-0 bg-gray-50"
        :class="
          position.latDir === 'default' ? 'text-gray-400' : 'text-gray-700'
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
      <span class="col-span-2 text-blue-700 p-3 text-14 self-center">{{
        $t("longitude")
      }}</span>
      <input
        disabled
        v-model="position.longDegree"
        @keypress="preventNaN($event, position.longDegree)"
        placeholder="000 (Deg)"
        class="p-3 pl-4 border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <input
        disabled
        v-model="position.longMinutes"
        @keypress="preventNaN($event, position.longMinutes)"
        placeholder="000 (Min)"
        class="p-3 pl-4 border-l bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <select
        disabled
        v-model="position.longDir"
        class="p-3 text-14 border-l focus:outline-0 bg-gray-50"
        :class="
          position.longDir === 'default' ? 'text-gray-400' : 'text-gray-700'
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
