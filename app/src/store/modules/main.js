export const state = () => ({
    questions : null,
    numberOfCategories : 0,
    categoriesArr : [],
    indexOfCurrCategory : 0,
    quizStatus : 0,
    currCategory : '',
    currQuestion : '',
    currQuestionType : 0,
    currOptions : ''
    
})

export const mutations = {
    SET_QUESTIONS(state, payload) {
        state.questions = payload
    },
    UPDATE_QUIZ_STATUS(state, payload) {
        state.quizStatus = payload
    }
}
export const actions = {
    startQuiz({ commit }) {
        // Change quiz status
        // Set question
        commit('UPDATE_QUIZ_STATUS', 1)
    },
    submitAnswer({ commit }, payload) {
        // 1. Submit Answer
        // 2. Store Results Change Question Data
        console.log(payload)
        commit('UPDATE_QUIZ_STATUS', 2)
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
