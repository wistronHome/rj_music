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
}
