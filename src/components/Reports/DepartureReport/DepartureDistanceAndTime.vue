<template>
  <div
    class="grid bg-white rounded-lg p-5 gap-4 divide-y divide-dashed shadow-card"
  >
    <!-- Distance & Time (R/UP Engine) -->
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div class="col-span-2 flex items-center">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700 text-16">{{ $t("rupEngine") }}</span>
      </div>
      <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
        <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">
          {{ $t("dateAndTime") }}
        </div>
        <DatePicker
          v-model="store.rupEngine.date_time"
          class="col-span-3"
          textInput
          :textInputOptions="textInputOptions"
          :format="format"
          :modelValue="string"
          :placeholder="$t('pleaseSelectDateAndTime')"
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
          v-model="store.rupEngine.lat_degree"
          @keypress="preventNaN($event, store.rupEngine.lat_degree)"
          placeholder="000 (Degree)"
          class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="store.rupEngine.lat_minutes"
          @keypress="preventNaN($event, store.rupEngine.lat_minutes)"
          placeholder="000 (Minutes)"
          class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
        />
        <select
          v-model="store.rupEngine.lat_dir"
          class="col-span-3 p-3 text-14 border-l focus:outline-0"
          :class="
            store.rupEngine.lat_dir === 'default' ? 'text-gray-400' : 'text-gray-700'
          "
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
          v-model="store.rupEngine.long_degree"
          @keypress="preventNaN($event, store.rupEngine.long_degree)"
          placeholder="000 (Degree)"
          class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
        />
        <input
          v-model="store.rupEngine.long_minutes"
          @keypress="preventNaN($event, store.rupEngine.long_minutes)"
          placeholder="000 (Minutes)"
          class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"
        />
        <select
          v-model="store.rupEngine.long_dir"
          class="col-span-3 p-3 text-14 border-l focus:outline-0"
          :class="
            store.rupEngine.long_dir === 'default' ? 'text-gray-400' : 'text-gray-700'
          "
        >
          <option selected disabled value="default">
            {{ $t("eastAndWest") }}
          </option>
          <option value="E">{{ $t("east") }}</option>
          <option value="W">{{ $t("west") }}</option>
        </select>
      </div>
    </div>

    <!-- S/BY to R/UP -->
    <div class="grid grid-cols-2 gap-4">
      <div class="flex items-center col-span-2 mt-4">
        <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
        <span class="text-blue-700 text-16">
          <slot>{{ $t("distanceAndTimeSbyToRup") }}</slot>
        </span>
      </div>
      <div class="col-span-2 lg:col-span-1 grid grid-cols-5">
        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14"
        >
          {{ $t("time") }}
        </div>
        <div class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t">
          <input
            v-model="store.inHarbour.time"
            @keypress="preventNaN($event, store.inHarbour.time)"
            placeholder="000"
            class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>HRS</MiniUnitDisplay>
        </div>

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14"
        >
          {{ $t("distanceByObservation") }}
        </div>
        <div class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t">
          <input
            v-model="store.inHarbour.distance_by_observation"
            @keypress="preventNaN($event, store.inHarbour.distance_by_observation)"
            placeholder="000"
            class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>NM</MiniUnitDisplay>
        </div>

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t lg:border-y bg-gray-50 text-14"
        >
          {{ $t("distanceByEngine") }}
        </div>
        <div
          class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t lg:border"
        >
          <input
            v-model="store.inHarbour.distance_by_engine"
            @keypress="preventNaN($event, store.inHarbour.distance_by_engine)"
            placeholder="000"
            class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>NM</MiniUnitDisplay>
        </div>

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t lg:border-t-0 bg-gray-50 text-14"
        >
          {{ $t("revolutionCounter") }}
        </div>
        <input
          v-model="store.inHarbour.revolution_counter"
          @keypress="preventNaN($event, store.inHarbour.revolution_counter)"
          placeholder="000"
          class="col-span-3 lg:col-span-3 p-3 pl-4 border-x border-t lg:border-t-0 bg-white text-14 text-gray-700 focus:outline-0"
        />

        <div
          class="col-span-2 text-blue-700 p-3 border-l border-t lg:border-y bg-gray-50 text-14"
        >
          {{ $t("setRPMofME") }}
        </div>
        <div
          class="flex col-span-3 lg:col-span-3 p-2 pl-4 border-x border-t lg:border"
        >
          <input
            v-model="store.inHarbour.setRPMofME"
            @keypress="preventNaN($event, store.inHarbour.setRPMofME)"
            placeholder="000.0"
            class="w-24 bg-white text-14 text-gray-700 focus:outline-0"
          />
          <MiniUnitDisplay>RPM</MiniUnitDisplay>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import { textInputOptions, format, preventNaN } from "@/utils/helpers.js";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { useDepartureCOSPReportStore } from "@/stores/useDepartureCOSPReportStore";

const store = useDepartureCOSPReportStore();


// TODO: make reactive
// const rupEngine = reactive({
//   date_time: "",
//   lat_degree: "",
//   lat_minutes: "",
//   lat_dir: "default",
//   long_degree: "",
//   long_minute: "",
//   long_dir: "default",
// });

// const inHarbour = reactive({
//   time: "",
//   distance_by_observation: "",
//   distance_by_engine: "",
//   revolution_counter: "",
//   setRPMofME: "",
// });
</script>
