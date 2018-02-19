/**
 * Created by GyjLoveLh on  2018/2/19
 */

import { ResultUtils, ResultCode } from "../utils";

import { CommonService } from "./common.service";
import { PlaylistInterface } from "../interface/playlist.interface";
import { Playlist } from "../model/playlist.model";
import { User } from "../model/user.model";

export class PlaylistService extends CommonService implements PlaylistInterface {

    constructor() {
        super();
    }

    insertPl(param): Promise<any> {
        return new Promise((resolve, reject) => {
            Playlist.create(
                { name: param.name, creator: param.userId, createdtime: new Date() },
                (err, pl) => {
                    if (err) {
                        reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                    } else {
                        User.update(
                            { _id: param.userId },
                            { $push: { createdPls: pl._id } },
                            err => {
                                if (err) {
                                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                                } else {
                                    resolve(ResultUtils.success(''));
                                }
                            }
                        )
                    }
                }
            );
        });
    }
}
