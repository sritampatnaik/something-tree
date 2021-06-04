<template>
    <transition appear name="fade">
        <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div class="absolute inset-0">
                <img class="h-full w-full object-cover hidden" src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100" alt="People working on laptops" />
                <div class="absolute inset-0 bg-indigo-700" />
            </div>
            <div class="relative">
                <div class="bg-indigo-900">
                    <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                        <div class="flex items-center justify-between flex-wrap">
                        <div class="w-0 flex-1 flex items-center">
                            <p class="ml-3 font-medium text-white truncate">
                            <span class="md:hidden">
                                {{currCategory}}
                            </span>
                            <span class="hidden md:inline">
                               {{currCategory}} 
                            </span>
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 pt-8 pb-16 sm:px-6 sm:pb-24 sm:pt-16 lg:pt-16 lg:pb-32 lg:px-8">
                    <h1 class="mt-10 mx-10 text-center text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
                        <span class="text-white" v-html="question"></span>
                    </h1>
                    <div class="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                        <div :class="'space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-' + options.length + ' sm:gap-5'">
                            <button v-for="o in options" @click="submitAnswer(o.text)" :key="o.message" class="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8">
                                {{o.text}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import store from '../store'

export default {
    name : 'QuestionCard',
    computed: {
        currCategory () {
            return store.state.quiz.currCategory
        },
        question () {
            return store.state.quiz.currQuestion
        },
        options () {
            return store.state.quiz.currOptions
        }
    },
    methods : {
        submitAnswer (payload) {
            console.log(payload)
            store.dispatch("quiz/submitAnswer", payload)
        }
    }
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease-in;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>