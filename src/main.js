import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import { createAuth0, useAuth0 } from '@auth0/auth0-vue'

import App from './App.vue'
import './index.css'
import router from './router'
import DatePicker from '@vuepic/vue-datepicker'

// TODO: fix router for custom login; typeof useAuth0 is undefined after initialization
// router.beforeEach(async (to, from) => {
//     const publicPages = ['/login'];
//     const authRequired = !publicPages.includes(to.path);
//     const isAuthenticated = false;

//     console.log("Route from to ", from, to)

//     console.log('typeof', typeof useAuth0())

//     // before creating auth0 instance in app
//     if (typeof useAuth0() != 'undefined') {
//         console.log('update value' )
//         isAuthenticated = useAuth0().isAuthenticated;
//     }
    
//     if (authRequired && !isAuthenticated) {
//         console.log('REDIRECTED TO LOGIN',isAuthenticated )
//         return '/login';
//     }
    
//   })
   
const app = createApp(App)
    .use(router)
    .use(createAuth0({
        domain: "dev-xyrhs609.eu.auth0.com",
        client_id: "hnNtLkIJBlnHLDThSL77CYTu9QEaWijN",
        redirect_uri: window.location.origin,
        audience: 'https://django-jwt-test-dan/api'
    }))
    // .use(createPinia());

app.component('DatePicker', DatePicker);

app.mount('#app')
