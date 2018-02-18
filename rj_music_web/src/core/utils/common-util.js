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

    /**
     * 时间格式化
     * @param date
     * @param format
     * @returns {any}
     * @constructor
     */
    static DateFormat(date, format) {
        if (!new Date().hasOwnProperty('format')) {
            let format = function(fmt) { // author: meizz
                let o = {
                    "y+": this.getFullYear(), // 年
                    "M+": this.getMonth() + 1, // 月份
                    "d+": this.getDate(), // 日
                    "h+": this.getHours(), // 小时
                    "m+": this.getMinutes(), // 分
                    "s+": this.getSeconds(), // 秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
                    "S": this.getMilliseconds() // 毫秒
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (let k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1,
                            (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }
                return fmt;
            };
            Date.prototype.format = format;
        }
        return new Date(date).format(format);
    }
}
