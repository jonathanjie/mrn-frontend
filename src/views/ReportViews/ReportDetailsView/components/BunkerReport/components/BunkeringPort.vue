<script setup>
import { computed, defineProps } from "vue";
import { textInputOptions, format } from "@/utils/helpers.js";
import { TIMEZONES } from "@/utils/options";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const portCountry = computed(() => props.report.bdndata.bunkering_port.split(" ")[0]);
const portName = computed(() => props.report.bdndata.bunkering_port.split(" ")[1]);
const reportingDateTime = computed(() => props.report.report_date);
const reportingTimeZone = computed(() => props.report.report_tz);
</script>

<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card"
  >
    <div class="col-span-1 lg:col-span-2 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">{{ $t("bunkeringPort") }}</span>
    </div>
    <div class="col-span-1">
      <div class="grid grid-cols-5 border bg-gray-50 text-14">
        <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">
          {{ $t("portName") }}
        </div>
        <input
          disabled
          v-model="portCountry"
          :placeholder="$t('inputLocode2')"
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0"
        />
        <input
          disabled
          v-model="portName"
          :placeholder="$t('inputLocode3')"
          class="col-span-3 p-3 text-gray-700 border-l focus:outline-0"
        />
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
            :class="
              reportingTimeZone === 'default'
                ? 'text-gray-400'
                : 'text-gray-700'
            "
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
        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("dateAndTime") }}
        </div>
        <DatePicker
          v-model="reportingDateTime"
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
