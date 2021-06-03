<template>
    <transition appear name="fade">
    <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
        <div class="absolute inset-0">
        <img class="h-full w-full object-cover" src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100" alt="People working on laptops" />
        <div class="absolute inset-0 bg-indigo-700 mix-blend-multiply" />
        </div>
        <div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
        <h1 class="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span class="block text-white">Check out your final</span>
            <span class="block text-indigo-200">ML Test Score</span>
        </h1>
        <h1 class="text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span class="block text-white">Overall score:</span>
            <span class="block text-indigo-300">{{overallScore}}</span>
        </h1>
        </div>
    </div>
    </transition>
</template>
<script>
import store from '../store'

export default {
    name : 'ResultCard',
    computed: {
        overallScore () {
            return store.state.quiz.aggregateScore
        },
        categoryScores () {
            return store.state.quiz.categoryScores
        },
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