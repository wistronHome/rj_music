<template>
<div class="wrap song-wrap">
    <div class="left-wrap">
        <rj-button>编辑个人资料</rj-button>
        <rj-button :icon="'store'" :disabled="true">store</rj-button>
        <rj-button :icon="'share'">share</rj-button>
        <rj-button :icon="'load'">load</rj-button>
        <rj-button :icon="'message'">message</rj-button>
        <div style="margin-bottom: 20px" class="record-title">
            <h3><span class="c-h3">评论</span> <span class="c-num" style="">共17460条评论</span></h3>
        </div>
        <rj-comment-area></rj-comment-area>
        <rj-comment-list :comments="comments"></rj-comment-list>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            comments: [1, 2 ,3, 4]
        }
    }
}
</script>

<style lang="stylus" scoped>
.song-wrap {
    padding 0
    .left-wrap {
        width 640px
        padding 47px 30px 40px 39px
        border-right 1px solid #d5d5d5
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

</style>
