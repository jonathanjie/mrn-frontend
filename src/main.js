import { createApp } from 'vue'
import App from './App.vue'
import { createAuth0 } from '@auth0/auth0-vue'
import './index.css'
import router from './router'
import DatePicker from '@vuepic/vue-datepicker'
import { createPinia } from 'pinia'

const app = createApp(App).use(createPinia()).use(createPinia()).use(createPinia())
    .use(router)
    .use(createAuth0({
        domain: "dev-xyrhs609.eu.auth0.com",
        client_id: "hnNtLkIJBlnHLDThSL77CYTu9QEaWijN",
        redirect_uri: window.location.origin,
        audience: 'https://django-jwt-test-dan/api'
    }));

app.component('DatePicker', DatePicker);

app.mount('#app')
 