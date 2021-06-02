export const state = () => ({
    questions : null,
    numberOfCategories : 0,
    categoriesArr : [],
    indexOfCurrCategory : 0,
    quizStatus : 0,
    currCategory : '',
    currQuestion : '',
    currQuestionType : 0,
    currOptions : '',
    currResultScore : '',
    currResultHTML : ''
    
})

export const mutations = {
    SET_QUESTIONS(state, payload) {
        state.questions = payload
    },
    UPDATE_QUIZ_STATUS(state, payload) {
        state.quizStatus = payload
    },
    SET_QUESTION_DATA(state) {
        state.currCategory = state.questions[0]["category"]["title"]
        state.currQuestion = state.questions[0]["category"]["questions"][0]["question"]["text"]
        state.currOptions = state.questions[0]["category"]["questions"][0]["question"]["options"]
    },
    SET_SCORE_DATA(state) {
        state.currResultScore = state.questions[0]["category"]["questions"][0]["question"]["options"][0]["question"]["options"][1]["result"]["score"]
        state.currResultHTML = state.questions[0]["category"]["questions"][0]["question"]["options"][0]["question"]["options"][1]["result"]["text"]
    },
}
export const actions = {
    startQuiz({ commit }) {
        // 1. Set question
        // 2. Change quiz status
        commit('SET_QUESTION_DATA')
        commit('UPDATE_QUIZ_STATUS', 1)
    },
    submitAnswer({ commit }) {
        // 1. Submit Answer
        // 2. Store Results Change Question Data
        commit('SET_SCORE_DATA')
        commit('UPDATE_QUIZ_STATUS', 2)
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
