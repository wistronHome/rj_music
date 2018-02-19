import Vue from 'vue';
import Router from 'vue-router';

import userRouterConfig from '../components/user/router.js';
import myRouterConfig from '../components/my/router.js';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/user',
            component: resolve => import('../components/user/user.vue').then(resolve),
            children: [...userRouterConfig]
        },
        {
            path: '/playlist',
            component: resolve => import('../components/playlist/pl.vue').then(resolve)
        },
        {
            path: '/song',
            component: resolve => import('../components/song/song.vue').then(resolve)
        },
        {
            path: '/upload',
            component: resolve => import('../components/upload/upload.vue').then(resolve)
        },
        {
            path: '/my',
            component: resolve => import('../components/my/my.vue').then(resolve),
            children: [...myRouterConfig]
        }
    ]
})
