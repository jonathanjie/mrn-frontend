<script setup>
import { computed } from "vue";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import {
  preventNaN,
  textInputOptions,
  format,
  parsePositionFromString,
  convertUTCToLT,
} from "@/utils/helpers.js";
import {
  TIMEZONES,
  OPERATIONS,
  START_STATUS,
  END_STATUS,
  PARKING_STATUS_EVNT,
} from "@/utils/options";
import { Report } from "@/constants";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const reportSubtypeIsNoon = computed(() =>
  props.report.report_type ==
  (Report.type.NOON_PORT ||
    props.report.report_type == Report.type.NOON_HARBOUR)
    ? true
    : false
);

const status = computed(() => props.report.eventdata?.parking_status ?? "");
const reportingTimeZone = computed(() => props.report.report_tz);
const reportingDateTime = computed(() =>
  convertUTCToLT(new Date(props.report.report_date), props.report.report_tz)
);
const distanceTravelled = computed(
  () => props.report.eventdata?.distance_travelled ?? 0
);
const operations = computed(() =>
  props.report?.plannedoperations
    ? Object.keys(props.report?.plannedoperations).filter(
        (key) => props.report?.plannedoperations[key]
      )
    : []
);
const plannedOperations = operations;
const otherPlannedOperation = computed(
  () => props.report?.plannedoperations?.planned_operation_othersdetails
);
const position = computed(() =>
  parsePositionFromString(props.report.eventdata.position)
);

// const reporting_date_time_utc = computed(() =>
//   reportingDateTimeUTC.value
//     ? formatUTC(new Date(reportingDateTimeUTC.value))
//     : UTCPlaceholder
// );
</script>

<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        <slot>{{ $t("report") }}</slot>
      </span>
    </div>

    <div class="col-span-2 flex space-x-5 text-gray-700 text-14">
      <div class="flex align-center space-x-2">
        <input
          disabled
          type="radio"
          id="event"
          :value="false"
          v-model="reportSubtypeIsNoon"
        />
        <label for="event">{{ $t("event") }}</label>
      </div>
      <div class="flex align-center space-x-2">
        <input
          disabled
          type="radio"
          id="noonInHarbourPort"
          :value="true"
          v-model="reportSubtypeIsNoon"
        />
        <label for="noonInHarbourPort">{{ $t("noonInHarbourPort") }}</label>
      </div>
    </div>

    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 text-14">
      <div class="col-span-2 text-blue-700 p-3 border bg-gray-50">
        {{ $t("status") }}
      </div>
      <select
        disabled
        v-model="status"
        class="col-span-3 p-3 border-y border-r focus:outline-0 bg-gray-50 text-gray-700"
      >
        <option selected disabled value="default">
          {{ $t("selectEvent") }}
        </option>
        <option
          v-for="(val, key) in PARKING_STATUS_EVNT"
          :value="val"
          :key="val"
        >
          {{ $t(key) }}
        </option>
      </select>
      <div
        class="col-span-2 text-blue-700 p-3 border-x border-b bg-gray-50 text-14"
      >
        {{ $t("timeZone") }}
      </div>
      <div class="flex col-span-3 border-b border-r bg-gray-50">
        <select
          disabled
          class="grow self-center p-3 text-14 focus:outline-0 bg-gray-50 text-gray-700"
          v-model="reportingTimeZone"
        >
          <option selected disabled value="default">
            {{ $t("selectTimeZone") }}
          </option>
          <option v-for="(val, key) in TIMEZONES" :key="val" :value="val">
            {{ key }}
          </option>
        </select>
      </div>
      <div
        class="col-span-2 text-blue-700 p-3 border-x border-b bg-gray-50 text-14"
      >
        {{ $t("dateAndTime") }}
      </div>
      <div
        class="col-span-3 relative flex items-center border-b border-r bg-gray-50"
      >
        <DatePicker
          disabled
          v-model="reportingDateTime"
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
          :class="reportingDateTime ? 'mr-9' : 'mr-2'"
          >{{ reporting_date_time_utc }}</MiniUnitDisplay
        > -->
      </div>
      <div class="col-span-2 text-blue-700 p-3 border-x border-b bg-gray-50">
        {{ $t("distanceTravelled") }}
      </div>
      <div class="flex col-span-3 p-2 pl-4 bg-gray-50 border-b border-r">
        <input
          disabled
          v-model="distanceTravelled"
          @keypress="preventNaN($event, distanceTravelled)"
          placeholder="0"
          class="w-16 text-14 text-gray-700 focus:outline-0 bg-gray-50"
        />
        <MiniUnitDisplay>NM</MiniUnitDisplay>
      </div>
      <input disabled class="hidden lg:block bg-white col-span-5 p-3" />
      <input disabled class="hidden lg:block bg-white col-span-5 p-3" />
    </div>

    <div
      v-if="plannedOperations"
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-white text-14"
    >
      <div class="col-span-2 row-span-2 text-blue-700 p-3 border-r bg-gray-50">
        {{ $t("operations") }}
      </div>
      <div
        class="col-span-3 flex flex-col space-y-2 p-3 text-gray-700 bg-gray-50"
        :class="
          reportSubtypeIsNoon || END_STATUS.includes(status) ? 'bg-gray-50' : ''
        "
      >
        <div class="flex align-center space-x-2">
          <input
            disabled
            type="checkbox"
            id="waiting"
            value="waiting"
            v-model="operations"
          />
          <label
            for="waiting"
            :class="
              reportSubtypeIsNoon ||
              !START_STATUS.includes(status) ||
              !plannedOperations.waiting
                ? 'text-gray-400'
                : ''
            "
            >{{ $t("waiting") }}</label
          >
        </div>
        <div
          v-for="(val, key) in OPERATIONS"
          :key="val"
          class="flex align-center space-x-2"
        >
          <input
            disabled
            type="checkbox"
            :id="val"
            :value="val"
            v-model="operations"
          />
          <label
            :for="val"
            :class="
              reportSubtypeIsNoon ||
              !START_STATUS.includes(status) ||
              !plannedOperations.val
                ? 'text-gray-400'
                : ''
            "
            >{{ $t(key) }}</label
          >
        </div>
        <div v-if="otherPlannedOperation" class="flex align-center space-x-2">
          <input
            disabled
            type="checkbox"
            id="others"
            value="others"
            v-model="operations"
          />
          <label
            for="others"
            :class="
              reportSubtypeIsNoon ||
              !START_STATUS.includes(status) ||
              !plannedOperations.others
                ? 'text-gray-400'
                : ''
            "
            >{{ otherPlannedOperation }}</label
          >
        </div>
      </div>
    </div>

    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <span class="col-span-2 text-blue-700 p-3 self-center">{{
        $t("longitude")
      }}</span>
      <input
        disabled
        v-model="position.longDegree"
        @keypress="preventNaN($event, position.longDegree)"
        placeholder="000 (Deg)"
        class="p-3 pl-4 border-l bg-gray-50 text-gray-700 focus:outline-0"
      />
      <input
        disabled
        v-model="position.longMinutes"
        @keypress="preventNaN($event, position.longMinutes)"
        placeholder="000 (Min)"
        class="p-3 pl-4 border-l bg-gray-50 text-gray-700 focus:outline-0"
      />
      <select
        disabled
        v-model="position.longDir"
        class="p-3 border-l focus:outline-0 bg-gray-50"
      >
        <option selected disabled value="default">
          {{ $t("eastAndWest") }}
        </option>
        <option value="E">{{ $t("east") }}</option>
        <option value="W">{{ $t("west") }}</option>
      </select>
    </div>

    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <span class="col-span-2 row-span-3 text-blue-700 p-3 self-center">{{
        $t("latitude")
      }}</span>
      <input
        disabled
        v-model="position.latDegree"
        @keypress="preventNaN($event, position.latDegree)"
        placeholder="000 (Degree)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-gray-50 text-gray-700 focus:outline-0"
      />
      <input
        disabled
        v-model="position.latMinutes"
        @keypress="preventNaN($event, position.latMinutes)"
        placeholder="000 (Minutes)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-gray-50 text-gray-700 focus:outline-0"
      />
      <select
        disabled
        v-model="position.latDir"
        class="col-span-3 p-3 border-l focus:outline-0 bg-gray-50 text-gray-700"
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
