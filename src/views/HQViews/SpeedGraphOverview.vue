<template>
  <div class="flex mt-6">
    <div class="flex relative rounded-xl bg-white h-32 w-full mx-12">
      <div class="flex flex-col">
        <div class="flex flex-row items-center justify-evenly p-5">
          <img src="@/assets/icons/Speed_Graph/ship_image.svg" class="h-10 w-30 rounded-xl mr-6">
          <div class="flex mr-12">
            <span class="text-14 text-gray-500">{{$t("name")}}: </span>
            <span class="ml-1.5 text-14 text-gray-700 font-bold">{{vesselname}}</span>
          </div>
          <div class="flex mr-12">
            <span class="text-14 text-gray-500">{{$t("type")}}: </span>
            <span class="ml-1.5 text-14 text-gray-700 font-bold">{{payloadType}}</span>
          </div>
          <div class="flex mr-12">
            <span class="text-14 text-gray-500">{{$t("capacity")}}: </span>
            <span class="ml-1.5 text-14 text-gray-700 font-bold">{{shipCapacity}}</span>
          </div>
          <div class="flex mr-12">
            <span class="text-14 text-gray-500">{{$t("flag")}}: </span>
            <span class="ml-1.5 text-14 text-gray-700 font-bold">{{shipFlag}}</span>
          </div>
          <div class="flex mr-12">
            <span class="text-14 text-gray-500">{{$t("imoNo")}}: </span>
            <span class="ml-1.5 text-14 text-gray-700 font-bold">{{imo}}</span>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 flex flex-row pl-5 py-2.5 w-full items-center rounded-b-xl bg-gradient-to-r from-white to-red-50">
          <div class="rounded-xl bg-green-50 px-1.5 pl-2.5 mr-3.5">
            <span class="font-semibold text-12 text-gray-700 mr-2">{{$t("previousCII")}}</span>
            <span class="py-0.5 px-2.5 rounded-xl bg-green-500 text-12 text-white">{{previousCIIGrade}}</span>
          </div>
          <div class="rounded-xl bg-green-50 px-1.5 pl-2.5 mr-4">
            <span class="font-semibold text-12 text-gray-700 mr-2">{{$t("eexiGrade")}}</span>
            <span class="py-0.5 px-2.5 rounded-xl bg-green-500 text-12 text-white">{{eexiGrade}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  vesselname: String,
  imo: String,
});

const payloadType ="Oil"
const shipCapacity = "300,000"
const shipFlag = "Panama"
const previousCIIGrade = "A"
const eexiGrade = "2.03/2.2"


</script>
