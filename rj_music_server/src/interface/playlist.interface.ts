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
}