import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import questions from './assets/data/questions.json';
store.commit('main/SET_QUESTIONS', questions)

let app = createApp(App);
app.use(store)
app.use(router)
app.mount('#app')