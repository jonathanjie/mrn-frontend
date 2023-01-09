<template>
  <!-- TODO: button needs to only display icons and not the content when container grid size is smaller than content-->
  <button
    @click="updateActiveBtn"
    class="flex font-bold text-14 py-3 px-4 h-16 min-w-fit rounded-xl inline-flex items-center"
    :class="
      this.disabled
        ? 'bg-gray-50 border border-gray-300 text-gray-400'
        : this.type == this.active
        ? 'bg-white border-gradientblue border-2 text-gradientblue'
        : 'bg-white text-gray-700'
    "
    :disabled="this.disabled"
  >
    <img
      v-if="active == this.type"
      src="@/assets/icons/checkboxes/checked_round.svg"
    />
    <img v-else src="@/assets/icons/checkboxes/unchecked_round.svg" />
    <img :src="icon" class="mx-3" />
    <span>{{ content }}</span>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    active: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      defauolt: false,
    },
  },
  methods: {
    updateActiveBtn() {
      this.$emit("onUpdateBtn", this.type);
    },
  },
};
</script>

<style></style>
