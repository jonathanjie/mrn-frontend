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
          type="radio"
          id="event"
          :value="false"
          v-model="report_subtype_is_noon"
        />
        <label for="event">{{ $t("event") }}</label>
      </div>
      <div class="flex align-center space-x-2">
        <input
          type="radio"
          id="noonInHarbourPort"
          :value="true"
          v-model="report_subtype_is_noon"
          @change="recoverStatus"
        />
        <label for="noonInHarbourPort">{{ $t("noonInHarbourPort") }}</label>
      </div>
    </div>

    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 text-14">
      <div class="col-span-2 text-blue-700 p-3 border bg-gray-50">
        {{ $t("status") }}
      </div>
      <select
        v-model="status"
        :disabled="report_subtype_is_noon"
        class="col-span-3 p-3 border-y border-r focus:outline-0 disabled:text-gray-400 disabled:bg-gray-50"
        :class="status === 'default' ? 'text-gray-400' : 'text-gray-700'"
        @change="resetOperations"
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
      <div class="flex col-span-3 border-b border-r bg-white">
        <select
          class="grow self-center p-3 text-14 focus:outline-0"
          :class="
            reporting_time_zone === 'default'
              ? 'text-gray-400'
              : 'text-gray-700'
          "
          v-model="reporting_time_zone"
        >
          <option selected disabled value="{{prev_status}}">
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
      <div class="col-span-3 relative flex items-center border-b border-r">
        <DatePicker
          v-model="reporting_date_time"
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
        <MiniUnitDisplay
          class="absolute right-0 min-w-fit"
          :class="reporting_date_time ? 'mr-9' : 'mr-2'"
          >{{ reporting_date_time_utc }}</MiniUnitDisplay
        >
      </div>
      <div class="col-span-2 text-blue-700 p-3 border-x border-b bg-gray-50">
        {{ $t("distanceTravelled") }}
      </div>
      <div class="flex col-span-3 p-2 pl-4 bg-white border-b border-r">
        <input
          v-model="distance_travelled"
          @keypress="preventNaN($event, distance_travelled)"
          placeholder="0"
          class="w-16 text-14 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>NM</MiniUnitDisplay>
      </div>
      <input class="hidden lg:block bg-white col-span-5 p-3" disabled />
      <input class="hidden lg:block bg-white col-span-5 p-3" disabled />
    </div>

    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-white text-14"
    >
      <div class="col-span-2 row-span-2 text-blue-700 p-3 border-r bg-gray-50">
        {{ $t("operations") }}
      </div>
      <div
        class="col-span-3 flex flex-col space-y-2 p-3 text-gray-700"
        :class="
          report_subtype_is_noon || END_STATUS.includes(status)
            ? 'bg-gray-50'
            : ''
        "
      >
        <div class="flex align-center space-x-2">
          <input
            :disabled="report_subtype_is_noon || !START_STATUS.includes(status)"
            type="checkbox"
            id="waiting"
            value="waiting"
            v-model="operations"
            @click="setOperationsToWaiting"
          />
          <label
            for="waiting"
            :class="
              report_subtype_is_noon || !START_STATUS.includes(status)
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
            :disabled="
              report_subtype_is_noon ||
              !START_STATUS.includes(status) ||
              !planned_operations.includes(val) ||
              operations.includes('waiting')
            "
            type="checkbox"
            :id="val"
            :value="val"
            v-model="operations"
          />
          <label
            :for="val"
            :class="
              report_subtype_is_noon ||
              !START_STATUS.includes(status) ||
              !planned_operations.includes(val)
                ? 'text-gray-400'
                : ''
            "
            >{{ $t(key) }}</label
          >
        </div>
        <div
          v-if="other_planned_operation !== 'NIL'"
          class="flex align-center space-x-2"
        >
          <input
            :disabled="
              report_subtype_is_noon ||
              !START_STATUS.includes(status) ||
              !planned_operations.includes('others') ||
              operations.includes('waiting')
            "
            type="checkbox"
            id="others"
            value="others"
            v-model="operations"
          />
          <label
            for="others"
            :class="
              report_subtype_is_noon ||
              !START_STATUS.includes(status) ||
              !planned_operations.includes('others')
                ? 'text-gray-400'
                : ''
            "
            >{{ other_planned_operation }}</label
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
        v-model="long_degree"
        @keypress="preventNaN($event, long_degree)"
        placeholder="000 (Deg)"
        class="p-3 pl-4 border-l bg-white text-gray-700 focus:outline-0"
      />
      <input
        v-model="long_minutes"
        @keypress="preventNaN($event, long_minutes)"
        placeholder="000 (Min)"
        class="p-3 pl-4 border-l bg-white text-gray-700 focus:outline-0"
      />
      <select
        v-model="long_dir"
        class="p-3 border-l focus:outline-0"
        :class="long_dir === 'default' ? 'text-gray-400' : 'text-gray-700'"
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
      <span class="col-span-2 text-blue-700 p-3 self-center">{{
        $t("latitude")
      }}</span>
      <input
        v-model="lat_degree"
        @keypress="preventNaN($event, lat_degree)"
        placeholder="000 (Deg)"
        class="p-3 pl-4 border-l bg-white text-gray-700 focus:outline-0"
      />
      <input
        v-model="lat_minutes"
        @keypress="preventNaN($event, lat_minutes)"
        placeholder="000 (Min)"
        class="p-3 pl-4 border-l bg-white text-gray-700 focus:outline-0"
      />
      <select
        v-model="lat_dir"
        class="p-3 border-l focus:outline-0"
        :class="lat_dir === 'default' ? 'text-gray-400' : 'text-gray-700'"
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

<script setup>
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import {
  preventNaN,
  textInputOptions,
  format,
  formatUTC,
} from "@/utils/helpers.js";
import { useHarbourPortReportStore } from "@/stores/useHarbourPortReportStore";
import { storeToRefs } from "pinia";
import {
  TIMEZONES,
  OPERATIONS,
  START_STATUS,
  END_STATUS,
  PARKING_STATUS_EVNT,
} from "@/utils/options";
import { UTCPlaceholder } from "@/constants";
import { computed } from "vue";

const store = useHarbourPortReportStore();
const {
  reportSubtypeIsNoon: report_subtype_is_noon,
  prevStatus: prev_status,
  status: status,
  reportingDateTime: reporting_date_time,
  reportingTimeZone: reporting_time_zone,
  reportingDateTimeUTC,
  distanceTravelled: distance_travelled,
  latDir: lat_dir,
  latMinutes: lat_minutes,
  latDegree: lat_degree,
  longDir: long_dir,
  longMinutes: long_minutes,
  longDegree: long_degree,
  plannedOperations: planned_operations,
  otherPlannedOperation: other_planned_operation,
  operations: operations,
} = storeToRefs(store);

const setOperationsToWaiting = () => {
  if (
    operations.value !== ["waiting"] &&
    !operations.value.includes("waiting")
  ) {
    operations.value = ["waiting"];
  }
};

const recoverStatus = () => {
  if (report_subtype_is_noon.value) {
    status.value = prev_status.value;
    operations.value = [];
  }
};

const resetOperations = () => {
  if (END_STATUS.includes(status.value)) {
    operations.value = [];
  }
};

const reporting_date_time_utc = computed(() =>
  reportingDateTimeUTC.value
    ? formatUTC(new Date(reportingDateTimeUTC.value))
    : UTCPlaceholder
);
</script>
