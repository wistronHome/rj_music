<template>
<!-- 评论回复列表组件 -->
    <div class="list-wrap">
        <div class="itm" v-for="item in comments" :key="item">
            <div class="head">
                <a>
                    <img width="50" height="50" src="http://p1.music.126.net/P_BCFKCNwyjM1rd_hyECkA==/19102915021516948.jpg?param=50y50">
                </a>
            </div>
            <div class="cntwrap">
                <div>
                    <div class="cnt f-brk">
                        <a class="s-fc7">DiamondGolden</a>
                        <span>：嘛也网易云爸爸现在就会搞事情</span>
                    </div>
                </div>
                <div class="que">
                    <span class="darr">
                        <i class="bd">◆</i>
                        <i class="bg">◆</i>
                    </span>
                    <a class="s-fc7">PurionPurion</a>
                    <span> ：哪一首下架了吗？</span>
                </div>
                <div class="rp">
                    <div class="time">1月16日 04:24</div>
                    <a>
                        <i class="zan"></i>
                    </a>
                    <span class="sep">|</span>
                    <a class="s-fc3">回复</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        comments: {
            type: Array,
            default: []
        }
    }
}
</script>

<style lang="stylus" scoped>
$icon2 = "../../assets/icon2.png";
.list-wrap {
    .itm {
        display flex
        padding: 15px 0;
        border-top: 1px dotted #ccc;
        .head {
            flex 0 1 50px
            a {
                display inline-block
            }
        }
        .cntwrap {
            flex 1 1 auto
            text-align left
            margin-left 10px
            .cnt {
                line-height 20px
                word-break break-word
                width 100%
                overflow hidden
                a {
                    color #0c73c2
                    &:hover {
                        text-decoration underline
                    }
                }
                span {
                    color #333333
                    white-space normal
                }
            }
            .que {
                color #666666
                padding: 8px 19px;
                margin-top: 10px;
                line-height: 20px;
                background: #f4f4f4;
                border: 1px solid #dedede;
                position relative
                .darr {
                    position: absolute;
                    top: -7px;
                    left: 20px;
                    font-size: 12px;
                    line-height: 14px;
                    i {
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                    .bd {
                        color #dedede
                    }
                    .bg {
                        top 1px
                        color #f4f4f4
                    }
                }
                .s-fc7 {
                    color #0c73c2
                    &:hover {
                        text-decoration underline
                    }
                }
            }
            .rp {
                margin-top: 15px;
                text-align: right;
                .time {
                    float left
                    margin 0 !important;
                    color #999999
                    font-family: Arial, Helvetica, sans-serif;
                }
                .zan {
                    margin-top: -4px;
                    width: 15px;
                    height: 14px;
                    background: url($icon2) no-repeat 0 9999px;
                    background-position: -150px 0;
                    display: inline-block;
                    overflow: hidden;
                    vertical-align: middle;
                    &:hover {
                        background-position: -150px -20px;
                    }
                }
                .sep {
                    margin: 0 8px;
                    color: #ccc;
                }
                .s-fc3 {
                    color #333333
                    &:hover {
                        text-decoration underline
                    }
                }
            }
        }
    }
}
</style>
