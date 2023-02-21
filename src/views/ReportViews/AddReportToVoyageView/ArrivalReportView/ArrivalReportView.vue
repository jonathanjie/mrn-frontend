<template>
  <TabsWrapper class="mt-5">
    <Tab
      :title="$t('eosp')"
      :disabled="!validReportTypes.includes(Report.type.ARR_SBY_EOSP)"
    >
      <ArrivalEOSPReportView />
    </Tab>
    <Tab
      :title="$t('fwe')"
      :disabled="!validReportTypes.includes(Report.type.ARR_FWE)"
    >
      <ArrivalFWEReportView />
    </Tab>
  </TabsWrapper>
</template>

<script setup>
import TabsWrapper from "@/components/Tabs/TabsWrapper.vue";
import Tab from "@/components/Tabs/Tab.vue";

import ArrivalEOSPReportView from "./ArrivalEOSPReportView.vue";
import ArrivalFWEReportView from "./ArrivalFWEReportView.vue";
import { useLatestReportDetailsStore } from "@/stores/useLatestReportDetailsStore";
import { storeToRefs } from "pinia";
import { Report } from "@/constants";

const detailsStore = useLatestReportDetailsStore();
const { validReportTypes } = storeToRefs(detailsStore);
</script>
