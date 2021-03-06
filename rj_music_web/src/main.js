// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import vueSource from 'vue-resource';
import 'iview/dist/styles/iview.css';
import store from "./core/store";
import songSheet from './shared/custom-module/songSheet.vue';
import commentList from './shared/custom-module/commentList.vue';
import userProifo from './shared/custom-module/userProifo.vue';
import songList from './shared/custom-module/songList.vue';
import simpleUserProifo from './shared/custom-module/simpleUserProifo.vue';
import commentArea from './shared/custom-module/commentArea.vue';
import button from './shared/custom-module/button.vue';
import tag from './shared/custom-module/tag.vue';

import services from './core/model-server/index';
import filters from './core/filters/index';

Vue.use(vueSource);
Vue.use(iView);
Vue.use(services);
Vue.use(filters);

// 注册全局组件
const rjComponents = {
    rjSongSheet: songSheet,
    rjCommentList: commentList,
    rjUserProifo: userProifo,
    rjSongList: songList,
    rjSimpleProifo: simpleUserProifo,
    rjCommentArea: commentArea,
    rjButton: button,
    rjTag: tag
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
