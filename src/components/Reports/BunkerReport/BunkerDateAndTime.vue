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
          v-model="hose_connection"
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
          {{ $t("pumpStart") }}
        </div>
        <DatePicker
          v-model="pump_start"
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
          {{ $t("pumpStop") }}
        </div>
        <DatePicker
          v-model="pump_stop"
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
          {{ $t("hoseDisconnection") }}
        </div>
        <DatePicker
          v-model="hose_disconnection"
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

        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("awayside") }}
        </div>
        <DatePicker
          v-model="awayside"
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
          v-model="purchaser"
          :placeholder="$t('inputDetails')"
          class="col-span-3 p-3 pl-4 bg-white text-14 text-gray-700 focus:outline-0"
        />

        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("bargeName") }}
        </div>
        <input
          v-model="barge_name"
          :placeholder="$t('inputDetails')"
          class="col-span-3 p-3 pl-4 border-t bg-white text-14 text-gray-700 focus:outline-0"
        />

        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("supplierName") }}
        </div>
        <input
          v-model="supplier_name"
          :placeholder="$t('inputDetails')"
          class="col-span-3 p-3 pl-4 border-t bg-white text-14 text-gray-700 focus:outline-0"
        />

        <div
          class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14"
        >
          {{ $t("address") }}
        </div>
        <input
          v-model="address"
          :placeholder="$t('inputDetails')"
          class="col-span-3 p-3 pl-4 border-t bg-white text-14 text-gray-700 focus:outline-0"
        />

        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("telephoneNumber") }}
        </div>
        <input
          v-model="telephone_number"
          :placeholder="$t('countryCodePhoneNumber')"
          class="col-span-3 p-3 pl-4 border-t bg-white text-14 text-gray-700 focus:outline-0"
        />
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
  alongside: alongside,
  hoseConnection: hose_connection,
  pumpStart: pump_start,
  pumpStop: pump_stop,
  hoseDisconnection: hose_disconnection,
  awayside: awayside,
  purchaser: purchaser,
  bargeName: barge_name,
  supplierName: supplier_name,
  address: address,
  telephoneNumber: telephone_number,
} = storeToRefs(store);
</script>
