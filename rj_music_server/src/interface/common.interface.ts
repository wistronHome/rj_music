/**
 * Created by GyjLoveLh on  2018/2/9
 */
export interface CommonInterface<T> {
    /**
     * 通用查询单挑
     * @param id
     */
    getItemByPrimary(id: string);

    /**
     * 通用删除
     * @param id
     */
    deleteItemByPrimary(id: string);

    /**
     * 通用修改
     * @param item
     */
    updateItem(item: T);

    /**
     * 通用新增
     * @param item
     */
    insertItem(item: T);

    /**
     * 通用查询
     * @param param
     */
    commonSearch(param);

    /**
     * 获取本机IP
     */
    getAddressIp();
}