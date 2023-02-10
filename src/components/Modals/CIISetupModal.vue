<script setup>
import BaseModal from "@/components/Modals/BaseModal.vue";

import { ref } from "vue";
import { CIIModalTypes } from "@/constants";
import GradientButton from "../Buttons/GradientButton.vue";
import CustomButton from "../Buttons/CustomButton.vue";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import CustomTitle from "@/components/CustomTitle.vue";
import DropZone from "../FileDrop/DropZone.vue";
import FilePreview from "../FileDrop/FilePreview.vue";

const showModal = ref(true);
const pageNum = ref(2);
const shipIndexType = ref("eedi");
const shipIndexVal = ref("");
const isEngineLimited = ref(true);
const engineLimitType = ref("epl");
const engineLimitPercent = ref("");
const reportTypes = ref(["imodcs"]);
const ciiTrials = ref([]);
const applicableCII = ref("");
const IMODCSMethod = ref("1");
const EUMRVMethod = ref("");
const fuelOilTypes = ref([]);
const otherOilName = ref("");
const conversionFactor = ref("");
const targetCIIGrade = ref("default");
const files = ref([]);

const props = defineProps({
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

const uploadSettings = () => {
  console.log("uploading settings");
  // implement upload with backend api
  pageNum.value = 1;
  showModal.value = false;
};

// TODO: move to store
const includedInvalidFileType = ref(false);

const addFiles = (newFiles) => {
  console.log("add");
  let newUploadableFiles = [...newFiles]
    .map((file) => new UploadableFile(file))
    .filter((file) => !fileExists(file.id))
    .filter((file) => isValidFileType("pdf", file.type)); // TODO: update valid file type to be passed in as parameter
  files.value = files.value.concat(newUploadableFiles);

  if (includedInvalidFileType.value) {
    window.alert(
      "One or more of your files is not a valid file type. Please try again."
    );
    includedInvalidFileType.value = false;
  }
};

const fileExists = (otherId) => {
  return files.value.some(({ id }) => id === otherId);
};

const isValidFileType = (validFileTypes, fileType) => {
  const isValid = validFileTypes.includes(fileType);

  if (!isValid) {
    includedInvalidFileType.value = true;
  }
};

const removeFile = (file) => {
  const index = files.value.indexOf(file);

  if (index > -1) files.value.splice(index, 1);
};

const onInputChange = (e) => {
  addFiles(e.target.files);
  e.target.value = null;
};

class UploadableFile {
  constructor(file) {
    this.file = file;
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.type = file.type;
    this.presignedUrl = "";
    this.name = file.name;
    // this.status = null;
  }
}
</script>

<template>
  <button id="show-modal" @click="showModal = true">Show Modal</button>

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
            <!-- EEDI / EEXI -->
            <div class="grid grid-cols-2">
              <div class="flex flex-col space-y-3">
                <!-- Type selection -->
                <div class="flex space-x-4">
                  <div class="flex space-x-2">
                    <input
                      type="radio"
                      id="eedi"
                      value="eedi"
                      v-model="shipIndexType"
                    />
                    <label for="eedi" class="mr-4">EEDI</label>
                  </div>
                  <div class="flex space-x-2">
                    <input
                      type="radio"
                      id="eexi"
                      value="eexi"
                      v-model="shipIndexType"
                    />
                    <label for="eexi">EEXI</label>
                  </div>
                </div>
                <!-- Value input -->
                <div class="flex border rounded-lg py-2 px-3 text-gray-900">
                  <input
                    v-model="shipIndexVal"
                    class="w-24 focus:outline-0"
                    placeholder="0"
                  />
                  <MiniUnitDisplay>g CO₂/ton.NM</MiniUnitDisplay>
                </div>
              </div>
            </div>
            <!-- Engine power limit -->
            <div class="grid grid-cols-2">
              <div class="flex flex-col space-y-3">
                <!-- TODO: switch to toggle -->
                <div class="flex space-x-2">
                  <input
                    type="checkbox"
                    id="enginePowerLimited"
                    v-model="isEngineLimited"
                  />
                  <label for="enginePowerLimited"
                    >Is engine power limited?</label
                  >
                </div>
                <!-- Type selection -->
                <div v-if="isEngineLimited" class="flex space-x-4">
                  <div class="flex space-x-2">
                    <input
                      type="radio"
                      id="epl"
                      value="epl"
                      v-model="engineLimitType"
                    />
                    <label for="epl" class="mr-4">EPL</label>
                  </div>
                  <div class="flex space-x-2">
                    <input
                      type="radio"
                      id="shapoli"
                      value="shapoli"
                      v-model="engineLimitType"
                    />
                    <label for="shapoli">Shapoli</label>
                  </div>
                </div>
                <!-- Value input -->
                <div
                  v-if="isEngineLimited"
                  class="flex border rounded-lg py-2 px-3 text-gray-900"
                >
                  <input
                    v-model="engineLimitPercent"
                    class="w-24 focus:outline-0"
                    placeholder="0"
                  />
                  <MiniUnitDisplay>MCR of Main Engine</MiniUnitDisplay>
                </div>
              </div>
            </div>
            <!-- Report Type / Applicable CII -->
            <div class="grid grid-cols-2 gap-3">
              <div class="flex flex-col space-y-3">
                <span>Report Type:</span>
                <!-- Report Type selection -->
                <div class="flex space-x-4">
                  <div
                    class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
                    :class="
                      reportTypes.includes('imodcs')
                        ? 'border border-gradientblue bg-paleblue'
                        : ''
                    "
                  >
                    <input
                      type="checkbox"
                      id="imodcs"
                      value="imodcs"
                      v-model="reportTypes"
                      disabled
                    />
                    <label for="imodcs" class="mr-4">IMO DCS</label>
                  </div>
                  <div
                    class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
                    :class="
                      reportTypes.includes('eumrv')
                        ? 'border border-gradientblue bg-paleblue'
                        : ''
                    "
                  >
                    <input
                      type="checkbox"
                      id="eumrv"
                      value="eumrv"
                      v-model="reportTypes"
                    />
                    <label for="eumrv">EU MRV</label>
                  </div>
                </div>
              </div>
              <div class="flex flex-col space-y-3">
                <span>Applicable CII:</span>
                <!-- Applicable CII selection -->
                <div class="flex space-x-4">
                  <div
                    class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
                    :class="
                      applicableCII === 'aer'
                        ? 'border border-gradientblue bg-paleblue'
                        : ''
                    "
                  >
                    <input
                      type="radio"
                      id="aer"
                      value="aer"
                      v-model="applicableCII"
                    />
                    <label for="aer" class="mr-4">AER</label>
                  </div>
                  <div
                    class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
                    :class="
                      applicableCII === 'cgdist'
                        ? 'border border-gradientblue bg-paleblue'
                        : ''
                    "
                  >
                    <input
                      type="radio"
                      id="cgdist"
                      value="cgdist"
                      v-model="applicableCII"
                    />
                    <label for="cgdist">cgDIST</label>
                  </div>
                </div>
              </div>
            </div>
            <!--CII for trial purposes -->
            <div class="flex flex-col space-y-3">
              <div>
                <span>CII for trial purposes </span>
                <span class="text-gray-500">(Optional):</span>
              </div>
              <!-- Report Type selection -->
              <div class="flex space-x-4">
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
                  :class="
                    ciiTrials.includes('eepi')
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input
                    type="checkbox"
                    id="eepi"
                    value="eepi"
                    v-model="ciiTrials"
                  />
                  <label for="eepi" class="mr-4">EEPI</label>
                </div>
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
                  :class="
                    ciiTrials.includes('cbdist')
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input
                    type="checkbox"
                    id="cbdist"
                    value="cbdist"
                    v-model="ciiTrials"
                  />
                  <label for="cbdist">cbDIST</label>
                </div>
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
                  :class="
                    ciiTrials.includes('cidist')
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input
                    type="checkbox"
                    id="cidist"
                    value="cidist"
                    v-model="ciiTrials"
                  />
                  <label for="cidist">cIDIST</label>
                </div>
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
                  :class="
                    ciiTrials.includes('eeoi')
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input
                    type="checkbox"
                    id="eeoi"
                    value="eeoi"
                    v-model="ciiTrials"
                  />
                  <label for="eeoi">EEOI</label>
                </div>
              </div>
            </div>
            <div class="flex flex-col space-y-3">
              <span>IMO DCS</span>
              <!-- IMO DCS method  selection -->
              <div class="flex space-x-4">
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
                  :class="
                    IMODCSMethod === '1'
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input type="radio" id="1" value="1" v-model="IMODCSMethod" />
                  <div class="flex flex-col">
                    <label for="1" class="mr-4">Method 1</label>
                    <span class="text-gray-500 text-12"
                      >Bunker delivery notes (BDN)</span
                    >
                  </div>
                </div>
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
                  :class="
                    IMODCSMethod === '2'
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input type="radio" id="2" value="2" v-model="IMODCSMethod" />
                  <div class="flex flex-col">
                    <label for="2" class="mr-4">Method 2</label>
                    <span class="text-gray-500 text-12">Flow meters</span>
                  </div>
                </div>
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
                  :class="
                    IMODCSMethod === '3'
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input type="radio" id="3" value="3" v-model="IMODCSMethod" />
                  <div class="flex flex-col">
                    <label for="3" class="mr-4">Method 3</label>
                    <span class="text-gray-500 text-12"
                      >Bunker fuel tank monitoring on board</span
                    >
                  </div>
                </div>
                <div class="px-3 py-2 flex-1"></div>
              </div>
            </div>
            <div
              v-if="reportTypes.includes('eumrv')"
              class="flex flex-col space-y-3"
            >
              <span>EU MRV</span>
              <!-- EU MRV method selection -->
              <div class="flex space-x-4">
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
                  :class="
                    EUMRVMethod === 'a'
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input type="radio" id="a" value="a" v-model="EUMRVMethod" />
                  <div class="flex flex-col">
                    <label for="a" class="mr-4">Method A</label>
                    <span class="text-gray-500 text-12"
                      >BDN and periodic stocktakes of fuel tanks</span
                    >
                  </div>
                </div>
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
                  :class="
                    EUMRVMethod === 'b'
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input type="radio" id="b" value="b" v-model="EUMRVMethod" />
                  <div class="flex flex-col">
                    <label for="b" class="mr-4">Method B</label>
                    <span class="text-gray-500 text-12"
                      >Bunker fuel tank monitoring on board</span
                    >
                  </div>
                </div>
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
                  :class="
                    EUMRVMethod === 'c'
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input type="radio" id="c" value="c" v-model="EUMRVMethod" />
                  <div class="flex flex-col">
                    <label for="c" class="mr-4">Method C</label>
                    <span class="text-gray-500 text-12"
                      >Flow meters for applicable combustion processes</span
                    >
                  </div>
                </div>
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1"
                  :class="
                    EUMRVMethod === 'd'
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input type="radio" id="d" value="d" v-model="EUMRVMethod" />
                  <div class="flex flex-col">
                    <label for="d" class="mr-4">Method D</label>
                    <span class="text-gray-500 text-12"
                      >Direct CO2 emission measurements</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col space-y-3">
              <span>Fuel oil type</span>
              <!-- Fuel oil type selection -->
              <div class="grid grid-cols-4 gap-4">
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
                  :class="
                    fuelOilTypes.includes('mdomgo')
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input
                    type="checkbox"
                    id="mdomgo"
                    value="mdomgo"
                    v-model="fuelOilTypes"
                  />
                  <label for="mdomgo" class="mr-4">MDO / MGO</label>
                </div>
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
                  :class="
                    fuelOilTypes.includes('lsfo')
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input
                    type="checkbox"
                    id="lsfo"
                    value="lsfo"
                    v-model="fuelOilTypes"
                  />
                  <label for="lsfo">LSFO</label>
                </div>
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
                  :class="
                    fuelOilTypes.includes('hfo')
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input
                    type="checkbox"
                    id="hfo"
                    value="hfo"
                    v-model="fuelOilTypes"
                  />
                  <label for="hfo">HFO</label>
                </div>
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
                  :class="
                    fuelOilTypes.includes('lpgpropane')
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input
                    type="checkbox"
                    id="lpgpropane"
                    value="lpgpropane"
                    v-model="fuelOilTypes"
                  />
                  <label for="lpgpropane">LPG-Propane</label>
                </div>
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
                  :class="
                    fuelOilTypes.includes('lpgbutane')
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input
                    type="checkbox"
                    id="lpgbutane"
                    value="lpgbutane"
                    v-model="fuelOilTypes"
                  />
                  <label for="lpgbutane">LPG-Butane</label>
                </div>
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
                  :class="
                    fuelOilTypes.includes('lng')
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input
                    type="checkbox"
                    id="lng"
                    value="lng"
                    v-model="fuelOilTypes"
                  />
                  <label for="lng">LNG</label>
                </div>
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
                  :class="
                    fuelOilTypes.includes('methanol')
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input
                    type="checkbox"
                    id="methanol"
                    value="methanol"
                    v-model="fuelOilTypes"
                  />
                  <label for="methanol">Methanol</label>
                </div>
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
                  :class="
                    fuelOilTypes.includes('ethanol')
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input
                    type="checkbox"
                    id="ethanol"
                    value="ethanol"
                    v-model="fuelOilTypes"
                  />
                  <label for="ethanol">Ethanol</label>
                </div>
                <div
                  class="flex space-x-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 items-center"
                  :class="
                    fuelOilTypes.includes('others')
                      ? 'border border-gradientblue bg-paleblue'
                      : ''
                  "
                >
                  <input
                    type="checkbox"
                    id="others"
                    value="others"
                    v-model="fuelOilTypes"
                  />
                  <label for="others">Others</label>
                </div>
              </div>
              <!-- Others additional information -->
              <div
                v-if="fuelOilTypes.includes('others')"
                class="flex space-x-4"
              >
                <div class="flex flex-col">
                  <span>Name of the oil</span>
                  <input
                    v-model="otherOilName"
                    placeholder="Input oil type"
                    class="flex border rounded-lg py-2 px-3 text-gray-900"
                  />
                </div>
                <div class="flex flex-col">
                  <span>Conversion factor</span>
                  <input
                    v-model="conversionFactor"
                    placeholder="Input conversion factor"
                    class="flex border rounded-lg py-2 px-3 text-gray-900"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="flex flex-col space-y-3">
                <!-- Target CII grade selection -->
                <span>2023 Target CII Grade</span>
                <!-- Value input -->
                <div class="flex border rounded-lg py-2 px-3 text-gray-900">
                  <select
                    v-model="targetCIIGrade"
                    class="w-full flex focus:outline-0"
                    :class="targetCIIGrade === 'default' ? 'text-gray-500' : ''"
                  >
                    <option selected disabled value="default">
                      Select grade
                    </option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div v-if="pageNum === 2">
            <div class="flex flex-col space-y-12">
              <div class="flex flex-col space-y-3">
                <CustomTitle
                  :content="'EEDI / EEXI Technical File'"
                ></CustomTitle>
                <DropZone
                  class="flex drop-area border border-dashed border-sysblue-300 p-14 place-content-center rounded-lg text-16 text-gray-800 bg-gray-25"
                  @files-dropped="addFiles"
                  #default="{ dropZoneActive }"
                >
                  <span v-if="dropZoneActive">
                    <span>{{ $t("dropFileHere") }}</span>
                  </span>
                  <span v-else>
                    <div>
                      <span>{{ $t("dragAndDrop") }}</span>
                      <span class="smaller">
                        {{ $t("or") }}
                        <label for="file-input">
                          <strong class="text-sysblue-500 cursor-pointer"
                            ><u>
                              {{ $t("browseFile") }}
                            </u></strong
                          >
                        </label>
                      </span>
                    </div>

                    <div class="w-full text-center text-14">PDF</div>
                  </span>

                  <input
                    class="hidden"
                    type="file"
                    id="file-input"
                    multiple
                    @change="onInputChange"
                  />
                </DropZone>

                <ul
                  class="text-14 text-gray-700 space-y-1"
                  v-show="files.length"
                >
                  <FilePreview
                    v-for="file of files"
                    :key="file.id"
                    :file="file"
                    @remove="removeFile"
                  />
                </ul>
              </div>
              <div>
                <CustomTitle
                  :content="'Standardised Data Reporting Form (DCS for CII)'"
                ></CustomTitle>
                <span class="text-gray-500"
                  >Upload multiple files from 2020 onwards</span
                >
              </div>
              <div>
                <CustomTitle :content="'IMO DCS and Others'"></CustomTitle>
                <span class="text-gray-500"
                  >Upload multiple files from 2020 onwards</span
                >
              </div>
            </div>
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
          <GradientButton v-if="pageNum === 2" @click="uploadSettings">
            <template #content>{{ $t("completeSetup") }}</template>
          </GradientButton>
        </div>
      </template>
    </BaseModal>
  </Teleport>
</template>
