<template>
    <div class="wrap">
         <rj-user-proifo :user="user" @handleFollow="handleFollow"></rj-user-proifo>
         <div style="margin-bottom: 20px" class="record-title">
            <h3>关注（{{follows.length}}）</h3>
        </div>
        <div class="fans-wrap" style="font-size: 0;text-align: left;">
            <rj-simple-proifo class="fan-item" v-for="(follow, index) in follows" :user="follow" :key="index"></rj-simple-proifo>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            follows: [],
            user: {}
        }
    },
    created() {
        this.$userService.getUserById(this.$route.query.id).then(result => {
            this.user = result.data;
        })
        this.$userService.getUserFollows(this.$route.query.id).then(result => {
            this.follows = result.data.follows;
        })
    },
    methods: {
        handleFollow() {
            this.$userService.getUserFollows(this.$route.query.id).then(result => {
                this.follows = result.data.follows;
            });
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.$userService.getUserById(this.$route.query.id).then(result => {
            this.user = result.data;
            this.$userService.getUserFollows(this.$route.query.id).then(result => {
                this.follows = result.data.follows;
                next();
            })
        });
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

