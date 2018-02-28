<template>
    <div>
        <rj-playlist :data="data"></rj-playlist>
    </div>
</template>

<script>
import { CommonUtil } from '../../core/utils/common-util';
import pl from '../playlist/playlist.vue';
export default {
    data() {
        return {
            data: null
        }
    },
    components: {
        'rj-playlist': pl
    },
    created() {
        this.$playlistService.getPlaylistDetail(this.$route.query.id).then(result => {
            result.data.songs.forEach(item => {
                item.name = `<a>${item.name}</a>`;
                item.uploader = item.uploader.nickName;
            });
            this.data = result.data;
        });
    },
    beforeRouteUpdate (to, from, next) {
        this.$playlistService.getPlaylistDetail(to.query.id).then(result => {
            result.data.songs.forEach(item => {
                item.name = `<a>${item.name}</a>`;
                item.uploader = item.uploader.nickName;
            });
            this.data = result.data;
        });
        next();
    }
}
</script>

<style lang="stylus" scoped>

</style>
