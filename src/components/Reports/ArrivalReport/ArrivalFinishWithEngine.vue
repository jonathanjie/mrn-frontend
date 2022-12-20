<template>
  <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
    <div class="col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">
        <slot>{{ $t("finishWithEngine") }}</slot>
      </span>
    </div>
    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
      <div
        class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
      >
        {{ $t("timeZone") }}
      </div>
      <div class="flex col-span-3 border-b">
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
      <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
        {{ $t("dateAndTime") }}
      </div>
      <DatePicker
        v-model="date_time"
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
    <div></div>

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
        v-model="lat_minute"
        @keypress="preventNaN($event, lat_minute)"
        placeholder="000 (Minutes)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
      />
      <select
        v-model="lat_dir"
        class="col-span-3 p-3 text-14 border-l focus:outline-0 focus:outline-0"
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

    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-white text-14"
    >
      <div class="col-span-2 row-span-2 bg-gray-50 text-blue-700 p-3 border-r">
        {{ $t("status") }}
      </div>
      <div class="col-span-3 flex flex-col space-y-2 p-3 text-gray-700">
        <div class="flex align-center space-x-2">
          <input
            type="radio"
            id="anchoringStartOutside"
            value="0"
            v-model="status"
          />
          <label for="anchoringStartOutside">{{
            $t("anchoringStartOutside")
          }}</label>
        </div>
        <div class="flex align-center space-x-2">
          <input
            type="radio"
            id="anchoringStartInside"
            value="1"
            v-model="status"
          />
          <label for="anchoringStartInside">{{
            $t("anchoringStartInside")
          }}</label>
        </div>
        <div class="flex align-center space-x-2">
          <input type="radio" id="driftingStart" value="2" v-model="status" />
          <label for="driftingStart">{{ $t("driftingStart") }}</label>
        </div>
        <div class="flex align-center space-x-2">
          <input type="radio" id="berthingStart" value="3" v-model="status" />
          <label for="berthingStart">{{ $t("berthingStart") }}</label>
        </div>
      </div>
    </div>

    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <div class="col-span-2 row-span-2 text-blue-700 p-3 border-r">
        {{ $t("operationAtCurrentLocation") }}
      </div>
      <div
        class="col-span-3 bg-white flex flex-col space-y-2 p-3 text-gray-700"
      >
        <!-- TODO: make dynamic -->
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="cargoOpBerth"
            value="0"
            v-model="planned_operations"
          />
          <label for="cargoOpBerth">{{ $t("cargoOperationBerth") }}</label>
        </div>
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="cargoOpSTSSTB"
            value="1"
            v-model="planned_operations"
          />
          <label for="cargoOpSTSSTB">{{ $t("cargoOperationSTSSTB") }}</label>
        </div>
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="bunkeringDebunkering"
            value="2"
            v-model="planned_operations"
          />
          <label for="bunkeringDebunkering">{{
            $t("bunkeringDebunkering")
          }}</label>
        </div>
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="dryDocking"
            value="3"
            v-model="planned_operations"
          />
          <label for="dryDocking">{{ $t("dryDocking") }}</label>
        </div>
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="crewChange"
            value="4"
            v-model="planned_operations"
          />
          <label for="crewChange">{{ $t("crewChange") }}</label>
        </div>
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="receivingProvisionSpareParts"
            value="5"
            v-model="planned_operations"
          />
          <label for="receivingProvisionSpareParts">{{
            $t("receivingProvisionSpareParts")
          }}</label>
        </div>
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="survey"
            value="6"
            v-model="planned_operations"
          />
          <label for="survey">{{ $t("survey") }}</label>
        </div>
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="others"
            value="7"
            v-model="planned_operations"
          />
          <label for="others">{{ $t("others") }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { preventNaN, textInputOptions, format } from "@/utils/helpers.js";
import { useArrivalFWEReportStore } from "@/stores/useArrivalFWEReportStore";
import { storeToRefs } from "pinia";

const store = useArrivalFWEReportStore();
const {
  timeZone: time_zone,
  dateTime: date_time,
  latDir: lat_dir,
  latDegree: lat_degree,
  latMinute: lat_minute,
  longDir: long_dir,
  longMinute: long_minutes,
  longDegree: long_degree,
  planned_operations: planned_operations,
  status: status,
} = storeToRefs(store);
</script>
