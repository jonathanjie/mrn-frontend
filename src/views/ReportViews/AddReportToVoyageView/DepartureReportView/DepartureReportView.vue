<template>
  <TabsWrapper class="mt-5">
    <Tab :title="$t('sby')">
      <DepartureSBYReportView />
    </Tab>
    <Tab :title="$t('cosp')">
      <DepartureCOSPReportView />
    </Tab>
  </TabsWrapper>
</template>

<script setup>
import TabsWrapper from "@/components/Tabs/TabsWrapper.vue";
import Tab from "@/components/Tabs/Tab.vue";
import DepartureSBYReportView from "./DepartureSBYReportView.vue";
import DepartureCOSPReportView from "./DepartureCOSPReportView.vue";
</script>
