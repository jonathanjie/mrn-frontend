<!-- Deprecated -->
<template>
  <v-select
    class="text-14 text-gray-700 pl-2"
    :options="paginated"
    label="value"
    :filterable="false"
    :placeholder="$t('selectTimeZone')"
    :reduce="(opt) => opt.value"
    @open="onOpen"
    @close="onClose"
    @search="(query) => (search = query)"
  >
    <template #list-footer>
      <li v-show="hasNextPage" ref="load" class="loader">
        Loading more options...
      </li>
    </template>
  </v-select>
</template>

<script>
import { timezones } from "../data/timezones.js";

export default {
  name: "InfiniteScroll",
  data: () => ({
    observer: null,
    limit: 10,
    search: "",
  }),
  computed: {
    filtered() {
      return timezones.filter((timezone) =>
        timezone.value.includes(this.search)
      );
    },
    paginated() {
      return this.filtered.slice(0, this.limit);
    },
    hasNextPage() {
      return this.paginated.length < this.filtered.length;
    },
  },
  mounted() {
    this.observer = new IntersectionObserver(this.infiniteScroll);
  },
  methods: {
    async onOpen() {
      if (this.hasNextPage) {
        await this.$nextTick();
        this.observer.observe(this.$refs.load);
      }
    },
    onClose() {
      this.observer.disconnect();
    },
    async infiniteScroll([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.limit += 10;
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },
  },
};
</script>

<style scoped>
.loader {
  text-align: center;
  color: #fff;
}
.v-select {
  --vs-border-width: 0px;
  --vs-font-size: 0.85rem;
  --vs-line-height: 1.4;
  --vs-search-input-placeholder-color: #b3bac7;
  --vs-selected-color: #475467;
}
</style>
