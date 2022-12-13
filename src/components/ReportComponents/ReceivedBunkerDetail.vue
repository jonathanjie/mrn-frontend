<template>
  <div class="grid grid-cols-1 bg-white rounded-lg p-5 gap-4 shadow-card mb-5">
    <span class="text-gray-700 text-20">{{ $t("receivedBunkerDetail") }}</span>

    <div class="flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">{{
        $t("uploadBunkerDeliveryNote")
      }}</span>
    </div>

    <!-- Upload delivery note section -->
    <DropZone
      class="flex drop-area border border-dashed border-sysblue-300 p-14 place-content-center rounded-lg text-16 text-gray-800 bg-gray-25"
      @files-dropped="addFilesAndEmit"
      #default="{ dropZoneActive }"
    >
      <span v-if="dropZoneActive">
        <span>{{ $t("dropFileHere") }}</span>
      </span>
      <span v-else>
        <span>{{ $t("dragAndDrop") }}</span>
        <span class="smaller">
          {{ $t("or") }}
          <label for="file-input">
            <strong class="text-sysblue-500 cursor-pointer"
              ><u>
                {{ $t("browseFile") }}
              </u></strong
            >
          </label>
        </span>
      </span>

      <input
        class="hidden"
        type="file"
        id="file-input"
        multiple
        @change="onInputChange"
      />
    </DropZone>

    <ul class="text-14 text-gray-700 space-y-1" v-show="files.length">
      <FilePreview
        v-for="file of files"
        :key="file.id"
        :file="file"
        @remove="removeFileAndEmit"
      />
    </ul>

    <div class="mt-6 flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">{{ $t("deliveredOil") }}</span>
    </div>

    <div class="grid grid-cols-4 border text-14 mb-6">
      <div class="col-span-1 text-blue-700 p-3 border-b border-r bg-gray-50">
        {{ $t("productType") }}
      </div>
      <select
        v-model="oil"
        class="col-span-3 p-3 text-gray-700 border-b"
        :class="oil === 'default' ? 'text-gray-400' : 'text-gray-700'"
      >
        <option selected disabled value="default">
          {{ $t("selectionOfOil") }}
        </option>
        <option value="mdo">
          {{ $t("mdo") }}
        </option>
        <option value="mgo">
          {{ $t("mgo") }}
        </option>
        <option value="lsfo">
          {{ $t("lsfo") }}
        </option>
        <option value="hfo">
          {{ $t("hfo") }}
        </option>
        <option value="propane">
          {{ $t("lpgp") }}
        </option>
        <option value="butane">
          {{ $t("lpgb") }}
        </option>
        <option value="lng">
          {{ $t("lng") }}
        </option>
      </select>

      <div
        class="flex col-span-1 text-blue-700 p-3 border-r border-b bg-gray-50"
      >
        {{ $t("quantity") }}
        <MiniUnitDisplay>MT.LTR</MiniUnitDisplay>
      </div>
      <input
        v-model="quantity"
        @keypress="preventNaN($event, quantity)"
        placeholder="000.00"
        class="col-span-3 p-3 pl-4 border-b text-gray-700 focus:outline-0"
      />

      <div
        class="flex col-span-1 text-blue-700 p-3 border-r border-b bg-gray-50"
      >
        {{ $t("densityAt15") }}
        <MiniUnitDisplay>KG/M<sup>3</sup></MiniUnitDisplay>
      </div>
      <input
        v-model="density"
        @keypress="preventNaN($event, density)"
        placeholder="000.00"
        class="col-span-3 p-3 pl-4 border-b text-gray-700 focus:outline-0"
      />

      <div class="col-span-1 text-blue-700 p-3 border-r border-b bg-gray-50">
        {{ $t("sgAt15") }}
      </div>
      <input
        v-model="sg"
        @keypress="preventNaN($event, sg)"
        placeholder="000.00"
        class="col-span-3 p-3 pl-4 border-b text-gray-700 focus:outline-0"
      />

      <div
        class="flex col-span-1 text-blue-700 p-3 border-r border-b bg-gray-50"
      >
        {{ $t("viscosityAt15") }}
        <MiniUnitDisplay>cSt</MiniUnitDisplay>
      </div>
      <input
        v-model="viscosity"
        @keypress="preventNaN($event, viscosity)"
        placeholder="000.00"
        class="col-span-3 p-3 pl-4 border-b text-gray-700 focus:outline-0"
      />

      <div
        class="flex col-span-1 text-blue-700 p-3 border-r border-b bg-gray-50"
      >
        {{ $t("flashPoint") }}
        <MiniUnitDisplay>°C</MiniUnitDisplay>
      </div>
      <input
        v-model="flash_point"
        @keypress="preventNaN($event, flash_point)"
        placeholder="000.00"
        class="col-span-3 p-3 pl-4 border-b text-gray-700 focus:outline-0"
      />

      <div class="flex col-span-1 text-blue-700 p-3 border-r bg-gray-50">
        {{ $t("sulfurContent") }}
        <MiniUnitDisplay>%M/M</MiniUnitDisplay>
      </div>
      <input
        v-model="sulfur_content"
        @keypress="preventNaN($event, sulfur_content)"
        placeholder="000.00"
        class="col-span-3 p-3 pl-4 text-gray-700 focus:outline-0"
      />
    </div>

    <div class="flex items-center">
      <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5" />
      <span class="text-blue-700 text-16">{{ $t("sampleSeatingNo") }}</span>
    </div>

    <div class="grid grid-cols-8 border text-14">
      <div class="col-span-2 text-blue-700 border-r p-3 bg-gray-50">
        {{ $t("marpol") }}
      </div>
      <input
        v-model="marpol1"
        @keypress="preventNaN($event, marpol1)"
        placeholder="000.00"
        class="col-span-3 p-3 pl-4 border-r text-gray-700 focus:outline-0"
      />
      <input
        v-model="marpol2"
        @keypress="preventNaN($event, marpol2)"
        placeholder="000.00"
        class="col-span-3 p-3 pl-4 text-gray-700 focus:outline-0"
      />

      <div class="col-span-2 text-blue-700 p-3 border-r border-t bg-gray-50">
        {{ $t("ship") }}
      </div>
      <input
        v-model="ship1"
        @keypress="preventNaN($event, ship1)"
        placeholder="000.00"
        class="col-span-3 p-3 pl-4 border-r border-t text-gray-700 focus:outline-0"
      />
      <input
        v-model="ship2"
        @keypress="preventNaN($event, ship2)"
        placeholder="000.00"
        class="col-span-3 p-3 pl-4 border-t text-gray-700 focus:outline-0"
      />

      <div class="col-span-2 text-blue-700 p-3 border-r border-t bg-gray-50">
        {{ $t("barge") }}
      </div>
      <input
        v-model="barge1"
        @keypress="preventNaN($event, barge1)"
        placeholder="000.00"
        class="col-span-3 p-3 pl-4 border-r border-t text-gray-700 focus:outline-0"
      />
      <input
        v-model="barge2"
        @keypress="preventNaN($event, barge2)"
        placeholder="000.00"
        class="col-span-3 p-3 pl-4 border-t text-gray-700 focus:outline-0"
      />
    </div>
  </div>
</template>

<script setup>
import MiniUnitDisplay from "../../components/MiniUnitDisplay.vue";
import { preventNaN } from "../../utils/helpers.js";
import useFileList from "../../composables/file-list";
import DropZone from "../../components/DropZone.vue";
import FilePreview from "../../components/FilePreview.vue";
import { useBunkerReportStore } from "@/store/useBunkerReportStore";
import { storeToRefs } from "pinia";
import { defineEmits } from "vue";

const { files, addFiles, removeFile } = useFileList();

const store = useBunkerReportStore();
const {
  oil: oil,
  quantity: quantity,
  density: density,
  sg: sg,
  viscosity: viscosity,
  flashPoint: flash_point,
  sulfurContent: sulfur_content,
  marpol1: marpol1,
  marpol2: marpol2,
  ship1: ship1,
  ship2: ship2,
  barge1: barge1,
  barge2: barge2,
} = storeToRefs(store);

const emit = defineEmits(["fileChange"]);

const addFilesAndEmit = (newFiles) => {
  addFiles(newFiles);
  emit("fileChange", files);
};

const removeFileAndEmit = (file) => {
  removeFile(file);
  emit("fileChange", files);
};

const onInputChange = (e) => {
  addFiles(e.target.files);
  e.target.value = null;
  emit("fileChange", files);
};
</script>
