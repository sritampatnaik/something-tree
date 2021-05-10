import { createStore, createLogger } from 'vuex'
import auth from '@/store/modules/auth'
import billing from '@/store/modules/billing'
import profile from '@/store/modules/profile'

export default createStore({
    modules: {
        auth,
        billing,
        profile
    },
    plugins: [createLogger()]
})
