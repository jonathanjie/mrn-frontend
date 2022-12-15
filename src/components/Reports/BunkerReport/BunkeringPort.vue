<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card"
  >
    <div class="col-span-1 lg:col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">{{ $t("bunkeringPort") }}</span>
    </div>
    <div class="col-span-1">
      <div class="grid grid-cols-5 border bg-gray-50 text-14 mb-5">
        <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">
          {{ $t("portName") }}
        </div>
        <input
          v-model="port_country"
          :placeholder="$t('inputLocode2')"
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0"
        />
        <input
          v-model="port_name"
          :placeholder="$t('inputLocode3')"
          class="col-span-3 p-3 text-gray-700 border-l focus:outline-0"
        />
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 mt-5">
        <div class="col-span-2 row-span-2 text-blue-700 p-3 border-r">
          {{ $t("status") }}
        </div>
        <div
          class="col-span-3 bg-white flex flex-col space-y-2 p-3 text-gray-700"
        >
          <div class="flex align-center space-x-2">
            <input
              type="checkbox"
              id="anchoringOutLimit"
              value="anchoringOutLimit"
              v-model="status"
            />
            <label for="anchoringOutLimit">{{ $t("anchoringOutLimit") }}</label>
          </div>
          <div class="flex align-center space-x-2">
            <input
              type="checkbox"
              id="anchoringInnerLimit"
              value="anchoringInnerLimit"
              v-model="status"
            />
            <label for="anchoringInnerLimit">{{
              $t("anchoringInnerLimit")
            }}</label>
          </div>
          <div class="flex align-center space-x-2">
            <input
              type="checkbox"
              id="berthing"
              value="berthing"
              v-model="status"
            />
            <label for="berthing">{{ $t("berthing") }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-1">
      <div class="grid grid-cols-5 border bg-gray-50 text-14">
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
    </div>
  </div>
</template>

<script setup>
import { textInputOptions, format } from "@/utils/helpers.js";
import { useBunkerReportStore } from "@/stores/useBunkerReportStore";
import { storeToRefs } from "pinia";

const store = useBunkerReportStore();
const {
  portCountry: port_country,
  portName: port_name,
  dateTime: date_time,
  timeZone: time_zone,
  status: status,
} = storeToRefs(store);
</script>
