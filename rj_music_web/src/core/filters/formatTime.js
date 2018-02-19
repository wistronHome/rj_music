
import { CommonUtil } from '../utils/common-util';

export default (val, param = 'yyyy年MM月dd日') => {
    return CommonUtil.DateFormat(val, param);
}
