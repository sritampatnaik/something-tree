<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div class="min-h-screen bg-white">
        <header>
            <Popover class="relative bg-white">
            <div class="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
                <div class="flex justify-start lg:w-0 lg:flex-1">
                <a href="#">
                    <span class="sr-only">Workflow</span>
                    <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                </a>
                </div>
                <div class="-mr-2 -my-2 md:hidden">
                <PopoverButton class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span class="sr-only">Open menu</span>
                    <MenuIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
                </div>
                <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <a href="#" class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                    Sign in
                </a>
                <a href="#" class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Sign up
                </a>
                </div>
            </div>

            <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                <PopoverPanel focus class="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                    <div class="pt-5 pb-6 px-5">
                    <div class="flex items-center justify-between">
                        <div>
                        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                        </div>
                        <div class="-mr-2">
                        <PopoverButton class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span class="sr-only">Close menu</span>
                            <XIcon class="h-6 w-6" aria-hidden="true" />
                        </PopoverButton>
                        </div>
                    </div>
                    </div>
                    <div class="py-6 px-5">
                    <div class="mt-6">
                        <a href="#" class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                        Sign up
                        </a>
                        <p class="mt-6 text-center text-base font-medium text-gray-500">
                        Existing customer?
                        <a href="#" class="text-gray-900">
                            Sign in
                        </a>
                        </p>
                    </div>
                    </div>
                </div>
                </PopoverPanel>
            </transition>
            </Popover>
        </header>

        <main>
            <div>
                <div class="relative">
                    <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
                    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div ref="container">
                                    <LandingCard/>
                            </div>
                    </div>
                </div>
                <!-- Logo cloud -->
                <div class="bg-gray-100">
                <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <p class="text-center text-sm font-semibold text-gray-500 tracking-wide">
                    Trusted by over 5 very average small businesses
                    </p>
                    <div class="mt-6 grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-1">
                        <div class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                            <img class="h-12" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import LandingCard from "@/components/LandingCard";
// import QuestionCard from "@/components/QuestionCard";
// import ResultCard from "@/components/ResultCard";
// import FinalCard from "@/components/FinalCard"

import {
  MenuIcon,
  XIcon,
} from '@heroicons/vue/outline'
// import {defineComponent,createApp} from 'vue'

export default {
    components: {
        Popover,
        PopoverButton,
        PopoverPanel,
        MenuIcon,
        XIcon,
        LandingCard
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
