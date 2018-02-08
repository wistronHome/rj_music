<template>
    <div class="wrap">
        <rj-user-proifo :user="user"></rj-user-proifo>
        <div style="margin-bottom: 20px" class="record-title">
            <h3>粉丝（{{fans.length}}）</h3>
        </div>
        <div class="fans-wrap" style="font-size: 0;text-align: left;">
            <rj-simple-proifo class="fan-item" v-for="(fan, index) in fans" :user="fan" :key="index"></rj-simple-proifo>
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
        this.$http.get(`/api/user/${this.$route.query.id}`).then(result => {
            this.user = result.body.data;
        });
        this.$http.get(`/api/user/fans/${this.$route.query.id}`).then(result => {
            this.fans = result.body.data;
        })
    },
    beforeRouteUpdate (to, from, next) {
        this.$http.get(`/api/user/${to.query.id}`).then(result => {
            this.user = result.body.data;
        });
        this.$http.get(`/api/user/fans/${to.query.id}`).then(result => {
            this.fans = result.body.data;
        });
        next();
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
