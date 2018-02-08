<template>
<!-- 关注/粉丝 用户简略信息组件 -->
    <div class="ff-item">
            <a class="item-photo" :title="user.nickName" @click="routerToUser(user.userId)">
                <img width="60" height="60" :src="user.photo || defaultPhoto">
                <!-- <i class="dot u-icn u-icn-68 f-alpha"></i> -->
            </a>
            <div class="info">
                <p>
                    <a @click="routerTo(user.userId, 'home')" class="name" title="追逐萌萌的你">{{user.nickName}}</a>
                    &nbsp;<i class="icn icn-v"></i>
                    <i class="icn" :class="userSex"></i>
                </p>
                <p>
                    <a @click="routerTo(user.userId, 'events')">
                        动态<em class="s-fc7">0</em>
                    </a>
                    <span class="line">|</span>
                    <a @click="routerTo(user.userId, 'follows')">
                        关注<em class="s-fc7">9</em>
                    </a>
                    <span class="line">|</span>
                    <a @click="routerTo(user.userId, 'fans')">
                        粉丝<em class="s-fc7">4</em>
                    </a>
                </p>
                <p class="s-fc3 f-thide">{{user.description}}</p>
            </div>
            <div class="oper">
                <button>发私信</button>
                <p class="s-fc4"><i class="ygz"></i> 已关注</p>
                <p class="s-fc4"><i class="xhgz"></i> 相互关注</p>
            </div>
        </div>
</template>

<script>

export default {
    data() {
        return {
            defaultPhoto: "http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=60y60"
        }
    },
    props: {
        user: {}
    },
    computed: {
        userSex() {
            return `icn-${this.user.userSex === 1 ? 'male' : 'female'}`
        }
    },
    methods: {
        routerTo(userId, type) {
            this.$router.push({ path: `/user/${type}`, query: { id: userId }});
        }
    }
}
</script>

<style lang="stylus" scoped>
$icon = "../../assets/icon.png";
.ff-item {
    // width: 449px;
    // height: 100px;
    padding: 20px 20px 0 20px;
    border-right: 1px solid #d5d5d5;
    .item-photo {
        float left
    }
    .info {
        float: left;
        width: 220px;
        margin-left: 10px;
        p {
            margin-bottom 6px
            text-align left
            .name {
                display: inline-block;
                zoom: 1;
                max-width: 235px;
                vertical-align: middle;
                color: #0c73c2;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
                font-size: 14px;
                cursor pointer
                &:hover {
                    text-decoration underline
                }
            }
            .icn {
                margin: 0
                margin-top: -2px;
                width: 14px;
                height: 15px;
                display: inline-block;
                overflow: hidden;
                vertical-align: middle;
                background url($icon) no-repeat;
            }
            .icn-male {
                background-position: -70px -20px;
            }
            .icn-female {
                background-position: -70px 0px;
            }
            .icn-v {
                margin-top 0;
            }
            >a {
                color #333;
                em {
                    color #0c73c2
                }
            }
            .line {
                margin: 0 8px;
                color: #999;
            }
        }
    }
    .oper {
        margin-top 5px
        text-align center
        width 75px
        float right
        padding-top 5px
        color #999
        i {
            width: 13px;
            height: 10px;
            background-position: -60px -470px;
            display: inline-block;
            overflow: hidden;
            vertical-align: middle;
            background url($icon)
        }
        .ygz {
            background-position -60px -470px
        }
        .xhgz {
            background-position -60px -455px
        }
    }
}
</style>
