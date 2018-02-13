import Vue from 'vue';
const $prefix = '/api/user';

export default {
    /**
     * 注册
     * @param userCode
     * @param password
     * @returns {Promise<any>}
     */
    register(userCode, password) {
        return new Promise((resolve, reject) => {
            Vue.http.put(`${$prefix}`, { userCode, password }).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    },
    /**
     * 登录
     * @param userCode
     * @param password
     * @returns {Promise<any>}
     */
    login(userCode, password) {
        return new Promise((resolve, reject) => {
            Vue.http.post(`${$prefix}/login`, { userCode, password }).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    },
    /**
     * 修改用户
     * @param user
     * @returns {Promise<any>}
     */
    modifyUser(user) {
        return new Promise((resolve, reject) => {
            Vue.http.post(`${$prefix}`, user).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    },
    /**
     * 获取用户详情
     * @param userId
     * @returns {Promise<any>}
     */
    getUserById(userId) {
        return new Promise((resolve, reject) => {
            Vue.http.get(`${$prefix}/${userId}`).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    },
    /**
     * 校验昵称知否可用
     * @param userId
     * @param nickName
     * @returns {Promise<any>}
     */
    validateNickName(userId, nickName) {
        return new Promise((resolve, reject) => {
            Vue.http.post(`${$prefix}/validateNickName`, { userId, nickName }).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    },
    /**
     * 获取登录用户与查看用户的关系
     * @param loginUserId
     * @param targetUserId
     * @returns {Promise<any>}
     */
    getUserRelationShip(loginUserId, targetUserId) {
        return new Promise((resolve, reject) => {
            Vue.http.post(`${$prefix}/relationship`, { loginUserId, targetUserId }).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    },
    /**
     * 关注/或者取消关注
     * @param loginUserId
     * @param targetUserId
     * @returns {Promise<any>}
     */
    handleFollow(loginUserId, targetUserId) {
        return new Promise((resolve, reject) => {
            Vue.http.post(`${$prefix}/follow`, { loginUserId, targetUserId }).then(result => {
                result.body.code === 0 ? resolve(result.body) : reject(result.body);
            }, error => { throw new Error(error) });
        });
    }
}
