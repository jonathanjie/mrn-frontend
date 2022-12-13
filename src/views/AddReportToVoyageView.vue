<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- <div class="relative bg-gray-100 h-36"> TODO: buggy line, will fix later-->
    <div class="flex flex-col px-24 pt-11">
      <div class="flex items-center mx-5 mb-6">
        <button @click="$router.push({ name: 'vessel-overview' })">
          <img
            src="@/assets/icons/back_arrow.svg"
            class="fill-blue float-left"
            type="button"
          />
        </button>
        <span class="mx-5 text-20 text-blue">{{ $t("submitNewReport") }}</span>
      </div>
      <div
        class="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-5 justify-items-stretch pb-8"
      >
        <RadioBtnIcon
          :icon="require('@/assets/icons/noon_report.svg')"
          :content="$t('noon')"
          type="noon"
          :active="reportType"
          @onUpdateBtn="updateActiveReportType"
        >
        </RadioBtnIcon>
        <RadioBtnIcon
          :icon="require('@/assets/icons/depart_report.svg')"
          :content="$t('departure')"
          type="departure"
          :active="reportType"
          @onUpdateBtn="updateActiveReportType"
        >
        </RadioBtnIcon>
        <RadioBtnIcon
          :icon="require('@/assets/icons/arrival_report.svg')"
          :content="$t('arrival')"
          type="arrival"
          :active="reportType"
          @onUpdateBtn="updateActiveReportType"
        >
        </RadioBtnIcon>
        <RadioBtnIcon
          :icon="require('@/assets/icons/harbourport_report.svg')"
          :content="$t('inHarbourOrPort')"
          type="harbour-port"
          :active="reportType"
          @onUpdateBtn="updateActiveReportType"
        >
        </RadioBtnIcon>
        <RadioBtnIcon
          :icon="require('@/assets/icons/bunker_report.svg')"
          :content="$t('bunkerDelivery')"
          type="bunker-delivery"
          :active="reportType"
          @onUpdateBtn="updateActiveReportType"
        >
        </RadioBtnIcon>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import RadioBtnIcon from "../components/Buttons/RadioBtnIcon.vue";
import router from "@/router";

export default {
  components: {
    RadioBtnIcon,
  },
  data() {
    return {
      reportType: this.$route.name,
    };
  },
  methods: {
    updateActiveReportType(type) {
      this.reportType = type;
      router.push({ name: type });
    },
  },
};
</script>
