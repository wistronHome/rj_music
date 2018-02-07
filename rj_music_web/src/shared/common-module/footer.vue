<template>
    <div class="footer-wrap">
        <div class="btns">
            <a class="prev" title="上一首(ctrl+←)">上一首</a>
            <a class="play j-flag" title="播放/暂停(p)">播放/暂停</a>
            <a class="next" title="下一首(ctrl+→)">下一首</a>
        </div>
        <div class="head">
            <img width="34" height="34" src="http://p1.music.126.net/FZ0nOEQnG7IpyVD53gvWtQ==/7884597883552529.jpg?param=34y34">
            <a class="mask"></a>
        </div>
        <div class="play-area">
            <div class="words">
                <a class="name" @click="routerToSong('123123')">Lost boy</a>
                <a class="mv" title="MV"></a>
                <span class="by">
                    <span title="Ruth B">
                        <a>Ruth&nbsp;B</a>
                    </span>
                </span>
            </div>
            <div class="m-pbar">
                <div class="barbg">
                    <div class="rdy" style="width: 0%;"></div>
                    <div class="cur" style="width:0%;">
                        <span class="btn"></span>
                    </div>
                </div>
                <span class="j-flag time"><em>00:00</em> / 00:00</span>
            </div>
        </div>
        <div class="operation">
            <a href="javascript:;" class="icn icn-add" title="收藏">收藏</a>
            <a href="javascript:;" class="icn icn-share" title="分享">分享</a>
        </div>
        <div class="control">
            <div class="m-vol">
                <div class="barbg"></div>
                <div class="vbg">
                    <div class="curr" style="height: 74.4px;"></div>
                    <span class="btn" style="top: 16.2px;"></span>
                </div>
            </div>
            <a class="icn icn-vol"></a>
            <a class="icn icn-loop" title="循环"></a>
            <span class="add">
                <a title="播放列表" class="icn-list">1</a>
            </span>
            <div class="tip tip-1" style="display:none;">循环</div>
        </div>
        <rj-player :emit="emit"></rj-player>
    </div>
</template>

<script type="text/ecmascript-6">
    import player from "./player.vue";
    import Vue from "vue";

    export default {
        data() {
            return {
                emit: new Vue(),
                playerInfo: {
                    paused: true,
                    voice: 60,
                    currentTime: 0,
                    duration: 0,
                    circleStyle: 0
                }
            }
        },
        components: {
            'rj-player': player
        },
        methods: {
            routerToSong(id) {
                this.$router.push({path: '/song', query: { id }})
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
$playbar = "../../assets/playbar.png";
$statbar = "../../assets/statbar.png";
$iconall = "../../assets/iconall.png";
.footer-wrap {
    position: absolute;
    left: 50%;
    top: 6px;
    z-index: 15;
    width: 980px;
    height: 47px;
    margin: 0 auto;
    margin-left -490px;
    .btns {
        width: 137px;
        padding: 6px 0 0 0;
        float left;
        a {
            display: block;
            float: left;
            width: 28px;
            height: 28px;
            margin-right: 8px;
            margin-top: 5px;
            text-indent: -9999px;
            background-position: 0 0;
            background url($playbar) no-repeat;
        }
        .prev {
            background-position: 0 -130px;
            &:hover {
                background-position: -30px -130px;
            }
        }
        .play {
            width: 36px;
            height: 36px;
            margin-top: 0;
            background-position: 0 -204px;
            &:hover {
                background-position: -40px -204px;
            }
        }
        .next {
            background-position: -80px -130px;
            &:hover {
                background-position: -110px -130px;
            }
        }
    }
    .head {
        position: relative;
        margin: 6px 15px 0 0;
        width: 34px;
        height: 34px;
        float left;
        .mask {
            position: absolute;
            top: 0px;
            left: 0px;
            display: block;
            width: 34px;
            height: 35px;
            background: url($playbar) no-repeat 0 9999px;
            background-position: 0 -80px;
        }
    }
    .play-area {
        position: relative;
        width: 608px;
        float left
        .words {
            height: 28px;
            overflow: hidden;
            color: #e8e8e8;
            text-shadow: 0 1px 0 #171717;
            line-height: 28px;
            .name {
                max-width 300px
                color #e8e8e8
                font-size 12px
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                word-wrap normal
                float left
                &:hover {
                    text-decoration underline
                }
            }
            .mv {
                width: 19px;
                height: 17px;
                float left;
                margin: 6px 0 0 3px;
                background url($playbar) no-repeat
                background-position: 0 -57px;
                &:hover {
                    background-position: -20px -57px;
                }
            }
            .by {
                max-width: 220px;
                margin-left: 15px;
                color: #9b9b9b;
                float left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
                a {
                    color #9b9b9b;
                    font-size 12px
                    &:hover {
                        text-decoration underline
                    }
                }
            }
        }
        .m-pbar {
            width 493px;
            position relative
            .barbg {
                height 9px
                width 487px
                background url($statbar) no-repeat 0 9999px
                background-position right 0
                .rdy {
                    height 9px
                    background url($statbar) no-repeat 0 9999px
                    background-position right -30px
                }
                .cur {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 1%;
                    height 9px;
                    background url($statbar) no-repeat 0 9999px
                    background-position: left -66px;
                    .btn {
                        position: absolute;
                        top: -7px;
                        right: -13px;
                        width: 22px;
                        height: 24px;
                        margin-left: -11px;
                        background: url($iconall ) no-repeat;
                        background-position: 0 -250px;
                    }
                }
            }
            .time {
                position: absolute;
                top: -6px;
                right: -84px;
                color: #797979;
                text-shadow: 0 1px 0 #121212;
                em {
                    color #a1a1a1;
                    font-style: normal;
                    text-align: left;
                    font-size: inherit;
                }
            }
        }
    }
    .operation {
        float left
        width 60px;
        .icn {
            background url($playbar) no-repeat 0 9999px
            float: left;
            width: 25px;
            height: 25px;
            margin: 11px 2px 0 0;
            text-indent: -9999px;
        }
        .icn-add {
            background-position: -88px -163px;
            &:hover {
                background-position: -88px -189px;
            }
        }
        .icn-share {
            background-position: -114px -163px;
            &:hover {
                background-position: -114px -189px;
            }
        }
    }
    .control {
        float left
        position: relative;
        z-index: 10;
        padding-left: 13px;
        background: url($playbar) no-repeat 0 9999px;
        background-position: -147px -238px;
        .m-vol {
            position: absolute;
            top: -113px;
            left: 9px;
            clear: both;
            width: 32px;
            height: 113px;
            .barbg {
                position: absolute;
                top: 0;
                left: 0;
                width: 32px;
                height: 113px;
                background url($playbar) no-repeat 0 9999px
                background-position: 0 -503px;
            }
            .vbg {
                position: absolute;
                padding 4px 0
                top: 7px;
                left: 14px;
                width: 4px;
                height: 93px;
                .curr {
                    position absolute
                    top: auto;
                    bottom: -3px;
                    left: 0;
                    width 4px
                    background url($playbar) no-repeat 0 9999px
                    background-position: -40px bottom;
                    overflow: hidden
                }
                .btn {
                    position: absolute;
                    top: 0;
                    left: -7px;
                    display: block;
                    width: 18px;
                    height: 20px;
                    background url($iconall) no-repeat
                    background-position: -40px -250px;
                    cursor: pointer;
                }
            }
        }
        .icn {
            float: left;
            width: 25px;
            height: 25px;
            margin: 11px 2px 0 0;
            text-indent: -9999px;
            background url($playbar) no-repeat 0 9999px
        }
        .icn-vol {
            background-position: -2px -248px;
            &:hover {
                background-position: -31px -248px;
            }
        }
        .icn-loop {
            background-position: -3px -344px;
            &:hover {
                background-position: -33px -344px;
            }
        }
        .add {
            float: left;
            width: 59px;
            height: 36px;
            position relative
            zoom 1
            .tip {
                position: absolute;
                top: -51px;
                left: -65px;
                clear: both;
                width: 152px;
                height: 49px;
                background url($playbar) no-repeat 0 9999px
                background-position: 0 -287px;
                text-align: center;
                color: #fff;
                line-height: 37px;
            }
            .icn-list {
                display: block;
                float: none;
                width 60px
                padding-left: 21px;
                line-height: 27px;
                text-align: center;
                color: #666;
                text-shadow: 0 1px 0 #080707;
                text-indent: 0;
                text-decoration: none;
                height: 25px;
                margin: 11px 2px 0 0;
                background url($playbar) no-repeat 0 9999px
                background-position: -42px -68px;
            }
        }
    }
}
</style>
