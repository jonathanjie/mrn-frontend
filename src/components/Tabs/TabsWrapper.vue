<template>
  <div>
    <ul class="flex bg-gray-100 space-x-2 p-1 rounded-lg">
      <li
        v-for="title in tabTitles"
        :key="title"
        @click="
          validTabTitles.includes(title)
            ? (selectedTitle = title)
            : selectedTitle
        "
        :class="{
          'py-2 px-3 text-14 cursor-pointer': true,
          'text-gray-500 line-through cursor-default':
            !validTabTitles.includes(title),
          'text-gray-700 bg-white rounded-md drop-shadow':
            selectedTitle === title,
          'text-gray-500': selectedTitle !== title,
          'grow w-0 flex justify-center': expand,
        }"
      >
        {{ title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
import { ref, provide } from "vue";

export default {
  props: {
    expand: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  setup(props, { slots }) {
    const tabTitles = ref(slots.default().map((tab) => tab.props.title));
    const validTabTitles = ref(
      slots
        .default()
        .filter((tab) => !tab.props.disabled)
        .map((tab) => tab.props.title)
    );
    const selectedTitle = ref(validTabTitles.value[0]);

    provide("selectedTitle", selectedTitle);

    return {
      tabTitles,
      validTabTitles,
      selectedTitle,
    };
  },
};
</script>
