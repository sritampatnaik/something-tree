<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div class="min-h-screen bg-white">
        <header>
            <div class="flex justify-center items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-center md:space-x-10 lg:px-8">
                <QuizProgress/>
            </div>
        </header>

        <main>
            <div>
                <div class="relative">
                    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div ref="quizPageContainer">
                                    <QuestionCard/>
                            </div>
                    </div>
                </div>
            </div>
            <MiniFooter/>
        </main>
    </div>
</template>

<script>
import QuestionCard from "@/components/QuestionCard"
import ResultCard from "@/components/ResultCard"
import FinalCard from "@/components/FinalCard"
import QuizProgress from "@/components/QuizProgress"
import MiniFooter from "@/components/MiniFooter"

import {defineComponent,createApp} from 'vue'

export default {
    components: {
        QuestionCard,
        QuizProgress,
        MiniFooter
    },
    computed: {
        quizStatus () {
            return this.$store.state.quiz.quizStatus
        }
    },
    watch: {
        async quizStatus() {
            switch(this.quizStatus) {
                case 1:
                    this.showQuestionCard()
                    break;
                case 2:
                    this.showResultCard()
                    break;
                case 3:
                    this.showFinalCard()
                    break;
                default:
                    this.showQuestionCard()
            }
        },
    },
    methods : {
        // @Todo: Simplify code below
        showQuestionCard () {
            let questionViewContainer = this.$refs.quizPageContainer;
            if (questionViewContainer.hasChildNodes()) {
                questionViewContainer.innerHTML = "";
            }
            let questionView = defineComponent({
                extends: QuestionCard
            })
            createApp(questionView).mount(questionViewContainer)
        },
        showResultCard () {
            let resultViewContainer = this.$refs.quizPageContainer;
            if (resultViewContainer.hasChildNodes()) {
                resultViewContainer.innerHTML = "";
            }
            let resultView = defineComponent({
                extends: ResultCard
            })
            createApp(resultView).mount(resultViewContainer)
        },
        showFinalCard() {
            let finalViewContainer = this.$refs.quizPageContainer;
            if (finalViewContainer.hasChildNodes()) {
                finalViewContainer.innerHTML = "";
            }
            let finalView = defineComponent({
                extends: FinalCard
            })
            createApp(finalView).mount(finalViewContainer)
        }
    }
}
</script>
<style lang="scss">
.result-text {
    a {
        font-weight: bold;
        text-decoration: underline;
    }
}
</style>
