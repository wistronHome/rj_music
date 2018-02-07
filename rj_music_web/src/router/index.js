import Vue from 'vue';
import Router from 'vue-router';

import userRouterConfig from '../components/user/router.js';

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
            component: resolve => import('../components/playlist/playlist.vue').then(resolve)
        },
        {
            path: '/song',
            component: resolve => import('../components/song/song.vue').then(resolve)
        }
    ]
})
