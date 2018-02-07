<template>
    <!-- 评论textarea组件 -->
    <div class="comment-wrap">
        <div class="c-photo">
            <img src="http://p4.music.126.net/Z-uuiFpLamYHJJb37dIS8A==/18867619533087863.jpg?param=50y50">
        </div>
        <div class="c-body">
            <div class="u-txtwrap">
                <textarea class="u-txt" placeholder="评论"></textarea>
            </div>
            <div class="btns">
                <i class="icn icn-bq"></i>
                <i class="icn icn-at"></i>
                <button style="float: right;">评论</button>
                <span class="b-num">140</span>
            </div>
            <div class="corr">
                <em class="arrline">◆</em>
                <span class="arrclr">◆</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
$icon = "../../assets/icon.png";
.comment-wrap {
    margin-bottom 20px
    display flex
    background #ffffff
    .c-photo {
        flex 0 1 50px
    }
    .c-body {
        flex 1 1 auto
        position relative
        .u-txtwrap {
            padding-left 14px
            .u-txt {
                width 100%
                height: 58px;
                margin: 0;
                padding: 5px 6px 6px;
                border: 1px solid #cdcdcd;
                border-radius: 2px;
                line-height: 19px;
                resize none;
                overflow auto
                outline none;
                &:hover {
                    outline none;
                }
            }
        }
        .btns {
            margin-left 14px
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
        }
        .corr {
            position: absolute;
            top: 11px;
            left: 7px;
            width: 13px;
            height: 17px;
            overflow: hidden;
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
                color: #cdcdcd;
            }
            .arrclr {
                margin: -10px 0 0 1px;
                color: #fff;
            }
        }
    }
}
</style>
