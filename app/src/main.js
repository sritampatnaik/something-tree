import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from '@/plugins/firebase';
import './assets/tailwind.css'

let app;


auth.onAuthStateChanged(user => {
    // store.dispatch('globals/fetchQuizAttemptsConstants');
    // store.dispatch("auth/setUserLogInState", user);
    const authUser = user
    store.commit('auth/ON_AUTH_STATE_CHANGED_MUTATION', { authUser })
    store.dispatch('auth/getCustomClaimRole')
    if (!app) {
        app = createApp(App);
        app.use(store)
        app.use(router)
        app.mount('#app')
    }
});
