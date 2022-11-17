<template>
    <div>
      <ul class="flex bg-gray-100 space-x-2 p-1 rounded-lg">
        <li v-for="title in tabTitles" 
            :key="title" 
            @click="selectedTitle = title" 
            class="py-2 px-3 text-14 cursor-pointer" 
            :class="selectedTitle == title ? 'bg-white rounded-md text-gray-700 drop-shadow' : 'text-gray-500'">
          {{ title }}
        </li>
      </ul>
      <slot></slot>
    </div>
</template>

<script>
import { ref, provide } from 'vue'

export default {
  setup (props, { slots }) {
    const tabTitles = ref(slots.default().map((tab) => tab.props.title))
    const selectedTitle = ref(tabTitles.value[0])

    provide("selectedTitle", selectedTitle)

    return {
      tabTitles,
      selectedTitle,
    }
  },
}

</script>