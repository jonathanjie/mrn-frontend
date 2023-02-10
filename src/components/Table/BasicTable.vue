<script setup>
const props = defineProps({
  columns: Array,
  rows: Array,
});

const getTableCols = () => "grid-cols-" + props.columns.length;
// const getTableColSpan = () => "col-span-" + props.columns.length;
</script>

<template>
  <div class="bg-white drop-shadow-sm rounded-xl p-4 w-full">
    <div
      class="bg-gray-50 rounded-xl text-gray-600 text-12 grid"
      :class="getTableCols()"
    >
      <div v-for="col in columns" :key="col.name" class="p-3">
        {{ col.title }}
      </div>
    </div>
    <div
      class="grid auto-cols-max"
      :class="getTableCols()"
      v-for="(row, index) in rows"
      :key="index"
    >
      <div
        class="text-gray-800 text-14 py-6 px-3 border-t border-gray-100"
        :class="{
          'border-t-0': index === 0,
          'min-w-full': col.type === 'BtnsCell',
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
