"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResultCode;
(function (ResultCode) {
    ResultCode[ResultCode["SUCCESS"] = 0] = "SUCCESS";
    ResultCode[ResultCode["WEAK_NET_WORK"] = -1] = "WEAK_NET_WORK";
    ResultCode[ResultCode["PARAMETER_ERROR"] = 10101] = "PARAMETER_ERROR";
    ResultCode[ResultCode["REGISTER_ERROR"] = 10102] = "REGISTER_ERROR";
})(ResultCode = exports.ResultCode || (exports.ResultCode = {}));
const CM_LIST = [
    { code: ResultCode.SUCCESS, msg: '请求成功' },
    { code: ResultCode.WEAK_NET_WORK, msg: '网络异常' },
    { code: ResultCode.PARAMETER_ERROR, msg: '参数错误' },
    { code: ResultCode.REGISTER_ERROR, msg: '用户名或者密码错误' }
];
class ResultMsg {
    constructor(code) {
        this.code = code;
    }
    set code(code) {
        this._code = code;
        let target = CM_LIST.filter(item => item.code === this._code);
        if (target.length > 0) {
            this.msg = target[0].msg;
        }
        else {
            throw new Error(`错误码:${code} 未定义`);
        }
    }
    get code() {
        return this._code;
    }
    set msg(msg) {
        this._msg = msg;
    }
    get msg() {
        return this._msg;
    }
}
exports.ResultMsg = ResultMsg;
