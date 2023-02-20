import { createApp } from "vue";
import { createPinia } from "pinia";

// A bit dirty hack, to make mande work without CORS necessary
import { defaults } from "mande";
defaults.headers = {};

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
