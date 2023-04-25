import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(Toast);
app.mount("#app");
