<template>
    <div v-if="data" class="pl-wrap">
        <div class="left-wrap">
            <div class="pl-main">
                <div class="pl-photo">
                    <img width="200" height="200" src="http://p4.music.126.net/vdbw22CK1MHbYWC3OSGfKg==/19199672044731044.jpg?param=200y200" class="j-img">
                    <span class="msk"></span>
                </div>
                <div class="pl-detail">
                    <div class="hd">
                        <i class="type"></i>
                        <h2 class="f-thide">{{data.name}}</h2>
                    </div>
                    <div class="user">
                        <a @click="routerToUserDetail(data.creator._id)" class="face"><img width="35" height="35" src="http://p1.music.126.net/SFdYH6rrTmDgBGAQqQ8n7g==/1365593447636194.jpg?param=200y200" alt=""></a>
                        <a @click="routerToUserDetail(data.creator._id)" class="name">{{data.creator.nickName}}</a>
                        <span class="time">{{data.createdtime | formatTime}} 创建</span>
                    </div>
                    <div class="btns">
                        <rj-button :btnType="'primary'" :icon="'plus'">播放</rj-button>
                        <rj-button :icon="'store'" :disabled="true">({{data.stores.length}})</rj-button>
                        <rj-button @click="sharePl" :icon="'share'">(-)</rj-button>
                        <rj-button :icon="'load'">下载</rj-button>
                        <rj-button :icon="'message'">({{data.comments.length}})</rj-button>
                    </div>
                    <div class="tags" v-if="data.types.length > 0">
                        <b>标签：</b>
                        <rj-tag v-for="(tag, index) in data.types" :key="index">{{tag}}</rj-tag>
                    </div>
                    <div class="intro" v-if="data.description">
                        <b>介绍：</b>
                        <span v-html="data.description"></span>
                    </div>
                </div>
            </div>

            <div style="margin-top: 30px;" class="record-title">
                <h3><span class="c-h3">歌曲列表</span> <span class="c-num" style="">{{data.songs.length}}首歌</span></h3>
            </div>
            <rj-song-list v-if="data.songs.length > 0" style="margin-bottom: 40px" :data="data.songs" :column="songList"></rj-song-list>

            <div v-if="data.songs.length === 0" class="n-nmusic">
                <h3>
                    <i style="margin-right: 15px" class="rj-icn rj-icn-music"></i>暂无音乐！
                </h3>
                <p class="txt">
                    点击<i style="margin: 0 7px" class="rj-icn rj-icn-store"></i>
                    即可将你喜欢的音乐收藏到“我的音乐”&nbsp;&nbsp;&nbsp;&nbsp;马上去
                    <a>发现音乐</a>
                </p>
            </div>

            <div style="margin-bottom: 20px" class="record-title">
                <h3><span class="c-h3">评论</span> <span class="c-num" style="">共{{data.comments.length}}条评论</span></h3>
            </div>
            <rj-comment-area @commentEvent="commentEvent"></rj-comment-area>
            <rj-comment-list @replyEvent="replyEvent" :comments="data.comments"></rj-comment-list>
        </div>
    </div>
</template>

<script>
    import { CommonUtil } from '../../core/utils/common-util';
    export default {
        props: {
            data: {
                Type: Object
            }
        },
        data() {
            return {
                cUserId: CommonUtil.getLoginUser(),
                songList: [
                    { label: '序号', key: 'index', type: 'index', width: 50, align: 'center' },
                    { type: 'playIcon', width: 60, align: 'center' },
                    { label: '歌名', key: 'name', type: 'html', width: 200, align: 'left',
                        htmlEvent: (row) => {
                            this.$router.push({ path: '/song', query: { id: row._id } });
                        }
                    },
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

            },
            routerToUserDetail(id) {
                this.$router.push({path: '/user/home', query: { id }});
            },
            sharePl() {
                this.$Notice.warning({
                    title: '😞😞😞😞',
                    desc: '正在火速进行中(๑•̀ㅂ•́)و✧加油'
                });
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
                        margin-right 10px
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

.n-nmusic {
    padding: 105px 0 105px 0;
    text-align: center;
    h3 {
        padding-bottom: 38px;
        font-size: 18px;
        font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;

    }
    .txt {
        color #999
        font-weight 500
    }
}
</style>
