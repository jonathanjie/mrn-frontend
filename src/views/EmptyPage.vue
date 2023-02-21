<template>
  <div class="flex flex-col p-24 pb-52 justify-center items-center w-full">
    <img src="@/assets/icons/empty.svg" class="h-28 w-28" />
    <div class="flex align-items-center">
      <span class="text-lg font-bold text-gray-800 pt-3"
        >{{ $t("clickMyVessels") }}-></span
      >
      <div class="flex rounded-xl bg-blue items-center">
        <img src="@/assets/icons/my_vessels.svg" class="h-6 w-6" />
        <span class="text-white text-14 font-bold my-2 mr-2">{{
          $t("myVessels")
        }}</span>
      </div>
    </div>
  </div>
</template>
