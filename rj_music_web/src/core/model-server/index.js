import userService from './user-server'

export default {
    install(Vue) {
        Vue.prototype.$userService = userService;
    }
}
