import Vue from 'vue';
const $prefix = '/api/music';

export default {
    /**
     * 上传文件
     * @param formData
     * @returns {Promise<any>}
     */
    upload(formData) {
        return new Promise((resolve, reject) => {
            Vue.http.post(`${$prefix}/upload`, formData).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    },
    /**
     * 通用查询
     * @param {*} param
     */
    commonSearch(param) {
        return new Promise((resolve, reject) => {
            Vue.http.post(`${$prefix}/search`, { name: param }).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    },
    /**
     * 根据id查询音乐
     * @param {string} id
     */
    getMusicById(id) {
        return new Promise((resolve, reject) => {
            Vue.http.get(`${$prefix}/${id}`).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    },
    /**
     * 提交评论
     * @param { String } musicId
     * @param { String } userId
     * @param { String } content
     */
    commitComment(musicId, userId, content) {
        return new Promise((resolve, reject) => {
            Vue.http.post(`${$prefix}/comment`, { musicId, userId, content }).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    },
    /**
     * 查询所有在库歌手
     */
    findSingers() {
        return new Promise((resolve, reject) => {
            Vue.http.get(`${$prefix}/singers`).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    }
}
