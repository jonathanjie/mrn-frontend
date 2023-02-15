<script setup>
import { ref } from "vue";

import CustomTitle from "@/components/CustomTitle.vue";
import DropZone from "@/components/FileDrop/DropZone.vue";
import FilePreview from "@/components/FileDrop/FilePreview.vue";
import { useCIIStore } from "@/stores/useCIIStore";
import { storeToRefs } from "pinia";

const store = useCIIStore();
const { technicalFiles, standardizedFiles, IMODCSFiles } = storeToRefs(store);

// const technicalFiles = ref([]);
// const standardizedFiles = ref([]);
// const IMODCSFiles = ref([]);

// TODO: change it to compare extensions
const allowPDF = ["pdf"];
const allowPDFandXLS = ["pdf", "xls", "xlsx"];

// TODO: move to store
const includedInvalidFileType = ref(false);

// TODO: change "files" to a list index to get the right ref list
const addFiles = (idx, newFiles, validFileTypes) => {
  if (idx === 0) {
    // EEDI / EEXI Technical File
    let newUploadableFiles = [...newFiles]
      .map((file) => new UploadableFile(file))
      .filter((file) => !fileExists(technicalFiles.value, file.id))
      .filter((file) => isValidFileType(validFileTypes, file.extension));
    technicalFiles.value = technicalFiles.value.concat(newUploadableFiles);
  } else if (idx === 1) {
    // standardised data reporting form (DCS for CII)
    let newUploadableFiles = [...newFiles]
      .map((file) => new UploadableFile(file))
      .filter((file) => !fileExists(standardizedFiles.value, file.id))
      .filter((file) => isValidFileType(validFileTypes, file.extension));
    standardizedFiles.value =
      standardizedFiles.value.concat(newUploadableFiles);
  } else {
    // IMO DCS and Others
    let newUploadableFiles = [...newFiles]
      .map((file) => new UploadableFile(file))
      .filter((file) => !fileExists(IMODCSFiles.value, file.id))
      .filter((file) => isValidFileType(validFileTypes, file.extension));
    IMODCSFiles.value = IMODCSFiles.value.concat(newUploadableFiles);
  }

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

const removeFile = (files, file) => {
  const index = files.indexOf(file);

  if (index > -1) files.splice(index, 1);
};

const onInputChange = (idx, e, validFileTypes) => {
  addFiles(idx, e.target.files, validFileTypes);
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
    <div class="flex flex-col space-y-3">
      <CustomTitle :content="'EEDI / EEXI Technical File'"></CustomTitle>
      <DropZone
        class="flex drop-area border border-dashed border-sysblue-300 p-14 place-content-center rounded-lg text-16 text-gray-800 bg-gray-25"
        @files-dropped="(file) => addFiles(0, file, allowPDF)"
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
          <div class="w-full text-center text-14">PDF</div>
        </span>

        <input
          class="hidden"
          type="file"
          id="file-input-1"
          multiple
          @change="(e) => onInputChange(0, e, allowPDF)"
        />
      </DropZone>

      <ul
        class="text-14 text-gray-700 space-y-1"
        v-show="technicalFiles.length"
      >
        <FilePreview
          v-for="file of technicalFiles"
          :key="file.id"
          :file="file"
          @remove="(file) => removeFile(0, file)"
        />
      </ul>
    </div>
    <div>
      <CustomTitle
        :content="'Standardised Data Reporting Form (DCS for CII)'"
      ></CustomTitle>
      <span class="text-gray-500">Upload multiple files from 2020 onwards</span>
      <DropZone
        class="flex drop-area border border-dashed border-sysblue-300 p-14 place-content-center rounded-lg text-16 text-gray-800 bg-gray-25"
        @files-dropped="(file) => addFiles(1, file, allowPDFandXLS)"
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
          <div class="w-full text-center text-14">PDF or XLS</div>
        </span>

        <input
          class="hidden"
          type="file"
          id="file-input-2"
          multiple
          @change="(e) => onInputChange(1, e, allowPDFandXLS)"
        />
      </DropZone>

      <ul
        class="text-14 text-gray-700 space-y-1"
        v-show="standardizedFiles.length"
      >
        <FilePreview
          v-for="file of standardizedFiles"
          :key="file.id"
          :file="file"
          @remove="(file) => removeFile(1, file)"
        />
      </ul>
    </div>
    <div>
      <CustomTitle :content="'IMO DCS and Others'"></CustomTitle>
      <span class="text-gray-500">Upload multiple files from 2020 onwards</span>

      <DropZone
        class="flex drop-area border border-dashed border-sysblue-300 p-14 place-content-center rounded-lg text-16 text-gray-800 bg-gray-25"
        @files-dropped="(file) => addFiles(2, file, allowPDFandXLS)"
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
              <label for="file-input-3">
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
          id="file-input-3"
          multiple
          @change="(e) => onInputChange(2, e, allowPDFandXLS)"
        />
      </DropZone>

      <ul class="text-14 text-gray-700 space-y-1" v-show="IMODCSFiles.length">
        <FilePreview
          v-for="file of IMODCSFiles"
          :key="file.id"
          :file="file"
          @remove="(file) => removeFile(2, file)"
        />
      </ul>
    </div>
  </div>
</template>
