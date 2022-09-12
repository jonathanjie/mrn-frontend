<template>
    <div class="bg-white text-black py-4 px-6 md:flex">
        <div class="md:flex overflow-hidden pl-6 mr-auto">
            <div class="relative mx-auto text-gray-600">
                <img class="absolute mr-2 w-10 px-2 py-2" src="@/assets/icons/search_icon.svg">
                <input class="bg-bggray h-10 w-80 pl-11 pr-3 rounded-lg text-sm focus:outline-none"
                type="search" name="search" placeholder="Type to search..." icon="search">
            </div>
        </div>
        <ul class="md:flex md:items-center">
            <li class="md:mx-3">
                <img src="@/assets/icons/message.svg" class="h-6 w-6"/>
            </li>
            <li class="md:mx-3">
                <img src="@/assets/icons/bell_notification.svg" class="h-6 w-6"/>
            </li>
            <li>
                <img src="@/assets/icons/divider.svg" class="flex h-5 w-6 md:items-center md:visible"/>
            </li>
        </ul>
        <div class="md:flex md:items-center">
            <img src="@/assets/icons/avatar.svg" class="h-10 w-10 mx-3"/>
            <div class="flex flex-col items-left">
                <span class="font-bold text-gray-900 text-sm mr-1">Mark Hunter Alisson</span>
                <span class="font-semibold text-gray-500 text-tiny mr-1">Charterers</span>
            </div>
            <img src="@/assets/icons/down_arrow.svg" class="h-1.5 w-3 mx-3"/>
        </div>
    </div>

</template>

<script>
</script>