export const state = () => ({
    questions : null,
    quizStatus : 0,
    numberOfCategories : 0,
    categoriesArr : [],
    indexOfCurrCategory : 0,
    currQnNumber : 0,
    currCategory : '',
    currQuestion : '',
    currQuestionType : 0,
    currOptions : ''
    
})

export const mutations = {
    SET_QUESTIONS(state, payload) {
        state.questions = payload
    },
    INCREMENT_QN_NUMBER(state) {
        state.currQnNumber += 1
    }
}
export const actions = {
    startQuiz({ commit }) {
        // Change quiz status
        // Set question
        commit('INCREMENT_QN_NUMBER')
    }
    // submitAnswer({ commit, state }, payload) {
    //     // 1. Submit Answer
    //     // 2. Store Results Change Question Data
    // }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
