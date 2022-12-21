<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card"
  >
    <!-- Departure -->
    <div class="col-span-1">
      <div class="flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700 text-16">{{ $t("departure") }}</span>
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
        <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">
          {{ $t("portName") }}
        </div>
        <input
          class="col-span-3 p-3 text-gray-700 bg-gray-50 border-l border-b"
          disabled
          v-model="departure_port_country"
        />
        <input
          class="col-span-3 p-3 text-gray-700 bg-gray-50 border-l"
          disabled
          v-model="departure_port_name"
        />
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14">
        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("dateAndTime") }}
        </div>
        <DatePicker
          v-model="departure_date_time"
          class="col-span-3"
          textInput
          :textInputOptions="textInputOptions"
          :format="format"
          :disabled="true"
          :modelValue="string"
          :placeholder="$t('selectDateAndTime')"
        >
          <template #input-icon>
            <img src="" />
          </template>
        </DatePicker>
      </div>
    </div>

    <!-- Arrival -->
    <div class="col-span-1">
      <div class="flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700 text-16">{{ $t("arrival") }}</span>
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
        <div class="col-span-2 row-span-2 self-center text-blue-700 p-3">
          {{ $t("portName") }}
        </div>
        <input
          class="col-span-3 p-3 text-gray-700 bg-gray-50 border-l border-b"
          disabled
          v-model="arrival_port_country"
        />
        <input
          class="col-span-3 p-3 text-gray-700 bg-gray-50 border-l"
          disabled
          v-model="arrival_port_name"
        />
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14">
        <div class="col-span-2 row-span-2 text-blue-700 p-3 border-r">
          {{ $t("plannedOperation") }}
        </div>
        <div
          class="col-span-3 bg-white flex flex-col space-y-2 p-3 text-gray-700"
        >
          <div class="flex align-center space-x-2">
            <input
              type="checkbox"
              id="cargoOpBerth"
              value="cargoOpBerth"
              v-model="planned_operation"
            />
            <label for="cargoOpBerth">{{ $t("cargoOperationBerth") }}</label>
          </div>
          <div class="flex align-center space-x-2">
            <input
              type="checkbox"
              id="cargoOpSTSSTB"
              value="cargoOpSTSSTB"
              v-model="planned_operation"
            />
            <label for="cargoOpSTSSTB">{{ $t("cargoOperationSTSSTB") }}</label>
          </div>
          <div class="flex align-center space-x-2">
            <input
              type="checkbox"
              id="bunkeringDebunkering"
              value="bunkeringDebunkering"
              v-model="planned_operation"
            />
            <label for="bunkeringDebunkering">{{
              $t("bunkeringDebunkering")
            }}</label>
          </div>
          <div class="flex align-center space-x-2">
            <input
              type="checkbox"
              id="dryDocking"
              value="dryDocking"
              v-model="planned_operation"
            />
            <label for="dryDocking">{{ $t("dryDocking") }}</label>
          </div>
          <div class="flex align-center space-x-2">
            <input
              type="checkbox"
              id="crewChange"
              value="crewChange"
              v-model="planned_operation"
            />
            <label for="crewChange">{{ $t("crewChange") }}</label>
          </div>
          <div class="flex align-center space-x-2">
            <input
              type="checkbox"
              id="receivingProvisionSpareParts"
              value="receivingProvisionSpareParts"
              v-model="planned_operation"
            />
            <label for="receivingProvisionSpareParts">{{
              $t("receivingProvisionSpareParts")
            }}</label>
          </div>
          <div class="flex align-center space-x-2">
            <input
              type="checkbox"
              id="survey"
              value="survey"
              v-model="planned_operation"
            />
            <label for="survey">{{ $t("survey") }}</label>
          </div>
          <div class="flex align-center space-x-2">
            <input
              type="checkbox"
              id="others"
              value="others"
              v-model="planned_operation"
            />
            <label for="others">{{ $t("others") }}</label>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-5 border bg-gray-50 text-14 my-5">
        <div class="col-span-2 text-blue-700 p-3">{{ $t("others") }}</div>
        <input
          class="col-span-3 p-3 text-gray-700 border-l"
          :placeholder="$t('inputOtherPlannedOperation')"
          v-model="other_planned_operation"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { textInputOptions, format } from "@/utils/helpers.js";
import { storeToRefs } from "pinia";
import { useArrivalEOSPReportStore } from "@/stores/useArrivalEOSPReportStore";

const store = useArrivalEOSPReportStore();
const {
  departurePortCountry: departure_port_country,
  departurePortName: departure_port_name,
  departureDateTime: departure_date_time,
  arrivalPortCountry: arrival_port_country,
  arrivalPortName: arrival_port_name,
  plannedOperation: planned_operation,
  otherPlannedOperation: other_planned_operation,
} = storeToRefs(store);
</script>
