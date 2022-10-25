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
            <div class="relative p-6 space-y-6 flex-auto w-full text-14">
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
              <CustomButton class="px-6 py-3 text-14  mr-1 mb-1" type="button" v-on:click="toggleModal()">
                <template v-slot:content>Cancel</template> 
              </CustomButton>
              <GradientButton class="px-6 py-2 text-14 mr-1 mb-1" type="button" v-on:click="addVoyage({vesselname, imo})">
                <!-- TODO: need alternate function for saving changes to backend -->
                <template v-slot:content>Save Changes</template> 
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showModal" class="opacity-80 fixed inset-0 z-40 bg-gray-900"></div>
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
      },
      addVoyage: function(voyageData){
        // this.showModal = !this.showModal;
        // const DUMMY_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjYxbl96VlI1WmFoZ0hLcy1QOEx5MyJ9.eyJpc3MiOiJodHRwczovL2Rldi14eXJoczYwOS5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjM1MGUzZWY2MmNiNTRiMmU5MTcwYjI0IiwiYXVkIjpbImh0dHBzOi8vZGphbmdvLWp3dC10ZXN0LWRhbi9hcGkiLCJodHRwczovL2Rldi14eXJoczYwOS5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjY2MjQ5MzIzLCJleHAiOjE2NjYzMzU3MjMsImF6cCI6ImhuTnRMa0lKQmxuSExEVGhTTDc3Q1lUdTlRRWFXaWpOIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.hMXcvjne_ig6e0_BQbA2vNhxm_cZICEPPZJn9xohGeC0tk6JtzLUr6uRn7gPSuj0nknOx5CadpQkUzFvrK21EC8aF3IixF7-HfyEuq3b2Grc1GgEH-B6kI5ckKf7A87ADYkmSfudDQm04kSx8oAdJGesMtRn0zraXn4nwVKweYEYIXIa6eB9VHMon05GSI7mrknAbHRAjcYMUmhJ1L4TafAonK-SUe4PUQJyniYDCleeA7Bmm-IgychhG7x6szO2Duk6AZxfoXn-QRjv2zVXTh63_9r391N8MAx3gF-qF780Y4tVonZGbHXeHw2yJyGsJC7DCE98R1ddUKw9LCcuZA"
        const DUMMY_TOKEN = localStorage.getItem('jwt');
        const response = fetch('https://testapi.marinachain.io/marinanet/voyages/', {
            headers: {
                Authorization: 'Bearer ' + DUMMY_TOKEN,
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(voyageData)
        });
        console.log(response);
      }
    },
    components: {
        GradientButton,
        CustomButton,
    },
  }
</script>
