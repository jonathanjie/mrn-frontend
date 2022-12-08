<template>
    <div class="grid grid-cols-1 bg-white rounded-lg p-5 gap-4 shadow-card mb-5">
        <span class="text-gray-700 text-20">{{ $t("receivedBunkerDetail") }}</span>

        <div class="flex items-center">
            <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
            <span class="text-blue-700 text-16">{{ $t("uploadBunkerDeliveryNote") }}</span>
        </div>

        <!-- Upload delivery note section --> 
        <DropZone class="flex drop-area border border-dashed border-sysblue-300 p-14 place-content-center rounded-lg text-16 text-gray-800 bg-gray-25" @files-dropped="addFiles" #default="{ dropZoneActive }">
            <span v-if="dropZoneActive">
                <span>{{ $t("dropFileHere") }}</span>
            </span>
            <span v-else>
                <span>{{ $t("dragAndDrop") }}</span>
                <span class="smaller">
                    {{ $t('or') }} 
                    <label for="file-input">
                        <strong class="text-sysblue-500 cursor-pointer"><u>
                            {{ $t("browseFile") }}
                        </u></strong>
                    </label> 
                </span>
            </span>

            <input class="hidden" type="file" id="file-input" multiple @change="onInputChange" />
        </DropZone>

        <ul class="text-14 text-gray-700 space-y-1" v-show="files.length">
            <FilePreview v-for="file of files" :key="file.id" :file="file" @remove="removeFile"/>
        </ul>

        <div class="mt-6 flex items-center">
            <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
            <span class="text-blue-700 text-16">{{ $t("deliveredOil") }}</span>
        </div>

        <div class="grid grid-cols-4 border text-14 mb-6">
            <div class="col-span-1 text-blue-700 p-3 border-b border-r bg-gray-50">{{ $t("productType") }}</div>
            <select v-model="data.oil" 
                class="col-span-3 p-3 text-gray-700 border-b" 
                :class="data.oil === 'default' ? 'text-gray-400' : 'text-gray-700'"
            >
                <option selected disabled value="default">{{ $t("selectionOfOil") }}</option>
            </select>

            <div class="flex col-span-1 text-blue-700 p-3 border-r border-b bg-gray-50">
                {{ $t("quantity") }}
                <MiniUnitDisplay>MT.LTR</MiniUnitDisplay>
            </div>
            <input v-model="data.quantity" 
                @keypress="preventNaN($event, data.quantity)" 
                placeholder="000.00" 
                class="col-span-3 p-3 pl-4 border-b text-gray-700 focus:outline-0"
            />

            <div class="flex col-span-1 text-blue-700 p-3 border-r border-b bg-gray-50">
                {{ $t("densityAt15") }}
                <MiniUnitDisplay>KG/M<sup>3</sup></MiniUnitDisplay>
            </div>
             <input v-model="data.density" 
                @keypress="preventNaN($event, data.density)" 
                placeholder="000.00" 
                class="col-span-3 p-3 pl-4 border-b text-gray-700 focus:outline-0"
            />

            <div class="col-span-1 text-blue-700 p-3 border-r border-b bg-gray-50">
                {{ $t("sgAt15") }}
            </div>
             <input v-model="data.sg" 
                @keypress="preventNaN($event, data.sg)" 
                placeholder="000.00" 
                class="col-span-3 p-3 pl-4 border-b text-gray-700 focus:outline-0"
            />

            <div class="flex col-span-1 text-blue-700 p-3 border-r border-b bg-gray-50">
                {{ $t("viscosityAt15") }}
                <MiniUnitDisplay>cSt</MiniUnitDisplay>
            </div>
             <input v-model="data.viscosity" 
                @keypress="preventNaN($event, data.viscosity)" 
                placeholder="000.00" 
                class="col-span-3 p-3 pl-4 border-b text-gray-700 focus:outline-0"
            />

            <div class="flex col-span-1 text-blue-700 p-3 border-r border-b bg-gray-50">
                {{ $t("flashPoint") }}
                <MiniUnitDisplay>°C</MiniUnitDisplay>
            </div>
             <input v-model="data.flash_point" 
                @keypress="preventNaN($event, data.flash_point)" 
                placeholder="000.00" 
                class="col-span-3 p-3 pl-4 border-b text-gray-700 focus:outline-0"
            />

            <div class="flex col-span-1 text-blue-700 p-3 border-r bg-gray-50">
                {{ $t("sulfurContent") }}
                <MiniUnitDisplay>%M/M</MiniUnitDisplay>
            </div>
            <input v-model="data.sulfur_content" 
                @keypress="preventNaN($event, data.sulfur_content)" 
                placeholder="000.00" 
                class="col-span-3 p-3 pl-4 text-gray-700 focus:outline-0"
            />
        </div>

        <div class="flex items-center">
            <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
            <span class="text-blue-700 text-16">{{ $t("sampleSeatingNo") }}</span>
        </div>

        <div class="grid grid-cols-8 border text-14">
            <div class="col-span-2 text-blue-700 border-r p-3 bg-gray-50">{{ $t("marpol") }}</div>
            <input v-model="data.marpol1" 
                @keypress="preventNaN($event, data.marpol1)" 
                placeholder="000.00" 
                class="col-span-3 p-3 pl-4 border-r text-gray-700 focus:outline-0"
            />
            <input v-model="data.marpol2" 
                @keypress="preventNaN($event, data.marpol2)" 
                placeholder="000.00" 
                class="col-span-3 p-3 pl-4 text-gray-700 focus:outline-0"
            />

            <div class="col-span-2 text-blue-700 p-3 border-r border-t bg-gray-50">{{ $t("ship") }}</div>
            <input v-model="data.ship1" 
                @keypress="preventNaN($event, data.ship1)" 
                placeholder="000.00" 
                class="col-span-3 p-3 pl-4 border-r border-t text-gray-700 focus:outline-0"
            />
            <input v-model="data.ship2" 
                @keypress="preventNaN($event, data.ship2)" 
                placeholder="000.00" 
                class="col-span-3 p-3 pl-4 border-t text-gray-700 focus:outline-0"
            />

            <div class="col-span-2 text-blue-700 p-3 border-r border-t bg-gray-50">{{ $t("barge") }}</div>
            <input v-model="data.barge1" 
                @keypress="preventNaN($event, data.barge1)" 
                placeholder="000.00" 
                class="col-span-3 p-3 pl-4 border-r border-t text-gray-700 focus:outline-0"
            />
            <input v-model="data.barge2" 
                @keypress="preventNaN($event, data.barge2)" 
                placeholder="000.00" 
                class="col-span-3 p-3 pl-4 border-t text-gray-700 focus:outline-0"
            />
        </div>
    </div>
</template>

<script setup>
import MiniUnitDisplay from '../../components/MiniUnitDisplay.vue'
import { preventNaN } from '../../utils/helpers.js'
import useFileList from '../../composables/file-list'
import DropZone from '../../components/DropZone.vue'
import FilePreview from '../../components/FilePreview.vue'

const { files, addFiles, removeFile } = useFileList()
const data = {
    "oil": 'default',
    "density": '',
    "sg": '',
    "viscosity": '',
    "flash_point": '',
    "sulfur_content": '',
    "marpol1": '',
    "marpol2": '',
    "ship1": '',
    "ship2": '',
    "barge1": '',
    "barge2": '',
}

function onInputChange(e) {
    addFiles(e.target.files)
    e.target.value = null
}
</script>
