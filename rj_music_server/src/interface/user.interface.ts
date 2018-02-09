/**
 * Created by GyjLoveLh on  2018/2/9
 */
import { CommonInterface } from "./common.interface";

export interface UserInterface extends CommonInterface<any> {
    register(user);
}
