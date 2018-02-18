import userService from './user-server';
import musicService from './music-server';
import commentService from './comment-server';

export default {
    install(Vue) {
        Vue.prototype.$userService = userService;
        Vue.prototype.$musicService = musicService;
        Vue.prototype.$commentService = commentService;
    }
}
