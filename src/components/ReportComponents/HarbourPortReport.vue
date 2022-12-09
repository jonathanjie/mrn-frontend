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
        <input type="radio" id="event" value="0" v-model="data.type" />
        <label for="event">{{ $t("event") }}</label>
      </div>
      <div class="flex align-center space-x-2">
        <input
          type="radio"
          id="noonInHarbourPort"
          value="1"
          v-model="data.type"
        />
        <label for="noonInHarbourPort">{{ $t("noonInHarbourPort") }}</label>
      </div>
    </div>

    <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border text-14">
      <div class="col-span-2 text-blue-700 p-3 border-b border-r bg-gray-50">
        {{ $t("status") }}
      </div>
      <select
        v-model="data.status"
        class="col-span-3 p-3 border-b focus:outline-0"
        :class="
          data.load_condition === 'default' ? 'text-gray-400' : 'text-gray-700'
        "
      >
        <option selected disabled value="default">
          {{ $t("selectEvent") }}
        </option>
      </select>
      <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50">
        {{ $t("dateAndTime") }}
      </div>
      <DatePicker
        v-model="data.date_time"
        class="col-span-3 border-b"
        textInput
        :textInputOptions="textInputOptions"
        :format="format"
        :disabled="data.date_time === 'default' || data.date_time === 'default'"
        :modelValue="string"
        placeholder="Select date & time"
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
          v-model="data.distance_travelled"
          @keypress="preventNaN($event, data.distance_travelled)"
          placeholder="0"
          class="w-16 text-14 text-gray-700 focus:outline-0"
        />
        <MiniUnitDisplay>NM</MiniUnitDisplay>
      </div>
    </div>

    <div
      class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50 text-14"
    >
      <div class="col-span-2 row-span-2 text-blue-700 p-3 border-r">
        {{ $t("operations") }}
      </div>
      <div
        class="col-span-3 bg-white flex flex-col space-y-2 p-3 text-gray-700"
      >
        <!-- TODO: make dynamic -->
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="waiting"
            value="0"
            v-model="data.operations"
          />
          <label for="waiting">{{ $t("waiting") }}</label>
        </div>
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="cargoOperation"
            value="1"
            v-model="data.operations"
          />
          <label for="cargoOperation">{{ $t("cargoOperation") }}</label>
        </div>
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="bunkeringDebunkering"
            value="2"
            v-model="data.operations"
          />
          <label for="bunkeringDebunkering">{{
            $t("bunkeringDebunkering")
          }}</label>
        </div>
        <div class="flex align-center space-x-2">
          <input
            type="checkbox"
            id="others"
            value="3"
            v-model="data.operations"
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
        v-model="data.lat_degree"
        @keypress="preventNaN($event, data.lat_degree)"
        placeholder="000 (Degree)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-gray-700 focus:outline-0"
      />
      <input
        v-model="data.lat_minutes"
        @keypress="preventNaN($event, data.lat_minutes)"
        placeholder="000 (Minutes)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-gray-700 focus:outline-0"
      />
      <select
        v-model="data.lat_dir"
        class="col-span-3 p-3 border-l focus:outline-0"
        :class="data.lat_dir === 'default' ? 'text-gray-400' : 'text-gray-700'"
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
        v-model="data.long_degree"
        @keypress="preventNaN($event, data.long_degree)"
        placeholder="000 (Degree)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-gray-700 focus:outline-0"
      />
      <input
        v-model="data.long_minutes"
        @keypress="preventNaN($event, data.long_minutes)"
        placeholder="000 (Minutes)"
        class="col-span-3 p-3 pl-4 border-l border-b bg-white text-gray-700 focus:outline-0"
      />
      <select
        v-model="data.long_dir"
        class="col-span-3 p-3 border-l focus:outline-0"
        :class="data.long_dir === 'default' ? 'text-gray-400' : 'text-gray-700'"
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
import { reactive } from "vue";

const data = reactive({
  type: "",
  status: "default",
  date_time: "",
  distance_travelled: "",
  lat_dir: "default",
  lat_minutes: "",
  lat_degree: "",
  long_dir: "default",
  long_minutes: "",
  long_degree: "",
  operations: [],
});
</script>
