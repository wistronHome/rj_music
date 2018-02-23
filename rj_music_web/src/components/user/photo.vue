<template>
    <div class="wrap">
        <div class="record-title">
            <h3>更换头像</h3>
        </div>
        <div class="p-wrap">
            <div class="btns">
                <rj-button :width="80">上传头像</rj-button>
                <span>支持jpg、png、bmp格式的图片，且文件小于20M</span>
            </div>
            <div style="flex: 0 1 365px; border-right: 1px solid #ccc">
                <div class="p-r">
                    <img class="bg" width="324" src="http://p4.music.126.net/YMuZbwa6U073mYTxB6uVhw==/109951163155937516.jpg" alt="">
                    <img class="edit-img" width="324" src="http://p4.music.126.net/YMuZbwa6U073mYTxB6uVhw==/109951163155937516.jpg" alt="">
                    <div class="rect" style="width: 74px; height: 74px; top: 46px; left: 105px;">
                        <div class="zoom"></div>
                    </div>
                </div>
            </div>
            <div style="flex: 1 1 auto">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'photo',
        data() {
            return {
                p_x: 0,
                p_y: 0,
                width: 50,
                height: 50
            }
        }
    }
</script>

<style lang="stylus" scoped>

.p-wrap {
    display flex
    flex-wrap wrap
    .btns {
        flex: 1 1 100%;
        padding: 26px 0 30px 0;
        text-align: left;
        position relative
        >span {
            color: #999;
            top: 34px;
            position: absolute;
            left: 100px;
        }
    }
    .p-r {
        width 324px
        height 324px
        line-height 324px
        vertical-align middle
        overflow hidden
        border 1px solid #e2e2e2
        position relative
        .bg, .edit-img  {
            left 0
            right 0
            top 0
            bottom 0
        }
        .bg {
            width: 100%;
            // height: 100%;
            position: absolute;
            opacity: 0.5;
            z-index: 0;
        }
        .edit-img {
            width: 100%;
            clip: rect(47px 180px 121px 106px);
            // height: 100%;
            position: absolute;
        }
        .rect {
            width: 180px;
            height: 180px;
            border: 1px solid #fff;
            z-index: 10;
            zoom: 1;
            cursor: move;
            position absolute

            width: 74px;
            height: 74px;
            top: 46px;
            left: 105px;
            .zoom {
                position absolute
                width: 6px;
                height: 6px;
                right: -1px;
                bottom: -1px;
                border: 1px solid #fff;
                cursor: nw-resize;
                background: #000;
                opacity: 0.8;
                overflow: hidden;
            }
        }
    }
}

</style>
