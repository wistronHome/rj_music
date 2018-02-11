export class CommonUtil {
    /**
     * 生成uuid
     */
    public static createUuid() {
        let uuid = [];
        let str = '0123456789abcdef';
        for (let i = 0; i < 36; i ++) {
            uuid[i] = str.substr(Math.floor(Math.random() * 0x10), 1);
        }
        uuid[14] = '4';
        uuid[19] = str.substr((uuid[19] & 0x3 | 0x8), 1)
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        return uuid.join("").replace(/-/g, '');
    }


}
