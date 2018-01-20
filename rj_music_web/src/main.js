// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from "./core/store";
import SongSheet from './shared/custom-module/songSheet.vue';
import CommentList from './shared/custom-module/commentList.vue';
Vue.use(iView);
// 注册全局组件
Vue.component('rj-song-sheet', SongSheet);
Vue.component('rj-comment-list', CommentList);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
