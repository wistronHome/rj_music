<template>
    <div class="wrap pl-wrap">
        <div class="left-wrap">
            <div class="pl-main">
                <div class="pl-photo">
                    <img width="200" height="200" src="http://p4.music.126.net/vdbw22CK1MHbYWC3OSGfKg==/19199672044731044.jpg?param=200y200" class="j-img">
                    <span class="msk"></span>
                </div>
                <div class="pl-detail">

                </div>
            </div>

            <div class="record-title">
                <h3><span class="c-h3">歌曲列表</span> <span class="c-num" style="">100首歌</span></h3>
            </div>
            <rj-song-list style="margin-bottom: 40px" :data="songs" :column="songList"></rj-song-list>

            <div style="margin-bottom: 20px" class="record-title">
                <h3><span class="c-h3">评论</span> <span class="c-num" style="">共17460条评论</span></h3>
            </div>
            <rj-comment-area></rj-comment-area>
            <rj-comment-list :comments="comments"></rj-comment-list>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                comments: [1, 2, 3, 4],
                songs: [
                    { name: `<a class="song">张三</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a class="singer">陈粒</a>`, singer: '刘德华', album: '假装', time: Date.now() },
                    { name: '<a class="song">张三</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a class="singer">陈粒</a>', singer: '刘德华', album: '假装', time: Date.now() },
                    { name: '<a class="song">张三</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a class="singer">陈粒</a>', singer: '刘德华', album: '假装', time: Date.now() },
                    { name: '<a class="song">张三</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a class="singer">陈粒</a>', singer: '刘德华', album: '假装', time: Date.now() },
                    { name: '<a class="song">张三</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a class="singer">陈粒</a>', singer: '刘德华', album: '假装', time: Date.now() },
                    { name: '<a class="song">张三</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a class="singer">陈粒</a>', singer: '刘德华', album: '假装', time: Date.now() }
                ],
                songList: [
                    { label: '序号', key: 'index', type: 'index', width: 50, align: 'center' },
                    { type: 'playIcon', width: 60, align: 'center' },
                    { label: '歌名', key: 'name', type: 'html', width: 200, align: 'left' },
                    { label: '歌手', key: 'singer', width: 100 },
                    { label: '专辑', key: 'album' },
                    { label: '时间', key: 'time' }
                ],
            }
        }
    }
</script>

<style lang="stylus" scoped>
$coverall = "../../assets/coverall.png";
.pl-wrap {
    padding 0
    .left-wrap {
        width 640px
        padding 47px 30px 40px 39px
        border-right 1px solid #d5d5d5
        .pl-main {
            display flex
            text-align left
            .pl-photo {
                flex 0 1 200px
                position relative
                .msk {
                    width: 208px;
                    height: 208px;
                    background url($coverall) no-repeat
                    background-position: 0 -1285px;
                    position absolute
                    top: -4px;
                    left: -4px;
                }
            }
            .pl-detail {
                flex 1 1 auto
                margin-left 25px
                background #ccc
            }
        }

        .c-h3 {
            color #333;
            font-weight 500
        }
        .c-num {
            font-size: 12px;
            color: #666;
            margin-left 20px
            font-weight normal
        }
    }
}
</style>
