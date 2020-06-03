<template>
	<div>
		<div v-for="(menuItem, n) in menuBar" :key="n">
			<div style="text-transform: uppercase" class="mt-2 mx-2">
				<span>{{ menuItem.title }}</span>
			</div>
			<v-list>
				<v-list-item v-for="(item, i) in menuItem.item" :key="i" :to="item.to" dense>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title"/>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				menuBar: [
					{
						title: 'Меню',
						item: [
							{
								title: 'Главная страница',
								icon: 'mdi-server',
								to: '/',
							},
						],
					},
				],
			};
		},
	};
</script>