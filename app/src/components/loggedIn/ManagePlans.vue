<template>
	<section aria-labelledby="plan_heading_no_subs">
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
						<Spinner :isLoading="isSavePriceClick" />
						{{ isSavePriceClick? "Loading" : "Save" }}
					</button>
				</div>
			</div>
		</form>
	</section>
</template>

<script>
	import {
		RadioGroup,
		RadioGroupDescription,
		RadioGroupLabel,
		RadioGroupOption,
		Switch,
		SwitchGroup,
		SwitchLabel,
	} from "@headlessui/vue";

	import Spinner from "@/components/Loaders/Spinner";
	export default {
		components: {
			RadioGroup,
			RadioGroupDescription,
			RadioGroupLabel,
			RadioGroupOption,
			Switch,
			SwitchGroup,
			SwitchLabel,
			Spinner,
		},
		data() {
			return {
				selectedPlan: null,
				annualBillingEnabled: true,
				isSavePriceClick: false,
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
				return (
					this.isSavePriceClick
				);
			},
			isProductsLoading() {
				return this.$store.state.billing.isProductsLoading;
			},
			products() {
				return this.$store.state.billing.products;
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
		},
		created() {
			this.$store.dispatch("billing/getProducts");
		},
	};
</script>

<style>
</style>
