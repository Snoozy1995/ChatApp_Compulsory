import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-3-socket.io'

const vue = createApp(App)
// vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://localhost:3000'
// }))
vue.use(router)
vue.mount('#app')
