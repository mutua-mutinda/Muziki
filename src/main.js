import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import veeValidatePlugin from './includes/validation'
import './index.css'
import './assets/main.css'

let app = createApp(App)

app.use(store)
app.use(router)
app.use(veeValidatePlugin)

app.mount('#app')
