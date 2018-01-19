const home = () => import('./home.vue');
const setting = () => import('./setting.vue');

export default [
    {
        path: 'home',
        component: home
    },
    {
        path: 'setting',
        component: setting
    }
];
