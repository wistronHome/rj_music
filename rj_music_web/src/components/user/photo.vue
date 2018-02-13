<template>
    <div class="wrap">
        <div class="record-title">
            <h3>更换头像</h3>
        </div>
        <div style="display: flex">
            <div class="btns">
                <rj-button>上传头像</rj-button>
                <span>支持jpg、png、bmp格式的图片，且文件小于20M</span>
            </div>
            <div style="flex: 0 1 365px; border-right: 1px solid #ccc">
                <!--<img src="" alt="">-->
            </div>
            <div style="flex: 1 1 auto">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'photo'
    }
</script>

<style lang="stylus" scoped>
.btns {
    flex: 1 1 100%;
    padding: 26px 0 30px 0;
    text-align: left;
    position relative
    >span {
        color: #999;
        top: 34px;
        position: absolute;
        left: 80px;
    }
}
</style>
