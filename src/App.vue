<template>
  <!-- <router-view v-if="!isAuthenticated" class="bg-gray-50 min-h-screen"></router-view> -->
  <div v-if="isAuthenticated" class="flex items-start items-stretch">
    <Suspense>
      <HomeView />
    </Suspense>
  </div>
</template>

<script setup>
import HomeView from "./views/HomeView.vue";
import { useAuth0 } from "@auth0/auth0-vue";
const { isAuthenticated } = useAuth0();
</script>

<style lang="scss">
/* manrope-regular - latin */
@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: "Manrope";
  font-style: normal;
  font-weight: 400;
  src: url("@/fonts/manrope-v13-latin-regular.woff2") format("woff2"),
    /* Chrome 36+, Opera 23+, Firefox 39+ */
      url("@/fonts/manrope-v13-latin-regular.woff") format("woff"); /* Chrome 5+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* manrope-500 - latin */
@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: "Manrope";
  font-style: normal;
  font-weight: 500;
  src: url("@/fonts/manrope-v13-latin-500.woff2") format("woff2"),
    /* Chrome 36+, Opera 23+, Firefox 39+ */
      url("@/fonts/manrope-v13-latin-500.woff") format("woff"); /* Chrome 5+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* manrope-700 - latin */
@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: "Manrope";
  font-style: normal;
  font-weight: 700;
  src: url("@/fonts/manrope-v13-latin-700.woff2") format("woff2"),
    /* Chrome 36+, Opera 23+, Firefox 39+ */
      url("@/fonts/manrope-v13-latin-700.woff") format("woff"); /* Chrome 5+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

// Style settings for Date Picker
$dp__font_family: "Manrope";
$dp__font_size: 0.875rem;
$dp__border_radius: 8px;
$dp__input_padding: 12px 12px;
$dp__input_icon_padding: 14px;

@import "@/assets/css/global.css";
@import "node_modules/@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss";

.dp__theme_light {
  --dp-background-color: #ffffff;
  --dp-text-color: #475467;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #0093b8;
  --dp-hover-icon-color: #0093b8;
  --dp-primary-color: #0093b8;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ffffff;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #ffffff;
  --dp-disabled-color: #f9fafb;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #0093b8;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-highlight-color: rgba(25, 118, 210, 0.1);
}
</style>
