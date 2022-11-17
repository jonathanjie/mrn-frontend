<template>
  <div class="flex relative bg-white border rounded-xl w-64">
    <div class="flex p-3.5">
      <img
        src="@/assets/icons/My_Vessels/blue_ship.svg"
        class="rounded-full bg-blue-50 h-11 w-11 p-2.5"
      />
      <div class="ml-3">
        <slot name="itemHeader">{{ $t("fallbackContent") }}</slot>
        <slot name="numVessels"></slot>
      </div>
    </div>
    <img
      src="@/assets/icons/My_Vessels/graph.svg"
      class="absolute right-0 bottom-0 mr-3.5 w-16 h-12"
    />
  </div>
</template>
