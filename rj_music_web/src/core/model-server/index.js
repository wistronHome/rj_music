import userService from './user-server';
import musicService from './music-server';
export default {
    install(Vue) {
        Vue.prototype.$userService = userService;
        Vue.prototype.$musicService = musicService;
    }
}
