<template>
    <transition appear name="fade">
    <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
        <div class="absolute inset-0">
        <img class="h-full w-full object-cover" src="https://images.unsplash.com/photo-1561816273-56c6232d3990?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80" alt="Dashboard" />
        <div class="absolute inset-0 bg-indigo-700 mix-blend-multiply" />
        </div>
        <div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
        <h1 class="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span class="block text-white">Evaluate your ML system with</span>
            <span class="block text-indigo-200">ML Test Score</span>
        </h1>
        <p class="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-100 sm:max-w-3xl font-semibold">
            Practitioners at Google have published 
            <a href="https://storage.googleapis.com/pub-tools-public-publication-data/pdf/aad9f93b86b7addfea4c419b9100c6cdd26cacea.pdf"
               target="_blank">
                The ML Test Score: A Rubric for ML Production Readiness and Technical Debt Reduction
            </a>
                with a comprehensive checklist, scoring system and a roadmap for improving production ML systems.
                <br><br>
                The scoring is across 4 categories -<br>Features and Data, Model Development, ML Infrastructure and Monitoring.
                <br>
                Find out how production ready your system is:
        </p>
        <div class="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div class="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
            <button @click="startQuiz" class="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8">
                Start Questionnaire
            </button>
            </div>
        </div>
        </div>
    </div>
    </transition>
</template>
<script>
export default {
    methods : {
        async startQuiz () {
            await this.$store.dispatch("quiz/startQuiz")
            this.$router.push({ name: 'Quiz' })

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
a {
        font-weight: bold;
        text-decoration: underline;
    }
</style>