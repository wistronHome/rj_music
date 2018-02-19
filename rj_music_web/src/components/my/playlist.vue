<template>
    <div>
        <rj-playlist></rj-playlist>
    </div>
</template>

<script>
import { CommonUtil } from '../../core/utils/common-util';
import pl from '../playlist/playlist.vue';
export default {
    data() {
        return {
            user: {}
        }
    },
    components: {
        'rj-playlist': pl
    },
    created() {
        this.$userService.getUserById(CommonUtil.getLoginUser()).then(result => {
            this.user = result.data;
        });
    }
}
</script>

<style lang="stylus" scoped>

</style>
