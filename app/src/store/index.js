import { createStore, createLogger } from 'vuex'
import quiz from '@/store/modules/quiz'
import contact from '@/store/modules/contact'

export default createStore({
    modules: {
        quiz,
        contact
    },
    plugins: [createLogger()]
})
