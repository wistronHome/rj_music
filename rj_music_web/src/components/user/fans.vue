<template>
    <div class="wrap">
        <rj-user-proifo :user="user" @handleFollow="handleFan"></rj-user-proifo>
        <div style="margin-bottom: 20px" class="record-title">
            <h3>粉丝（{{fans.length}}）</h3>
        </div>
        <div class="fans-wrap" style="font-size: 0;text-align: left;">
            <rj-simple-proifo class="fan-item" @handleFollow="handleFollow" v-for="(fan, index) in fans" :user="fan" :key="index"></rj-simple-proifo>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {},
            fans: []
        }
    },
    created() {
        this.$userService.getUserById(this.$route.query.id).then(result => {
            this.user = result.data;
        })
        this.$userService.getUserFans(this.$route.query.id).then(result => {
            this.fans = result.data.fans;
        });
    },
    methods: {
        handleFan() {
            this.$userService.getUserFans(this.$route.query.id).then(result => {
                this.fans = result.data.fans;
            });
        },
        handleFollow(id) {
            this.user.follows.push(id);
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.$userService.getUserById(this.$route.query.id).then(result => {
            this.user = result.data;
            this.$userService.getUserFans(this.$route.query.id).then(result => {
                this.fans = result.data.fans;
                next();
            });
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
