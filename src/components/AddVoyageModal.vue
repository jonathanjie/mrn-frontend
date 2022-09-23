<template>
    <div>
      <div v-if="showModal" class="bg-slate-400 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center flex">
        <div class="relative my-6 mx-auto w-2/6">
          <!--content-->
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
            <!--header-->
            <div class="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 class="text-3xl font-semibold">
                General Info
              </h3>
              <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold" v-on:click="toggleModal()">
                <span class="h-6 w-6 text-3xl block">
                  x
                </span>
              </button>
            </div>
            <!--body-->
            <div class="relative p-6 space-y-6 flex-auto w-full text-sm">
                <div>
                    <p class="leading-relaxed mb-2 text-gray-700">Vessel name</p>
                    <input class="w-full bg-gray-50 px-3 py-3 rounded border border-gray-300 text-gray-500" :disabled="disabled" v-model="message" :placeholder="vesselname">
                </div>
                <div>
                    <p class="leading-relaxed mb-2 text-gray-700">IMO no.</p>
                    <input class="w-full bg-gray-50 px-3 py-3 rounded border border-gray-300 text-gray-500" :disabled="disabled" v-model="message" :placeholder="imo"/>
                </div>
                <div>
                    <p class="leading-relaxed mb-2 text-gray-700">Fuel option</p>
                    <select class="w-full bg-gray-0 px-3 py-3 rounded border border-gray-300 text-gray-500" v-model="selected">
                        <option disabled value="">Please select one</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                    </select>
                    <!-- TODO: may implement external library for select for aesthetic improvement -->
                </div>
            </div>
            <!--footer-->
            <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b space-x-3">
              <CustomButton class="px-6 py-3 text-sm  mr-1 mb-1" type="button" v-on:click="toggleModal()">
                <template v-slot:content>Cancel</template> 
              </CustomButton>
              <GradientButton class="px-6 py-2 text-sm mr-1 mb-1" type="button" v-on:click="toggleModal()">
                <!-- TODO: need alternate function for saving changes to backend -->
                <template v-slot:content>Save Changes</template> 
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showModal" class="opacity-80 fixed inset-0 z-40 bg-filtergray"></div>
    </div>
</template>
  
<script>
import GradientButton from './/GradientButton.vue'
import CustomButton from './/CustomButton.vue'

export default {
    name: "large-modal",
    props: [
        'vesselname', 
        'imo'
    ],
    data() {
      return {
        showModal: false,
        disabled: true // TODO: this value needs to be triggered by backend logic
      }
    },
    methods: {
      toggleModal: function(){
        this.showModal = !this.showModal;
      }
    },
    components: {
        GradientButton,
        CustomButton,
    },
  }
  </script>