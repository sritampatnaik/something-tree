<template>
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
</template>

<script>
	export default {
		computed: {
			isBillingHistroyLoading() {
				return this.$store.state.billing.isBillingHistoryLoading;
			},
			billingHistory() {
				return this.$store.state.billing.billingHistory;
			},
		},
		created() {
			this.$store.dispatch("billing/getBillingHistory");
		},
	};
</script>

<style>
</style>
