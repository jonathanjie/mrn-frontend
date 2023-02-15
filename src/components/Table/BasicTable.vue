<template>
  <div
    class="grid bg-white drop-shadow-sm rounded-xl p-4 w-full auto-cols-min"
    :class="getTableCols()"
  >
    <div
      class="p-3 bg-gray-50 rounded-xl text-gray-600 text-12 grid grid-flow-col"
      :class="getTableColSpan()"
    >
      <div v-for="col in columns" :key="col.name">
        {{ col.title }}
      </div>
    </div>
    <div class="contents" v-for="(row, index) in rows" :key="index">
      <div
        class="text-gray-800 text-14 py-6 px-3 border-t border-gray-100"
        :class="{
          'border-t-0': index === 0,
          'w-10 justify-self-end': col.type === 'ImageCell',
        }"
        v-for="col in columns"
        :key="col.name"
      >
        <slot name="cell" :type="col.type" :value="row[col.name]">{{
          row[col.name]
        }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  columns: Array,
  rows: Array,
});

const getTableCols = () => "grid-cols-" + props.columns.length;
const getTableColSpan = () => "col-span-" + props.columns.length;
</script>
