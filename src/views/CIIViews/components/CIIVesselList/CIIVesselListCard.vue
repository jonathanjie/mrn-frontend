<script setup></script>

<template>
  <div class="flex flex-col bg-white rounded-xl p-5 mt-6 w-full">
    <span class="text-18 text-blue-800 font-bold w-full">{{
      $t("vesselList")
    }}</span>
    <div class="flex mt-4 rounded-xl bg-gray-50 p-3.5 justify-between">
      <span class="text-12 text-gray-500 font-bold">{{
        $t("vesselName").toUpperCase()
      }}</span>
      <span class="text-12 text-gray-500 font-bold">{{
        $t("shipSize").toUpperCase()
      }}</span>
      <span class="text-12 text-gray-500 font-bold">{{
        $t("flag").toUpperCase()
      }}</span>
      <span class="text-12 text-gray-500 font-bold">{{
        $t("builtYear").toUpperCase()
      }}</span>
    </div>
  </div>
</template>
