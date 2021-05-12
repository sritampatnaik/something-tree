<template>
	<section aria-labelledby="plan_heading_no_subs">
		<div class="sm:overflow-hidden">
			<div class="bg-white py-6 px-4 space-y-6 sm:p-6">
				<div>
					<h2 id="plan_heading" class="text-lg leading-6 font-medium text-gray-900">Plan</h2>
				</div>

				<div>
					<span class="sr-only">Pricing plans</span>
					<div class="relative bg-white rounded-md -space-y-px">
						<div v-if="isProductsLoading" class="w-full border border-gray-300 rounded-md p-4 mx-auto">
							<div class="animate-pulse flex justify-between">
								<span class="h-4 bg-indigo-400 rounded w-20"></span>
								<span class="h-4 ml-20 bg-indigo-400 rounded w-1/6"></span>
								<span class="h-4 bg-indigo-400 rounded w-1/5"></span>
							</div>
						</div>
						<div v-else v-for="(plan, planIdx) in plans" :key="plan.name" :value="plan">
							<div
								:class="[planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '', planIdx === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : '', claims === plan.name ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200', 'relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3']"
							>
								<div class="flex items-center text-sm">
									<span as="span" class="ml-3 font-medium text-gray-900">{{ plan.name }}</span>
								</div>
								<div class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
									<span
										:class="[claims === plan.name ? 'text-indigo-900' : 'text-gray-900', 'font-medium']"
									>${{ plan.price_month }} / mo</span>
									{{ ' ' }}
									<span
										:class="claims === plan.name ? 'text-indigo-700' : 'text-gray-500'"
									>(${{ plan.price_year }} / yr)</span>
								</div>
								<div
									:class="[claims === plan.name ? 'text-indigo-700' : 'text-gray-500', 'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right']"
								>{{ plan.description }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="px-4 py-3 border-gray-50 text-right sm:px-6">
				<button
					v-if="!isProductsLoading"
					@click="createCustomerPotal('isCancelSubsClick')"
					type="button"
					:disabled="paymentState"
					class="ml-2 text-gray-600 border border-transparent rounded-md py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50"
				>
					<Spinner :isLoading="isCancelSubsClick" />
					{{ isCancelSubsClick? "Loading" : "Cancel subscription" }}
				</button>
				<button
					v-if="!isProductsLoading"
					@click="createCustomerPotal('isManageSubsClick')"
					type="button"
					:disabled="paymentState"
					class="ml-2 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50"
				>
					<Spinner :isLoading="isManageSubsClick" />
					{{ isManageSubsClick? "Loading" : "Manage Subscriptions" }}
				</button>
			</div>
		</div>
	</section>
</template>

<script>
	import Spinner from "@/components/Loaders/Spinner";
	export default {
		components: {
			Spinner,
		},
        data() {
            return {
                isManageSubsClick: false,
                isCancelSubsClick: false,
            }
        },
		computed: {
			paymentState() {
				return (
					this.isManageSubsClick ||
					this.isCancelSubsClick
				);
			},
			isProductsLoading() {
				return this.$store.state.billing.isProductsLoading;
			},
			products() {
				return this.$store.state.billing.products;
			},
			claims() {
				return this.$store.state.auth.authUser.claims;
			},
		},
        watch: {
			isProductsLoading() {
				this.plans = [
					{
						name: "Free",
						price_month: "-",
						currency: "usd",
						price_year: "-",
						description: "This is free",
					},
					...this.products,
				];
				this.selectedPlan = this.plans[0];
			},
		},
		methods: {
			createCustomerPotal(checker) {
				this[checker] = true;
				this.$store.dispatch("billing/createCustomerPotal");
			},
		},
		created() {
            this.$store.dispatch("billing/getProducts");
			this.$store.dispatch("billing/getCustomerSubs");
		},
	};
</script>

<style>
</style>
