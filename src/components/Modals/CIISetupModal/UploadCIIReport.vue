<script setup>
import { ref } from "vue";

import CustomTitle from "@/components/CustomTitle.vue";
import DropZone from "@/components/FileDrop/DropZone.vue";
import FilePreview from "@/components/FileDrop/FilePreview.vue";
import { useCIISetupStore } from "@/stores/useCIISetupStore";
import { storeToRefs } from "pinia";

const store = useCIISetupStore();
const { technicalFiles, standardizedFiles, IMODCSFiles } = storeToRefs(store);

const allowPDF = ["pdf"];
const allowPDFandXLS = ["pdf", "xls", "xlsx"];

// TODO: move to store
const includedInvalidFileType = ref(false);

const ciiReportTypes = {
  IMODCS_FILES: IMODCSFiles, // IMO DCS and Others
  STANDARDIZED_FILES: standardizedFiles, // standardised data reporting form (DCS for CII)
  TECHNICAL_FILES: technicalFiles, // EEDI / EEXI Technical File
};

const addFiles = (key, newFiles, validFileTypes) => {
  let newUploadableFiles = [...newFiles]
    .map((file) => new UploadableFile(file))
    .filter((file) => !fileExists(ciiReportTypes[key].value, file.id))
    .filter((file) => isValidFileType(validFileTypes, file.extension));
  ciiReportTypes[key].value =
    ciiReportTypes[key].value.concat(newUploadableFiles);

  if (includedInvalidFileType.value) {
    window.alert(
      "One or more of your files is not a valid file type. Please try again."
    );
    includedInvalidFileType.value = false;
  }
};

const fileExists = (files, otherId) => {
  return files.some(({ id }) => id === otherId);
};

const isValidFileType = (validFileTypes, fileType) => {
  const isValid = validFileTypes.includes(fileType);

  if (!isValid) {
    includedInvalidFileType.value = true;
  }
  return isValid;
};

const removeFile = (key, file) => {
  const index = ciiReportTypes[key].value.indexOf(file);

  if (index > -1) ciiReportTypes[key].value.splice(index, 1);
};

const onInputChange = (key, e, validFileTypes) => {
  addFiles(key, e.target.files, validFileTypes);
  e.target.value = null;
};

class UploadableFile {
  constructor(file) {
    this.file = file;
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.type = file.type;
    this.presignedUrl = "";
    this.name = file.name;
    this.extension = file.name.split(".").pop();
  }
}
</script>

<template>
  <div class="flex flex-col space-y-12">
    <div class="flex flex-col space-y-2">
      <CustomTitle :content="'IMO DCS and Others'"></CustomTitle>
      <span class="text-gray-500">Upload multiple files from 2020 onwards</span>

      <DropZone
        class="flex drop-area border border-dashed border-sysblue-300 p-14 place-content-center rounded-lg text-16 text-gray-800 bg-gray-25"
        @files-dropped="
          (file) => addFiles('IMODCS_FILES', file, allowPDFandXLS)
        "
        #default="{ dropZoneActive }"
      >
        <span v-if="dropZoneActive">
          <span>{{ $t("dropFileHere") }}</span>
        </span>
        <span v-else>
          <div>
            <span>{{ $t("dragAndDrop") }}</span>
            <span class="smaller">
              {{ $t("or") }}
              <label for="file-input-0">
                <strong class="text-sysblue-500 cursor-pointer"
                  ><u>
                    {{ $t("browseFile") }}
                  </u></strong
                >
              </label>
            </span>
          </div>
          <div class="w-full text-center text-14">PDF or XLS</div>
        </span>

        <input
          class="hidden"
          type="file"
          id="file-input-0"
          multiple
          @change="(e) => onInputChange('IMODCS_FILES', e, allowPDFandXLS)"
        />
      </DropZone>

      <ul class="text-14 text-gray-700" v-show="IMODCSFiles.length">
        <FilePreview
          v-for="file of IMODCSFiles"
          :key="file.id"
          :file="file"
          is-cii-report
          @remove="(file) => removeFile('IMODCS_FILES', file)"
        />
      </ul>
    </div>
    <div class="flex flex-col space-y-2">
      <CustomTitle
        :content="'Standardised Data Reporting Form (DCS for CII)'"
      ></CustomTitle>
      <span class="text-gray-500">Upload multiple files from 2020 onwards</span>
      <DropZone
        class="flex drop-area border border-dashed border-sysblue-300 p-14 place-content-center rounded-lg text-16 text-gray-800 bg-gray-25"
        @files-dropped="
          (file) => addFiles('STANDARDIZED_FILES', file, allowPDFandXLS)
        "
        #default="{ dropZoneActive }"
      >
        <span v-if="dropZoneActive">
          <span>{{ $t("dropFileHere") }}</span>
        </span>
        <span v-else>
          <div>
            <span>{{ $t("dragAndDrop") }}</span>
            <span class="smaller">
              {{ $t("or") }}
              <label for="file-input-1">
                <strong class="text-sysblue-500 cursor-pointer"
                  ><u>
                    {{ $t("browseFile") }}
                  </u></strong
                >
              </label>
            </span>
          </div>
          <div class="w-full text-center text-14">PDF or XLS</div>
        </span>

        <input
          class="hidden"
          type="file"
          id="file-input-1"
          multiple
          @change="
            (e) => onInputChange('STANDARDIZED_FILES', e, allowPDFandXLS)
          "
        />
      </DropZone>

      <ul class="text-14 text-gray-700" v-show="standardizedFiles.length">
        <FilePreview
          v-for="file of standardizedFiles"
          :key="file.id"
          :file="file"
          is-cii-report
          @remove="(file) => removeFile('STANDARDIZED_FILES', file)"
        />
      </ul>
    </div>
    <div class="flex flex-col space-y-2">
      <CustomTitle :content="'EEDI / EEXI Technical File'"></CustomTitle>
      <DropZone
        class="flex drop-area border border-dashed border-sysblue-300 p-14 place-content-center rounded-lg text-16 text-gray-800 bg-gray-25"
        @files-dropped="(file) => addFiles('TECHNICAL_FILES', file, allowPDF)"
        #default="{ dropZoneActive }"
      >
        <span v-if="dropZoneActive">
          <span>{{ $t("dropFileHere") }}</span>
        </span>
        <span v-else>
          <div>
            <span>{{ $t("dragAndDrop") }}</span>
            <span class="smaller">
              {{ $t("or") }}
              <label for="file-input-2">
                <strong class="text-sysblue-500 cursor-pointer"
                  ><u>
                    {{ $t("browseFile") }}
                  </u></strong
                >
              </label>
            </span>
          </div>
          <div class="w-full text-center text-14">PDF</div>
        </span>

        <input
          class="hidden"
          type="file"
          id="file-input-2"
          multiple
          @change="(e) => onInputChange('TECHNICAL_FILES', e, allowPDF)"
        />
      </DropZone>

      <ul class="text-14 text-gray-700" v-show="technicalFiles.length">
        <FilePreview
          v-for="file of technicalFiles"
          :key="file.id"
          :file="file"
          is-cii-report
          @remove="(file) => removeFile('TECHNICAL_FILES', file)"
        />
      </ul>
    </div>
  </div>
</template>
