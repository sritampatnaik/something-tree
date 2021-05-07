<template>
	<div class="w-full top-16">
		<Popover v-slot="{ open }" class="relative">
			<PopoverButton
				:class="open ? '' : 'text-opacity-90'"
				class="bg-indigo-600 flex-shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
			>
				<span class="sr-only">View notifications</span>
				<BellIcon
					:class="open ? '' : 'text-opacity-70'"
					class="w-6 h-6 transition duration-150 ease-in-out group-hover:text-opacity-80"
					aria-hidden="true"
				/>
                <span class="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-transparent bg-red-400" />
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
						<div class="relative grid gap-8 bg-white p-7">
							<a
								v-for="item in solutions"
								:key="item.name"
								:href="item.href"
								class="grid grid-cols-8 flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-indigo-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
							>
								<div class="ml-4 col-span-7">
									<p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
									<p class="text-sm text-gray-500">{{ item.description }}</p>
								</div>
								<div class="grid-end flex items-center justify-center flex-shrink-0 text-white">
									<span class="h-2 w-2 rounded-full ring-2 ring-white bg-red-400" />
								</div>
							</a>
						</div>
						<div class="p-4 bg-gray-50">
							<a
								href="##"
								class="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
							>
								<span class="flex items-center">
									<span class="text-sm font-medium text-gray-900">Documentation</span>
								</span>
								<span class="block text-sm text-gray-500">Start integrating products and tools</span>
							</a>
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

	export default {
		components: { Popover, PopoverButton, PopoverPanel, BellIcon },

		data() {
			return {
				solutions: [
					{
						name: "Insights",
						description: "Measure actions your users take",
						href: "##",
					},
					{
						name: "Automations",
						description: "Create your own targeted content",
						href: "##",
					},
					{
						name: "Reports",
						description: "Keep track of your growth",
						href: "##",
					},
				],
			};
		},
	};
</script>