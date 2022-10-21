<template>
    <div class="flex">
        <img src="@/assets/login.svg" class="max-h-screen"/>
        <div class="flex flex-col place-content-center ml-32 mr-auto">
            <span class="text-blue-700 text-[30px] pb-2">Sign in to your account</span>
            <span class="text-gray-600 text-[18px] pb-8">Welcome back! Please login with the button below.</span>
            <GradientButton @click="login" class="w-full h-12 items-center mb-44">
                <template v-slot:content>Sign In</template> 
            </GradientButton>
        </div>
    </div>
    
    <!-- <div class="flex bg-gray-50 h-full"> -->
    <!-- </div>   -->
</template>
  
<script>
import { useAuth0 } from '@auth0/auth0-vue'
import GradientButton from '@/components/GradientButton.vue';

export default {
    components: {GradientButton},
    setup() {
        const { loginWithRedirect, user, getAccessTokenSilently } = useAuth0();
        
        return {
        login: () => {
            loginWithRedirect();
            // loginWithRedirect({
            //     appState: { target: '/' }
            // })
        },
        //   doSomethingWithToken: async() => {
        //     const token = await getAccessTokenSilently();
        //     const response = await fetch('https://django-jwt-test-dan/api/posts', {
        //       headers: {
        //         Authorization: 'Bearer ' + token
        //       }
        //     });
        //     // const data = await response.json();
        //   },
        };
    },
}
</script>
  