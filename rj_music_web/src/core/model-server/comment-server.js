import Vue from 'vue';
const $prefix = '/api/comment';

export default {
    /**
     * 回复评论
     * @param { String } userId
     * @param { String } commentId
     * @param { String } content
     */
    commitReply(userId, commentId, content, musicId) {
        return new Promise((resolve, reject) => {
            Vue.http.post(`${$prefix}/reply`, { userId, commentId, content, musicId }).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    }
}
