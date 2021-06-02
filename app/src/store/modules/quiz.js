import jsonpath from 'jsonpath'

const StatusEnum = {"LANDING": 0, "QUESTION": 1, "RESULT": 2}
Object.freeze(StatusEnum);

export const state = () => ({
    quizData : null,
    quizStatus: StatusEnum.LANDING,
    currCategory : '',
    currQuestion : '',
    currOptions : '',
    currResultScore : '',
    currResultHTML : '',
    categoryScore: 0,
    aggregateScore: 0,
    currentPath: []
})

const QUIZ_START_PATH = '$[0].category.questions[0].question'

export const mutations = {
    SET_QUESTIONS(state, payload) {
        state.quizData = payload
        state.currentPath = jsonpath.paths(payload, QUIZ_START_PATH, 1)[0]
    },
    UPDATE_QUIZ_STATUS(state, payload) {
        state.quizStatus = payload
    },
    SET_QUESTION_DATA(state, questionData) {
        state.currCategory = questionData.categoryTitle
        state.currQuestion = questionData.questionText
        state.currOptions = questionData.options
    },
    SET_SCORE_DATA(state, scoreData) {
        state.currResultScore = scoreData.score
        state.currResultHTML = scoreData.resultHTML
    },
}

export const actions = {
    startQuiz({ commit, state }) {
        const questionData = computeQuestionData(state.quizData, state.currentPath);
        commit('SET_QUESTION_DATA', questionData)
        commit('UPDATE_QUIZ_STATUS', StatusEnum.QUESTION)
    },
    submitAnswer({ commit , state }, selectionText) {
        const selectedIndex = state.currOptions.findIndex(o => o.text === selectionText)
        const selectedOption = state.currOptions[selectedIndex]
        if ('question' in selectedOption) {
            state.currentPath.push('options', selectedIndex, 'question');
            const questionData = computeQuestionData(state.quizData, state.currentPath);
            commit('SET_QUESTION_DATA', questionData)
        } else if ('result' in selectedOption) {
            state.currentPath.push('options', selectedIndex, 'result');
            let scoreData = computeScoreData(state.quizData, state.currentPath)
            commit('SET_SCORE_DATA', scoreData)
            commit('UPDATE_QUIZ_STATUS', StatusEnum.RESULT)
        }
    },
    nextTopLevelQuestion({ commit, state }) {
        state.currentPath = computeNextTopLevelQuestionPath(state.currentPath)
        const questionData = computeQuestionData(state.quizData, state.currentPath);
        commit('SET_QUESTION_DATA', questionData)
        commit('UPDATE_QUIZ_STATUS', StatusEnum.QUESTION)
    }
}

/**
 * 
 * @param {*} quizData 
 * @param {*} path 
 * @returns An object with categoryTitle, questionText, and options.
 */
function computeQuestionData(quizData, path) {
    const questionPathStr = jsonpath.stringify(path)
    const questions = jsonpath.query(quizData, questionPathStr, 1)
    const categoryTitlePath = jsonpath.stringify(createCategoryTitlePath(path))
    const categoryTitles = jsonpath.query(quizData, categoryTitlePath, 1)
    if (questions.length > 0 && categoryTitles.length > 0) {
        return {
            categoryTitle: categoryTitles[0],
            questionText: questions[0].text,
            options: questions[0].options,
        };
    }

    return {
        categoryTitle: "Something went wrong",
        questionText: "We apologise for the incovenience",
        options: [],
    }
}

function createCategoryTitlePath(questionPath) {
    const result = []
    for (const item of questionPath) {
        if (item == 'category') {
            result.push('category', 'title');
            break;
        } else {
            result.push(item);
        }
    }
    return result;
}

function computeNextTopLevelQuestionPath(questionPath) {
    // TODO: Check if category is out of questions.
    // TODO: Check if entire quiz is over.
    let isNextItemQuestionIndex = false
    const result = []
    for (const item of questionPath) {
        if (isNextItemQuestionIndex) {
            const nextIndex = item + 1
            result.push(nextIndex, 'question')
            break;
        } else if (item === 'questions') {
            result.push(item)
            isNextItemQuestionIndex = true
        } else {
            result.push(item)
        }
    }
    return result
}

function computeScoreData(quizData, path) {
    const pathStr = jsonpath.stringify(path)
    const results = jsonpath.query(quizData, pathStr, 1)
    if (results.length > 0) {
        return {
            score: results[0].score,
            resultHTML: results[0].text,
        };
    }

    return {
        score: 0,
        resultHTML: '<p>Oops! Something went wrong</p>'
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
