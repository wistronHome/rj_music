import Vue from 'vue';
const $prefix = '/api/playlist';

export default {
    /**
     * 创建歌单
     * @param {String} userId
     * @param {String} name
     */
    createPlaylist(userId, name) {
        return new Promise((resolve, reject) => {
            Vue.http.post(`${$prefix}`, { userId, name }).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    }
}
