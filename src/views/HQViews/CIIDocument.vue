<script setup>
import BasicTable from "@/components/Table/BasicTable.vue";

const columns = [
  { name: "file", title: "FILE NAME", type: "TextCell" },
  { name: "type", title: "TYPE OF REPORT", type: "TextCell" },
  { name: "download", title: "", type: "ImageCell" },
  { name: "delete", title: "", type: "ImageCell" },
];
const rows = [
  {
    file: { content: "CII conditions report.xls" },
    type: { content: "IMO DCS" },
    download: {
      src: "/icons/download.svg",
    },
    delete: {
      src: "/icons/remove.svg",
    },
  },
  {
    file: { content: "EEDI Technical file.pdf" },
    type: { content: "EEDI / EEXI" },
    download: {
      src: "/icons/download.svg",
    },
    delete: {
      src: "/icons/remove.svg",
    },
  },
];
</script>

<template>
  <div class="mt-7 bg-gray-50 mx-12">
    <BasicTable :rows="rows" :columns="columns">
      <template v-slot:cell="{ type, value }">
        <component :is="type" v-bind="value" />
      </template>
    </BasicTable>
  </div>
</template>
