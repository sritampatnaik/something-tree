<template>
	<main class="relative -mt-32">
		<div class="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
			<div class="bg-white rounded-lg shadow overflow-hidden">
				<div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
					<aside class="py-6 lg:col-span-3">
						<nav class="space-y-1">
							<RouterLink
								v-for="(item, key) in subNavigation"
								:key="key"
								:to="item.to"
								@click="onSubNavClick(key)"
								:class="[item.current ? 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700' : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900', 'group border-l-4 px-3 py-2 flex items-center text-sm font-medium']"
								:aria-current="item.current ? 'page' : undefined"
							>
								<component
									:is="item.icon"
									:class="[item.current ? 'text-teal-500 group-hover:text-teal-500' : 'text-gray-400 group-hover:text-gray-500', 'flex-shrink-0 -ml-1 mr-3 h-6 w-6']"
									aria-hidden="true"
								/>
								<span class="truncate">{{ item.name }}</span>
							</RouterLink>
						</nav>
					</aside>
					<div class="divide-y divide-gray-200 lg:col-span-9">
                        <RouterView />
						<!-- <Billing /> -->
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
	// import Billing from "@/components/loggedIn/Billing";
	import {
		BellIcon,
		CogIcon,
		CreditCardIcon,
		KeyIcon,
		UserCircleIcon,
		ViewGridAddIcon,
	} from "@heroicons/vue/outline";
	export default {
		components: {
			BellIcon,
			CogIcon,
			CreditCardIcon,
			KeyIcon,
			UserCircleIcon,
			ViewGridAddIcon,
			// Billing,
		},
		data() {
			return {
				subNavigation: [
					{
						name: "Profile",
						to: "#",
						icon: UserCircleIcon,
						current: true,
					},
					{ name: "Account", to: "#", icon: CogIcon, current: false },
					{ name: "Password", to: "#", icon: KeyIcon, current: false },
					{
						name: "Notifications",
						to: "#",
						icon: BellIcon,
						current: false,
					},
					{
						name: "Billing",
						to: "/settings/billing",
						icon: CreditCardIcon,
						current: false,
					},
					{
						name: "Integrations",
						to: "#",
						icon: ViewGridAddIcon,
						current: false,
					},
				],
			};
		},
		methods: {
			onSubNavClick(key) {
				this.subNavigation = this.subNavigation.map((doc, index) => {
					return key === index
						? { ...doc, current: true }
						: { ...doc, current: false };
				});
			},
		},
	};
</script>

<style>
</style>