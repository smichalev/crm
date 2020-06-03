import Vue from 'vue';
import App from './App.vue';
import router from './routers';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from './plugins/axios';

Vue.prototype.$http = axios;
Vue.prototype.$address = 'http://78.24.220.136:3333/api';
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');
