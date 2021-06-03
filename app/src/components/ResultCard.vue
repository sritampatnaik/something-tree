<template>
    <transition appear name="fade">
        <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div class="absolute inset-0">
                <img class="h-full w-full object-cover hidden" src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100" alt="People working on laptops" />
                <div :class="'absolute inset-0 bg-' + getResultColor + '-700'" />
            </div>
            <div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 class="text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                    <span class="block text-white">{{currCategory}}</span>
                </h1>
                <h1 v-html="text" class="result-text mt-10 mx-10 text-center text-l font-medium tracking-tight sm:text-xl lg:text-2xl text-white">
                </h1>
                <div class="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                    <div class="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
                        <a @click="nextQuestion" href="#" :class="'flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-' + getResultColor + '-700 bg-white hover:bg-' + getResultColor + '-50 sm:px-8'">
                            Next question
                        </a>
                    </div>
                </div>
            </div>
            <form class="mt-5 sm:flex sm:items-center" netlify>
                <div class="w-full sm:max-w-xs">
                <label for="email" class="sr-only">Email</label>
                <input type="text" name="email" id="email" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="you@example.com" />
                </div>
                <button type="submit" class="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Save
                </button>
            </form>
        </div>
    </transition>
</template>
<script>
import store from '../store'

export default {
    name : 'ResultCard',
    computed: {
        currCategory () {
            return store.state.quiz.currCategory
        },
        score () {
            return store.state.quiz.currResultScore
        },
        text () {
            return store.state.quiz.currResultHTML
        },
        getResultColor () {
            let color
             switch(this.score) {
                case 0:
                    color = 'red'
                    break;
                case 0.5:
                    color = 'yellow'
                    break;
                case 1:
                    color = 'green'
                    break;
                default:
                    color = 'green'
            }
            return color;
        }
    },
    methods : {
        nextQuestion () {
            store.dispatch("quiz/nextTopLevelQuestion")
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