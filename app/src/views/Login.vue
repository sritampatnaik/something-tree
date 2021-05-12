<template>
	<div
		v-if="!authenticated"
		class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
	>
		<div class="sm:mx-auto sm:w-full sm:max-w-md">
			<img
				class="mx-auto h-12 w-auto"
				src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
				alt="Workflow"
			/>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">{{ getTitle() }}</h2>
			<p class="mt-2 text-center text-sm text-gray-600 max-w">
				Or
				<button
					@click="toggleTitle"
					class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
				>{{getSubtitle()}}</button>
			</p>
		</div>

		<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
				<form class="space-y-6" @submit.prevent="onSubmit">
					<div v-if="isSignUp">
						<label for="fullname" class="block text-sm font-medium text-gray-700">Full Name</label>
						<div class="mt-1">
							<input
								id="fullname"
								name="fullname"
								type="text"
								v-model="fullname"
								autocomplete="current-fullname"
								class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>
					</div>

					<div>
						<label for="email" class="block text-sm font-medium text-gray-700">
							Email address
							<strong v-if="isSignUp">*</strong>
						</label>
						<div class="mt-1">
							<input
								id="email"
								name="email"
								type="email"
								v-model="email"
								autocomplete="email"
								required
								class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>
					</div>

					<div>
						<label for="password" class="block text-sm font-medium text-gray-700">
							Password
							<strong v-if="isSignUp">*</strong>
						</label>
						<div class="mt-1">
							<input
								id="password"
								name="password"
								type="password"
								v-model="password"
								autocomplete="current-password"
								required
								class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>
					</div>

					<div v-if="!isSignUp">
						<div class="flex items-center justify-between">
							<div class="flex items-center">
								<input
									id="remember_me"
									name="remember_me"
									type="checkbox"
									v-model="rememberState"
									class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<label for="remember_me" class="ml-2 block text-sm text-gray-900">Remember me</label>
							</div>

							<div class="text-sm">
								<RouterLink
									to="/resetPassword"
									class="font-medium text-indigo-600 hover:text-indigo-500"
								>Forgot your password?</RouterLink>
							</div>
						</div>
						<br />
						<div>
							<button
								type="submit"
								class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>Sign in</button>
						</div>
					</div>
					<div v-else>
						<button
							type="submit"
							class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>Sign up</button>
					</div>
				</form>
				<div v-if="errorMessage" class="mt-3 -mb-3 rounded-md bg-red-50 p-4">
					<div class="flex">
						<div class="flex-shrink-0">
							<XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-small text-red-800">{{ errorMessage }}</h3>
						</div>
					</div>
				</div>

				<div class="mt-6">
					<div class="relative">
						<div class="absolute inset-0 flex items-center">
							<div class="w-full border-t border-gray-300" />
						</div>
						<div class="relative flex justify-center text-sm">
							<span class="px-2 bg-white text-gray-500">Or continue with</span>
						</div>
					</div>

					<GmailSignIn />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { XCircleIcon } from "@heroicons/vue/solid";
	import GmailSignIn from "@/components/GmailSignIn";

	export default {
		data() {
			return {
				email: "",
				password: "",
				isSignUp: false,
				fullname: "",
				title: "Sign in to your account",
				subtitle: "Create a new account",
				rememberState: false,
			};
		},
		computed: {
			authenticated() {
				return this.$store.state.auth.authenticated;
			},
			errorMessage() {
				return this.$store.state.auth.errorMessage;
			},
		},
		components: {
			XCircleIcon,
			GmailSignIn,
		},
		watch: {
			authenticated() {
				if (this.authenticated) {
					this.$router.push("/dashboard");
				}
			},
		},
		methods: {
			toggleTitle() {
				this.isSignUp = !this.isSignUp;
				this.$store.commit("auth/SET_ERROR", "");
			},
			getTitle() {
				return this.isSignUp ? this.subtitle : this.title;
			},
			getSubtitle() {
				return this.isSignUp ? this.title : this.subtitle;
			},
			signin() {
				this.$store.dispatch("auth/signIn", {
					email: this.email,
					password: this.password,
					persistence: this.rememberState,
				});
			},
			signup() {
				this.$store.dispatch("auth/signUp", {
					email: this.email,
					password: this.password,
					fullname: this.fullname,
				});
			},
			onSubmit() {
				if (this.isSignUp) {
					this.signup();
				} else {
					this.signin();
				}
			},
		},
		created() {
			this.$store.commit("auth/SET_ERROR", "");
			if (this.authenticated) {
				this.$router.push("/dashboard");
			}
		},
	};
</script>