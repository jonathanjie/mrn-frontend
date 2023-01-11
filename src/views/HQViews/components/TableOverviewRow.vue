<template>
  <div
    v-if="props.header === 'Speed'"
    class="grid grid-cols-9 w-full rounded-lg w-full border mb-3"
  >
    <!-- Table header -->
    <div
      class="flex px-3.5 py-3 bg-sysblue-25 rounded-l-lg border-y border-l border-blue-200 col-span-2 items-center"
    >
      <span class="text-14 font-bold text-gray-800">{{ props.header }}</span>
    </div>
    <!-- Values -->
    <div v-for="(value, index) in props.values">
      <div
        class="flex px-3.5 py-3 justify-center"
        :class="
          index === props.values.length - 1
            ? 'bg-yellow-50 border border-yellow-200 rounded-r-lg'
            : 'border-l border-t border-gray-200'
        "
      >
        <span class="text-14 font-semibold text-gray-800">{{ value }}</span>
      </div>
    </div>
  </div>
  <div
    v-else-if="props.header === 'Date'"
    class="grid grid-cols-9 grid-rows-2 w-full rounded-lg w-full border mb-3"
  >
    <!-- Table header -->
    <div
      class="flex px-3.5 py-3 bg-sysblue-25 rounded-tl-lg border-y border-l border-blue-200 col-span-2 items-center"
    >
      <span class="text-14 font-bold text-gray-800">{{ props.header }}</span>
    </div>
    <div v-for="(value, index) in props.values">
      <div
        class="flex px-3.5 py-3 justify-center"
        :class="
          index === props.values.length - 1
            ? 'bg-yellow-50 border border-yellow-200 rounded-r-lg'
            : 'border-l border-t border-gray-200'
        "
      >
        <span class="text-14 font-semibold text-gray-800">{{ value }}</span>
      </div>
    </div>
    <div
      class="flex px-3.5 py-3 bg-sysblue-25 rounded-bl-lg border-y border-l border-blue-200 col-span-2 items-center"
    >
      <span class="text-14 font-bold text-gray-800">{{
        $t("reportType")
      }}</span>
    </div>
    <div v-for="(value, index) in props.reportType">
      <div
        class="flex px-3.5 py-3 justify-center"
        :class="
          index === props.reportType.length - 1
            ? 'bg-yellow-50 border border-yellow-200 rounded-r-lg'
            : 'border-l border-t border-gray-200'
        "
      >
        <img
          v-if="value === 'DCSP' || value === 'DSBY'"
          src="@/assets/icons/departure_header_icon.svg"
        />
        <img
          v-else-if="value === 'ASBY' || value === 'AFWE'"
          src="@/assets/icons/arrival_header_icon.svg"
        />
        <img
          v-else-if="value === 'NOON'"
          src="@/assets/icons/noon_header_icon.svg"
        />
        <img
          v-else-if="value === 'BDN'"
          src="@/assets/icons/bunker_header_icon.svg"
        />
        <img
          v-else-if="
            value === 'EVHB' ||
            value === 'EVPO' ||
            value === 'NNPO' ||
            value === 'NNHB'
          "
          src="@/assets/icons/in_harbour_header_icon.svg"
        />
        <span class="text-14 font-semibold text-gray-800 ml-1">{{
          reportTypes[value]
        }}</span>
      </div>
    </div>
  </div>
  <div
    v-else
    class="grid grid-cols-9 grid-rows-2 w-full rounded-lg w-full border mb-3"
  >
    <!-- Table header -->
    <div
      class="flex px-3.5 py-3 bg-sysblue-25 rounded-l-lg border-y border-l border-blue-200 row-span-2 items-center"
    >
      <span class="text-14 font-bold text-gray-800">{{ props.header }}</span>
    </div>
    <div
      class="flex px-3.5 py-3 bg-sysblue-25 border-t border-l border-blue-200"
    >
      <span
        v-if="props.header === 'Distance'"
        class="text-14 font-bold text-blue-500"
        >{{ $t("obs") }}</span
      >
      <span v-else class="text-14 font-bold text-blue-500">{{
        $t("foc")
      }}</span>
    </div>
    <!-- Values -->
    <div v-if="row1 !== undefined" v-for="(value, index) in row1">
      <div
        class="flex px-3.5 py-3 justify-center"
        :class="
          index === row1.length - 1
            ? 'bg-yellow-50 border-x border-t border-yellow-200 rounded-tr-lg'
            : 'border-l border-t border-gray-200'
        "
      >
        <span class="text-14 font-semibold text-gray-800">{{ value }}</span>
      </div>
    </div>
    <div
      class="flex px-3.5 py-3 bg-sysblue-25 border-y border-l border-blue-200"
    >
      <span
        v-if="props.header === 'Distance'"
        class="text-14 font-bold text-blue-500"
        >{{ $t("toGo") }}</span
      >
      <span v-else class="text-14 font-bold text-blue-500">{{
        $t("rob")
      }}</span>
    </div>
    <div v-if="row2 !== undefined" v-for="(value, index) in row2">
      <div
        class="flex px-3.5 py-3 justify-center"
        :class="
          index === row2.length - 1
            ? 'bg-yellow-50 border border-yellow-200 rounded-br-lg'
            : 'border-l border-y border-gray-200'
        "
      >
        <span class="text-14 font-semibold text-gray-800">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  header: String,
  report: Boolean,
  reportType: Array,
  values: Array,
  distanceToGo: Array,
  distanceOBS: Array,
  fuelFoc: Array,
  fuelRob: Array,
});

const reportTypes = {
  NOON: "Noon",
  DSBY: "Dep S/BY",
  DCSP: "Dep COSP",
  ASBY: "Arr S/BY",
  AFWE: "Arr F.W.E",
  BDN: "Bunker",
  EVHB: "Event in Harbour",
  EVPO: "Event in Port",
  NNHB: "Noon in Harbour",
  NNPO: "Noon in Port",
};
console.log("Props", props);
let colGrid = "";
if (props.values != undefined) {
  colGrid =
    props.values.length > 7
      ? "grid-cols-7"
      : "grid-cols-" + props.values.length.toString();
  // + (props.header === "Date" || props.header === "Distance"
} else if (props.distanceToGo != undefined) {
  colGrid =
    props.distanceToGo.length > 7
      ? "grid-cols-7"
      : "grid-cols-" + props.distanceToGo.length.toString();
} else {
  colGrid =
    props.fuelFoc.length > 7
      ? "grid-cols-7"
      : "grid-cols-" + props.fuelFoc.length.toString();
}

console.log("Tis the custom grid col", colGrid);
let row1 = undefined;
let row2 = undefined;
if (props.header === "Distance") {
  row1 = props.distanceToGo;
  row2 = props.distanceOBS;
} else if (props.fuelFoc !== undefined) {
  console.log(props.fuelFoc);
  row1 = props.fuelFoc;
  row2 = props.fuelRob;
}
</script>
