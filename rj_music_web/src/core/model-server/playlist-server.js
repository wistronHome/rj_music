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
    },
    /**
     * 查询歌单详情
     * @param {String} id
     */
    getPlaylistDetail(id) {
        return new Promise((resolve, reject) => {
            Vue.http.get(`${$prefix}/${id}`).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    },
    /**
     * 查询所有类型
     */
    getAllTypes() {
        return new Promise((resolve, reject) => {
            Vue.http.get(`${$prefix}/types`).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    },
    /**
     * 修改歌单
     * @param {any} params
     */
    modifyPlaylist(params) {
        return new Promise((resolve, reject) => {
            Vue.http.put(`${$prefix}`, params).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    },
    /**
     * 将歌曲添加到歌单中
     * @param {any} params
     */
    addMusic(params) {
        return new Promise((resolve, reject) => {
            Vue.http.put(`${$prefix}/song`, params).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    },
    /**
     * 提交评论回复
     * @param {any} params
     */
    commitComment(params) {
        return new Promise((resolve, reject) => {
            Vue.http.post(`${$prefix}/comment`, params).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    },
    /**
     * 收藏歌单
     * @param {String} userId
     * @param {String} plId
     */
    storePlaylist(userId, plId) {
        return new Promise((resolve, reject) => {
            Vue.http.put(`${$prefix}/store`, { userId, plId }).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    },
    /**
     * 取消收藏歌单
     * @param {String} userId
     * @param {String} plId
     */
    cancelStorePlaylist(userId, plId) {
        return new Promise((resolve, reject) => {
            Vue.http.put(`${$prefix}/unstore`, { userId, plId }).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    }
}


