<template>
    <div class="wrap">
         <rj-user-proifo></rj-user-proifo>
         <div style="margin-bottom: 20px" class="record-title">
            <h3>粉丝（4）</h3>
        </div>
        <div class="fans-wrap" style="font-size: 0;text-align: left;">
            <rj-simple-proifo class="fan-item" v-for="(fan, index) in fans" :key="index"></rj-simple-proifo>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fans: [1, 2, 3, 4]
        }
    }
}
</script>

<style lang="stylus" scoped>
.fans-wrap {
    $bb = 1px solid #d5d5d5
    border-top $bb;
    border-left $bb;
    border-bottom $bb;
    margin-bottom 40px
}
.fan-item {
    display inline-block
    height 100px
    width 448px;
    font-size 12px;
    &:nth-child(4n), &:nth-child(4n-1) {
        background #eaeaea
    }
}
</style>
