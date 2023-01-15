<script setup>
import { textInputOptions, format } from "@/utils/helpers.js";
import { TIMEZONES } from "@/utils/options";
import { computed } from "@vue/reactivity";
import { convertUTCToLT } from "@/utils/helpers.js";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const reporting_time_zone = computed(() => props.report.report_tz);
const reporting_date_time = computed(() =>
  convertUTCToLT(new Date(props.report.report_date), props.report.report_tz)
);
const port_country = computed(
  () => props.report.bdndata.bunkering_port.split(" ")[0]
);
const port_name = computed(
  () => props.report.bdndata.bunkering_port.split(" ")[1]
);
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
        <div
          class="col-span-2 row-span-2 self-center text-blue-700 p-3 bg-gray-50"
        >
          {{ $t("portName") }}
        </div>
        <input
          disabled
          :value="port_country.toUpperCase()"
          @input="port_country = $event.target.value.toUpperCase()"
          :placeholder="$t('inputLocode2')"
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0 bg-gray-50"
        />
        <input
          disabled
          :value="port_name.toUpperCase()"
          @input="port_name = $event.target.value.toUpperCase()"
          :placeholder="$t('inputLocode3')"
          class="col-span-3 p-3 text-gray-700 border-l focus:outline-0 bg-gray-50"
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
        <div class="flex col-span-3 border-b bg-gray-50">
          <select
            disabled
            class="grow self-center p-3 text-14 focus:outline-0 bg-gray-50"
            :class="
              reporting_time_zone === 'default'
                ? 'text-gray-400'
                : 'text-gray-700'
            "
            v-model="reporting_time_zone"
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
          disabled
          v-model="reporting_date_time"
          class="col-span-3 bg-gray-50"
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
