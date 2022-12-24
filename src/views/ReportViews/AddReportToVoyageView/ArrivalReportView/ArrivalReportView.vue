<template>
  <TabsWrapper class="mt-5">
    <Tab :title="$t('eosp')">
      <ArrivalEOSPReportView />
    </Tab>
    <Tab :title="$t('fwe')">
      <ArrivalFWEReportView />
    </Tab>
  </TabsWrapper>
</template>

<script setup>
import TabsWrapper from "@/components/Tabs/TabsWrapper.vue";
import Tab from "@/components/Tabs/Tab.vue";

import ArrivalEOSPReportView from "./ArrivalEOSPReportView.vue";
import ArrivalFWEReportView from "./ArrivalFWEReportView.vue";
</script>
