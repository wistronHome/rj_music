/**
 * Created by GyjLoveLh on  2018/2/9
 */
export interface CommonInterface<T> {

    getItemByPrimary(id);

    deleteItemByPrimary(id);

    updateItem(item: T);

    insertItem(item: T);
}