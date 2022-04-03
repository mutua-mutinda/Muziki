import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import veeValidatePlugin from './includes/validation'
import { auth } from './includes/firebase'
import Icon from './directives/icon'
import './index.css'
import './assets/main.css'

let app;

auth.onAuthStateChanged(() => {
    if(!app) {
        app = createApp(App)

        app.use(store)
        app.use(router)
        app.use(veeValidatePlugin)
        app.directive('icon', Icon)

        app.mount('#app')
    }
})

router.beforeEach((to, from, next) => {
    if (!to.matched.some(record => record.meta.requiresAuth)) {
        next();
        return;
    }
    if(!store.state.userLoggedIn ) {
        next({name: "Home"})
        return;

    }
    else {
        next();
        return;
    }
})


