/**
 * Created by GyjLoveLh on  2018/2/19
 */
import { CommonInterface } from "./common.interface";

export interface PlaylistInterface extends CommonInterface<any> {
    /**
     * 新增歌单
     * @param param
     * @returns {Promise<any>}
     */
    insertPl(param): Promise<any>;

    /**
     * 获取所有歌单类型
     * @returns {Promise<any>}
     */
    getTypes(): Promise<any>;

    /**
     * 修改歌单
     * @param params
     * @returns {Promise<any>}
     */
    modifyPlaylist(params): Promise<any>;

    /**
     * 歌曲收藏到歌单
     * @param params
     * @returns {Promise<any>}
     */
    addMusic(params): Promise<any>;

    /**
     * 提交评论
     * @param params
     * @returns {Promise<any>}
     */
    commitComment(params): Promise<any>;

    /**
     * 收藏歌单
     * @param params
     * @returns {Promise<any>}
     */
    storePlaylist(params): Promise<any>;

    /**
     * 取消歌单收藏
     * @param params
     * @returns {Promise<any>}
     */
    cancelStorePlaylist(params): Promise<any>;
}