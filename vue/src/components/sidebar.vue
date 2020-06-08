<template>
    <div>
        <div v-for="(menuItem, n) in menu" :key="n">
            <div style="text-transform: uppercase" class="mt-2 mx-2" v-if="menuItem.title">
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
				'storekeeper': {
					menu: [
						{
							title: 'Основное меню',
							item: [
								{
									title: 'Главная страница',
									icon: 'mdi-server',
									to: '/'
								}
							]
						},
						{
							title: 'Складской учет',
							item: [
								{
									title: 'Список товаров',
									icon: 'mdi-plus',
									to: '/productlist'
								}
							]
						}
					]
				},
				'accountant': {
					menu: [
						{
							title: 'Основное меню',
							item: [
								{
									title: 'Главная страница',
									icon: 'mdi-server',
									to: '/'
								}
							]
						}
					]
				},
				'operator': {
					menu: [
						{
							title: 'Основное меню',
							item: [
								{
									title: 'Главная страница',
									icon: 'mdi-server',
									to: '/'
								},
							]
						}
					]
				},
				'route_manager': {
					menu: [
						{
							title: 'Основное меню',
							item: [
								{
									title: 'Главная страница',
									icon: 'mdi-server',
									to: '/'
								}
							]
						}
					]
				},
				'sales_manager': {
					menu: [
						{
							title: 'Основное меню',
							item: [
								{
									title: 'Главная страница',
									icon: 'mdi-server',
									to: '/'
								}
							]
						}
					]
				},
				'director': {
					menu: [
						{
							title: 'Основное меню',
							item: [
								{
									title: 'Главная страница',
									icon: 'mdi-server',
									to: '/'
								}
							]
						}
					]
				},
				'admin': {
					menu: [
						{
							title: 'Основное меню',
							item: [
								{
									title: 'Главная страница',
									icon: 'mdi-server',
									to: '/'
								}
							]
						}
					]
				}
			};
		},
		computed: {
			menu() {
				return this[this.$store.state.auth.profile.role].menu;
			}
		}
	};
</script>