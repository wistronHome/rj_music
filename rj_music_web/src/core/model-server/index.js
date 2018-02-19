import userService from './user-server';
import musicService from './music-server';
import commentService from './comment-server';
import playlistService from './playlist-server';

const servers = {
    userService,
    musicService,
    commentService,
    playlistService
}

export default {
    install(Vue) {
        Object.keys(servers).forEach(key => {
            Vue.prototype[`$${key}`] = servers[key];
        });
    }
}
