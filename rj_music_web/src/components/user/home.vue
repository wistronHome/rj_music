<template>
    <div class="wrap">
        <rj-user-proifo :user="user"></rj-user-proifo>
        <div class="record-title">
            <h3>听歌排行</h3>
            <h4>累积听歌3697首</h4>
            <div>
                <span>所有时间</span>
                <i></i>
                <span class="z-sel">最近一周</span>
            </div>
        </div>
        <rj-song-list style="margin-bottom: 40px" :data="songs" :column="songList"></rj-song-list>
        <div style="margin-bottom: 20px" class="record-title">
            <h3>{{user.nickName}}创建的歌单（{{createdPls.length}}）</h3>
        </div>
        <div style="display: flex; flex-wrap: wrap">
            <rj-song-sheet class="flex-item" v-for="(song, index) in createdPls" :key="index" :data="song"></rj-song-sheet>
        </div>
        <div v-if="storePls.length !== 0" style="margin-bottom: 20px" class="record-title">
            <h3>{{user.nickName}}收藏的歌单（{{storePls.length}}）</h3>
        </div>
        <div style="display: flex; flex-wrap: wrap">
            <rj-song-sheet class="flex-item" v-for="(song, index) in storePls" :key="index" :data="song"></rj-song-sheet>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import userServer from '../../core/model-server/user-server';
export default {
    data() {
        return {
            songs: [
                { name: `<a class="song">张三</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a class="singer">陈粒</a>`, singer: '刘德华', album: '假装', time: Date.now() }
            ],
            songList: [
                { label: '序号', key: 'index', type: 'index', width: 50, align: 'center' },
                { type: 'playIcon', width: 60, align: 'center' },
                { label: '歌名', key: 'name', type: 'html', width: 200, align: 'left' },
                { label: '歌手', key: 'singer', width: 100 },
                { label: '专辑', key: 'album' },
                { label: '时间', key: 'time' }
            ],
            user: {},
            createdPls: [],
            storePls: [],
            sheets: [1, 2]
        }
    },
    created() {
        this.$userService.getUserById(this.$route.query.id).then(result => {
            this.user = result.data;
        });
        this.$userService.getUserPls(this.$route.query.id).then(result => {
            this.createdPls = result.data.createdPls;
            this.storePls = result.data.storePls;
        });
    },
    methods: {
        click(param) {
            alert(param);
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.$userService.getUserById(this.$route.query.id).then(result => {
            this.user = result.data;
        });
        next();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

.flex-item {
    flex 0 1 140px
    margin 0 0 30px 49px
    &:nth-child(5n + 1) {
        margin 0;
    }
}


</style>
