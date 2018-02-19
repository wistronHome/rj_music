import formatTime from './formatTime';
import dateFormat from './dateFormat';

const filters = {
    formatTime,
    dateFormat
}

export default {
    install(Vue) {
        Object.keys(filters).forEach(key => {
            Vue.filter(`${key}`, filters[key]);
        });
    }
}
