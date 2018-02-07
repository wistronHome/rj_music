const home = () => import('./home.vue');
const setting = () => import('./setting.vue');
const follows = () => import('./follows.vue');
const fans = () => import('./fans.vue');

export default [
    { path: 'home', component: home },
    { path: 'setting', component: setting },
    { path: 'follows', component: follows },
    { path: 'fans', component: fans }
];
