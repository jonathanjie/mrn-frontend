import { createApp } from "vue";
import { createPinia } from "pinia";
import { createAuth0, useAuth0 } from "@auth0/auth0-vue";
import { VueQueryPlugin } from "vue-query";

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

const app = createApp(App)
  .use(i18n)
  .use(router)
  .use(
    createAuth0({
      domain: "dev-xyrhs609.eu.auth0.com",
      client_id: process.env.VUE_APP_AUTH_0_CLIENT_ID,
      redirect_uri: window.location.origin,
      audience: process.env.VUE_APP_AUTH_0_AUDEINCE,
    })
  )
  .use(createPinia().use(resetStore))
  .use(VueClickAway)
  .use(VueQueryPlugin);

vSelect.props.components.default = () => ({
  OpenIndicator: {
    render: () => h("span", "🕖"),
  },
});

app.component("DatePicker", DatePicker);
app.component("v-select", vSelect);

app.mount("#app");
