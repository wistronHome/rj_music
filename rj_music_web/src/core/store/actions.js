import * as types from './types.js'

export default {
    currentSong({ commit }, param) {
        commit(types.CURRENT_SONG, param);
    }
};
