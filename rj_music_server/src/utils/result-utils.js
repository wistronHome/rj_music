"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResultUtils {
    static success(code = 0, msg = '', data = []) {
        return new Result(code, msg, data);
    }
    static error(code = -1, msg, data = {}) {
        return new Result(code, msg, data);
    }
    static result(code, msg, data) {
        return new Result(code, msg, data);
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
