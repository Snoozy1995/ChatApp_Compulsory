import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Menubar from 'primevue/menubar';

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);

app.component("InputText",InputText);
app.component("Checkbox",Checkbox);
app.component("Button",Button);
app.component("Menubar",Menubar);

app.mount("#app");
