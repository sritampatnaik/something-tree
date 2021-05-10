<template>
	<section aria-labelledby="list_notification">
		<div class="bg-white pt-6 sm:overflow-hidden">
			<div class="px-4 sm:px-6">
				<h2 id="list_notification" class="text-lg leading-6 font-medium text-gray-900">Notifications</h2>
				<div v-if="isAllNotificationsLoading" class="w-full border border-gray-300 rounded-md p-4">
					<div class="animate-pulse flex justify-between">
						<span class="h-4 bg-indigo-400 rounded w-1/6"></span>
						<span class="h-4 -ml-2 bg-indigo-400 rounded w-1/6"></span>
						<span class="h-4 -ml-10 bg-indigo-400 rounded w-20"></span>
						<span class="h-4 bg-indigo-400 rounded w-1/6"></span>
					</div>
				</div>
				<div v-else class="my-6 flex flex-col">
					<div class="-my-2 sm:-mx-6 lg:-mx-8">
						<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div class="rounded-md border border-gray-200">
								<table class="min-w-full divide-y divide-gray-200">
									<thead class="bg-gray-50">
										<tr>
											<th
												scope="col"
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>Id</th>
											<th
												scope="col"
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>Notifications</th>
										</tr>
									</thead>
									<tbody class="bg-white divide-y divide-gray-200">
										<tr
											v-for="(notification, key) in paginatedArray"
											:key="key"
											class="cursor-pointer hover:bg-indigo-50"
										>
											<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{{ notification.id }}</td>
											<td class="px-6 py-4">
												<div class="flex justify-between">
													<div class="text-sm font-medium text-gray-900">{{ notification.title }}</div>
													<div
														class="text-sm font-medium text-gray-900"
													>{{ notification.createTime.toDate().toLocaleString() }}</div>
												</div>
												<div class="text-sm text-gray-500">{{ notification.content }}</div>
											</td>
										</tr>
									</tbody>
								</table>
								<div
									class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
									aria-label="Pagination"
								>
									<div class="hidden sm:block">
										<p class="text-sm text-gray-700">
											Showing
											{{ ' ' }}
											<span class="font-medium">{{ startIndex + 1 }}</span>
											{{ ' ' }}
											to
											{{ ' ' }}
											<span
												class="font-medium"
											>{{ endIndex }}</span>
											{{ ' ' }}
											of
											{{ ' ' }}
											<span
												class="font-medium"
											>{{ allNotifications.length }}</span>
											{{ ' ' }}
											results
										</p>
									</div>
									<div class="flex-1 flex justify-between sm:justify-end">
										<button
											@click="pageDown"
											class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
										>Previous</button>
										<button
											@click="pageUp"
											class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
										>Next</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	// import { computed, ref } from "vue";
	// import { useStore } from "vuex";
	export default {
		data() {
			return {
				currentPage: 1,
				perPage: 3,
			};
		},
		created() {
			this.$store.dispatch("profile/getAllNotification");
		},
		computed: {
			isAllNotificationsLoading() {
				return this.$store.state.profile.isAllNotificationsLoading;
			},
			allNotifications() {
				return this.$store.state.profile.allNotifications;
			},
			startIndex() {
				return (this.currentPage - 1) * this.perPage;
			},
			endIndex() {
				return (this.currentPage - 1) * this.perPage + this.perPage >
					this.allNotifications.length
					? this.allNotifications.length
					: (this.currentPage - 1) * this.perPage + this.perPage;
			},
			paginatedArray() {
				return this.allNotifications.slice(this.startIndex, this.endIndex);
			},
		},
		methods: {
			pageUp() {
				if (this.currentPage < this.allNotifications.length / this.perPage)
					this.currentPage++;
			},
			pageDown() {
				if (this.currentPage > 1) this.currentPage--;
			},
		},
		// setup() {
		// 	const store = useStore();

		// 	store.dispatch("profile/getAllNotification");
		// 	const isAllNotificationsLoading = computed(() => {
		// 		return store.state.profile.isAllNotificationsLoading;
		// 	});
		// 	const allNotifications = computed(() => {
		// 		return store.state.profile.allNotifications;
		// 	});
		// 	const paginatedArray = computed(() => {
		// 		return allNotifications.value.slice(
		// 			(currentPage.value - 1) * perPage.value,
		// 			(currentPage.value - 1) * perPage.value + perPage.value
		// 		);
		// 	});
		// 	const currentPage = ref(1);
		// 	const perPage = ref(2);
		// 	const pageUp = () => {
		// 		if (
		// 			currentPage.value <
		// 			allNotifications.value.length / perPage.value
		// 		)
		// 			currentPage.value++;
		// 	};
		// 	const pageDown = () => {
		// 		if (currentPage.value > 1) currentPage.value--;
		// 	};
		// 	return {
		// 		isAllNotificationsLoading,
		// 		allNotifications,
		// 		currentPage,
		// 		perPage,
		// 		pageUp,
		// 		pageDown,
		// 		paginatedArray,
		// 	};
		// },
	};
</script>

<style>
</style>