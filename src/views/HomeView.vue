<template>
  <SideNav />
  <div class="grow h-screen" :class="collapsed ? 'ml-20' : 'ml-64'">
    <!-- TODO: change to fixed, not sticky -->
    <WebHeader class="sticky top-0 z-40" />
    <router-view class="bg-gray-50 min-h-screen" />
  </div>
</template>

<script setup>
import SideNav from "@/components/SideNav/SideNav.vue";
import WebHeader from "@/components/WebHeader.vue";
import { collapsed } from "@/components/SideNav/state.js";

console.log("HomeView is loaded");
</script>
