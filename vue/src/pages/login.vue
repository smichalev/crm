<template>
	<v-container
		class="fill-height"
		fluid
	>
		<v-row
			align="center"
			justify="center"
		>
			<v-col
				cols="12"
				sm="8"
				md="4"
			>
				<v-card>
					<v-toolbar
						color="#177758"
						dark
						flat
					>
						<v-toolbar-title>Авторизация</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-alert color="error" text class="" v-if="errorList.length" dense>
							<div v-for="(error, index) in errorList" :key="index">
								{{ error }}
							</div>
						</v-alert>
						<v-select
							label='Выберите роль'
							v-model='selectedRole'
							:items='roles'
							item-value='value'
							item-text='name'
							outlined
							dense
							return-object
							hide-details
							color="#177758"
							class="mb-3"
						>
							<template slot='selection' slot-scope='{ item }'>
								{{ item.name }}
							</template>
							<template slot='item' slot-scope='{ item }'>
								{{ item.name }}
							</template>
						</v-select>

						<v-select
							:items="users"
							v-model="name"
							label="Выберите пользователя"
							outlined
							dense
							hide-details
							color="#177758"
							class="mb-3"
							:disabled="!selectedRole"
						></v-select>

						<v-text-field
							label="Пароль"
							outlined
							dense
							color="#177758"
							type="password"
							v-model="password"
							hide-details
						></v-text-field>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
						<v-btn elevation="0" color="success" block :disabled="!disabledBtn" @click="authorization">Войти</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				name: '',
				password: '',
				errorList: [],
				selectedRole: null,
				roles: [
					{value: 'storekeeper', name: 'Кладовщик'},
					{value: 'accountant', name: 'Бухгалтер'},
					{value: 'operator', name: 'Оператор'},
					{value: 'route_manager', name: 'Диспетчер маршрутов'},
					{value: 'sales_manager', name: 'Менеджер по продажам'},
					{value: 'director', name: 'Директор'},
					{value: 'admin', name: 'Администратор'},
				],
				users: [],
			};
		},
		methods: {
			authorization() {
				this.errorList = [];
				return this.$http.post(this.$address + '/login', {
						name: this.name,
						role: this.selectedRole.value,
						password: this.password,
					})
					.then((data) => {
						if (data.data.profile && data.data.profile._id) {
							this.$store.commit('LOGIN', data.data.profile);
							this.$router.push('/');
						}
					})
					.catch((err) => {
						this.name = '';
						this.selectedRole = null;
						this.password = '';
						this.errorList.push(err.response.data.error.message);
					});
			},
			getUser(role) {
				this.errorList = [];
				this.users = [];
				return this.$http.get(this.$address + '/roles?role=' + role)
					.then((data) => {
						this.users = data.data.users;
					})
					.catch((err) => this.errorList.push(err.response.data.error.message));
			},
		},
		watch: {
			selectedRole(val) {
				this.getUser(val.value);
			},
		},
		computed: {
			disabledBtn() {
				return (this.name.length && this.password.length && this.selectedRole);
			},
		},
		mounted() {
			if (this.$store.state.auth.profile) {
				this.$router.push('/');
			}
		},
	};
</script>