<template>
<div class="wrap song-wrap" v-if="song">
    <div class="left-wrap">
        <div class="song-title">
            <div class="song-cover">
                <img src="http://p1.music.126.net/HQxTggMCB7AHUXN-ZFEtmA==/1371091013186741.jpg?param=130y130" class="j-img">
                <span class="song-msk"></span>
            </div>
            <div class="cnt">
                <div>
                    <i class="s-dq"></i>
                    <div class="tit">
                        <em class="f-ff2">{{song.name}}</em>
                    </div>
                    <p class="des">歌手：<a>{{song.singer}}</a></p>
                    <p class="des">所属专辑：<a>小梦大半</a></p>
                    <div class="s-btns">
                        <rj-button class="s-btn" @click="selectSong(song)" :btnType="'primary'" :icon="'plus'">播放</rj-button>
                        <rj-button class="s-btn" :icon="'store'">收藏</rj-button>
                        <rj-button class="s-btn" :icon="'share'">分享</rj-button>
                        <rj-button class="s-btn" :icon="'load'">下载</rj-button>
                        <rj-button class="s-btn" :icon="'message'" :title="'评论'">(4567)</rj-button>
                    </div>
                </div>
            </div>
        </div>

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
            comments: [1, 2 ,3, 4],
            song: null
        }
    },
    created() {
        this.$musicService.getMusicById(this.$route.query.id).then(result => {
            this.song = result.data;
        });
    },
    methods: {
        selectSong(m) {
            this.$store.commit('CURRENT_SONG', m);
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.$musicService.getMusicById(this.$route.query.id).then(result => {
            this.song = result.data;
        });
    }
}
</script>

<style lang="stylus" scoped>
$coverall = "../../assets/coverall.png"
$icon = "../../assets/icon.png"

.song-wrap {
    padding 0
    .left-wrap {
        width 709px
        padding 47px 30px 40px 39px
        border-right 1px solid #d5d5d5
        .song-title {
            display flex
            margin-bottom 70px
            .song-cover {
                flex 0 1 206px
                margin 40px 30px 0 0
                position relative
                .song-msk {
                    width: 206px;
                    height: 205px;
                    top: -38px;
                    left: 0px;
                    position absolute
                    background url($coverall) no-repeat
                    background-position -140px -580px
                }
            }
            .cnt {
                flex 1 1 auto
                position relative
                text-align left
                .s-dq {
                    width: 54px;
                    height: 24px;
                    top -6px
                    position relative
                    background url($icon) no-repeat
                    background-position: 0 -463px;
                    display: inline-block;
                    overflow: hidden;
                    vertical-align: middle;
                }
                .tit {
                    user-select none
                    display inline-block
                    margin-left 5px
                    position: relative;
                    font-size: 24px;
                }
                .des {
                    color #999
                    margin 10px 0
                    user-select none
                    a {
                        color #0c73c2
                        &:hover {
                            color #0c73c2
                        }
                    }
                }
                .s-btns {
                    margin 10px 0 40px 0
                    .s-btn {
                        margin-right 4px
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
