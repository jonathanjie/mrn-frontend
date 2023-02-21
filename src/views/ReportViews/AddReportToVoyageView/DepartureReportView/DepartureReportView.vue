<template>
  <TabsWrapper class="mt-5">
    <Tab
      :title="$t('sby')"
      :disabled="!validReportTypes.includes(Report.type.DEP_SBY)"
    >
      <DepartureSBYReportView />
    </Tab>
    <Tab
      :title="$t('cosp')"
      :disabled="!validReportTypes.includes(Report.type.DEP_COSP_RUP)"
    >
      <DepartureCOSPReportView />
    </Tab>
  </TabsWrapper>
</template>

<script setup>
import TabsWrapper from "@/components/Tabs/TabsWrapper.vue";
import Tab from "@/components/Tabs/Tab.vue";
import DepartureSBYReportView from "./DepartureSBYReportView.vue";
import DepartureCOSPReportView from "./DepartureCOSPReportView.vue";
import { useLatestReportDetailsStore } from "@/stores/useLatestReportDetailsStore";
import { storeToRefs } from "pinia";
import { Report } from "@/constants";

const detailsStore = useLatestReportDetailsStore();
const { validReportTypes } = storeToRefs(detailsStore);
</script>
