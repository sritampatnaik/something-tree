import jsonpath from 'jsonpath'

const StatusEnum = {"LANDING": 0, "QUESTION": 1, "RESULT": 2, "FINAL": 3}
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
            state.aggregateScore += scoreData.score
            commit('SET_SCORE_DATA', scoreData)
            commit('UPDATE_QUIZ_STATUS', StatusEnum.RESULT)
        }
    },
    nextTopLevelQuestion({ commit, state }) {
        const nextState = computeNext(state.quizData, state.currentPath)
        if (!nextState.quizOver) {
            state.currentPath = nextState.path
            const questionData = computeQuestionData(state.quizData, state.currentPath);
            commit('SET_QUESTION_DATA', questionData)
            commit('UPDATE_QUIZ_STATUS', StatusEnum.QUESTION)
        } else {
            commit('UPDATE_QUIZ_STATUS', StatusEnum.FINAL)
        }
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

/**
 * 
 * @param {*} quizData 
 * @param {*} questionPath 
 * @returns an object with the next path and a boolean indicating quiz over.
 */
function computeNext(quizData, questionPath) {
    let categoryIndex = questionPath[1]
    let isNextItemQuestionIndex = false
    let categoryQuestionsLength = 0
    const result = []
    for (const item of questionPath) {
        if (isNextItemQuestionIndex) {
            const nextIndex = item + 1
            if (nextIndex < categoryQuestionsLength) {
                result.push(nextIndex, 'question')
                break;
            } else {
                const nextCategoryIndex = categoryIndex + 1;
                console.log(nextCategoryIndex)
                console.log(quizData)
                if (nextCategoryIndex < quizData.length) {
                    result[1] = nextCategoryIndex
                    result.push(0,'question');
                    break;
                } else {
                    console.log('Quiz is over')
                    return {path: [], quizOver: true};
                }
            }
        } else if (item === 'questions') {
            result.push(item)
            isNextItemQuestionIndex = true
            const categoryQuestionsPath = jsonpath.stringify(result) + '.*'
            const categoryQuestions = jsonpath.query(quizData, categoryQuestionsPath)
            categoryQuestionsLength = categoryQuestions.length
        } else {
            result.push(item)
        }
    }
    return {path: result, quizOver: false};
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
