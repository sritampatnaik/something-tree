<template >
    <transition appear name="fade">
    <div>
        <div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="relative rounded-2xl px-6 py-10 bg-indigo-600 overflow-hidden shadow-xl sm:px-12 sm:py-20">
            <div aria-hidden="true" class="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
            <svg class="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
                <path class="text-indigo-500 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
                <path class="text-indigo-700 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
            </svg>
            </div>
            <div class="relative">
                <div class="sm:text-center">
                    <h2 class="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                        <span class="text-white">Overall score: </span>
                        <span class="text-indigo-300">{{overallScore}}</span>
                    </h2>
                    <h3 v-for="(score, category) in categoryScores" :key="category" class="text-xl font-semibold text-white tracking-tight sm:text-2xl">
                        <span class="text-white">{{category}} score: </span>
                        <span class="text-indigo-200">{{score}}</span>
                    </h3>
                    <p class="mt-6 mx-auto max-w-2xl text-sm text-indigo-200">
                        The overall score is the minimum of the score across each of the categories, 
                        since they are each important in your ML system being production ready.
                        <br>
                    </p>

                    <p v-if="overallScore < 3" class="mt-6 mx-auto max-w-2xl text-lg text-indigo-200">
                        Hopefully, the questionnaire gave you a few ideas on how your ML system can 
                        be better set to succeed in production. While there are a ton of suggestions, 
                        prioritizing those that most reduce risk, like validation, monitoring, 
                        version control and easy rollbacks are the best bet.
                    </p>
                    <p v-else-if="overallScore < 5.5" class="mt-6 mx-auto max-w-2xl text-lg text-indigo-200">
                        Nice - seems like you have invested some effort in your ML system! Hopefully, this 
                        questionnaire gave you more ideas to further improve your project, reduce risk,
                        and increase quality.
                    </p>
                    <p v-else class="mt-6 mx-auto max-w-2xl text-lg text-indigo-200">
                        Nice! Seems like your ML system is set up quite robustly! Do reach out to us if 
                        you have suggestions on the content of this questionnaire.
                    </p>
                    <p class="mt-6 mx-auto max-w-2xl text-lg text-indigo-200">
                        At <a href="https://metricrule.com" target="blank" class="underline">MetricRule</a>, we are building an open-source monitoring stack for ML systems.
                        <br>
                        <span v-if="categoryScores.Monitoring < 6">
                            If improving your ML monitoring to better understand and get alerted on 
                            model behavior is of interest, do reach out to us about your needs. 
                            We would love to chat about how we can support you in this.
                        </span>
                        <span v-else>
                            If there are specific needs that you are looking for in a ML monitoring tool, 
                            we would love to chat about your needs and how we can help.
                        </span>
                        <br>
                    </p>
                    <!-- <p class="mt-6 mx-auto max-w-2xl text-lg text-indigo-200">
                                    Get notified when we launch our hosted solution.
                    </p> -->
                </div>
                <form @submit.prevent="onSubmit" class="mt-12 sm:mx-auto sm:max-w-lg sm:flex" v-if="!isFormSubmitted">
                    <div class="min-w-0 flex-1">
                        <label for="cta_email" class="sr-only">Email address</label>
                        <input id="cta_email" type="email" v-model="email" class="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600" placeholder="Enter your email" />
                        </div>
                        <div class="mt-4 sm:mt-0 sm:ml-3">
                        <button type="submit" class="block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10">
                            Submit
                        </button>
                    </div>
                </form>
                <div class="flex justify-center mt-10" v-else>
                    <h3 class="text-xl font-semibold text-white tracking-tight sm:text-2xl">
                        <span class="text-white">Thank you, we'll be in touch.</span>
                    </h3>
                    
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
    name : 'ResultCard',
    data() {
			return {
                email : '',
				isFormSubmitting: false,
                isFormSubmitted: false
			};
		},
    computed: {
        overallScore () {
            return store.state.quiz.aggregateScore
        },
        categoryScores () {
            return store.state.quiz.categoryScores
        },
    },
    methods : {
        async onSubmit() {
            this.isFormSubmitting = true
            await store.dispatch("contact/emailSubmit", {
                email: this.email,
            });
            this.isFormSubmitting = false
            this.isFormSubmitted = true
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

<!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
-->
