import { createStore, createLogger } from 'vuex'
import auth from '@/store/modules/auth'
import billing from '@/store/modules/billing'

export default createStore({
    modules: {
        auth,
        billing
    },
    plugins: [createLogger()]
})
