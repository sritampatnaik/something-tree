<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div class="min-h-screen bg-white">
        <header>
            <div class="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
                <div class="flex justify-start lg:w-0 lg:flex-1">
                <a href="#">
                    <span class="sr-only">Workflow</span>
                    <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                </a>
                </div>
            </div>
        </header>

        <main>
            <div>
                <div class="relative">
                    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div ref="container">
                                    <LandingCard/>
                            </div>
                    </div>
                </div>
                <MiniFooter/>
            </div>
        </main>
    </div>
</template>

<script>
// import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import LandingCard from "@/components/LandingCard"
import MiniFooter from "@/components/MiniFooter"
// import FinalCard from "@/components/FinalCard"
// import QuestionCard from "@/components/QuestionCard";
// import ResultCard from "@/components/ResultCard";
// import FinalCard from "@/components/FinalCard"

// import {
//   MenuIcon,
//   XIcon,
// } from '@heroicons/vue/outline'
// import {defineComponent,createApp} from 'vue'

export default {
    components: {
        // Popover,
        // PopoverButton,
        // PopoverPanel,
        // MenuIcon,
        // XIcon,
        LandingCard,
        MiniFooter
    }
    // computed: {
    //     // @Todo: Need another watcher to switch between questions
    //     quizStatus () {
    //         return this.$store.state.quiz.quizStatus
    //     }
    // },
    // watch: {
    //     async quizStatus() {
    //         switch(this.quizStatus) {
    //             case 1:
    //                 this.showQuestionCard()
    //                 break;
    //             case 2:
    //                 this.showResultCard()
    //                 break;
    //             case 3:
    //                 this.showFinalCard()
    //                 break;
    //             default:
    //                 this.showLandingCard()
    //         }
    //     },
    // },
    // methods : {
    //     // @Todo: Simplify code below
    //     showQuestionCard () {
    //         let questionViewContainer = this.$refs.container;
    //         if (questionViewContainer.hasChildNodes()) {
    //             questionViewContainer.innerHTML = "";
    //         }
    //         let questionView = defineComponent({
    //             extends: QuestionCard
    //         })
    //         createApp(questionView).mount(questionViewContainer)
    //     },
    //     showResultCard () {
    //         let resultViewContainer = this.$refs.container;
    //         if (resultViewContainer.hasChildNodes()) {
    //             resultViewContainer.innerHTML = "";
    //         }
    //         let resultView = defineComponent({
    //             extends: ResultCard
    //         })
    //         createApp(resultView).mount(resultViewContainer)
    //     },
    //     showLandingCard () {
    //         let landingViewContainer = this.$refs.container;
    //         if (landingViewContainer.hasChildNodes()) {
    //             landingViewContainer.innerHTML = "";
    //         }
    //         let landingView = defineComponent({
    //             extends: LandingCard
    //         })
    //         createApp(landingView).mount(landingViewContainer)
    //     },
    //     showFinalCard() {
    //         let finalViewContainer = this.$refs.container;
    //         if (finalViewContainer.hasChildNodes()) {
    //             finalViewContainer.innerHTML = "";
    //         }
    //         let finalView = defineComponent({
    //             extends: FinalCard
    //         })
    //         createApp(finalView).mount(finalViewContainer)
    //     }
    // }
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
