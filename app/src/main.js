import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import questions from './assets/data/questions.json';

store.commit('quiz/SET_INITIAL_STATE', questions)

window.addEventListener("popstate", function(event) {
    console.log(event);
    if (event.state && typeof(event.state) === 'string') {
        try {
            const stateObj = JSON.parse(event.state)
            if (stateObj.tag === 'QUIZ_STATE') {
                console.log('Trying to go back');
                store.commit('quiz/SET_QUIZ_STATE', event.state);
            }
        } catch(e) {
            //
        }
    }
});

let app = createApp(App);
app.use(store)
app.use(router)
app.mount('#app')