"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
class CommonUtil {
    /**
     * 生成uuid
     */
    static createUuid() {
        let uuid = [];
        let str = '0123456789abcdef';
        for (let i = 0; i < 36; i++) {
            uuid[i] = str.substr(Math.floor(Math.random() * 0x10), 1);
        }
        uuid[14] = '4';
        uuid[19] = str.substr((uuid[19] & 0x3 | 0x8), 1);
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        return uuid.join("").replace(/-/g, '');
    }
    /**
     * 获取本机IP
     * @returns {HTMLElement | {type: StringConstructor}}
     */
    static getIPAdress() {
        let interfaces = os.networkInterfaces();
        for (let devName in interfaces) {
            let iface = interfaces[devName];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    }
}
exports.CommonUtil = CommonUtil;
