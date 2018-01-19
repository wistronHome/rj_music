import Vue from 'vue'
import Router from 'vue-router'

import userRouterConfig from '../components/user/router.js';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '',
            component: resolve => import('../components/user/home.vue').then(resolve)
        },
        {
            path: '/user',
            component: resolve => import('../components/user/user.vue').then(resolve),
            children: [...userRouterConfig]
        },

    ]
})
