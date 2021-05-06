<template>
	<div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
		<!-- Manage Subs -->
		<section v-if="claims" aria-labelledby="plan_heading_no_subs">
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
						<svg
							v-if="isCancelSubsClick"
							class="animate-spin h-5 w-5 mr-2 -ml-1"
							viewBox="0 0 40 40"
							enable-background="new 0 0 40 40"
						>
							<path
								fill="#fff"
								d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
							/>
							<path
								fill="#DC2626"
								opacity="1"
								d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
							/>
						</svg>
						{{ isCancelSubsClick? "Loading" : "Cancel subscription" }}
					</button>
					<button
						v-if="!isProductsLoading"
						@click="createCustomerPotal('isManageSubsClick')"
						type="button"
						:disabled="paymentState"
						class="ml-2 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50"
					>
						<svg
							v-if="isManageSubsClick"
							class="animate-spin h-5 w-5 mr-2 -ml-1"
							viewBox="0 0 40 40"
							enable-background="new 0 0 40 40"
						>
							<path
								fill="#fff"
								d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
							/>
							<path
								fill="#4F46E5"
								opacity="1"
								d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
							/>
						</svg>
						{{ isManageSubsClick? "Loading" : "Manage Subscriptions" }}
					</button>
				</div>
			</div>
		</section>

		<!-- Plan -->
		<section v-else aria-labelledby="plan_heading_no_subs">
			<form @submit.prevent="onPlanChange">
				<div class="shadow sm:rounded-md sm:overflow-hidden">
					<div class="bg-white py-6 px-4 space-y-6 sm:p-6">
						<div>
							<h2 id="plan_heading" class="text-lg leading-6 font-medium text-gray-900">Plan</h2>
						</div>

						<RadioGroup v-model="selectedPlan">
							<RadioGroupLabel class="sr-only">Pricing plans</RadioGroupLabel>
							<div class="relative bg-white rounded-md -space-y-px">
								<div v-if="isProductsLoading" class="w-full border border-gray-300 rounded-md p-4 mx-auto">
									<div class="animate-pulse flex justify-between">
										<span class="h-4 bg-indigo-400 rounded w-20"></span>
										<span class="h-4 ml-20 bg-indigo-400 rounded w-1/6"></span>
										<span class="h-4 bg-indigo-400 rounded w-1/5"></span>
									</div>
								</div>
								<RadioGroupOption
									v-else
									as="template"
									v-for="(plan, planIdx) in plans"
									:key="plan.name"
									:value="plan"
									v-slot="{ checked, active }"
								>
									<div
										:class="[planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '', planIdx === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : '', checked ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200', 'relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none']"
									>
										<div class="flex items-center text-sm">
											<span
												:class="[checked ? 'bg-indigo-500 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-gray-900' : '', 'h-4 w-4 rounded-full border flex items-center justify-center']"
												aria-hidden="true"
											>
												<span class="rounded-full bg-white w-1.5 h-1.5" />
											</span>
											<RadioGroupLabel as="span" class="ml-3 font-medium text-gray-900">{{ plan.name }}</RadioGroupLabel>
										</div>
										<RadioGroupDescription class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
											<span
												:class="[checked ? 'text-indigo-900' : 'text-gray-900', 'font-medium']"
											>${{ plan.price_month }} / mo</span>
											{{ ' ' }}
											<span
												:class="checked ? 'text-indigo-700' : 'text-gray-500'"
											>(${{ plan.price_year }} / yr)</span>
										</RadioGroupDescription>
										<RadioGroupDescription
											:class="[checked ? 'text-indigo-700' : 'text-gray-500', 'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right']"
										>{{ plan.description }}</RadioGroupDescription>
									</div>
								</RadioGroupOption>
							</div>
						</RadioGroup>

						<SwitchGroup v-if="!isProductsLoading" as="div" class="flex items-center">
							<Switch
								v-model="annualBillingEnabled"
								:class="[annualBillingEnabled ? 'bg-indigo-500' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors ease-in-out duration-200']"
							>
								<span class="sr-only">Use setting</span>
								<span
									aria-hidden="true"
									:class="[annualBillingEnabled ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']"
								/>
							</Switch>
							<SwitchLabel as="span" class="ml-3">
								<span class="text-sm font-medium text-gray-900">Annual billing</span>
								<span class="text-sm text-gray-500">(Save 10%)</span>
							</SwitchLabel>
						</SwitchGroup>
					</div>
					<div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
						<button
							type="submit"
							v-if="!isProductsLoading"
							:disabled="paymentState"
							class="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50"
						>
							<svg
								v-if="isSavePriceClick"
								class="animate-spin h-5 w-5 mr-2 -ml-1"
								viewBox="0 0 40 40"
								enable-background="new 0 0 40 40"
							>
								<path
									fill="#fff"
									d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
								/>
								<path
									fill="#4F46E5"
									opacity="1"
									d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
								/>
							</svg>
							{{ isSavePriceClick? "Loading" : "Save" }}
						</button>
					</div>
				</div>
			</form>
		</section>

		<!-- Billing history -->
		<section aria-labelledby="billing_history_heading">
			<div class="bg-white pt-6 sm:overflow-hidden">
				<div class="px-4 sm:px-6">
					<h2
						id="billing_history_heading"
						class="text-lg leading-6 font-medium text-gray-900"
					>Billing history</h2>
					<div v-if="isBillingHistroyLoading" class="w-full border border-gray-300 rounded-md p-4">
						<div class="animate-pulse flex justify-between">
							<span class="h-4 bg-indigo-400 rounded w-1/6"></span>
							<span class="h-4 -ml-2 bg-indigo-400 rounded w-1/6"></span>
							<span class="h-4 -ml-10 bg-indigo-400 rounded w-20"></span>
							<span class="h-4 bg-indigo-400 rounded w-1/6"></span>
						</div>
					</div>
					<div v-else class="my-6 flex flex-col">
						<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
								<div class="overflow-hidden rounded-md border border-gray-200">
									<table class="min-w-full divide-y divide-gray-200">
										<thead class="bg-gray-50">
											<tr>
												<th
													scope="col"
													class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Date</th>
												<th
													scope="col"
													class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Invoice Number</th>
												<th
													scope="col"
													class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Amount</th>
												<!--
								`relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
												-->
												<th
													scope="col"
													class="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													<span class="sr-only">View receipt</span>
												</th>
											</tr>
										</thead>
										<tbody class="bg-white divide-y divide-gray-200">
											<tr v-for="(payment, key) in billingHistory" :key="key">
												<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
													<time>{{ payment.created.toDateString() }}</time>
												</td>
												<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ payment.invoice_id }}</td>
												<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ payment.amount }}</td>
												<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
													<a
														:href="payment.invoiceURL"
														target="_blank"
														class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
													>View Invoice</a>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	// import { ref } from "vue";
	// const plans = [
	// 	{
	// 		name: "Startup",
	// 		priceMonthly: 29,
	// 		priceYearly: 290,
	// 		limit: "Up to 5 active job postings",
	// 	},
	// 	{
	// 		name: "Business",
	// 		priceMonthly: 99,
	// 		priceYearly: 990,
	// 		limit: "Up to 25 active job postings",
	// 	},
	// 	{
	// 		name: "Enterprise",
	// 		priceMonthly: 249,
	// 		priceYearly: 2490,
	// 		limit: "Unlimited active job postings",
	// 	},
	// ];
	// const payments = [
	// 	{
	// 		id: 1,
	// 		date: "1/1/2020",
	// 		datetime: "2020-01-01",
	// 		description: "Business Plan - Annual Billing",
	// 		amount: "CA$109.00",
	// 		href: "#",
	// 	},
	// ];
	import {
		RadioGroup,
		RadioGroupDescription,
		RadioGroupLabel,
		RadioGroupOption,
		Switch,
		SwitchGroup,
		SwitchLabel,
	} from "@headlessui/vue";
	export default {
		components: {
			RadioGroup,
			RadioGroupDescription,
			RadioGroupLabel,
			RadioGroupOption,
			Switch,
			SwitchGroup,
			SwitchLabel,
		},
		// setup() {
		// 	const open = ref(false);
		// 	const selectedPlan = ref(plans[1]);
		// 	const annualBillingEnabled = ref(true);

		// 	return {
		// 		plans,
		// 		payments,
		// 		open,
		// 		selectedPlan,
		// 		annualBillingEnabled,
		// 	};
		// },
		data() {
			return {
				open: false,
				selectedPlan: null,
				annualBillingEnabled: true,
				isSavePriceClick: false,
				isManageSubsClick: false,
				isCancelSubsClick: false,
				plans: [
					{
						name: "Free",
						price_month: "-",
						currency: "usd",
						price_year: "-",
						description: "This is free",
					},
				],
			};
		},
		mounted() {
			this.selectedPlan = this.plans[0];
		},
		computed: {
			paymentState() {
				return this.isSavePriceClick || this.isManageSubsClick;
			},
			isProductsLoading() {
				return this.$store.state.billing.isProductsLoading;
			},
			products() {
				return this.$store.state.billing.products;
			},
			isBillingHistroyLoading() {
				return this.$store.state.billing.isBillingHistoryLoading;
			},
			billingHistory() {
				return this.$store.state.billing.billingHistory;
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
			onPlanChange() {
				if (this.selectedPlan.id_year && this.selectedPlan.id_month) {
					this.isSavePriceClick = true;
					const selectedPrice = {
						price: this.annualBillingEnabled
							? this.selectedPlan.id_year
							: this.selectedPlan.id_month,
						quantity: 1,
					};
					this.$store.dispatch("billing/subscribe", { selectedPrice });
				}
			},
			createCustomerPotal(checker) {
				this[checker] = true;
				this.$store.dispatch("billing/createCustomerPotal");
			},
		},
		created() {
			this.$store.dispatch("billing/getProducts");
			this.$store.dispatch("billing/getBillingHistory");
			this.$store.dispatch("billing/getCustomerSubs");
		},
	};
</script>

<style>
</style>