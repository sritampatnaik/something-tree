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
            <!-- Hero card -->
                <div class="relative">
                    <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
                    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div ref="container">
                                    <LandingCard/>
                            </div>
                    </div>
                </div>
            </div>

            <!-- More main page content here... -->
        </main>
    </div>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import LandingCard from "@/components/LandingCard";
import QuestionCard from "@/components/QuestionCard";
import questions from '../assets/data/questions.json';

import {
  MenuIcon,
  XIcon,
} from '@heroicons/vue/outline'
import {defineComponent,createApp} from 'vue'

export default {
    components: {
        Popover,
        PopoverButton,
        PopoverPanel,
        MenuIcon,
        XIcon,
        LandingCard
    },
    computed: {
        currQnNumber () {
            return this.$store.state.main.currQnNumber
        }
    },
    watch: {
        async currQnNumber() {
            let questionViewContainer = this.$refs.container;
            if (questionViewContainer.hasChildNodes()) {
                questionViewContainer.innerHTML = "";
            }
            let buttonView = defineComponent({
                extends: QuestionCard, data() {
                    return {
                        question:  "What's your name?",
                        optionLength : 2,
                        options :  [
                        {
                            "text": "Yes",
                            "question": {
                            "text": "Do you monitor compliance to this schema?",
                            "options": [
                                {
                                "text": "No",
                                "result": {
                                    "score": 0,
                                    "text": "<p>Monitoring compliance will alert you to the following possible issues:</p><ul><li>Pipeline errors in feature computation</li><li>Outdated expectations on features (could be a sign that the model is outdated)</li></ul><p>A couple of tools that may help you set up automatic validation are <a href=\"https://docs.greatexpectations.io/en/latest/guides/how_to_guides/creating_and_editing_expectations/how_to_create_a_suite_from_a_json_schema_file.html\">Great Expectations</a> and <a href=\"https://pydantic-docs.helpmanual.io/usage/models/\">Pydantic</a>.</p>"
                                }
                                },
                                {
                                "text": "Yes, manually",
                                "result": {
                                    "score": 0.5,
                                    "text": "<p>Automation will reduce <a href=\"https://sre.google/sre-book/eliminating-toil/\">toil</a> and ensure best practices scale across projects. A couple of tools that may help you set up automatic validation are <a href=\"https://docs.greatexpectations.io/en/latest/guides/how_to_guides/creating_and_editing_expectations/how_to_create_a_suite_from_a_json_schema_file.html\">Great Expectations</a> and <a href=\"https://pydantic-docs.helpmanual.io/usage/models/\">Pydantic</a>.</p>"
                                }
                                },
                                {
                                "text": "Yes, automatically",
                                "result": {
                                    "score": 1,
                                    "text": "Great job 👍"
                                }
                                }
                            ]
                            }
                        },
                        {
                            "text": "No",
                            "result": {
                            "score": 0,
                            "text": "<p>Setting up a schema will document your features and their expectations. One way to set up a schema is to use Tensorflow Data Validation to </span><a href=\"https://www.tensorflow.org/tfx/data_validation/get_started#inferring_a_schema_over_the_data\">infer a schema</a>, which represents it as <a href=\"https://github.com/tensorflow/metadata/blob/master/tensorflow_metadata/proto/v0/schema.proto\">Tensorflow Schema Proto</a>.</p><p>Once you have a schema, use tooling to check for compliance, e.g with <a href=\"https://docs.greatexpectations.io/en/latest/guides/how_to_guides/creating_and_editing_expectations/how_to_create_a_suite_from_a_json_schema_file.html\">Great Expectations</a> or <a href=\"https://pydantic-docs.helpmanual.io/usage/models/\">Pydantic</a>. This will protect you from pipeline errors, or changing feature specifications making a model outdated.</p>"
                            }
                        }
                        ]
                    }
                }
            })
            createApp(buttonView).mount(questionViewContainer)
        },
    },
    created() {
        this.$store.commit("main/SET_QUESTIONS", questions);
    }
}
</script>
