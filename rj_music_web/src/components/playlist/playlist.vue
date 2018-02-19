<template>
    <div class="pl-wrap">
        <div class="left-wrap">
            <div class="pl-main">
                <div class="pl-photo">
                    <img width="200" height="200" src="http://p4.music.126.net/vdbw22CK1MHbYWC3OSGfKg==/19199672044731044.jpg?param=200y200" class="j-img">
                    <span class="msk"></span>
                </div>
                <div class="pl-detail">
                    <div class="hd">
                        <i class="type"></i>
                        <h2 class="f-thide">【&nbsp;最霸气的人在爆炸后从不会回头看&nbsp;】</h2>
                    </div>
                    <div class="user">
                        <a class="face"><img width="35" height="35" src="http://p1.music.126.net/SFdYH6rrTmDgBGAQqQ8n7g==/1365593447636194.jpg?param=200y200" alt=""></a>
                        <a class="name">冷山集</a>
                        <span class="time">2017-3-3 创建</span>
                    </div>
                    <div class="btns">
                        <rj-button :btnType="'primary'" :icon="'plus'">播放</rj-button>
                        <rj-button :icon="'store'" :disabled="true">(45678)</rj-button>
                        <rj-button :icon="'share'">(123)</rj-button>
                        <rj-button :icon="'load'">下载</rj-button>
                        <rj-button :icon="'message'">(123)</rj-button>
                    </div>
                    <div class="tags">
                        <b>标签：</b>
                        <rj-tag>欧美</rj-tag>
                        <rj-tag>感动</rj-tag>
                        <rj-tag>兴奋</rj-tag>
                    </div>
                    <div class="intro">
                        <b>介绍：</b>
                        <span>其实一开始只是给自己做了个私人歌单，没想到这么多收藏，感谢大家的喜欢♡不定期更新，欢迎安利，不过还是以我个人喜好为参考标准，可能不会全部采纳，抱歉（封面是邪恶力量里的Dean）</span>
                    </div>
                </div>
            </div>

            <div class="record-title">
                <h3><span class="c-h3">歌曲列表</span> <span class="c-num" style="">100首歌</span></h3>
            </div>
            <rj-song-list style="margin-bottom: 40px" :data="songs" :column="songList"></rj-song-list>

            <div style="margin-bottom: 20px" class="record-title">
                <h3><span class="c-h3">评论</span> <span class="c-num" style="">共17460条评论</span></h3>
            </div>
            <rj-comment-area @commentEvent="commentEvent"></rj-comment-area>
            <rj-comment-list @replyEvent="replyEvent" :comments="comments"></rj-comment-list>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                comments: [],
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
        },
        methods: {
            commentEvent() {

            },
            replyEvent() {

            }
        }
    }
</script>

<style lang="stylus" scoped>
$coverall = "../../assets/coverall.png";
$icon = "../../assets/icon.png";
.pl-wrap {
    padding 0
    .left-wrap {
        width 709px
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
                // background #ccc
                .hd {
                    position: relative;
                    margin: 0 0 12px;
                    line-height: 24px;
                    display flex
                    .type {
                        position: relative;
                        margin-top 3px
                        flex 0 1 54px
                        height 24px
                        overflow: hidden;
                        vertical-align: middle;
                        background url($icon) no-repeat
                        background-position: 0 -243px;
                    }
                    .f-thide {
                        flex 1 1 auto
                        line-height: 24px;
                        font-size: 20px;
                        font-weight: normal;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        word-wrap: normal;
                    }
                }
                .user {
                    margin: 0 0 20px;
                    line-height: 35px;
                    display flex
                    .face {
                        margin-right 10px
                        flex 0 1 35px
                    }
                    .name {
                        flex 0 1 auto
                        font-weight 600
                    }
                    .time {
                        flex 1 1 auto
                        text-align left
                        padding-left 15px
                        color #999
                    }
                }
                .btns {
                    margin-bottom 25px
                }
                .tags, .intro {
                    margin-bottom 5px
                    line-height: 22px;
                    b {
                        color #666
                        font-weight 500
                    }
                    a {
                        margin-right 8px
                    }
                    span {
                        line-height: 18px;
                        color: #666;
                        font-weight 500
                    }
                }
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
