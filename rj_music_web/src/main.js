// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from "./core/store";
import songSheet from './shared/custom-module/songSheet.vue';
import commentList from './shared/custom-module/commentList.vue';
import userProifo from './shared/custom-module/userProifo.vue';
import songList from './shared/custom-module/songList.vue';
import simpleUserProifo from './shared/custom-module/simpleUserProifo.vue';
import commentArea from './shared/custom-module/commentArea.vue';
import button from './shared/custom-module/button.vue';

Vue.use(iView);

// 注册全局组件
const rjComponents = {
    rjSongSheet: songSheet,
    rjCommentList: commentList,
    rjUserProifo: userProifo,
    rjSongList: songList,
    rjSimpleProifo: simpleUserProifo,
    rjCommentArea: commentArea,
    rjButton: button
};
Object.keys(rjComponents).forEach(key => {
    Vue.component(key, rjComponents[key]);
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
