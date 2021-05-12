<template>
	<div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
		<!-- Manage Subs -->
		<ManageSubs v-if="claims" />

		<!-- Plan -->
        <ManagePlans v-else />

		<!-- Billing history -->
		<BillingHistoryTable />
	</div>
</template>

<script>
    import ManagePlans from '@/components/loggedIn/ManagePlans';
    import ManageSubs from '@/components/loggedIn/ManageSubs'
	import BillingHistoryTable from "@/components/loggedIn/BillingHistoryTable";
	export default {
		components: {
			BillingHistoryTable,
            ManageSubs,
            ManagePlans
		},
		
		computed: {
			claims() {
				return this.$store.state.auth.authUser.claims;
			},
		},
	};
</script>

<style>
</style>