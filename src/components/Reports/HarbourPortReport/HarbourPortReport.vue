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
        <input type="radio" id="event" value="event" v-model="type" />
        <label for="event">{{ $t("event") }}</label>
      </div>
      <div class="flex align-center space-x-2">
        <input
          type="radio"
          id="noonInHarbourPort"
          value="noonInHarbourPort"
          v-model="type"
        />
        <label for="noonInHarbourPort">{{ $t("noonInHarbourPort") }}</label>
      </div>
    </div>

    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border text-14">
      <div class="col-span-2 text-blue-700 p-3 border-b border-r bg-gray-50">
        {{ $t("status") }}
      </div>
      <select
        v-model="status"
        class="col-span-3 p-3 border-b focus:outline-0"
        :class="status === 'default' ? 'text-gray-400' : 'text-gray-700'"
      >
        <option selected disabled value="default">
          {{ $t("selectEvent") }}
        </option>
        <option value="anchoringStartOutside">
          {{ $t("anchoringStartOutside") }}
        </option>
        <option value="anchoringEndOutside">
          {{ $t("anchoringEndOutside") }}
        </option>
        <option value="anchoringStartInside">
          {{ $t("anchoringStartInside") }}
        </option>
        <option value="anchoringEndInside">
          {{ $t("anchoringEndInside") }}
        </option>
        <option value="driftingStart">
          {{ $t("driftingStart") }}
        </option>
        <option value="driftingEnd">
          {{ $t("driftingEnd") }}
        </option>
        <option value="driftingStart">
          {{ $t("shiftingStart") }}
        </option>
        <option value="driftingEnd">
          {{ $t("shiftingEnd") }}
        </option>
      </select>
      <div
        class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
      >
        {{ $t("timeZone") }}
      </div>
      <div class="flex col-span-3 border-b bg-white">
        <select
          class="grow self-center p-3 text-14 focus:outline-0"
          :class="time_zone === 'default' ? 'text-gray-400' : 'text-gray-700'"
          v-model="time_zone"
        >
          <option selected disabled value="default">
            {{ $t("selectTimeZone") }}
          </option>
          <option value="-12">UTC-12:00</option>
          <option value="-11">UTC-11:00</option>
          <option value="-10">UTC-10:00</option>
          <option value="-9.5">UTC-9:30</option>
          <option value="-9">UTC-9:00</option>
          <option value="-8">UTC-8:00</option>
          <option value="-7">UTC-7:00</option>
          <option value="-6">UTC-6:00</option>
          <option value="-5">UTC-5:00</option>
          <option value="-4">UTC-4:00</option>
          <option value="-3.5">UTC-3:30</option>
          <option value="-3">UTC-3:00</option>
          <option value="-2">UTC-2:00</option>
          <option value="-1">UTC-1:00</option>
          <option value="0">UTC</option>
          <option value="1">UTC+1:00</option>
          <option value="2">UTC+2:00</option>
          <option value="3">UTC+3:00</option>
          <option value="3.5">UTC+3:30</option>
          <option value="4">UTC+4:00</option>
          <option value="4.5">UTC+4:30</option>
          <option value="5">UTC+5:00</option>
          <option value="5.5">UTC+5:30</option>
          <option value="5.75">UTC+5:45</option>
          <option value="6">UTC+6:00</option>
          <option value="6.5">UTC+6:30</option>
          <option value="7">UTC+7:00</option>
          <option value="8">UTC+8:00</option>
          <option value="8.75">UTC+8:45</option>
          <option value="9">UTC+9:00</option>
          <option value="9.5">UTC+9:30</option>
          <option value="10">UTC+10:00</option>
          <option value="10.5">UTC+10:30</option>
          <option value="11">UTC+11:00</option>
          <option value="12">UTC+12:00</option>
          <option value="12.75">UTC+12:45</option>
          <option value="13">UTC+13:00</option>
          <option value="14">UTC+14:00</option>
        </select>
      </div>
      <div
        class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
      >
        {{ $t("dateAndTime") }}
      </div>
      <DatePicker
        v-model="date_time"
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
      <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50">
        {{ $t("distanceTravelled") }}
      </div>
      <div class="flex col-span-3 p-2 pl-4 bg-white">
        <input
          v-model="distance_travelled"
          @keypress="preventNaN($event, distance_travelled)"
          placeholder="0"
          class="w-16 text-14 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>NM</MiniUnitDisplay>
      </div>
    </div>

    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-white text-14"
    >
      <div class="col-span-2 row-span-2 text-blue-700 p-3 border-r bg-gray-50">
        {{ $t("operations") }}
      </div>
      <div class="col-span-3 flex flex-col space-y-2 p-3 text-gray-700">
        <!-- TODO: make dynamic -->
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="waiting"
            value="waiting"
            v-model="operations"
          />
          <label for="waiting">{{ $t("waiting") }}</label>
        </div>
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="cargoOperation"
            value="cargoOperation"
            v-model="operations"
          />
          <label for="cargoOperation">{{ $t("cargoOperation") }}</label>
        </div>
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="bunkeringDebunkering"
            value="bunkeringDebunkering"
            v-model="operations"
          />
          <label for="bunkeringDebunkering">{{
            $t("bunkeringDebunkering")
          }}</label>
        </div>
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="others"
            value="others"
            v-model="operations"
          />
          <label for="others">{{ $t("others") }}</label>
        </div>
      </div>
    </div>

    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <span class="col-span-2 row-span-3 text-blue-700 p-3 self-center">{{
        $t("latitude")
      }}</span>
      <input
        v-model="lat_degree"
        @keypress="preventNaN($event, lat_degree)"
        placeholder="000 (Degree)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-gray-700 focus:outline-0"
      />
      <input
        v-model="lat_minutes"
        @keypress="preventNaN($event, lat_minutes)"
        placeholder="000 (Minutes)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-gray-700 focus:outline-0"
      />
      <select
        v-model="lat_dir"
        class="col-span-3 p-3 border-l focus:outline-0"
        :class="lat_dir === 'default' ? 'text-gray-400' : 'text-gray-700'"
      >
        <option selected disabled value="default">
          {{ $t("southAndNorth") }}
        </option>
        <option value="S">{{ $t("south") }}</option>
        <option value="N">{{ $t("north") }}</option>
      </select>
    </div>

    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <span class="col-span-2 row-span-3 text-blue-700 p-3 self-center">{{
        $t("longitude")
      }}</span>
      <input
        v-model="long_degree"
        @keypress="preventNaN($event, long_degree)"
        placeholder="000 (Degree)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-gray-700 focus:outline-0"
      />
      <input
        v-model="long_minutes"
        @keypress="preventNaN($event, long_minutes)"
        placeholder="000 (Minutes)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-gray-700 focus:outline-0"
      />
      <select
        v-model="long_dir"
        class="col-span-3 p-3 border-l focus:outline-0"
        :class="long_dir === 'default' ? 'text-gray-400' : 'text-gray-700'"
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
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { preventNaN, textInputOptions, format } from "@/utils/helpers.js";
import { refs, reactive } from "vue";
import { useHarbourPortReportStore } from "@/stores/useHarbourPortReportStore";
import { storeToRefs } from "pinia";

const store = useHarbourPortReportStore();
const {
  type: type,
  status: status,
  dateTime: date_time,
  timeZone: time_zone,
  distanceTravelled: distance_travelled,
  latDir: lat_dir,
  latMinutes: lat_minutes,
  latDegree: lat_degree,
  longDir: long_dir,
  longMinutes: long_minutes,
  longDegree: long_degree,
  operations: operations,
} = storeToRefs(store);
</script>
