import { createStore, createLogger } from 'vuex'
import auth from '@/store/modules/auth'

export default createStore({
    modules: {
        auth
    },
    plugins: [createLogger()]
})
