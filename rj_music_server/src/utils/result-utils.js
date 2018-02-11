"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const result_code_1 = require("./result-code");
class ResultUtils {
    static success(data = []) {
        return new Result(index_1.ResultCode.SUCCESS, new result_code_1.ResultMsg(index_1.ResultCode.SUCCESS).msg, data);
    }
    static error(code = -1, msg = "") {
        return new Result(code, msg || new result_code_1.ResultMsg(code).msg, "");
    }
    static result(code, msg, data) {
        return new Result(code, msg || new result_code_1.ResultMsg(code).msg, data);
    }
}
exports.ResultUtils = ResultUtils;
class Result {
    constructor(code, msg, data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}
