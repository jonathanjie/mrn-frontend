<template>
  <div
    v-if="!pilotArrChecked"
    @click="pilotArrChecked = !pilotArrChecked"
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
      @click="pilotArrChecked = !pilotArrChecked"
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
        v-model="pilot_arr_name"
        :placeholder="$t('inputName')"
        class="col-span-3 p-3 pl-4 border-y border-r bg-white text-14 text-gray-700 focus:outline-0"
      />
      <div
        class="col-span-2 text-blue-700 p-3 border-x border-b xl:border-b-0 bg-gray-50 text-14"
      >
        {{ $t("requiredTimeOfArrival") }}
      </div>
      <div
        class="col-span-3 relative flex items-center border-r border-b xl:border-b-0"
      >
        <DatePicker
          v-model="pilot_arr_date_time"
          class="grow"
          textInput
          :textInputOptions="textInputOptions"
          :format="format"
          :modelValue="string"
          auto-apply
        >
          <template #input-icon>
            <img src="" />
          </template>
        </DatePicker>
        <MiniUnitDisplay
          class="absolute right-0 min-w-fit"
          :class="pilot_arr_date_time ? 'mr-9' : 'mr-2'"
          >{{ pilot_arr_date_time_utc }}</MiniUnitDisplay
        >
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
      <div class="flex col-span-5 p-2 pl-4 border-b border-x bg-white">
        <input
          v-model="pilot_arr_draft_fwd"
          @keypress="preventNaN($event, pilot_arr_draft_fwd)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>M</MiniUnitDisplay>
      </div>
      <div class="col-span-1 text-blue-700 p-3 border-b my-auto self-center">
        {{ $t("mid") }}
      </div>
      <div class="flex col-span-5 p-2 pl-4 border-b border-x bg-white">
        <input
          v-model="pilot_arr_draft_mid"
          @keypress="preventNaN($event, pilot_arr_draft_mid)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>M</MiniUnitDisplay>
      </div>
      <div class="col-span-1 text-blue-700 p-3 my-auto self-center">
        {{ $t("aft") }}
      </div>
      <div class="flex col-span-5 p-2 pl-4 border-x bg-white">
        <input
          v-model="pilot_arr_draft_aft"
          @keypress="preventNaN($event, pilot_arr_draft_aft)"
          placeholder="00.00"
          class="w-24 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>M</MiniUnitDisplay>
      </div>
      <div class="col-span-10 border-t"></div>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
      <span class="col-span-2 text-blue-700 p-3 text-14 self-center">{{
        $t("latitude")
      }}</span>
      <input
        v-model="pilot_arr_lat_degree"
        @keypress="preventNaN($event, pilot_arr_lat_degree)"
        placeholder="000 (Deg)"
        class="p-3 pl-4 border-l bg-white text-14 text-gray-700 focus:outline-0"
      />
      <input
        v-model="pilot_arr_lat_minute"
        @keypress="preventNaN($event, pilot_arr_lat_minute)"
        placeholder="000 (Min)"
        class="p-3 pl-4 border-l bg-white text-14 text-gray-700 focus:outline-0"
      />
      <select
        v-model="pilot_arr_lat_dir"
        class="p-3 text-14 border-l focus:outline-0"
        :class="
          pilot_arr_lat_dir === 'default' ? 'text-gray-400' : 'text-gray-700'
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
        v-model="pilot_arr_long_degree"
        @keypress="preventNaN($event, pilot_arr_long_degree)"
        placeholder="000 (Deg)"
        class="p-3 pl-4 border-l bg-white text-14 text-gray-700 focus:outline-0"
      />
      <input
        v-model="pilot_arr_long_minute"
        @keypress="preventNaN($event, pilot_arr_long_minute)"
        placeholder="000 (Min)"
        class="p-3 pl-4 border-l bg-white text-14 text-gray-700 focus:outline-0"
      />
      <select
        v-model="pilot_arr_long_dir"
        class="p-3 text-14 border-l focus:outline-0"
        :class="
          pilot_arr_long_dir === 'default' ? 'text-gray-400' : 'text-gray-700'
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

<script setup>
import {
  preventNaN,
  textInputOptions,
  format,
  formatUTC,
} from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { useDepartureCOSPReportStore } from "@/stores/useDepartureCOSPReportStore";
import { storeToRefs } from "pinia";
import { UTCPlaceholder } from "@/constants";
import { computed } from "vue";

const store = useDepartureCOSPReportStore();
const {
  pilotArrChecked,
  pilotArrName: pilot_arr_name,
  pilotArrDateTime: pilot_arr_date_time,
  pilotArrDateTimeUTC,
  pilotArrDraftFwd: pilot_arr_draft_fwd,
  pilotArrDraftMid: pilot_arr_draft_mid,
  pilotArrDraftAft: pilot_arr_draft_aft,
  pilotArrLatDir: pilot_arr_lat_dir,
  pilotArrLatDegree: pilot_arr_lat_degree,
  pilotArrLatMinute: pilot_arr_lat_minute,
  pilotArrLongDir: pilot_arr_long_dir,
  pilotArrLongDegree: pilot_arr_long_degree,
  pilotArrLongMinute: pilot_arr_long_minute,
} = storeToRefs(store);

const pilot_arr_date_time_utc = computed(() =>
  pilotArrDateTimeUTC.value
    ? formatUTC(new Date(pilotArrDateTimeUTC.value))
    : UTCPlaceholder
);
</script>
