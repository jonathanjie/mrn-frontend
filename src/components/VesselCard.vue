<template>
  <div
    class="flex h-20 mx-12 rounded-xl min-w-max z-10 bg-white drop-shadow mb-6 p-4"
  >
    <div class="flex mr-16 ml-0.5 items-center justify-even">
      <!-- Sailing Icon -->
      <img
        v-if="vesselStatus === 'sailing'"
        src="@/assets/icons/My_Vessels/sailing_icon.svg"
        class="rounded-full bg-blue-50 h-11 w-11 py-2.5 px-3"
      />

      <!-- Cargo operation icon (Need to check background color) -->
      <img
        v-if="vesselStatus === 'cargo'"
        src="@/assets/icons/My_Vessels/cargo_icon.svg"
        class="rounded-full bg-blue-50 h-11 w-11 py-2.5 px-3"
      />

      <!-- Bunkering Icon (Need to check background color) -->
      <img
        v-if="vesselStatus === 'bunkering'"
        src="@/assets/icons/My_Vessels/bunkering_icon.svg"
        class="rounded-full bg-blue-50 h-11 w-11 py-2.5 px-3"
      />
      <!-- Waiting Icon -->
      <img
        v-if="vesselStatus === 'waiting'"
        src="@/assets/icons/My_Vessels/waiting_icon.svg"
        class="rounded-full bg-yellow-25 h-11 w-11 py-2.5 px-3"
      />

      <!-- Etc Icon -->
      <img
        v-if="vesselStatus === 'etc'"
        src="@/assets/icons/My_Vessels/etc_icon.svg"
        class="rounded-full bg-gray-25 h-11 w-11 py-2.5 px-3"
      />
      <div class="flex flex-col w-28 mr-4 ml-5">
        <span class="text-12 text-gray-500">{{ $t("name") }}</span>
        <span class="text-14 text-gray-700">{{ vesselName }}</span>
      </div>
      <div class="flex flex-col w-28 mr-4">
        <span class="text-12 text-gray-500">{{ $t("type") }}</span>
        <span class="text-14 text-gray-700">{{ loadType }}</span>
      </div>
      <div class="flex flex-col w-28 mr-4">
        <span class="text-12 text-gray-500">{{ $t("flag") }}</span>
        <span class="text-14 text-gray-700">{{ flag }}</span>
      </div>
      <div class="flex flex-col w-28 mr-4">
        <span class="text-12 text-gray-500">{{ $t("imoNo") }}</span>
        <span class="text-14 text-gray-700">{{ imoNo }}</span>
      </div>
      <div class="flex flex-col w-28 mr-4">
        <span class="text-12 text-gray-500">{{ $t("shipSize") }}</span>
        <span class="text-14 text-gray-700">{{ shipSize }} DWT</span>
      </div>
      <div class="flex flex-col w-28 mr-4">
        <span class="text-12 text-gray-500">{{ $t("loadingCondition") }}</span>
        <span class="text-14 text-gray-700">{{ loadingCondition }}</span>
      </div>
      <div
        v-if="reportStatus === 'uploaded'"
        class="flex rounded-xl h-7 w-auto bg-green-50"
      >
        <ul class="list-disc p-0.5 ml-6 text-14 mr-2.5">
          <li class="text-green-500">
            <span class="text-green-700"
              >{{ $t("uploadedStatus") }}: {{ updatedDate }}</span
            >
          </li>
        </ul>
      </div>
      <div
        v-if="reportStatus === 'error'"
        class="flex rounded-xl h-7 w-auto bg-red-50"
      >
        <ul class="list-disc p-0.5 ml-6 text-14 mr-2.5">
          <li class="text-red-500">
            <span class="text-red-700"
              >{{ $t("errorStatus") }}: {{ updatedDate }}</span
            >
          </li>
        </ul>
      </div>
      <div
        v-if="reportStatus === 'pending'"
        class="flex rounded-xl h-7 w-auto bg-orange-50"
      >
        <ul class="list-disc p-0.5 ml-6 text-14 mr-2.5">
          <li class="text-orange-500">
            <span class="text-orange-700">{{ $t("pendingStatus") }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- <div
    v-show="expanded"
    class="min-h-fit bg-gray-50 mx-12 mb-6 rounded-xl -mt-4 p-5"
  >
    <VesselDetailsCard
      :cubicCapacity="cubicCapacity"
      :vesselSpeed="speed"
      :vesselAge="vesselAge"
      :vesselOwnership="vesselOwnership"
      :mainEngineImo="mainEngineImo"
      :fuelType="fuelType"
      :percentActive="percentActive"
      :percentIdle="percentIdle"
      :reportedEedi="reportedEedi"
      :bwts="bwts"
      :scrubber="scrubber"
    ></VesselDetailsCard>
  </div> -->
</template>

<script setup>
defineProps({
  vesselStatus: String,
  vesselName: String,
  loadType: String,
  flag: String,
  imoNo: String,
  shipSize: String,
  loadingCondition: String,
  reportStatus: String,
  updatedDate: String,
});
</script>
