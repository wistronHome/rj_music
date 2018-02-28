<template>
<!-- 用户个人信息详细展示组件 -->
<div class="proifo-wrap">
    <div class="proifo-photo">
        <img :src="user.photo || defaultPhoto">
        <div v-if="cUserId === user._id" class="btm">
            <a @click="$router.push({path: '/user/photo', query: { id: user._id }})" class="upload">更换头像</a>
        </div>
    </div>
    <div style="width: 670px;margin-left: 180px;">
        <div class="name">
            <div class="f-cb">
                <div class="edit">
                    <a v-if="cUserId === user._id" @click="routerToSetting(cUserId)" hidefocus="true" class="u-btn2 u-btn2-1"><i>编辑个人资料</i></a>
                </div>
                <h2 class="name-wrap">
                    <span class="title">{{user.nickName}}</span>
                    <i v-if="user.sex !== 3" class="icn" :class="userSex"></i>
                    <rj-button class="t-btn" :icon="'chat'">发私信</rj-button>
                    <rj-button @click="handleCancelFollow" v-if="ship && ship.isFollow && !ship.isFan" class="t-btn" :icon="'checked'" :focusContent="'取消关注'" :hideIcon="true">已关注</rj-button>
                    <rj-button @click="handleCancelFollow" v-if="ship && ship.isFollow && ship.isFan" class="t-btn" :icon="'circle'" :focusContent="'取消关注'" :hideIcon="true">相互关注</rj-button>
                    <rj-button @click="handleFollow" v-if="ship && !ship.isFollow" class="t-btn" :icon="'plus'" :btnType="'primary'">关&nbsp;&nbsp;注</rj-button>
                </h2>
            </div>
        </div>
    </div>
    <ul class="data">
        <li class="fst">
            <a>
                <strong>0</strong>
                <span>动态</span>
            </a>
        </li>
        <li>
            <a @click="routerToFollows($event)">
                <strong v-if="user.follows">{{user.follows.length || 0}}</strong>
                <span>关注</span>
            </a>
        </li>
        <li>
            <a @click="routerToFans($event)">
                <strong v-if="user.fans">{{user.fans.length || 0}}</strong>
                <span>粉丝</span>
            </a>
        </li>
    </ul>
    <div class="inf" v-if="user.description">个人介绍：<span v-html="user.description"></span></div>
    <div class="inf">
        <span v-if="user.address" style="margin-right: 20px;">所在地区： {{user.address}} </span>
        <span v-if="user.birthday">年龄：{{user.birthday | dateFormat}}</span>
    </div>
</div>
</template>

<script>
import { CommonUtil } from '../../core/utils/common-util'

export default {
    data() {
        return {
            // paramId: '',
            cUserId: CommonUtil.getLoginUser(),
            defaultPhoto: CommonUtil.getDefaultImage('user_photo')
        }
    },
    created() {
        // this.paramId = this.$route.query.id;
    },
    props: {
        user: {
            type: Object
        }
    },
    computed: {
        userSex() {
            return `icn-${this.user.sex === 1 ? 'male' : 'female'}`;
        },
        ship() {
            if (this.$route.query.id !== this.cUserId && this.user.follows && this.user.fans) {
                let isFan = this.user.follows.findIndex(item => item === this.cUserId) !== -1;
                let isFollow = this.user.fans.findIndex(item => item === this.cUserId) !== -1;
                return { isFan, isFollow };
            }
            return null;
        }
    },
    methods: {
        routerToFollows() {
            this.$router.push({ path: '/user/follows', query: { id: this.$route.query.id } });
        },
        routerToFans() {
            this.$router.push({ path: '/user/fans', query: { id: this.$route.query.id } });
        },
        routerToSetting(id) {
            this.$router.push({ path: '/user/setting', query: { id } });
        },
        handleFollow() {
            this.$userService.handleFollow(this.cUserId, this.user._id).then(result => {
                this.user.fans.push(this.cUserId);
                this.$emit('handleFollow', true);
            });
        },
        handleCancelFollow() {
            this.$userService.handleFollow(this.cUserId, this.user._id).then(result => {
                this.user.fans.splice(this.user.fans.findIndex(item => item === this.cUserId), 1);
                this.$emit('handleFollow', true);
            });
        }
    }
}
</script>

<style lang="stylus" scoped>
$button2 = "../../assets/button2.png";
$icon = "../../assets/icon.png";
.proifo-wrap {
    width: 960px;
    margin: 0 auto;
    text-align: left;
    margin-bottom: 43px;
    &:after {
        clear: both;
        content: '.';
        display: block;
        height: 0;
        visibility: hidden;
    }
    .proifo-photo {
        float: left;
        width: 188px;
        margin-right: 40px;
        position relative
        img {
            display: block;
            width: 180px;
            height: 180px;
            padding: 3px;
            background: #fff;
            border: 1px solid #d5d5d5;
        }
        .btm {
            position: absolute;
            background: #8e8e8e;
            opacity: 0.8;
            left: 0px;
            bottom: 0px;
            user-select none
            display: block;
            width: 180px;
            height: 26px;
            line-height: 26px;
            text-align: center;
            color: #fff;
            .upload {
                top: 0;
                left: 0;
                color #ffffff
                &:hover {
                    text-decoration underline
                }
            }
        }
    }
    .name {
        padding-bottom: 12px;
        margin-bottom: 10px;
        border-bottom: 1px solid #ddd;
        overflow hidden;
        .edit {
            float: right;
            margin-top: 4px;
            a {
                color: #333;
                text-decoration: none;
                padding: 0 5px 0 0;
                white-space: nowrap;
                display: inline-block;
                height: 31px;
                line-height: 31px;
                overflow: hidden;
                vertical-align: top;
                text-align: center;
                cursor: pointer;
                background url($button2) no-repeat;
                background-position: right -100px;
                i {
                    color: #333;
                    font-style normal
                    padding: 0 15px 0 20px;
                    pointer-events: none;
                    display: inline-block;
                    height: 31px;
                    line-height: 31px;
                    overflow: hidden;
                    vertical-align: top;
                    text-align: center;
                    cursor: pointer;
                    background url($button2) no-repeat;
                    background-position: 0 -59px
                }
            }
        }
    }
    .name-wrap {
        padding-bottom: 3px;
        float left ;
        line-height 36px
        &:after {
            clear: both;
            content: '.';
            display: block;
            height: 0;
            visibility: hidden;
        }
        .t-btn {
            margin-left 10px;
        }
        .title {
            float: left;
            margin-top: 3px;
            font-size: 22px;
            font-weight: normal;
            line-height: 30px;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
        }
        .icn {
            width: 20px;
            height: 20px;
            margin -3px 0 0 7px
            background url($icon) no-repeat;
            display: inline-block;
            overflow: hidden;
            vertical-align: middle;
            font-style: normal;
            text-align: left;
            font-size: inherit;
        }
        .icn-male {
            background-position: -41px -57px;
        }
        .icn-female {
            background-position: -41px -27px;
        }
    }
    .data {
        width: 670px;
        margin-left: 180px;
        height: 41px;
        margin-bottom: 15px;
        color #666;
        .fst {
            padding-left: 0;
            border-left: none;
        }
        li {
            float: left;
            padding: 0 40px 0 20px;
            border-left: 1px solid #ddd;
            list-style none
            user-select none
            * {
                user-select none
            }
            a {
                display: inline-block;
                position: relative;
                zoom: 1;
                color: #666;
                &:hover {
                    color: #0c73c2;
                    text-decoration: none;
                }
                strong {
                    display: block;
                    margin-top: -4px;
                    font-size: 24px;
                    font-weight: 500;
                    cursor: pointer;
                }
                span {
                    display: block;
                    font-weight: 500;
                    text-indent: 2px;
                    cursor: pointer;
                }
            }
        }
    }
    .inf {
        width: 670px;
        margin-left: 180px;
        margin-bottom: 5px;
        line-height: 21px;
        color: #666;
        word-wrap: break-word;
        word-break: break-word;
        white-space: normal;
        font-weight 500
        span {
            font-weight 500
        }
    }
}
</style>
