// @ts-ignore
import App from './App.vue'
import { createApp } from 'vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'

const root = createApp(App)
registerGlobalComponents(root)

root
  .use(router, VueSweetalert2)
  .mount('#app')
