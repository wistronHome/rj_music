<template>
<!-- 评论回复列表组件 -->
    <div class="list-wrap">
        <div class="itm" v-for="(item, index) in comments" :key="index">
            <div class="head">
                <a>
                    <img width="50" height="50" src="http://p1.music.126.net/P_BCFKCNwyjM1rd_hyECkA==/19102915021516948.jpg?param=50y50">
                </a>
            </div>
            <div class="cntwrap">
                <div>
                    <div class="cnt f-brk">
                        <a class="s-fc7">{{item.commenter.nickName}}</a>
                        <span>：{{item.content}}</span>
                    </div>
                </div>
                <div class="que" v-if="item.beCommenter">
                    <span class="darr">
                        <i class="bd">◆</i>
                        <i class="bg">◆</i>
                    </span>
                    <a class="s-fc7">{{item.beCommenter.commenter.nickName}}</a>
                    <span> ：{{item.beCommenter.content}}</span>
                </div>
                <div class="rp">
                    <div class="time">{{item.createdtime | formatTime}}</div>
                    <a>
                        <i class="zan"></i>
                    </a>
                    <span class="sep">|</span>
                    <a class="s-fc3" @click="toggleReply(item)">回复</a>
                </div>
            </div>
            <div v-if="replyOpen && replyOpenItem === item._id" class="reply-wrap">
                <div class="reply">
                    <div class="r-inner">
                        <div class="corr">
                            <em class="arrline">◆</em>
                            <span class="arrclr">◆</span>
                        </div>
                        <div class="m-cmmtipt">
                            <div class="txt-area">
                                <Input v-model="content" type="textarea" :rows="1" :autosize="{minRows: 1,maxRows: 4}"></Input>
                            </div>
                            <div class="btns">
                                <i class="icn icn-bq"></i>
                                <i class="icn icn-at"></i>
                                <rj-button @click="commentEvent(item)" :btnType="'primary'" :icon="'plus'" style="float: right;">评论</rj-button>
                                <span class="b-num" :class="{'over-len': contentLen < 0}">{{contentLen}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { CommonUtil } from '../../core/utils/common-util';
export default {
    data() {
        return {
            content: '',
            replyOpen: false,
            replyOpenItem: ''
        }
    },
    props: {
        comments: {
            type: Array,
            default: []
        }
    },
    computed: {
        contentLen() {
            return 140 - this.content.length;
        }
    },
    mounted() {
    },
    methods: {
        toggleReply(item) {
            if (!this.replyOpenItem) {
                this.replyOpen = !this.replyOpen;
                this.replyOpenItem = item._id;
                // this.content = `回复${item.commenter.nickName}：`;
            } else if (this.replyOpenItem === item._id) {
                this.replyOpen = !this.replyOpen;
            } else {
                this.replyOpenItem = item._id;
            }
        },
        commentEvent(param) {
            if (!this.content.trim()) {
                this.$Message.error('输入点内容再提交吧');
            } else if (this.contentLen < 0) {
                this.$Message.error('输入不能超过140个字符');
            } else {
                this.$emit('replyEvent', { commentId: param._id, content: this.content });
            }
        }
    },
    filters: {
        formatTime(val) {
            let date = new Date(val);
            return date.getFullYear() + '年'
                + date.getMonth() + '月'
                + (date.getDay() + 1) + '日'
                + date.getHours() + ':'
                + date.getMinutes() + ':'
                + date.getSeconds();
        }
    }
}
</script>

<style lang="stylus" scoped>
$icon2 = "../../assets/icon2.png";
$icon = "../../assets/icon.png";
.list-wrap {
    .itm {
        display flex
        flex-wrap wrap
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
        .reply-wrap {
            flex 1 1 100%
            padding-left 60px
            .reply {
                border 1px solid #d9d9d9
                border-radius 2px
                margin-top 10px
                .r-inner {
                    position relative
                    padding: 15px;
                    background: #f8f8f8;
                    border: 1px solid #fcfcfc;
                    border-radius: 2px;
                    .corr {
                        position absolute
                        right 5px
                        top -12px
                        overflow hidden
                        width 14px
                        height 14px
                        .arrline, .arrclr {
                            display: block;
                            font-family: "SimSun";
                            font-size: 15px;
                            font-style: normal;
                            font-weight: normal;
                            height: 10px;
                            line-height: normal;
                        }
                        .arrline {
                            color #d9d9d9
                        }
                        .arrclr {
                            margin: -9px 0 0;
                            color: #f8f8f8;
                        }
                    }
                    .m-cmmtipt {
                        .btns {
                            margin 10px 0
                            text-align left
                            position relative
                            .icn {
                                width 18px;
                                margin 0 10px 0 0
                                display inline-block
                                height 18px
                                background url($icon) no-repeat
                            }
                            .icn-bq {
                                background-position -40px -490px
                            }
                            .icn-at {
                                background-position -60px -490px
                            }
                            .b-num {
                                float right
                                margin-right 10px
                                line-height 25px
                                color #999
                            }
                            .over-len {
                                color #c20c02
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
