<template>
  <div class="flex p-6 flex-wrap items-center">
    <span class="text-16 text-blue-700 font-bold"
      ><slot name="header"></slot
    ></span>
    <span class="text-14 text-gray-500 w-full">
      <slot name="title"></slot>
    </span>
    <span class="text-16 text-gray-700 font-semibold">
      <slot name="value"></slot>
    </span>
  </div>
</template>
