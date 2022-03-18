import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import PanelMenu from "primevue/panelmenu";
import Divider from "primevue/divider";
import BadgeDirective from 'primevue/badgedirective';

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);

app.directive('badge', BadgeDirective);

app.component("InputText", InputText);
app.component("Checkbox", Checkbox);
app.component("Button", Button);
app.component("Menubar", Menubar);
app.component("PanelMenu", PanelMenu);
app.component("Divider",Divider);

app.mount("#app");