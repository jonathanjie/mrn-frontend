<template>
    <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4 shadow-card">
        <div class="col-span-2 flex items-center">
            <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
            <span class="text-blue-700 text-16">{{ $t("overview") }}</span>
        </div>
        <div class="col-span-2 xl:col-span-1 grid grid-cols-5 border bg-gray-50 text-14">
            <div class="col-span-2 text-blue-700 p-3 border-r">{{ $t("reportNo") }}</div>
            <input class="col-span-3 p-3 text-gray-700 bg-gray-50" disabled v-model="tempValues.reportNo"/>
        </div>
        <div class="col-span-2 xl:col-span-1 grid grid-cols-5 border bg-gray-50 text-14">
            <div class="col-span-2 text-blue-700 p-3 border-r">{{ $t("legNo") }}</div>
            <input class="col-span-3 p-3 text-gray-700 bg-gray-50" disabled v-model="tempValues.legNo"/>
        </div>
    </div>
</template>

<script setup>
// TODO: retrieve from backend or generate as needed
const tempValues = {
    reportNo: '2',
    legNo: '2',
};
</script>
