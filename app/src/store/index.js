import { createStore, createLogger } from 'vuex'
import quiz from '@/store/modules/quiz'

export default createStore({
    modules: {
        quiz
    },
    plugins: [createLogger()]
})
