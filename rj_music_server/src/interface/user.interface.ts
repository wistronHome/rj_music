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
}
