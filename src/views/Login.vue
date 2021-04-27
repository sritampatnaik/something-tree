<template>
	<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
					@click="isSignUp = !isSignUp"
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
									class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<label for="remember_me" class="ml-2 block text-sm text-gray-900">Remember me</label>
							</div>

							<div class="text-sm">
								<RouterLink
									to="/"
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

				<div class="mt-6">
					<div class="relative">
						<div class="absolute inset-0 flex items-center">
							<div class="w-full border-t border-gray-300" />
						</div>
						<div class="relative flex justify-center text-sm">
							<span class="px-2 bg-white text-gray-500">Or continue with</span>
						</div>
					</div>

					<div class="mt-6">
						<div>
							<button
								@click="onGmailClick"
								class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none"
							>
								<span class="sr-only">Sign in with Gmail</span>
								<svg
									width="24px"
									version="1.1"
									id="Layer_1"
									xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink"
									viewBox="0 0 512 512"
									xml:space="preserve"
								>
									<g>
										<polygon
											style="fill:#F2F2F2;"
											points="484.973,122.808 452.288,451.017 59.712,451.017 33.379,129.16 256,253.802 	"
										/>
										<polygon
											style="fill:#F2F2F2;"
											points="473.886,60.983 256,265.659 38.114,60.983 256,60.983 	"
										/>
									</g>
									<path
										style="fill:#F14336;"
										d="M59.712,155.493v295.524H24.139C10.812,451.017,0,440.206,0,426.878V111.967l39,1.063L59.712,155.493z"
									/>
									<path
										style="fill:#D32E2A;"
										d="M512,111.967v314.912c0,13.327-10.812,24.139-24.152,24.139h-35.56V155.493l19.692-46.525L512,111.967z"
									/>
									<path
										style="fill:#F14336;"
										d="M512,85.122v26.845l-59.712,43.526L256,298.561L59.712,155.493L0,111.967V85.122c0-13.327,10.812-24.139,24.139-24.139h13.975L256,219.792L473.886,60.983h13.962C501.188,60.983,512,71.794,512,85.122z"
									/>
									<polygon style="fill:#D32E2A;" points="59.712,155.493 0,146.235 0,111.967 " />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				email: "",
				password: "",
				isSignUp: false,
				fullname: "",
				title: "Sign in to your account",
				subtitle: "Create a new account",
			};
		},
		computed: {
			authenticated() {
				return this.$store.state.auth.authenticated;
			},
		},
		watch: {
			authenticated() {
				if (this.authenticated) {
					this.$router.push("/dashboard");
				}
			},
		},
		methods: {
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
			onGmailClick() {
				this.$store.dispatch("auth/signInGoogle");
			},
		},
		created() {
			if (this.authenticated) {
				this.$router.push("/dashboard");
			}
		},
	};
</script>