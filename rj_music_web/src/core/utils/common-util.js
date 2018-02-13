/**
 * Created by Administrator on 2018/1/16 0016.
 */
export class CommonUtil {
    /**
     * 获取登录用户信息
     */
    static getLoginUser() {
        let loginUser = localStorage.getItem('__loginUser');
        return loginUser;
    }

    static login() {

    }

    static logout() {
        localStorage.removeItem('__loginUser');
    }

    static saveLoginUser(user) {
        localStorage.setItem('__loginUser', user._id);
    }
}
