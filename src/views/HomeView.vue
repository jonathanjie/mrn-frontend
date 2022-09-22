<template>
  <div class="flex bg-bggray h-full">
    <GradientButton>
      <template v-slot:icon>
        <img src="@/assets/icons/upload.svg" class="h-5 w-5 mr-2"/>
      </template>
      <template v-slot:content>Upload Noon Report</template>  
    </GradientButton>
  </div>  
</template>

<script>
import GradientButton from '../components/GradientButton.vue'

export default {
  name: 'HomeView',
  components: {
    GradientButton
}
}
</script>
