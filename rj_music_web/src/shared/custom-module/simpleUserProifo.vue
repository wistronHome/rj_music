<template>
<!-- 关注/粉丝 用户简略信息组件 -->
    <div v-if="user" class="ff-item">
            <a class="item-photo" :title="user.nickName" @click="routerToUser(user._id)">
                <img width="60" height="60" :src="user.photo || defaultPhoto">
                <!-- <i class="dot u-icn u-icn-68 f-alpha"></i> -->
            </a>
            <div class="info">
                <p>
                    <a @click="routerTo(user._id, 'home')" class="name" title="追逐萌萌的你">{{user.nickName}}</a>
                    &nbsp;<i class="icn icn-v"></i>
                    <i class="icn" :class="userSex"></i>
                </p>
                <p>
                    <a @click="routerTo(user._id, 'events')">
                        动态<em class="s-fc7">0</em>
                    </a>
                    <span class="line">|</span>
                    <a @click="routerTo(user._id, 'follows')">
                        关注<em class="s-fc7">{{user.follows.length}}</em>
                    </a>
                    <span class="line">|</span>
                    <a @click="routerTo(user._id, 'fans')">
                        粉丝<em class="s-fc7">{{user.fans.length}}</em>
                    </a>
                </p>
                <p class="s-fc3 f-thide">{{user.description}}</p>
            </div>
            <div class="oper">
                <rj-button v-if="isFollow" @click="sendChat" :icon="'chat'">发私信</rj-button>
                <rj-button v-if="!isFollow" @click="handleFollow" :icon="'plus'" :btnType="'primary'">关&nbsp;&nbsp;注</rj-button>
                <p v-if="isFollow && !isFan" class="s-fc4"><i class="ygz"></i> 已关注</p>
                <p v-if="isFollow && isFan" class="s-fc4"><i class="xhgz"></i> 相互关注</p>
            </div>
        </div>
</template>

<script>
import { CommonUtil } from '../../core/utils/common-util'

export default {
    data() {
        return {
            cUserId: CommonUtil.getLoginUser(),
            defaultPhoto: CommonUtil.getDefaultImage('user_photo')
        }
    },
    props: {
        user: null
    },
    computed: {
        userSex() {
            return `icn-${this.user.userSex === 1 ? 'male' : 'female'}`
        },
        isFollow() {
            return this.user.fans.findIndex(item => item === this.$route.query.id) !== -1;
        },
        isFan() {
            return this.user.follows.findIndex(item => item === this.$route.query.id) !== -1;
        }
    },
    methods: {
        routerTo(_id, type) {
            this.$router.push({ path: `/user/${type}`, query: { id: _id } });
        },
        handleFollow() {
            this.$userService.handleFollow(this.cUserId, this.user._id).then(result => {
                this.user.fans.push(this.cUserId);
                this.$emit('handleFollow', this.user._id);
            });
        },
        sendChat() {
            this.$Notice.warning({
                title: '🔨🔨🔨🔨🔨🔨',
                desc: '该功能还在进行中'
            });
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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
