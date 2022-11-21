<template>
  <div
    class="flex h-20 mx-12 items-center rounded-xl min-w-max z-10"
    :class="expanded ? 'bg-blue' : 'bg-white drop-shadow-md mb-6'"
  >
    <img
    v-if="expanded"
      src="@/assets/icons/My_Vessels/selected.svg"
      class="h-11 w-3 -m-1"
    />
    <div class="flex mr-16" :class="expanded ? 'm-4':'ml-5'">
        <div class="flex flex-col w-28 mr-3">
            <span class="text-12" :class="expanded ? 'text-white/50':'text-gray-500'">{{ $t("name") }}</span>
            <span class="text-14" :class="expanded ? 'text-white':'text-gray-700'">{{ vessel.marinaName }}</span>    
        </div>
        <div class="flex flex-col w-28 mr-3">
            <span class="text-12" :class="expanded ? 'text-white/50':'text-gray-500'">{{ $t("oilType") }}</span>
            <span class="text-14" :class="expanded ? 'text-white':'text-gray-700'">{{ vessel.oilType }}</span>    
        </div>
        <div class="flex flex-col w-28 mr-3">
            <span class="text-12" :class="expanded ? 'text-white/50':'text-gray-500'">{{ $t("flag") }}</span>
            <span class="text-14" :class="expanded ? 'text-white':'text-gray-700'">{{ vessel.flag }}</span>    
        </div>
        <div class="flex flex-col w-28 mr-3">
            <span class="text-12" :class="expanded ? 'text-white/50':'text-gray-500'">{{ $t("imoNo") }}</span>
            <span class="text-14" :class="expanded ? 'text-white':'text-gray-700'">{{ vessel.imoNo }}</span>    
        </div>
        <div class="flex flex-col w-28 mr-3">
            <span class="text-12" :class="expanded ? 'text-white/50':'text-gray-500'">{{ $t("shipSize") }}</span>
            <span class="text-14" :class="expanded ? 'text-white':'text-gray-700'">{{ vessel.shipSize }} DWT</span>    
        </div>
        <div class="flex flex-col w-28 mr-3">
            <span class="text-12" :class="expanded ? 'text-white/50':'text-gray-500'">{{ $t("dwt") }}</span>
            <span class="text-14" :class="expanded ? 'text-white':'text-gray-700'">{{ vessel.dwt }}</span>    
        </div>
        <div class="flex flex-col w-28 mr-3">
            <span class="text-12" :class="expanded ? 'text-white/50':'text-gray-500'">{{ $t("grossTonnage") }}</span>
            <span class="text-14" :class="expanded ? 'text-white':'text-gray-700'">{{ vessel.grossTonnage }}</span>    
        </div>
    </div>
    <div class="flex justify-items-end ">
      <button @click="expanded = !expanded" class="m-8 rounded-xl p-1.5"
    :class="expanded ? 'bg-blue-75' : 'bg-gray-50'">
      <img class="h-6 w-6" src="@/assets/icons/My_Vessels/dashboard_icon.svg" />
    </button>
    </div>
  </div>
  
  
  <div
    v-show="expanded"
    class="min-h-fit bg-darkgray mx-12 mb-6 rounded-xl -mt-4 p-5"
  >
    <div class="flex items-center py-5">
      <button
        class="bg-gray-100 rounded-xl h-7 px-2 mr-4 text-gray-700 text-14"
      >
        {{ $t("allReports") }}
      </button>
      <button
        class="bg-gray-100 rounded-xl h-7 px-2 mr-4 text-gray-700 text-14"
      >
        {{ $t("departure") }}
      </button>
      <button
        class="bg-gray-100 rounded-xl h-7 px-2 mr-4 text-gray-700 text-14"
      >
        {{ $t("arrival") }}
      </button>
      <button
        class="bg-gray-100 rounded-xl h-7 px-2 mr-4 text-gray-700 text-14"
      >
        {{ $t("noon") }}
      </button>
      <button
        class="bg-gray-100 rounded-xl h-7 px-2 mr-4 text-gray-700 text-14"
      >
        {{ $t("bunkerDelivery") }}
      </button>
      <CustomButton
        @click="$router.push('add-report')"
        class="h-9 text-14 text-blue-700 rounded-xl ml-auto"
      >
        <template v-slot:content>+{{ $t("addNewReport") }}</template>
      </CustomButton>
    </div>

    <!-- TODO: restrict upto 5 most recent reports? -->
    <div class="flex flex-col space-y-4">
      <div v-for="(report, index) in reports" :key="index">
        <ReportCard
          :report_no="report.report_no"
          :report_type="report.report_type"
          :departure="report.departure"
          :arrival="report.arrival"
          :status="report.status"
          :cargold="report.cargold"
          :distance_to_go="report.distance_to_go"
          :date_of_submission="report.date_of_submission"
        ></ReportCard>
      </div>
      <ReportCard
        :report_no="'DEPARTURE'"
        :report_type="'DEPART'"
        :departure="'Singapore'"
        :arrival="'Ulsan'"
        :status="'Anchoring'"
        :cargold="'Ballast'"
        :distance_to_go="'2503'"
        :date_of_submission="'2022-10-19'"
      ></ReportCard>
      <!-- TEST ITEMS -->
      <!-- <ReportCard :report_no="'ARRIVAL'" :report_type="'ARRIVAL'" :departure="'Singapore'" :arrival="'Ulsan'" :status="'Anchoring'" :cargold="'Ballast'" :distance_to_go="'2503'" :date_of_submission="'2022-10-19'"></ReportCard>
                <ReportCard :report_no="'NOON'" :report_type="'NOON'" :departure="'Singapore'" :arrival="'Ulsan'" :status="'Anchoring'" :cargold="'Ballast'" :distance_to_go="'2503'" :date_of_submission="'2022-10-19'"></ReportCard> -->
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { ref } from "vue";
import CustomButton from "./Buttons/CustomButton.vue";
import ReportCard from ".//ReportCard.vue";

const vessel = {
    marinaName: "MARINA A",
    oilType: "Oil",
    flag: "Panama",
    imoNo : "9876543",
    shipSize: "300,000",
    dwt: "300,000",
    grossTonnage: "157,000"
}

let expanded = ref(false)
// export default {
//     name: "VoyageCard",
//     props: {
//         num: {
//             type: Number,
//             required: true,
//             default: 0
//         },
//         start: {
//             type: String,
//             required: true,
//             default: "Singapore"
//         },
//         mid: {
//             type: String,
//             required: true,
//             default: "Singapore"
//         },
//         dest: {
//             type: String,
//             required: true,
//             default: "Ulsan, Korea"
//         },
//         expanded: {
//             type: Boolean,
//             required: false,
//             default: false
//         },
//         reports: {
//             type: Object,
//             required: true,
//             default: {}
//         }
//     },
//     components: {
//         CustomButton,
//         ReportCard,
//     },
// };
</script>
