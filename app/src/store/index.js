import { createStore, createLogger } from 'vuex'
import main from '@/store/modules/main'

export default createStore({
    modules: {
        main
    },
    plugins: [createLogger()]
})
