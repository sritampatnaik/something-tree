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
        // @Todo:
        // 1. Set first question
        // 2. Change quiz status to 1
        commit('SET_QUESTION_DATA')
        commit('UPDATE_QUIZ_STATUS', 1)
    },
    submitAnswer({ commit }) {
        // @Todo:
        // 1. Submit and check answer
        // 2. If last node show result, change status to 2
        // 3. Else show next question, set next question data
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
