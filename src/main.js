import { createApp } from "vue";
import { createPinia } from "pinia";
import { createAuth0, useAuth0 } from "@auth0/auth0-vue";

import App from "./App.vue";
import "./index.css";
import router from "./router";
import DatePicker from "@vuepic/vue-datepicker";
import VueClickAway from "vue3-click-away";
import i18n from "./locales/i18n";
import { h } from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import resetStore from "@/plugins/resetStore";

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
  .use(i18n)
  .use(router)
  .use(
    createAuth0({
      domain: "dev-xyrhs609.eu.auth0.com",
      client_id: "hnNtLkIJBlnHLDThSL77CYTu9QEaWijN",
      redirect_uri: window.location.origin,
      audience: "https://django-jwt-test-dan/api",
    })
  )
  .use(createPinia().use(resetStore))
  .use(VueClickAway);

vSelect.props.components.default = () => ({
  OpenIndicator: {
    // TODO: replace icon as needed
    render: () => h("span", "🕖"),
  },
});

app.component("DatePicker", DatePicker);
app.component("v-select", vSelect);

app.mount("#app");
