<script setup>
import GradientButton from "@/components/Buttons/GradientButton.vue";
import BunkerOverview from "@/components/Reports/BunkerReport/BunkerOverview.vue";
import BunkeringPort from "@/components/Reports/BunkerReport/BunkeringPort.vue";
import BunkerReceivedDetail from "@/components/Reports/BunkerReport/BunkerReceivedDetail.vue";
import BunkerDateAndTime from "@/components/Reports/BunkerReport/BunkerDateAndTime.vue";
import { useBunkerReportStore } from "@/stores/useBunkerReportStore";
import { storeToRefs } from "pinia";
import { useShipStore } from "@/stores/useShipStore";
import { useVoyageStore } from "@/stores/useVoyageStore";
import { useSubmissionStatusStore } from "@/stores/useSubmissionStatusStore";
import { Report } from "@/constants";
import { parsePortLocode } from "@/utils/helpers";
import { UrlDomain } from "@/constants";
import { ref } from "vue";

const props = defineProps({
  isCreate: {
    type: Boolean,
    required: true,
  },
});

const shipStore = useShipStore();
const { companyUuid: company_uuid } = storeToRefs(shipStore);

const voyageStore = useVoyageStore();
const { voyageUuid: voyage_uuid } = storeToRefs(voyageStore);

const store = useBunkerReportStore();
const {
  // subtype variable
  isBeforeArrival,
  // Overview
  reportNo,
  legUuid,
  voyageNo,
  reportingTimeZone,
  reportingDateTimeUTC,
  // Bunkering Port
  portCountry,
  portName,
  // Received Bunker Detail
  oil,
  quantity,
  density,
  viscosity,
  viscosityDegree,
  flashPoint,
  sulfurContent,
  marpol,
  ship,
  barge,
  files,
  // Date and Time Bunker
  alongsideUTC,
  hoseConnectionUTC,
  pumpStartUTC,
  pumpStopUTC,
  hoseDisconnectionUTC,
  awaysideUTC,
  purchaser,
  bargeName,
  supplierName,
  address,
  telephoneNumber,
} = storeToRefs(store);

const submissionStatusStore = useSubmissionStatusStore();
const {
  isSubmissionRequested,
  isSubmissionModalVisible,
  isSubmissionSuccessful,
  errorMessage,
} = storeToRefs(submissionStatusStore);

const isUploadToS3Successful = ref(true);

const getFileNames = () => {
  console.log(files.value.map((file) => file.name));
  return files.value.map((file) => file.name);
};

const getPresignedUrlForFiles = async () => {
  const response = await fetch(
    "https://majnalcwgg5jdnfpr2zdxvqubq0thpjz.lambda-url.ap-southeast-1.on.aws/",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        file_directory: `${company_uuid.value}/${voyage_uuid.value}/bdn`,
        filenames: getFileNames(),
      }),
    }
  );

  try {
    const data = await response.json();
    console.log(response);
    console.log(data);

    return data.presigned_urls;
  } catch (error) {
    console.log(error);
  }
};

const uploadFile = async (file) => {
  // set up the request data
  let formData = new FormData();
  formData.append("file", file.file);
  // console.log("need to be binary", file.file);
  const url = `${file.presignedUrl}`;

  // track status and upload file
  file.status = "loading";
  let response = await fetch(url, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "PUT",
    body: formData,
  });

  // change status to indicate the success of the upload request
  file.status = response.ok;

  return response;
};

const uploadFiles = (files) => {
  return Promise.all(files.map((file) => uploadFile(file)));
};

const sendReport = async () => {
  isSubmissionRequested.value = true;

  let urls = [];
  if (files.value.length) {
    urls = await getPresignedUrlForFiles();
  }

  const bunkeringPort = parsePortLocode({
    portCountry: portCountry.value,
    portName: portName.value,
  });

  const REPORT = {
    report_type: Report.type.BUNKER,
    report_num: reportNo.value,
    report_date: reportingDateTimeUTC.value,
    report_tz: reportingTimeZone.value,
    voyage: voyageNo.value,
    voyage_leg: {
      uuid: legUuid.value,
    },
    bdndata: {
      is_before_arrival: isBeforeArrival.value,
      bunkering_port: bunkeringPort,
      bunkering_date: reportingDateTimeUTC.value,
      bdn_file: files.value.length
        ? urls.map(function (file) {
            return file["presigned_url"];
          })
        : urls,
      delivered_oil_type: oil.value,
      delivered_quantity: Number(quantity.value),
      density_15: Number(density.value),
      viscosity_value: Number(viscosity.value),
      viscosity_temperature: Number(viscosityDegree.value),
      flash_point: Number(flashPoint.value),
      sulfur_content: Number(sulfurContent.value),
      sample_sealing_marpol: Number(marpol.value),
      sample_sealing_ship: Number(ship.value),
      sample_sealing_barge: Number(barge.value),
      alongside_date: alongsideUTC.value,
      hose_connection_date: hoseConnectionUTC.value,
      pump_start_date: pumpStartUTC.value,
      pump_stop_date: pumpStopUTC.value,
      hose_disconnection_date: hoseDisconnectionUTC.value,
      slipoff_date: awaysideUTC.value,
      purchaser: purchaser.value,
      barge_name: bargeName.value,
      supplier_name: supplierName.value,
      supplier_address: address.value,
      supplier_contact: telephoneNumber.value,
    },
  };

  console.log("data: ", REPORT);

  const response = await fetch(`${UrlDomain.DEV}/marinanet/reports/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(REPORT),
  });
  console.log(response.status);

  if (
    files.value.length &&
    (response.status == 200 || response.status == 201)
  ) {
    // console.log(urls);
    console.log("why am i here");
    for (const [index, file] of files.value.entries()) {
      file.presignedUrl = urls[index].presigned_url;
    }

    await uploadFiles(files.value);
  }

  try {
    if (isUploadToS3Successful.value) {
      const data = await response.json();
      console.log(response);
      console.log(data);

      if (response.ok) {
        isSubmissionSuccessful.value = true;
        store.$reset();
      } else {
        errorMessage.value = data;
      }
    } else {
      errorMessage.value = {
        unexpectedError: [
          "Failed to upload file. Please contact the administrator.",
        ],
      };
    }

    isSubmissionModalVisible.value = true;
  } catch (error) {
    console.log(error);
    errorMessage.value = {
      unexpectedError: ["Please contact the administrator."],
    };
    isSubmissionModalVisible.value = true;
  }
};
</script>

<template>
  <div class="flex flex-col space-y-6 my-2 mb-6">
    <div class="flex text-gray-700 space-x-3 text-16">
      <span class="text-gray-500">{{ $t("arrivalPort") + ":" }}</span>
      <input
        type="radio"
        name="before_or_after_arrival"
        id="beforeArrival"
        :value="true"
        v-model="isBeforeArrival"
      />
      <label for="beforeArrival" class="mr-1">{{ $t("beforeArrival") }}</label>
      <input
        type="radio"
        name="before_or_after_arrival"
        id="afterArrival"
        :value="false"
        v-model="isBeforeArrival"
      />
      <label for="afterArrival">{{ $t("afterArrival") }}</label>
    </div>
    <!-- Overview -->
    <BunkerOverview />

    <!-- Bunkering Port -->
    <BunkeringPort />

    <!-- Received Bunker Detail -->
    <BunkerReceivedDetail :is-create="props.isCreate" />

    <!-- Bunker Date and Time & Supplier -->
    <BunkerDateAndTime />

    <!-- Save and Send -->
    <div v-if="props.isCreate" class="flex justify-end space-x-4 my-6">
      <!-- <CustomButton
        class="p-3 text-14"
        type="button"
        @click="saveChanges()"
      >
        <template v-slot:content>{{ $t("saveChanges") }}</template>
      </CustomButton> -->
      <GradientButton
        class="p-3 text-14"
        type="button"
        @click="sendReport()"
        :is-disabled="isSubmissionRequested"
      >
        <template v-slot:content>{{ $t("sendReport") }}</template>
      </GradientButton>
    </div>
  </div>
</template>
