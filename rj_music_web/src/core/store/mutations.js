import * as types from "./types";
import getters from "./getters";

const state = {
    currentSong: null
}

const mutations = {
    [types.CURRENT_SONG](state, param) {
        state.currentSong = param;
    }
}

export default {
    state,
    mutations,
    getters
}
