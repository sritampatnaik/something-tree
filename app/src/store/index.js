import { createStore, createLogger } from 'vuex'

export default createStore({
    modules: {
        main
    },
    plugins: [createLogger()]
})
