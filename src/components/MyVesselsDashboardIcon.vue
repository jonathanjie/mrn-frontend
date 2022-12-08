<template>
  <div class="flex relative bg-white border rounded-xl w-auto drop-shadow">
    <div class="flex p-3.5">
      <slot name="img"></slot>
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
