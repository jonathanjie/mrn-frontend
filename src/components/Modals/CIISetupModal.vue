<script setup>
import BaseModal from "@/components/Modals/BaseModal.vue";

import { ref } from "vue";

const showModal = ref(false);
</script>

<template>
  <button id="show-modal" @click="showModal = true">Show Modal</button>

  <Teleport to="body">
    <BaseModal :show="showModal" @close="showModal = false">
      <template #header>
        <div>Initial Setup CII</div>
      </template>
      <template #body>
        <h3>custom body</h3>
      </template>
      <template #footer>
        <h3>custom footer</h3>
      </template>
    </BaseModal>
  </Teleport>
</template>
