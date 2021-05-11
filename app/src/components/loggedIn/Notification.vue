<template>
	<div class="w-full top-16 z-20">
		<Popover v-slot="{ open }" class="relative">
			<PopoverButton
				:class="open ? '' : 'text-opacity-90'"
				class="bg-indigo-600 flex-shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
				@click="setNotificationStatus(open)"
			>
				<span class="sr-only">View notifications</span>
				<BellIcon
					:class="open ? '' : 'text-opacity-70'"
					class="w-6 h-6 transition duration-150 ease-in-out group-hover:text-opacity-80"
					aria-hidden="true"
				/>
				<span
					v-if="status === 'unseen'"
					class="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-transparent bg-red-400"
				/>
			</PopoverButton>

			<transition
				enter-active-class="transition duration-200 ease-out"
				enter-from-class="translate-y-1 opacity-0"
				enter-to-class="translate-y-0 opacity-100"
				leave-active-class="transition duration-150 ease-in"
				leave-from-class="translate-y-0 opacity-100"
				leave-to-class="translate-y-1 opacity-0"
			>
				<PopoverPanel
					class="absolute z-10 w-80 max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl"
				>
					<div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
						<div class="p-4 bg-gray-50">
							<div
								class="flow-root px-2 transition duration-150 ease-in-out rounded-md focus:outline-none cursor-default"
							>
								<span class="flex justify-between">
									<span class="text-sm font-medium text-gray-900">NOTIFICATIONS</span>
									<span
										@click="markAsAllReadClick"
										class="block text-sm text-gray-500 cursor-pointer"
									>Mark All Read</span>
								</span>
							</div>
						</div>
						<div class="overflow-y-auto max-h-96 relative grid gap-8 bg-white p-7">
							<div
								v-for="(item, key) in activeNotifications"
								:key="key"
								@click="notificationOnClick(item)"
								class="grid grid-cols-8 flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-indigo-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 cursor-pointer"
							>
								<div class="ml-4 col-span-7">
									<p class="text-sm font-medium text-gray-900">
										{{ item.title }} {{ ' ' }}
										<span
											class="font-small text-gray-400"
										>&bull; {{ millisecondsToStr(item.createTime.toDate()) }}</span>
									</p>
									<p class="text-sm text-gray-500">{{ item.content }}</p>
								</div>
								<div
									v-if="item.lastUpdateTime == null"
									class="grid-end flex items-center justify-center flex-shrink-0 text-white"
								>
									<span class="h-2 w-2 rounded-full ring-2 ring-white bg-red-400 ring-transparent" />
								</div>
							</div>
						</div>
						<div class="p-4 bg-gray-50">
							<RouterLink
								to="/settings/notifications"
								class="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
							>
								<i class="block text-sm text-gray-500">See Notification History</i>
							</RouterLink>
						</div>
					</div>
				</PopoverPanel>
			</transition>
		</Popover>
	</div>
</template>

<script>
	import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
	import { BellIcon } from "@heroicons/vue/outline";
	import { mapGetters } from "vuex";

	export default {
		components: { Popover, PopoverButton, PopoverPanel, BellIcon },

		created() {
			this.$store.dispatch("profile/notificationsListener");
		},
		computed: {
			...mapGetters({
				status: "profile/status",
			}),
			activeNotifications() {
				return this.$store.state.profile.activeNotifications;
			},
		},
		methods: {
			setNotificationStatus(isOpen) {
				console.log("working", isOpen);
				if (!isOpen) {
					this.$store.dispatch("profile/setNotificationStatusAsRead");
				}
			},
			notificationOnClick(notification) {
				this.$store.dispatch(
					"profile/setNotificationReadStatus",
					notification
				);
			},
			markAsAllReadClick() {
				this.$store.dispatch("profile/markAllNotificationsAsRead");
			},
			millisecondsToStr(milliseconds) {
				// function numberEnding(number) {
				// 	return number > 1 ? "s" : "";
				// }
				const millies = new Date() - milliseconds;
				let temp = Math.floor(millies / 1000);
				const months = Math.floor(temp / 2592000);
				if (months) {
					return months + "mo";
				}
				const weeks = Math.floor((temp %= 2592000) / 604800);
				if (weeks) {
					return weeks + "w";
				}
				const days = Math.floor((temp %= 604800) / 86400);
				if (days) {
					return days + "d";
				}
				const hours = Math.floor((temp %= 86400) / 3600);
				if (hours) {
					return hours + "h";
				}
				const minutes = Math.floor((temp %= 3600) / 60);
				if (minutes) {
					return minutes + "m";
				}
				const seconds = temp % 60;
				if (seconds) {
					return seconds + "sec";
				}
				return "Just Now";
			},
		},
	};
</script>