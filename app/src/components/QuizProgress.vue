<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <nav aria-label="Progress">
        <ol class="flex items-center">
        <li v-for="(step, stepIdx) in steps" :key="step.name" :class="[stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative']">
            <template v-if="step.status === 'complete'">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="h-0.5 w-full bg-indigo-600" />
                </div>
                <div class="relative w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full hover:bg-indigo-900">
                    <CheckIcon class="w-5 h-5 text-white" aria-hidden="true" />
                    <span class="sr-only">{{ step.name }}</span>
                </div>
                </template>
                <template v-else-if="step.status === 'current'" condition="step.status === 'current'">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="h-0.5 w-full bg-gray-200" />
                </div>
                <div class="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full" aria-current="step">
                    <span class="h-2.5 w-2.5 bg-indigo-600 rounded-full" aria-hidden="true" />
                    <span class="sr-only">{{ step.name }}</span>
                </div>
                </template>
                <template v-else>
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="h-0.5 w-full bg-gray-200" />
                </div>
                <div class="group relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400">
                    <span class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" aria-hidden="true" />
                    <span class="sr-only">{{ step.name }}</span>
                </div>
            </template>
        </li>
        </ol>
    </nav>
</template>

<script>
import { CheckIcon } from '@heroicons/vue/solid'

export default {
    components: {
        CheckIcon,
    },
    data () {
        return {
            steps : [],
        }
    },
    computed: {
        quizCatTotalNum () {
            return this.$store.state.quiz.quizCatTotalNum
        },
        currCatCompNum () {
            return this.$store.state.quiz.currCatCompNum
        }
    },
    watch: {
        async currCatCompNum() {
            this.setSteps()
        },
    },
    created () {
        this.setSteps()     
    },
    methods : {
        setSteps() {
            this.steps = []
            for (var i = 1; i <= this.quizCatTotalNum; i++) {
                let stepStatus;
                if (i < this.currCatCompNum) {
                    stepStatus = 'complete'
                } else if (i == this.currCatCompNum) {
                    stepStatus = 'current'
                } else {
                    stepStatus = 'upcoming'
                }
                this.steps.push({
                    name : "Step " + i,
                    status: stepStatus,
                });
            }
        }
    }
}
</script>