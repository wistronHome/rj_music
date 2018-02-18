/**
 * Created by GyjLoveLh on  2018/2/13
 */
import { CommonInterface } from "./common.interface";

export interface MusicInterface extends CommonInterface<any> {
    /**
     * 上传音乐
     * @param body
     */
    uploadMusic(body): Promise<any>;

    /**
     * 提交评论
     * @param body
     * @returns {Promise<any>}
     */
    commitComment(body): Promise<any>;

    /**
     * 查询歌手
     * @returns {Promise<any>}
     */
    findSingers(): Promise<any>;
}
