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
    }
}
