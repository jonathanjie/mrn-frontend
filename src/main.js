import { createApp } from 'vue'
import App from './App.vue'
import { createAuth0 } from '@auth0/auth0-vue'
import './index.css'
import router from './router'
import Datepicker from '@vuepic/vue-datepicker'

const app = createApp(App)
    .use(router)
    .use(createAuth0({
        domain: "dev-xyrhs609.eu.auth0.com",
        client_id: "hnNtLkIJBlnHLDThSL77CYTu9QEaWijN",
        redirect_uri: window.location.origin,
        audience: 'https://django-jwt-test-dan/api'
    }));

app.component('Datepicker', Datepicker);

app.mount('#app')
 