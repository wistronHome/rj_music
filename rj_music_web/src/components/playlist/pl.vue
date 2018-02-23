<template>
    <div class="wrap" style="padding-top: 0;">
        <rj-playlist :data="data"></rj-playlist>
    </div>
</template>

<script>
import pl from './playlist.vue';

export default {
    components: {
        'rj-playlist': pl
    },
    data() {
        return {
            data: null
        }
    },
    created() {
        this.$playlistService.getPlaylistDetail(this.$route.query.id).then(result => {
            result.data.songs.forEach(item => {
                item.name = `<a>${item.name}</a>`
            });
            this.data = result.data;
        });
    }
}
</script>

<style lang="stylus" scoped>

</style>


