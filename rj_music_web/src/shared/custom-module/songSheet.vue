<template>
<!-- 单个歌单组件 -->
<div v-if="data">
    <div @click="routerToPl(data._id)" class="song-sheet-wrap">
        <img :src="data.cover || defaultPlCover" alt="">
        <a class="msk" :title="data.name"></a>
        <div class="bottom">
            <a class="icon-play" title="播放"></a>
            <span class="icon-headest"></span>
            <span class="nb">687</span>
        </div>
    </div>
    <p class="desc">
        <a class="title ellipsis" @click="routerToPl(data._id)">
            {{data.name}}
        </a>
    </p>
</div>
</template>

<script type="text/ecmascript-6">
import { CommonUtil } from '../../core/utils/common-util';
export default {
    data() {
        return {
            defaultPlCover: CommonUtil.getDefaultImage('pl_cover')
        }
    },
    props: {
        data: null
    },
    methods: {
        routerToPl(id) {
            this.$router.push({ path: '/playlist',query: { id } })
        }
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
    text-align left
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
