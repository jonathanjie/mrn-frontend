<template>
  <div class="bg-white text-black py-4 px-6 flex">
    <!-- <div class="flex overflow-hidden pl-6 mr-auto">
      <div class="relative mx-auto text-gray-600">
        <img
          class="absolute mr-2 w-10 px-2 py-2"
          src="@/assets/icons/search_icon.svg"
        />
        <input
          class="hidden bg-gray-50 h-10 w-80 pl-11 pr-3 rounded-lg text-14 focus:outline-none"
          type="search"
          name="search"
          :placeholder="$t('typeToSearch')"
          icon="search"
        />
      </div>
    </div> -->
    <!-- <ul class="flex items-center">
      <li class="mx-3">
        <img src="@/assets/icons/message.svg" class="hidden h-6 w-6" />
      </li>
      <li class="mx-3">
        <img
          src="@/assets/icons/bell_notification.svg"
          class="hidden h-6 w-6"
        />
      </li>
      <li>
        <img
          src="@/assets/icons/divider.svg"
          class="flex h-5 w-6 md:items-center md:visible"
        />
      </li>
    </ul> -->
    <div
      class="flex items-center relative ml-auto"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
    >
      <img
        v-if="user"
        :src="user.picture"
        class="h-10 w-10 mx-3 rounded-full"
        referrerpolicy="no-referrer"
      />
      <img v-else src="@/assets/icons/avatar.svg" class="h-10 w-10 mx-3" />
      <div v-if="user" class="flex flex-col items-left">
        <span class="font-bold text-gray-900 text-14 mr-1">{{
          user.name
        }}</span>
        <span
          v-if="auth.role === 'manager'"
          class="font-semibold text-gray-500 text-12 mr-1"
          >{{ $t("manager") }}</span
        >
        <span
          v-else-if="auth.role === 'crew'"
          class="font-semibold text-gray-500 text-12 mr-1"
          >{{ $t("crew") }}</span
        >
        <span
          v-else
          class="font-semibold text-gray-500 text-12 mr-1"
          >{{
        }}</span>
      </div>
      <div v-else class="flex flex-col items-left">
        <span class="font-bold text-gray-900 text-14 mr-1">{{
          $t("Unknown")
        }}</span>
        <span class="font-semibold text-gray-500 text-12 mr-1">{{
          $t("pleaseLogIn")
        }}</span>
      </div>
      <img src="@/assets/icons/down_arrow.svg" class="h-1.5 w-3 mx-3" />
      <div
        v-show="isExpanded"
        class="absolute -bottom-10 right-0"
        @mouseenter="mouseEnter"
      >
        <div class="flex flex-col">
          <button @click="logout" class="h-10 w-40 bg-white rounded-b-lg">
            {{ $t("logOut") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { ref } from "vue";

// TODO: get from pinia instead of auth0; need to figure out async state tracking
const { user, logout } = useAuth0();
const auth = useAuthStore();

// console.log("WebHeader loads");
let isExpanded = ref(false);

function mouseEnter() {
  isExpanded.value = true;
}

function mouseLeave() {
  isExpanded.value = false;
}
</script>
