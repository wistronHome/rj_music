<template>
<!-- 单个歌单组件 -->
<div>
    <div class="song-sheet-wrap">
        <img src="http://p1.music.126.net/Kw6F4V4UpWxL3rC48-u0PA==/19038043835239510.jpg?param=140y140" alt="">
        <a class="msk" title="把酒言初心_喜欢的音乐"></a>
        <div class="bottom">
            <a class="icon-play" title="播放"></a>
            <span class="icon-headest"></span>
            <span class="nb">687</span>
        </div>
    </div>
    <p class="desc">
        <a class="title ellipsis">
            致郁纯音｜孤独的人 宁愿孤独也不将就。
        </a>
    </p>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {}
    }
}
</script>

<style lang="stylus" scoped>
$coverall = "../../assets/coverall.png";
$iconall = "../../assets/iconall.png";
.song-sheet-wrap {
    position relative
    display block
    width 140px
    height 140px
    img {
        display block
        width 100%
        height 100%
        border 0
    }
    .msk {
        background url($coverall) no-repeat;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-position 0 0;
    }
    .bottom {
        background url($coverall) no-repeat;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 27px;
        background-position: 0 -537px;
        color: #ccc;
        .icon-play {
            position: absolute;
            background url($iconall) no-repeat;
            right: 10px;
            bottom: 5px;
            width: 16px;
            height: 17px;
            background-position: 0 0;
            &:hover {
                background-position: 0 -60px;
            }
        }
        .icon-headest {
            float: left;
            background url($iconall) no-repeat;
            width: 14px;
            height: 11px;
            background-position: 0 -24px;
            margin: 9px 5px 9px 10px;
        }
        .nb {
            float: left;
            margin: 7px 0 0 0;
        }
    }
}
.desc {
    margin 8px 0 3px;
    font-size: 14px;
    .title {
        display: inline-block;
        max-width: 140px;
        vertical-align: middle;
        color: #000;
        cursor: pointer;
        &:hover {
            color #000;
            text-decoration: underline;
        }
    }
    .ellipsis {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
}
</style>
