<template>
    <div class="bg-white text-black py-4 px-6 flex">
        <div class="flex overflow-hidden pl-6 mr-auto">
            <div class="relative mx-auto text-gray-600">
                <img class="absolute mr-2 w-10 px-2 py-2" src="@/assets/icons/search_icon.svg">
                <input class="bg-gray-50 h-10 w-80 pl-11 pr-3 rounded-lg text-14 focus:outline-none"
                type="search" name="search" placeholder="Type to search..." icon="search">
            </div>
        </div>
        <ul class="flex items-center">
            <li class="mx-3">
                <img src="@/assets/icons/message.svg" class="h-6 w-6"/>
            </li>
            <li class="mx-3">
                <img src="@/assets/icons/bell_notification.svg" class="h-6 w-6"/>
            </li>
            <li>
                <img src="@/assets/icons/divider.svg" class="flex h-5 w-6 md:items-center md:visible"/>
            </li>
        </ul>
        <div v-if="user" class="flex items-center">
            <img :src="user.picture"  class="h-10 w-10 mx-3 rounded-full" referrerpolicy="no-referrer"/>
            <!-- <img v-else src="@/assets/icons/avatar.svg" class="h-10 w-10 mx-3"/> -->
            <div class="flex flex-col items-left">
                <span class="font-bold text-gray-900 text-14 mr-1">{{ user.name }}</span>
                <span class="font-semibold text-gray-500 text-12 mr-1">Ship Owner</span>
            </div>
            <img src="@/assets/icons/down_arrow.svg" class="h-1.5 w-3 mx-3"/>
        </div>
        <div v-else class="flex items-center">
            <img src="@/assets/icons/avatar.svg" class="h-10 w-10 mx-3"/>
            <div class="flex flex-col items-left">
                <span class="font-bold text-gray-900 text-14 mr-1">Unknown</span>
                <span class="font-semibold text-gray-500 text-12 mr-1">Please log in</span>
            </div>
            <img src="@/assets/icons/down_arrow.svg" class="h-1.5 w-3 mx-3"/>
        </div>
    </div>

</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue'

// TODO: get from pinia instead of auth0; need to figure out async state tracking
const { user } = useAuth0();
</script>