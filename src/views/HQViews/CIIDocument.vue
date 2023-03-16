<script setup>
import BasicTable from "@/components/Table/BasicTable.vue";
import CIISetupModal from "@/components/Modals/CIISetupModal/CIISetupModal.vue";
import { CIIModalTypes } from "@/constants";
import { useCIISetupStore } from "@/stores/useCIISetupStore";
import { storeToRefs } from "pinia";
import CustomButton from "@/components/Buttons/CustomButton.vue";

const CIISetupStore = useCIISetupStore();
const { showModal } = storeToRefs(CIISetupStore);

const downloadFile = () => {
  // console.log("download");
};

const removeFile = () => {
  // console.log("remove");
};

const uploadCIIFile = () => {
  showModal.value = true;
};

// TODO: remove temp data (columns & rows)
const columns = [
  { name: "file", title: "FILE NAME", type: "TextCell" },
  { name: "type", title: "FILE TYPE", type: "TextCell" },
  { name: "year", title: "REPORT YEAR", type: "TextCell" },
  { name: "status", title: "STATUS", type: "ImageCell" },
  { name: "date", title: "UPLOADED DATE", type: "TextCell" },
  { name: "btns", title: "", type: "BtnsCell" },
];
const rows = [
  {
    file: { content: "CII conditions report.xls" },
    type: { content: "IMO DCS" },
    year: { content: "2022" },
    status: { src: "/icons/status_uploaded.svg" },
    date: { content: "15 January 2023, 11:40 AM" },
    btns: {
      buttons: [
        {
          src: "/icons/download.svg",
          onClick: downloadFile,
        },
        {
          src: "/icons/remove.svg",
          onClick: removeFile,
        },
      ],
    },
  },
  {
    file: { content: "EEDI Technical file.pdf" },
    type: { content: "EEDI / EEXI" },
    year: { content: "2019" },
    status: { src: "/icons/status_pending.svg" },
    date: { content: "15 January 2023, 11:40 AM" },
    btns: {
      buttons: [
        {
          src: "/icons/download.svg",
          onClick: downloadFile,
        },
        {
          src: "/icons/remove.svg",
          onClick: removeFile,
        },
      ],
    },
  },
];
</script>

<template>
  <div class="mt-7 bg-gray-50 mx-12">
    <CIISetupModal :setup_type="CIIModalTypes.UPLOAD_FILES" />

    <CustomButton
      class="m-10 absolute right-0 top-24 z-50"
      type="button"
      @click="uploadCIIFile()"
    >
      <template v-slot:icon>
        <img src="@/assets/icons/upload.svg" class="w-5 mr-2" />
      </template>
      <template v-slot:content>{{ $t("uploadCIIFile") }}</template>
    </CustomButton>

    <BasicTable v-if="rows && columns" :rows="rows" :columns="columns">
      <template v-slot:cell="{ type, value }">
        <component :is="type" v-bind="value" />
      </template>
    </BasicTable>
    <div v-else>
      No CII files in database. Please upload CII files from the CII Overview
      page.
    </div>
  </div>
</template>
