import { ResultCode } from "./index";
import { ResultMsg } from './result-code'

export class ResultUtils {
    static success(data: any = []) {
        return new Result(ResultCode.SUCCESS, new ResultMsg(ResultCode.SUCCESS).msg, data);
    }

    static error(code: number = -1, msg: string = "") {
        return new Result(code, msg || new ResultMsg(code).msg, "");
    }

    static result(code: number, msg: string, data: any) {
        return new Result(code,  msg || new ResultMsg(code).msg, data);
    }
}

class Result {
    code: number;
    msg: string;
    data: any;

    constructor(code: number, msg: string, data: any) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}

