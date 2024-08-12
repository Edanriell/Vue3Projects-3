import { createApp } from "vue";
import App from "./App.vue";
import Modals from "./plugins/modals";

createApp(App)
	.use(Modals as any)
	.mount("#app");
