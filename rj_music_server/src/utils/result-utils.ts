export class ResultUtils {
    static success(code: number = 0, msg: string = '', data: any = []) {
        return new Result(code, msg, data);
    }

    static error(code: number = -1, msg: string, data: any = {}) {
        return new Result(code, msg, data);
    }

    static result(code: number, msg: string, data: any) {
        return new Result(code, msg, data);
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

