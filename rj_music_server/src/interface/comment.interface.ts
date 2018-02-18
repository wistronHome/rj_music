/**
 * Created by GyjLoveLh on  2018/2/18
 */

import { CommonInterface } from "./common.interface";

export interface CommentInterface extends CommonInterface<any> {
    /**
     * 回复评论
     * @param body
     * @returns {Promise<any>}
     */
    commitReply(body): Promise<any>;
}
