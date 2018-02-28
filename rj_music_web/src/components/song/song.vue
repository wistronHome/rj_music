<template>
<div class="wrap song-wrap" v-if="song">
    <div class="left-wrap">
        <div class="song-title">
            <div class="song-cover">
                <img :src="song.cover" class="j-img">
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
                        <rj-button class="s-btn" @click="storeToPl(song._id)" :icon="'store'">收藏</rj-button>
                        <rj-button class="s-btn" @click="handleError" :icon="'share'">分享</rj-button>
                        <rj-button class="s-btn" @click="handleError" :icon="'load'">下载</rj-button>
                        <rj-button class="s-btn" :icon="'message'" :title="'评论'">({{comments.length}})</rj-button>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-bottom: 20px" class="record-title">
            <h3><span class="c-h3">评论</span> <span class="c-num" style="">共{{comments.length}}条评论</span></h3>
        </div>
        <rj-comment-area @commentEvent="commentEvent"></rj-comment-area>
        <rj-comment-list @replyEvent="replyEvent" :comments="comments"></rj-comment-list>

        <Modal v-model="storeModal" class="rj-reset" width="530px" :maskClosable="false">
            <p slot="header" class="model-header">
                <span>添加到歌单</span>
            </p>
            <div style="text-align:left">
                <div class="rj-tit">
                    <i class="rj-icn rj-icn-13"></i>新歌单
                </div>
                <div>
                    <ul class="rj-pl-u">
                        <li v-for="(item, index) in playlist" @click="addToPls(item._id)" :key="index">
                            <div class="item">
                                <div class="lef">
                                    <a><img width="40" height="40" :src="item.cover || defaultCover" alt=""></a>
                                </div>
                                <p class="name"><a>{{item.name}}</a></p>
                                <p>{{item.songs.length}}首</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div slot="footer" class="model-footer" style="text-align: center;">
                <!-- <rj-button :width="100">保存并关闭</rj-button> -->
            </div>
        </Modal>
    </div>
</div>
</template>

<script>
import { CommonUtil } from '../../core/utils/common-util';
export default {
    data() {
        return {
            defaultCover: CommonUtil.getDefaultImage('song_cover'),
            comments: [],
            storeModal: false,
            song: null,
            playlist: []
        }
    },
    created() {
        this.$musicService.getMusicById(this.$route.query.id).then(result => {
            this.song = result.data;
            this.comments = this.song.comments;
        });
        this.$userService.getUserPls(CommonUtil.getLoginUser()).then(result => {
            this.playlist = result.data.createdPls;
        });
    },
    methods: {
        selectSong(m) {
            this.$store.commit('CURRENT_SONG', m);
        },
        storeToPl(id) {
            this.storeModal = true;
        },
        handleError() {
            this.$Notice.warning({
                title: '😞😞😞😞',
                desc: '正在火速进行中(๑•̀ㅂ•́)و✧加油'
            });
        },
        addToPls(plId) {
            this.$playlistService.addMusic({ plId: plId, songId: this.$route.query.id }).then(result => {
                this.$Message.success('添加成功');
                this.storeModal = false;
            }, failed => {
                this.$Message.error(failed.msg);
            });
        },
        commentEvent(content) {
            this.$musicService.commitComment(this.song._id, CommonUtil.getLoginUser(), content).then(result => {
                this.$musicService.getMusicById(this.$route.query.id).then(result => {
                    this.comments = result.data.comments;
                });
            });
        },
        replyEvent(params) {
            this.$commentService.commitReply(CommonUtil.getLoginUser(), params.commentId, params.content, this.song._id).then(result => {
                console.log(result);
                this.$musicService.getMusicById(this.$route.query.id).then(result => {
                    this.comments = result.data.comments;
                });
            });
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
.rj-tit {
    padding: 10px 0 10px 35px;
    background: #e6e6e6;
    cursor: pointer;
    font-weight 600
    .rj-icn-13 {
        width: 35px;
        height: 36px;
        background-position: 0 -495px;
        margin-right 10px
    }
}
.rj-pl-u {
    min-height 200px
    li {
        padding: 6px 0 6px 35px;
        border-top: 1px solid #e0e0e0;
        cursor pointer
        list-style none
        &:hover {
            background: #f2f2f2;
        }
        .item {
            padding-left 50px
            .lef {
                display: inline;
                float: left;
                margin-left: -50px;
                overflow: hidden;
                width: 40px;
                a {
                    position: relative;
                    display: block;
                    width: 40px;
                    height: 40px;
                    &:hover {
                        text-decoration none
                    }
                }
            }
            .name {
                margin-top: 2px;
                margin-bottom: 5px;
                word-wrap: break-word;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                a {
                    color: #000;
                    &:hover {
                        text-decoration none
                    }
                }
            }
        }
    }
}

</style>
