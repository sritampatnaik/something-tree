<template>
	<div class="bg-gray-50 py-12 sm:px-6 lg:px-12 grid justify-items-center">
		<div class="bg-white shadow sm:rounded-lg w-1/2">
			<div v-if="isPasswordResetForm" class="px-4 py-5 sm:p-6">
				<h3 class="text-lg leading-6 font-medium text-gray-900">Enter New Password</h3>
				<div class="mt-2 max-w-xl text-sm text-gray-500">
					<p>Enter your new password in the following fields and then press submit</p>
				</div>
				<form v-if="!passwordChangeSuccess" class="mt-5" @submit.prevent="onPasswordReset">
					<div class="w-full sm:max-w-xs">
						<label for="passwordField1">Password</label>
						<input
							type="password"
							name="passwordField1"
							id="passwordField1"
							v-model="passwordField1"
							minlength="6"
							required
							class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							placeholder="**********"
						/>
					</div>
					<div class="w-full sm:max-w-xs">
						<label for="passwordField2">Re-enter Password</label>
						<input
							type="password"
							name="passwordField2"
							id="passwordField2"
							v-model="passwordField2"
							minlength="6"
							required
							class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							placeholder="**********"
						/>
					</div>
					<div class="mt-2 w-full sm:max-w-xs">
						<button
							type="submit"
							class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>Submit</button>
					</div>
				</form>
				<p
					v-if="passwordFieldError"
					class="font-small text-red-600 focus:outline-none"
				>{{ passwordFieldError }}</p>
				<p v-if="passwordChangeSuccess" class="font-small text-indigo-600 focus:outline-none">
					{{ passwordChangeSuccess }}
					<RouterLink
						to="/"
						class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
					>Go to Login</RouterLink>
				</p>
			</div>
			<div v-else class="px-4 py-5 sm:p-6">
				<h3 class="text-lg leading-6 font-medium text-gray-900">Reset Your Password</h3>
				<div class="mt-2 max-w-xl text-sm text-gray-500">
					<p>Change password associated with your mail, We will mail you a reset link. Open your inbox and click on the reset link provided in the email.</p>
				</div>
				<form class="mt-5 sm:flex sm:items-center" @submit.prevent="onEmailSubmit">
					<div class="w-full sm:max-w-xs">
						<label for="email" class="sr-only">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							v-model="email"
							required
							class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
							placeholder="you@example.com"
						/>
					</div>
					<button
						type="submit"
						class="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
					>Send</button>
				</form>
				<p v-if="emailStatus" class="font-small text-indigo-600 focus:outline-none">{{ emailStatus }}</p>
				<p v-if="emailInvalid" class="font-small text-indigo-600 focus:outline-none">{{ emailInvalid }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				email: "",
				emailStatus: "",
				emailInvalid: "",
				passwordResetInvalid: false,
				isPasswordResetForm: false,
				passwordField1: "",
				passwordField2: "",
				passwordFieldError: "",
				passwordChangeSuccess: "",
			};
		},
		computed: {
			args() {
				return this.$route.query;
			},
		},
		methods: {
			async onEmailSubmit() {
				this.emailInvalid = "";
				const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (!re.test(this.email.toString().toLowerCase())) {
					this.emailInvalid = "Invalid Email ❌";
				}
				console.log(this.$route.query);
				this.emailStatus = await this.$store.dispatch("auth/resetPassword", {
					email: this.email,
				});
			},
			async onPasswordReset() {
				if (this.passwordField1 === this.passwordField2) {
					this.passwordFieldError = "";
					this.passwordChangeSuccess = await this.$store.dispatch(
						"auth/confirmResetPassowrd",
						{
							code: this.args.oobCode,
							newPassword: this.passwordField1,
						}
					);
				} else {
					this.passwordFieldError = "Password mismatch";
				}
			},
		},
		async mounted() {
			console.log("mounted");
			this.isPasswordResetForm = false;
			if (this.args && this.args.oobCode) {
				console.log("mount code");
				const email = await this.$store.dispatch("auth/verifyPasswordCode", {
					code: this.args.oobCode,
				});
				if (email !== this.args.email) {
					this.isPasswordResetForm = false;
					this.emailInvalid = "Something went wrong, Please try again";
				} else {
					this.isPasswordResetForm = true;
					this.emailInvalid = "";
				}
			}
		},
	};
</script>

<style>
</style>