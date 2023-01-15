<script setup>
import { computed } from "vue";
import { preventNaN, textInputOptions, format } from "@/utils/helpers.js";
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
const pilotArrName = computed(() =>
  props.report.arrivalpilotstation === null
    ? ""
    : props.report.arrivalpilotstation.name
);
const pilotArrDate = computed(() =>
  props.report.arrivalpilotstation === null
    ? ""
    : props.report.arrivalpilotstation.date
);
const pilotArrDraftFwd = computed(() =>
  props.report.arrivalpilotstation === null
    ? ""
    : props.report.arrivalpilotstation.draft_fwd
);
const pilotArrDraftMid = computed(() =>
  props.report.arrivalpilotstation === null
    ? ""
    : props.report.arrivalpilotstation.draft_mid
);
const pilotArrDraftAft = computed(() =>
  props.report.arrivalpilotstation === null
    ? ""
    : props.report.arrivalpilotstation.draft_aft
);
const position = computed(() =>
  props.report.arrivalpilotstation === null
    ? ""
    : parsePositionFromString(props.report.arrivalpilotstation.position)
);
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
    <span class="text-blue-700 text-16">{{ $t("pilotStationArrival") }}</span>
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
        {{ $t("pilotStationArrival") }}
      </span>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5">
      <div class="col-span-2 text-blue-700 p-3 border bg-gray-50 text-14">
        {{ $t("name") }}
      </div>
      <input
        v-model="pilotArrName"
        disabled
        :placeholder="$t('inputName')"
        class="col-span-3 p-3 pl-4 border-y border-r bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <div
        class="col-span-2 text-blue-700 p-3 border-x border-b xl:border-b-0 bg-gray-50 text-14"
      >
        {{ $t("requiredTimeOfArrival") }}
      </div>
      <div
        class="col-span-3 relative flex items-center border-r border-b xl:border-b-0 bg-gray-50"
      >
        <DatePicker
          disabled
          v-model="pilotArrDate"
          class="grow bg-gray-50"
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
          :class="pilot_arr_date_time ? 'mr-9' : 'mr-2'"
          >{{ pilot_arr_date_time_utc }}</MiniUnitDisplay
        > -->
      </div>
      <input
        class="hidden xl:block bg-white col-span-5 p-3 border-t"
        disabled
      />
    </div>
    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-10 border-t bg-gray-50 text-14"
    >
      <span
        class="col-span-4 row-span-3 text-blue-700 border-x p-3 py-16 my-auto self-center"
        >{{ $t("estimatedArrivalDraft") }}</span
      >
      <div class="col-span-1 text-blue-700 p-3 border-b my-auto self-center">
        {{ $t("fwd") }}
      </div>
      <div class="flex col-span-5 p-2 pl-4 border-b border-x bg-gray-50">
        <input
          v-model="pilotArrDraftFwd"
          placeholder="00.00"
          disabled
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>M</MiniUnitDisplay>
      </div>
      <div class="col-span-1 text-blue-700 p-3 border-b my-auto self-center">
        {{ $t("mid") }}
      </div>
      <div class="flex col-span-5 p-2 pl-4 border-b border-x bg-gray-50">
        <input
          v-model="pilotArrDraftMid"
          placeholder="00.00"
          disabled
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>M</MiniUnitDisplay>
      </div>
      <div class="col-span-1 text-blue-700 p-3 my-auto self-center">
        {{ $t("aft") }}
      </div>
      <div class="flex col-span-5 p-2 pl-4 border-x bg-gray-50">
        <input
          v-model="pilotArrDraftAft"
          placeholder="00.00"
          disabled
          class="w-24 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>M</MiniUnitDisplay>
      </div>
      <div class="col-span-10 border-t"></div>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span
        class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center"
        >{{ $t("longitude") }}</span
      >
      <input
        v-model="position.longDegree"
        placeholder="000 (Degree)"
        disabled
        class="col-span-3 p-3 pl-4 border-l border-b bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <input
        v-model="position.longMinutes"
        placeholder="000 (Minutes)"
        disabled
        class="col-span-3 p-3 pl-4 border-l border-b bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <select
        v-model="position.longDir"
        class="col-span-3 p-3 text-14 border-l focus:outline-0 bg-gray-50 text-gray-700"
        disabled
      >
        <option selected disabled value="default">
          {{ $t("eastAndWest") }}
        </option>
        <option value="E">{{ $t("east") }}</option>
        <option value="W">{{ $t("west") }}</option>
      </select>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span
        class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center"
        >{{ $t("latitude") }}</span
      >
      <input
        v-model="position.latDegree"
        placeholder="000 (Degree)"
        disabled
        class="col-span-3 p-3 pl-4 border-l border-b bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <input
        v-model="position.latMinutes"
        placeholder="000 (Minutes)"
        disabled
        class="col-span-3 p-3 pl-4 border-l border-b bg-gray-50 text-14 text-gray-700 focus:outline-0"
      />
      <select
        v-model="position.latDir"
        disabled
        class="col-span-3 p-3 text-14 border-l focus:outline-0 bg-gray-50 text-gray-700"
      >
        <option selected disabled value="default">
          {{ $t("southAndNorth") }}
        </option>
        <option value="S">{{ $t("south") }}</option>
        <option value="N">{{ $t("north") }}</option>
      </select>
    </div>
  </div>
</template>
