import Vue from 'vue';
import Router from 'vue-router';

import indexRouter from './indexRouter';
import loginRouter from './loginRouter';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		...indexRouter,
		...loginRouter,
	],
});