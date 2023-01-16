<script setup>
import { ref, computed, defineProps } from "vue";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import { preventNaN } from "@/utils/helpers.js";
// import DropZone from "@/components/FileDrop/DropZone.vue";
// import FilePreview from "@/components/FileDrop/FilePreview.vue";
import { ALL_FUEL_OILS, ALL_LUBRICATING_OILS } from "@/utils/options";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const getPresignedUrlForFiles = async (filePath) => {
  const response = await fetch(
    "https://mui7py4yakmr4db4na4vogvotm0jyacz.lambda-url.ap-southeast-1.on.aws/",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        filepaths: filePath,
      }),
    }
  );

  try {
    const data = await response.json();
    // console.log(response);
    // console.log(data.presigned_urls);

    return data.presigned_urls;
  } catch (error) {
    console.log(error);
  }
};

const getFilePath = (file) => {
  const urlFragments = file.split("/");
  const rtn =
    urlFragments[3] +
    "/" +
    urlFragments[4] +
    "/" +
    urlFragments[5] +
    "/" +
    urlFragments[6] +
    "/" +
    urlFragments[7].split("?")[0];

  return decodeURI(rtn);
};

const getFileName = (filePath) => {
  return decodeURI(filePath.split("/")[7].split("?")[0]);
};

const files = ref([]);

for (const file of props.report.bdndata.bdn_file) {
  const filePath = getFilePath(file);
  const presignedUrl = await getPresignedUrlForFiles(filePath);
  files.value.push(presignedUrl);
}

// const files = await props.report.bdndata.bdn_file
//   .map((file) => getFilePath(file))
//   .map((filePath) => getPresignedUrlForFiles(filePath))
//   .then((response) => console.log("hhe", response));

const oil_type = computed(() =>
  Object.keys(ALL_FUEL_OILS).includes(
    props.report.bdndata.delivered_oil_type.toLowerCase()
  )
    ? "fuelOil"
    : "lubricatingOil"
);
const oil = computed(() => props.report.bdndata.delivered_oil_type);
const quantity = computed(() => props.report.bdndata.delivered_quantity);
const density = computed(() => props.report.bdndata.density_15);
const viscosity = computed(() => props.report.bdndata.viscosity_value);
const viscosity_degree = computed(
  () => props.report.bdndata.viscosity_temperature
);
const flash_point = computed(() => props.report.bdndata.flash_point);
const sulfur_content = computed(() => props.report.bdndata.sulfur_content);
const marpol = computed(() => props.report.bdndata.sample_sealing_marpol);
const ship = computed(() => props.report.bdndata.sample_sealing_ship);
const barge = computed(() => props.report.bdndata.sample_sealing_barge);

const isFuelOil = computed(() => oil_type.value === "fuelOil");
const isLubricatingOil = computed(() => oil_type.value === "lubricatingOil");
</script>

<template>
  <div class="grid grid-cols-1 bg-white rounded-lg p-5 gap-4 shadow-card mb-5">
    <span class="text-gray-700 text-20">{{ $t("receivedBunkerDetail") }}</span>

    <div class="flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">{{ $t("bunkerDeliveryNote") }}</span>
    </div>

    <!-- Upload delivery note section -->
    <a
      v-for="(file, index) in files"
      :key="index"
      :href="file"
      target="_blank"
      class="text-gray-700 text-14 flex bg-gray-50 py-3 px-4 items-center rounded-xl hover:outline hover:outline-2 hover:outline-blue-300"
    >
      <img src="@/assets/icons/bdn_icon.svg" class="w-4 h-5 mr-2" />

      {{ getFileName(file) }}
    </a>

    <div class="mt-3 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">{{ $t("deliveredOil") }}</span>
    </div>

    <div class="grid grid-cols-8 border text-14 mb-6">
      <div class="col-span-2 text-blue-700 p-3 border-b border-r bg-gray-50">
        {{ $t("productType") }}
      </div>
      <select
        disabled
        v-model="oil_type"
        class="col-span-3 p-3 text-gray-700 border-b border-r focus:outline-0 bg-gray-50"
        :class="oil_type === 'default' ? 'text-gray-400' : 'text-gray-700'"
      >
        <option selected disabled value="default">
          {{ $t("selectOilType") }}
        </option>
        <option value="fuelOil">
          {{ $t("fuelOil") }}
        </option>
        <option value="lubricatingOil">
          {{ $t("lubricatingOil") }}
        </option>
      </select>
      <select
        disabled
        v-if="isFuelOil"
        v-model="oil"
        class="col-span-3 p-3 text-gray-700 border-b focus:outline-0 bg-gray-50"
      >
        <option selected disabled value="default">
          {{ $t("selectOil") }}
        </option>
        <option
          v-for="(value, label) in ALL_FUEL_OILS"
          :value="value"
          :key="value"
        >
          {{ $t(label) }}
        </option>
      </select>
      <select
        disabled
        v-else-if="isLubricatingOil"
        v-model="oil"
        class="col-span-3 p-3 text-gray-700 border-b focus:outline-0 bg-gray-50"
      >
        <option selected disabled value="default">
          {{ $t("selectOil") }}
        </option>
        <option
          v-for="(value, label) in ALL_LUBRICATING_OILS"
          :value="value"
          :key="value"
        >
          {{ $t(label) }}
        </option>
      </select>
      <select
        disabled
        v-else
        v-model="oil"
        class="col-span-3 p-3 text-gray-700 border-b focus:outline-0 bg-gray-50"
        :class="oil === 'default' ? 'text-gray-400' : 'text-gray-700'"
      >
        <option selected disabled value="default">
          {{ $t("selectOil") }}
        </option>
      </select>
      <div
        class="flex col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50"
      >
        {{ $t("quantity") }}
        <MiniUnitDisplay v-if="isFuelOil">MT</MiniUnitDisplay>
        <MiniUnitDisplay v-else-if="isLubricatingOil">LTR</MiniUnitDisplay>
        <div v-else></div>
      </div>
      <input
        disabled
        v-model="quantity"
        @keypress="preventNaN($event, quantity)"
        placeholder="000.00"
        class="col-span-6 p-3 pl-4 border-b text-gray-700 focus:outline-0 bg-gray-50"
      />

      <div
        class="flex col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50"
      >
        {{ $t("densityAt15") }}
        <MiniUnitDisplay>KG/M³</MiniUnitDisplay>
      </div>
      <input
        disabled
        v-model="density"
        @keypress="preventNaN($event, density)"
        placeholder="000.00"
        class="col-span-6 p-3 pl-4 border-b text-gray-700 focus:outline-0"
      />

      <div
        class="flex col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50"
      >
        {{ $t("viscosity") }}
        <MiniUnitDisplay>cSt</MiniUnitDisplay>
      </div>
      <div class="flex col-span-3 border-b border-r p-3 pl-4 bg-gray-50">
        <input
          disabled
          v-model="viscosity"
          @keypress="preventNaN($event, viscosity)"
          placeholder="000.00"
          class="text-gray-700 focus:outline-0 w-24 bg-gray-50"
        />
        <MiniUnitDisplay>cSt</MiniUnitDisplay>
      </div>
      <div class="flex col-span-3 border-b p-3 pl-4 bg-gray-50">
        <input
          disabled
          v-model="viscosity_degree"
          @keypress="preventNaN($event, viscosity_degree)"
          placeholder="000.00"
          class="text-gray-700 focus:outline-0 w-24 bg-gray-50"
        />
        <MiniUnitDisplay>°C</MiniUnitDisplay>
      </div>
      <div
        class="flex col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50"
      >
        {{ $t("flashPoint") }}
        <MiniUnitDisplay>°C</MiniUnitDisplay>
      </div>
      <input
        disabled
        v-model="flash_point"
        @keypress="preventNaN($event, flash_point)"
        placeholder="000.00"
        class="col-span-6 p-3 pl-4 border-b text-gray-700 focus:outline-0"
      />

      <div class="flex col-span-2 text-blue-700 p-3 border-r bg-gray-50">
        {{ $t("sulfurContent") }}
        <MiniUnitDisplay>%M/M</MiniUnitDisplay>
      </div>
      <input
        disabled
        v-model="sulfur_content"
        @keypress="preventNaN($event, sulfur_content)"
        placeholder="000.00"
        class="col-span-6 p-3 pl-4 text-gray-700 focus:outline-0"
      />
    </div>

    <div class="flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">{{ $t("sampleSealingNo") }}</span>
    </div>

    <div class="grid grid-cols-8 border text-14">
      <div class="col-span-2 text-blue-700 border-r p-3 bg-gray-50">
        {{ $t("marpol") }}
      </div>
      <input
        disabled
        v-model="marpol"
        @keypress="preventNaN($event, marpol)"
        placeholder="000.00"
        class="col-span-6 p-3 pl-4 text-gray-700 focus:outline-0"
      />
      <div class="col-span-2 text-blue-700 p-3 border-r border-t bg-gray-50">
        {{ $t("ship") }}
      </div>
      <input
        disabled
        v-model="ship"
        @keypress="preventNaN($event, ship)"
        placeholder="000.00"
        class="col-span-6 p-3 pl-4 border-t text-gray-700 focus:outline-0"
      />
      <div class="col-span-2 text-blue-700 p-3 border-r border-t bg-gray-50">
        {{ $t("barge") }}
      </div>
      <input
        disabled
        v-model="barge"
        @keypress="preventNaN($event, barge)"
        placeholder="000.00"
        class="col-span-6 p-3 pl-4 border-t text-gray-700 focus:outline-0"
      />
    </div>
  </div>
</template>
