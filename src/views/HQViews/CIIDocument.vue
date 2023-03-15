<script setup>
import BasicTable from "@/components/Table/BasicTable.vue";
import CIISetupModal from "@/components/Modals/CIISetupModal/CIISetupModal.vue";

const downloadFile = () => {
  // console.log("download");
};

const removeFile = () => {
  // console.log("remove");
};

// TODO: remove temp data (columns & rows)
const columns = [
  { name: "file", title: "FILE NAME", type: "TextCell" },
  { name: "type", title: "TYPE OF REPORT", type: "TextCell" },
  { name: "year", title: "REPORT YEAR", type: "TextCell" },
  { name: "date", title: "UPLOADED DATE", type: "TextCell" },
  { name: "btns", title: "", type: "BtnsCell" },
];
const rows = [
  {
    file: { content: "CII conditions report.xls" },
    type: { content: "IMO DCS" },
    year: { content: "2022" },
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
    <CIISetupModal />

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
