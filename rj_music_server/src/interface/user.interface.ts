/**
 * Created by GyjLoveLh on  2018/2/9
 */
import { CommonInterface } from "./common.interface";

export interface UserInterface extends CommonInterface<any> {
    /**
     * 注册用户
     * @param user
     */
    register(user);
    /**
     * 用户登录
     * @param user
     */
    login(user): Promise<any>;

    /**
     * 校验昵称是否重复
     * @param {string} userId
     * @param {string} nickName
     * @returns {Promise<any>}
     */
    validateNickName(user): Promise<any>;

    /**
     * 获取用户之间的关系
     * @param body
     * @returns {Promise<any>}
     */
    getRelationship(body): Promise<any>;

    /**
     * 关注/取消关注
     * @param body
     * @returns {Promise<any>}
     */
    handleFollow(body): Promise<any>;

    /**
     * 获取用户关注列表
     * @param id
     * @returns {Promise<any>}
     */
    getUserFollows(id): Promise<any>;

    /**
     * 查询用户粉丝列表
     * @param id
     * @returns {Promise<any>}
     */
    getUserFans(id): Promise<any>;

    /**
     * 获取用户创建和收藏的歌单
     * @param {string} id
     * @returns {Promise<any>}
     */
    getUserPls(id: string): Promise<any>;
}
