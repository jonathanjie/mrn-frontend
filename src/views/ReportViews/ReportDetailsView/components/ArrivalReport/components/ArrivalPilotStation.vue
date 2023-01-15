<script setup>
import {
  preventNaN,
  textInputOptions,
  format,
  convertUTCToLT,
} from "@/utils/helpers.js";
import { computed } from "vue";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { parsePositionFromString } from "@/utils/helpers.js";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const isActive = computed(() =>
  props.report.arrivalpilotstation ? true : false
);

const pilotArrName = computed(() => props.report.arrivalpilotstation.name);
const pilotArrDateTime = computed(() =>
  convertUTCToLT(
    new Date(props.report.arrivalpilotstation.date),
    props.report.report_tz
  )
);
const pilotArrDraftFwd = computed(
  () => props.report.arrivalpilotstation.draft_fwd
);
const pilotArrDraftMid = computed(
  () => props.report.arrivalpilotstation.draft_mid
);
const pilotArrDraftAft = computed(
  () => props.report.arrivalpilotstation.draft_aft
);
const position = computed(() =>
  parsePositionFromString(props.report.arrivalpilotstation.position)
);
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
    <span class="text-blue-700 text-16"
      ><slot>{{ $t("pilotStationArrival") }}</slot></span
    >
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
        <slot>{{ $t("pilotStationArrival") }}</slot>
      </span>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5">
      <div class="col-span-2 text-blue-700 p-3 border bg-gray-50 text-14">
        {{ $t("name") }}
      </div>
      <input
        disabled
        v-model="pilotArrName"
        :placeholder="$t('inputName')"
        class="col-span-3 p-3 pl-4 border-y border-r text-14 text-gray-700 focus:outline-0 bg-gray-50"
      />
      <div
        class="col-span-2 text-blue-700 p-3 border-x border-b lg:border-b-0 bg-gray-50 text-14"
      >
        {{ $t("dateAndTime") }}
      </div>
      <div
        class="col-span-3 relative flex items-center border-r border-b lg:border-b-0 bg-gray-50"
      >
        <DatePicker
          disabled
          v-model="pilotArrDateTime"
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
          :class="pilotArrDateTime ? 'mr-9' : 'mr-2'"
          >{{ pilot_arr_date_time_utc }}</MiniUnitDisplay
        > -->
      </div>
      <input
        disabled
        class="hidden lg:block bg-white col-span-5 p-3 border-t"
      />
    </div>
    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-10 border-t bg-gray-50 text-14"
    >
      <span
        class="col-span-4 row-span-3 text-blue-700 border-x p-3 py-16 my-auto self-center"
        >{{ $t("draft") }}</span
      >
      <div class="col-span-1 text-blue-700 p-3 border-b my-auto self-center">
        {{ $t("fwd") }}
      </div>
      <div class="flex col-span-5 p-2 pl-4 border-b border-x bg-gray-50">
        <input
          disabled
          v-model="pilotArrDraftFwd"
          @keypress="preventNaN($event, pilotArrDraftFwd)"
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
          v-model="pilotArrDraftMid"
          @keypress="preventNaN($event, pilotArrDraftMid)"
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
          v-model="pilotArrDraftAft"
          @keypress="preventNaN($event, pilotArrDraftAft)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>M</MiniUnitDisplay>
      </div>
      <div class="col-span-10 border-t"></div>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span
        class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center"
        >{{ $t("latitude") }}</span
      >
      <input
        disabled
        v-model="position.latDegree"
        @keypress="preventNaN($event, position.latDegree)"
        placeholder="000 (Degree)"
        class="col-span-3 p-3 pl-4 border-l border-b text-14 text-gray-700 focus:outline-0 bg-gray-50"
      />
      <input
        disabled
        v-model="position.latMinutes"
        @keypress="preventNaN($event, position.latMinutes)"
        placeholder="000 (Minutes)"
        class="col-span-3 p-3 pl-4 border-l border-b text-14 text-gray-700 focus:outline-0 bg-gray-50"
      />
      <select
        disabled
        v-model="position.latDir"
        class="col-span-3 p-3 text-14 border-l focus:outline-0 bg-gray-50"
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
      <span
        class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center"
        >{{ $t("longitude") }}</span
      >
      <input
        disabled
        v-model="position.longDegree"
        @keypress="preventNaN($event, position.longDegree)"
        placeholder="000 (Degree)"
        class="col-span-3 p-3 pl-4 border-l border-b text-14 text-gray-700 focus:outline-0 bg-gray-50"
      />
      <input
        disabled
        v-model="position.longMinutes"
        @keypress="preventNaN($event, position.longMinutes)"
        placeholder="000 (Minutes)"
        class="col-span-3 p-3 pl-4 border-l border-b text-14 text-gray-700 focus:outline-0 bg-gray-50"
      />
      <select
        disabled
        v-model="position.longDir"
        class="col-span-3 p-3 text-14 border-l focus:outline-0 bg-gray-50"
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
