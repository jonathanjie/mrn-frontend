<template>
  <div class="flex flex-col space-y-6 my-2 mb-6">
    <div class="flex text-gray-700 space-x-3 text-16">
      <span class="text-gray-500">{{ $t("arrivalPort") + ":" }}</span>
      <input
        type="radio"
        name="arrival_port"
        id="beforeArrival"
        value="0"
        v-model="arrival_port"
      />
      <label for="beforeArrival" class="mr-1">{{ $t("beforeArrival") }}</label>
      <input
        type="radio"
        name="arrival_port"
        id="afterArrival"
        value="1"
        v-model="arrival_port"
      />
      <label for="afterArrival">{{ $t("afterArrival") }}</label>
    </div>

    <!-- Overview -->
    <Overview></Overview>

    <!-- Bunkering Port -->
    <BunkeringPort></BunkeringPort>

    <!-- Received Bunker Detail -->
    <ReceivedBunkerDetail @file-change="updateFiles"></ReceivedBunkerDetail>

    <!-- Bunker Date and Time & Supplier -->
    <DateAndTimeBunker></DateAndTimeBunker>

    <!-- Save and Send -->
    <div class="flex justify-end space-x-4 my-6">
      <CustomButton
        class="p-3 text-14"
        type="button"
        v-on:click="saveChanges()"
      >
        <!-- TODO: need alternate function for saving changes to backend -->
        <template v-slot:content>{{ $t("saveChanges") }}</template>
      </CustomButton>
      <GradientButton
        class="p-3 text-14"
        type="button"
        v-on:click="sendReport()"
      >
        <!-- TODO: need alternate function for saving changes to backend -->
        <template v-slot:content>{{ $t("sendReport") }}</template>
      </GradientButton>
    </div>
  </div>
</template>

<script setup>
import GradientButton from "@/components/Buttons/GradientButton.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";
import Overview from "@/components/ReportComponents/Overview.vue";
import BunkeringPort from "@/components/ReportComponents/BunkeringPort.vue";
import ReceivedBunkerDetail from "@/components/ReportComponents/ReceivedBunkerDetail.vue";
import DateAndTimeBunker from "@/components/ReportComponents/DateAndTimeBunker.vue";
import { useBunkerReportStore } from "@/store/useBunkerReportStore";
import { storeToRefs } from "pinia";
import { REPORT_CONSTANTS } from "@/constants";

// TODO: less hacky
let files = [];
const updateFiles = (f) => {
  files = f;
  console.log("updatefiles");
};

const store = useBunkerReportStore();
const {
  // status var
  arrivalPort: arrival_port,
  // Overview
  reportNo,
  legNo,
  voyageNo,
  // Bunkering Port
  portCountry,
  portName,
  dateTime,
  status,
  // Received Bunker Detail
  oil,
  density,
  sg,
  viscosity,
  flashPoint,
  sulfurContent,
  marpol1,
  marpol2,
  ship1,
  ship2,
  barge1,
  barge2,
  // Date and Time Bunker
  alongside,
  hoseConnection,
  pumpStart,
  pumpStop,
  hoseDisconnection,
  awayside,
  purchaser,
  bargeName,
  supplierName,
  address,
  telephoneNumber,
} = storeToRefs(store);

const sendReport = async () => {
  let REPORT = {
    report_type: REPORT_CONSTANTS.type.bunker,
    voyage: 1, // TODO: fetch from db
    leg_num: 1, // TODO: fetch from db
    report_tz: timeZone.value, // FIND TIMEZONE FROM PORT
    summer_time: summerTime.value, // FIND SUMMERTIME FROM PORT
    report_num: 1, // TODO: fetch from db
    report_date: dateTime.value,
    position: null, // no pos for bunker report
    // TODO: MORE BELOW, when backend is done
    reports: files,
  };

  console.log("data: ", REPORT);

  const response = await fetch(
    "https://testapi.marinachain.io/marinanet/reports/",
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(REPORT),
    }
  );
  const data = await response.json();
  console.log(response);
  console.log(data);
};
</script>
