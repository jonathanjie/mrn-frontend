<template>
  <div class="flex">
    <img src="@/assets/login.svg" class="max-h-screen" />
    <div class="flex flex-col place-content-center ml-32 mr-auto">
      <span class="text-blue-700 text-[30px] pb-2">{{
        $t("signInToYourAccount")
      }}</span>
      <span class="text-gray-600 text-[18px] pb-8">{{
        $t("welcomeBack")
      }}</span>
      <GradientButton @click="login" class="w-full h-12 items-center mb-44">
        <template v-slot:content>{{ $t("signIn") }}</template>
      </GradientButton>
    </div>
  </div>
</template>

<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import GradientButton from "@/components/Buttons/GradientButton.vue";

const { loginWithRedirect, user, getAccessTokenSilently } = useAuth0();

const login = () => {
  loginWithRedirect({
    authorizationParams: {
      redirect_url: "http://localhost:8080/my-vessels",
    },
  });
};

//   doSomethingWithToken: async() => {
//     const token = await getAccessTokenSilently();
//     const response = await fetch('https://django-jwt-test-dan/api/posts', {
//       headers: {
//         Authorization: 'Bearer ' + token
//       }
//     });
//     // const data = await response.json();
//   },
</script>
