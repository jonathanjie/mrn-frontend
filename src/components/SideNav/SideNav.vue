<template>
    <div class="flex min-h-screen" :style="{ width: sidebarWidth }">
        <div class = "bg-blue text-cyan-100 w-64 relative -translate-x-0 inset-y-0 left-0 transition all ease-in-out delay-150 duration-200">
            <div class = "absolute -right-4 top-5">
                <button @click="toggleSidebar">
                    <!-- add 180 degree rotation when clicked -->
                    <img src="@/assets/icons/navbar_minmax.svg" class="w-8 drop-shadow-sm"/>
                </button>
            </div>
            <div class="flex items-center justify-center py-5 bg-lightblue/[0.24]">
                <img v-if="collapsed" src="@/assets/logomark_white.svg" class="h-8 px-6"/>
                <img v-else src="@/assets/marina_logo.svg" class="w-100"/>
            </div>

            <nav>
                <div class="py-2"></div>
                <a href="/" class="flex py-4 px-7 space-x-3 hover:bg-lightblue/[0.24]" :class="{ 'justify-center' : collapsed } ">
                    <img src="@/assets/icons/overview.svg" class="h-6 w-6"/>
                    <Transition name="fade">
                        <span v-if="!collapsed" class="text-white text-base font-bold">Overview</span>
                    </Transition>
                </a>
                <a href="/" class="flex py-4 px-7 space-x-3 hover:bg-lightblue/[0.24]" :class="{ 'justify-center' : collapsed } ">
                    <img src="@/assets/icons/my_vessels.svg" class="h-6 w-6"/>
                    <Transition name="fade">
                        <span v-if="!collapsed" class="text-white text-base font-bold">My Vessels</span>
                    </Transition>
                </a>
                <a href="/" class="flex py-4 px-7 space-x-3 hover:bg-lightblue/[0.24]" :class="{ 'justify-center' : collapsed } ">
                    <img src="@/assets/icons/plan_voyage.svg" class="h-6 w-6"/>
                    <Transition name="fade">
                        <span v-if="!collapsed" class="text-white text-base font-bold">Plan Voyage</span>
                    </Transition>
                    <!-- TODO these should fade out when collapsed -->
                </a>
            </nav>
        </div>
    </div>
</template>

<script>
import { collapsed, toggleSidebar, sidebarWidth } from "./state";

export default {
    setup() {
        return {
            collapsed,
            toggleSidebar,
            sidebarWidth
        };
    },
};
</script>

<style>
    /* TODO add transitions here */
</style>
