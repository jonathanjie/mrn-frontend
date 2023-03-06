<script setup>
import BaseModal from "@/components/Modals/BaseModal.vue";

import { ref } from "vue";
import { CIIModalTypes } from "@/constants";
import GradientButton from "@/components/Buttons/GradientButton.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";
import InitialSetupCII from "@/components/Modals/CIISetupModal/components/InitialSetupCII.vue";
import UploadCIIReport from "@/components/Modals/CIISetupModal/components/UploadCIIReport.vue";
import { useCIISetupStore } from "@/stores/useCIISetupStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useShipStore } from "@/stores/useShipStore";
import constants from "@/constants";
import { useMutation } from "vue-query";

const shipStore = useShipStore();
const CIISetupStore = useCIISetupStore();
const {
  showModal,
  energyEfficiencyIndexType,
  energyEfficiencyIndexVal,
  isEnginePowerLimited,
  enginePowerLimitType,
  enginePowerLimitVal,
  reportTypes,
  trialCII,
  applicableCII,
  IMODCSMethod,
  EUMRVMethod,
  fuelOilTypes,
  otherOilName,
  conversionFactor,
  currentYearTargetCIIGrade,
  technicalFiles,
  standardizedFiles,
  IMODCSFiles,
} = storeToRefs(CIISetupStore);
const { imoReg } = storeToRefs(shipStore);
const pageNum = ref(1);

defineProps({
  setup_type: {
    type: String,
    required: false,
    default: CIIModalTypes.INITIAL_SETUP,
  },
});

const cancel = () => {
  pageNum.value = 1;
  showModal.value = false;
};

const uploadFiles = () => {
  const isFileMissing = true;
  if (isFileMissing) {
    window.alert("please add all files needed");
  }
  console.log("uploading files");
};

const uploadSettings = async () => {
  console.log("uploading settings");

  const currentYear = new Date().getFullYear();
  const SETTINGS = {
    ship: imoReg.value,
    energy_efficiency_index_type: energyEfficiencyIndexType.value,
    energy_efficiency_index_value: energyEfficiencyIndexVal.value,
    is_engine_power_limited: isEnginePowerLimited.value,
    engine_power_limit_type: enginePowerLimitType.value,
    engine_power_limit_value: enginePowerLimitVal.value,
    imo_dcs: reportTypes.value.includes(constants.ShippingAuthorities.IMODCS),
    imo_dcs_method: IMODCSMethod.value,
    eu_mrv: reportTypes.value.includes(constants.ShippingAuthorities.EUMRV),
    eu_mrv_method: EUMRVMethod.value,
    applicable_cii: applicableCII.value,
    trial_cii_types: trialCII.value,
    fuel_options: fuelOilTypes.value,
    current_year_cii_target: {
      year: currentYear,
      grade: currentYearTargetCIIGrade.value.toUpperCase(),
    },
  };

  console.log(SETTINGS);
  await axios
    .post(`${process.env.VUE_APP_URL_DOMAIN}/cii/config/`, SETTINGS)
    .then()
    .catch((error) => {
      // if (error.response.status == 400 || error.response.status == 404) {
      //   console.log(error);
      // } else {
      //   console.error(error);
      window.alert(error);

      // }
      console.error(error);
    });

  pageNum.value = 1;
  showModal.value = false;
};
</script>

<template>
  <!-- <button id="show-modal" @click="showModal = true">Show Modal</button> -->

  <Teleport to="body">
    <BaseModal :show="showModal" @close="cancel">
      <template #header>
        <div class="flex space-x-2 items-center">
          <div v-if="pageNum === 1" class="text-gray-800">
            Initial Setup CII
          </div>
          <div v-if="pageNum === 2" class="text-gray-800">
            Upload CII Report
          </div>

          <img
            v-if="setup_type === CIIModalTypes.INITIAL_SETUP"
            src="@/assets/icons/divider.svg"
            class="h-3 w-px"
          />
          <div
            v-if="setup_type === CIIModalTypes.INITIAL_SETUP"
            class="text-gray-600"
          >
            Step {{ pageNum }} of 2
          </div>
        </div>
      </template>
      <template #body>
        <!-- page visualization -->
        <div class="grid grid-cols-2 sticky top-0">
          <div
            class="border-t-gradientblue"
            :class="pageNum === 1 ? 'border-t-2' : 'border-t-0'"
          ></div>
          <div
            class="border-t-gradientblue"
            :class="pageNum === 2 ? 'border-t-2' : 'border-t-0'"
          ></div>
        </div>
        <!-- actual content per page -->
        <div class="px-7 py-8 text-gray-700 text-14 accent-blue-700">
          <div v-if="pageNum === 1" class="space-y-10">
            <InitialSetupCII />
          </div>
          <div v-if="pageNum === 2">
            <UploadCIIReport />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end space-x-4">
          <CustomButton @click="cancel"
            ><template #content>{{ $t("cancel") }}</template></CustomButton
          >
          <GradientButton v-if="pageNum === 1" @click="pageNum += 1"
            ><template #content>{{ $t("next") }}</template></GradientButton
          >
          <GradientButton v-if="pageNum === 2" @click="pageNum -= 1"
            ><template #content>{{ $t("back") }}</template></GradientButton
          >
          <GradientButton v-if="pageNum === 2" @click="pageNum -= 1"
            ><template #content>{{ $t("back") }}</template></GradientButton
          >
          <GradientButton v-if="pageNum === 2" @click="uploadSettings">
            <template #content>{{ $t("completeSetup") }}</template>
          </GradientButton>
          <!-- <GradientButton v-if="pageNum === 2" @click="uploadFiles">
            <template #content>Upload files</template>
          </GradientButton> -->
        </div>
      </template>
    </BaseModal>
  </Teleport>
</template>
