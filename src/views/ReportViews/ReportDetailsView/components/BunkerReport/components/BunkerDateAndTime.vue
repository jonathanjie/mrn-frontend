<script setup>
import { preventNaN, textInputOptions, format } from "@/utils/helpers.js";
import { computed } from "vue";
import { convertUTCToLT } from "@/utils/helpers.js";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const alongside = computed(() =>
  convertUTCToLT(
    new Date(props.report.bdndata.alongside_date),
    props.report.report_tz
  )
);
const hose_connection = computed(() =>
  convertUTCToLT(
    new Date(props.report.bdndata.hose_connection_date),
    props.report.report_tz
  )
);
const pump_start = computed(() =>
  convertUTCToLT(
    new Date(props.report.bdndata.pump_start_date),
    props.report.report_tz
  )
);
const pump_stop = computed(() =>
  convertUTCToLT(
    new Date(props.report.bdndata.pump_stop_date),
    props.report.report_tz
  )
);
const hose_disconnection = computed(() =>
  convertUTCToLT(
    new Date(props.report.bdndata.hose_disconnection_date),
    props.report.report_tz
  )
);
const awayside = computed(() =>
  convertUTCToLT(
    new Date(props.report.bdndata.slipoff_date),
    props.report.report_tz
  )
);
const purchaser = computed(() => props.report.bdndata.purchaser);
const barge_name = computed(() => props.report.bdndata.barge_name);
const supplier_name = computed(() => props.report.bdndata.supplier_name);
const address = computed(() => props.report.bdndata.supplier_address);
const telephone_number = computed(() => props.report.bdndata.supplier_contact);
</script>

<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card"
  >
    <!-- Date & Time -->
    <div class="col-span-1">
      <div class="flex items-center mb-5">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700 text-16">{{ $t("dateAndTime") }}</span>
      </div>
      <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("alongside") }}
        </div>
        <DatePicker
          disabled
          v-model="alongside"
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

        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("hoseConnection") }}
        </div>
        <DatePicker
          disabled
          v-model="hose_connection"
          class="col-span-3 border-b bg-gray-50"
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

        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("pumpStart") }}
        </div>
        <DatePicker
          disabled
          v-model="pump_start"
          class="col-span-3 border-b bg-gray-50"
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

        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("pumpStop") }}
        </div>
        <DatePicker
          disabled
          v-model="pump_stop"
          class="col-span-3 border-b bg-gray-50"
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

        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("hoseDisconnection") }}
        </div>
        <DatePicker
          disabled
          v-model="hose_disconnection"
          class="col-span-3 border-b bg-gray-50"
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

        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("awayside") }}
        </div>
        <DatePicker
          disabled
          v-model="awayside"
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

    <!-- Supplier -->
    <div class="col-span-1">
      <div class="flex items-center mb-5">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700 text-16">{{ $t("supplier") }}</span>
      </div>
      <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("purchaser") }}
        </div>
        <input
          disabled
          v-model="purchaser"
          :placeholder="$t('inputDetails')"
          class="col-span-3 p-3 pl-4 bg-gray-50 text-14 text-gray-700 focus:outline-0"
        />

        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("bargeName") }}
        </div>
        <input
          disabled
          v-model="barge_name"
          :placeholder="$t('inputDetails')"
          class="col-span-3 p-3 pl-4 border-t bg-gray-50 text-14 text-gray-700 focus:outline-0"
        />

        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("supplierName") }}
        </div>
        <input
          disabled
          v-model="supplier_name"
          :placeholder="$t('inputDetails')"
          class="col-span-3 p-3 pl-4 border-t bg-gray-50 text-14 text-gray-700 focus:outline-0"
        />

        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("address") }}
        </div>
        <input
          disabled
          v-model="address"
          :placeholder="$t('inputDetails')"
          class="col-span-3 p-3 pl-4 border-t bg-gray-50 text-14 text-gray-700 focus:outline-0"
        />

        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("telephoneNumber") }}
        </div>
        <input
          disabled
          v-model="telephone_number"
          @keypress="preventNaN($event, telephone_number)"
          :placeholder="$t('countryCodePhoneNumber')"
          class="col-span-3 p-3 pl-4 border-t bg-gray-50 text-14 text-gray-700 focus:outline-0"
        />
      </div>
    </div>
  </div>
</template>
