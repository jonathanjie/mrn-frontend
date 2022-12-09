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
          v-model="data.port_country"
          :placeholder="$t('inputLocode2')"
          class="col-span-3 p-3 text-gray-700 border-l border-b focus:outline-0"
        />
        <input
          v-model="data.port_name"
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
              value="0"
              v-model="data.status"
            />
            <label for="anchoringOutLimit">{{ $t("anchoringOutLimit") }}</label>
          </div>
          <div class="flex align-center space-x-2">
            <input
              type="checkbox"
              id="anchoringInnerLimit"
              value="1"
              v-model="data.status"
            />
            <label for="anchoringInnerLimit">{{
              $t("anchoringInnerLimit")
            }}</label>
          </div>
          <div class="flex align-center space-x-2">
            <input
              type="checkbox"
              id="berthing"
              value="2"
              v-model="data.status"
            />
            <label for="berthing">{{ $t("berthing") }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-1">
      <div class="grid grid-cols-5 border bg-gray-50 text-14">
        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("dateAndTime") }}
        </div>
        <DatePicker
          v-model="data.date_time"
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
import { preventNaN, textInputOptions, format } from "@/utils/helpers.js";
import { reactive } from "vue";

const data = reactive({
  port_country: "",
  port_name: "",
  date_time: "",
  status: [],
});
</script>
