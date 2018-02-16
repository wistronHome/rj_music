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
    }
}
