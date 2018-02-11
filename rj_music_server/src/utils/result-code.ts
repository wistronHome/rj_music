
export enum ResultCode {
    SUCCESS = 0,
    WEAK_NET_WORK = -1,
    PARAMETER_ERROR = 10101,
    REGISTER_ERROR = 10102
}

const CM_LIST = [
    { code: ResultCode.SUCCESS, msg: '请求成功' },
    { code: ResultCode.WEAK_NET_WORK, msg: '网络异常' },
    { code: ResultCode.PARAMETER_ERROR, msg: '参数错误' },
    { code: ResultCode.REGISTER_ERROR, msg: '用户名或者密码错误' }
];

export class ResultMsg {
    private _code: number;
    private _msg: string;
    constructor(code: number) {
        this.code = code;
    }

    set code(code: number) {
        this._code = code;
        let target = CM_LIST.filter(item => item.code === this._code);
        if (target.length > 0) {
            this.msg = target[0].msg;
        } else {
            throw new Error(`错误码:${code} 未定义`);
        }
        
    }
    get code(): number {
        return this._code;
    }

    set msg(msg: string) {
        this._msg = msg;
    }
    get msg(): string {
        return this._msg;
    }
}




