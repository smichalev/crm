<template>
	<v-app style="background: #f1f1f1">
		<v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app v-if="profile">
			<sidebar></sidebar>
		</v-navigation-drawer>
		<v-app-bar :clipped-left="clippedleft" fixed app dense color="#177758" elevation="0">
			<v-btn icon @click.stop="rightDrawer = !rightDrawer" color="#fff" class="d-lg-none d-xl-none mr-2" v-if="profile">
				<v-icon>mdi-menu</v-icon>
			</v-btn>
			<logo></logo>
			<v-spacer/>
			<v-toolbar-items style="height: 48px;" v-if="profile">
				<v-menu offset-y bottom right transition="slide-y-transition">
					<template v-slot:activator="{ on }">
						<v-btn v-on="on" text dark elevation="0">
							<div style="flex-direction: column" class="d-sm-flex ml-2">
								<div class="desktop">{{ username.desktop }}</div>
								<div class="mobile">{{ username.mobile }}</div>
								<div style="font-size: 12px">{{ user_role }}</div>
							</div>
							<v-icon small class="desktop">mdi-chevron-down</v-icon>
						</v-btn>
					</template>

					<v-list>
						<v-list-item @click="logout">
							<v-list-item-title>
								Выход
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-toolbar-items>
		</v-app-bar>
		<v-content fluid style="width: 100%">
			<router-view></router-view>
		</v-content>
		<v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed v-if="profile">
			<sidebar></sidebar>
		</v-navigation-drawer>
	</v-app>
</template>

<script>
	import logo from './components/logo';
	import sidebar from './components/sidebar';

	export default {
		name: 'App',
		components: {
			logo,
			sidebar,
		},
		data() {
			return {
				drawer: true,
				clipped: true,
				clippedleft: true,
				right: false,
				rightDrawer: false,
			};
		},
		mounted() {
			return this.$http.get(this.$address + '/profile')
				.then((data) => {
					if (!data.data.profile && this.$route.path === '/') {
						this.$router.push('/login');
					}
					if (data.data.profile) {
						this.$store.commit('LOGIN', data.data.profile);
						this.$router.push('/');
					}
				});
		},
		methods: {
			logout() {
				return this.$http.post(this.$address + '/logout')
					.then(() => {
						this.$store.commit('LOGOUT');
						this.$router.push('/login');
					});
			},
		},
		computed: {
			username() {
				let mobile = '';

				let nameArr = this.$store.state.auth.profile.name.split(' ');

				for (let i = 0; i < nameArr.length; i++) {
					if (i === 0) {
						mobile += nameArr[i];
					}
					else {
						mobile += ' '+nameArr[i][0] + '.';
					}
				}


				return {
					desktop: this.$store.state.auth.profile.name,
					mobile,
				};
			},
			user_role() {
				let role = null;
				switch (this.$store.state.auth.profile.role) {
					case 'storekeeper':
						role = 'Кладовщик';
						break;
					case 'accountant':
						role = 'Бухгалтер';
						break;
					case 'operator':
						role = 'Оператор';
						break;
					case 'route_manager':
						role = 'Диспетчер маршрутов';
						break;
					case 'sales_manager':
						role = 'Менеджер по продажам';
						break;
					case 'director':
						role = 'Директор';
						break;
					case 'admin':
						role = 'Администратор';
						break;
				}
				return role;
			},
			profile() {
				return this.$store.state.auth.profile;
			},
		},
	};
</script>

<style scoped>
	body {
		overflow-y: auto;
	}

	@media (max-width: 1264px) {
		.desktop {
			display: none;
		}

		.mobile {
			display: block;
		}
	}

	@media (min-width: 1264px) {
		.desktop {
			display: block;
		}

		.mobile {
			display: none;
		}
	}
</style>


