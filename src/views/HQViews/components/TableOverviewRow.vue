<template>
  <div
    v-if="props.header === 'Speed' && props.values != undefined"
    class="grid w-full rounded-lg w-full mb-3"
    :class="gridCol"
  >
    <!-- Table header -->
    <div
      class="flex px-3.5 py-3 bg-sysblue-25 rounded-l-lg border-y border-l border-blue-200 col-span-2 items-center"
    >
      <span class="text-14 font-bold text-gray-800">{{ props.header }}</span>
    </div>
    <!-- Values -->
    <div v-for="(value, index) in props.values" :key="value.id">
      <div
        class="flex px-3.5 py-3 justify-center"
        :class="
          index === props.values.length - 1
            ? 'bg-yellow-50 border border-yellow-200 rounded-r-lg'
            : 'border-l border-y border-gray-200'
        "
      >
        <span class="text-14 font-semibold text-gray-800">{{ value }}</span>
      </div>
    </div>
  </div>
  <div
    v-else-if="props.header === 'Date' && props.values != undefined"
    class="grid grid-rows-2 w-full rounded-lg w-full mb-3"
    :class="gridCol"
  >
    <!-- Table header -->
    <div
      class="flex px-3.5 py-3 bg-sysblue-25 border-l border-y rounded-tl-lg col-span-2 items-center"
    >
      <span class="text-14 font-bold text-gray-800">{{ props.header }}</span>
    </div>
    <div v-for="(value, index) in props.values" :key="value.id">
      <div
        class="flex px-3.5 py-3 justify-center"
        :class="
          index === props.values.length - 1
            ? 'bg-yellow-50 border-t border-x border-yellow-200 rounded-tr-lg'
            : 'border-t border-l border-gray-200'
        "
      >
        <span class="text-14 font-semibold text-gray-800">{{ value }}</span>
      </div>
    </div>
    <div
      class="flex px-3.5 py-3 bg-sysblue-25 border-b border-l rounded-bl-lg border-blue-200 col-span-2 items-center"
    >
      <span class="text-14 font-bold text-gray-800">{{
        $t("reportType")
      }}</span>
    </div>
    <div v-for="(value, index) in props.reportType" :key="value.id">
      <div
        class="flex px-3.5 py-3 justify-center"
        :class="
          index === props.reportType.length - 1
            ? 'bg-yellow-50 border-x border-y border-yellow-200 rounded-br-lg'
            : 'border-l border-y border-gray-200'
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
    v-else-if="row1 != undefined && row2 != undefined"
    class="grid grid-rows-2 w-full rounded-lg w-full mb-3"
    :class="gridCol"
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
        >{{ $t("made") }}</span
      >
      <span v-else class="text-14 font-bold text-blue-500">{{
        $t("foc")
      }}</span>
    </div>
    <!-- Values -->
    <div v-for="(value, index) in row1" :key="value.id">
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
    <div v-for="(value, index) in row2" :key="index">
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

let row1 = props.header === "Distance" ? props.distanceOBS : undefined;
let row2 = props.header === "Distance" ? props.distanceToGo : undefined;

if (props.fuelFoc !== undefined) {
  console.log(props.fuelFoc);
  row1 = props.fuelFoc;
  row2 = props.fuelRob;
}

let gridCol = "";
if (props.values != undefined) {
  if (props.values.length < 8 && props.values.length != 5) {
    gridCol = "grid-cols-" + (props.values.length + 2).toString();
  } else if (props.values.length == 5) {
    gridCol = "grid-cols-7";
  } else {
    gridCol = "grid-cols-9";
  }
} else {
  if (row1.length < 8 && row1.length != 5) {
    gridCol = "grid-cols-" + (row1.length + 2).toString();
  } else if (row1.length == 5) {
    gridCol = "grid-cols-7";
  } else {
    gridCol = "grid-cols-9";
  }
}
</script>
