<template>
<div class="proifo-wrap">
    <div class="proifo-photo">
        <img src="http://p1.music.126.net/Z-uuiFpLamYHJJb37dIS8A==/18867619533087863.jpg?param=180y180">
        <div class="btm">
            <a href="/user/update?id=323401262&amp;sub=ava" class="upload">更换头像</a>
        </div>
    </div>
    <div style="width: 670px;margin-left: 180px;">
        <div class="name">
            <div class="f-cb">
                <div class="edit">
                    <a href="/user/update?id=323401262" hidefocus="true" class="u-btn2 u-btn2-1"><i>编辑个人资料</i></a>
                </div>
                <h2 class="name-wrap">
                    <span class="title">把酒言初心_</span>
                    <i class="icn"></i>
                </h2>
            </div>
        </div>
    </div>
    <ul class="data">
        <li class="fst">
            <a>
                <strong>14</strong>
                <span>动态</span>
            </a>
        </li>
        <li>
            <a @click="routerToFollows($event)">
                <strong>14</strong>
                <span>关注</span>
            </a>
        </li>
        <li>
            <a @click="routerToFans($event)">
                <strong>4</strong>
                <span>粉丝</span>
            </a>
        </li>
    </ul>
    <div class="inf">个人介绍：一个fingerpicking&coding都非常努力的人。</div>
    <div class="inf">
        <span>所在地区：湖北省 - 荆门市 </span>
        <span style="margin-left: 20px;">年龄：90后</span>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        routerToFollows(event) {
            this.$router.push({ path: '/user/follows', query: { id: '123123' }});
        },
        routerToFans() {
            this.$router.push({ path: '/user/fans', query: { id: '123123' }});
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
            left: 4px;
            bottom: 3px;
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
            background url($icon) no-repeat;
            background-position: -41px -57px;
            display: inline-block;
            overflow: hidden;
            vertical-align: middle;
            font-style: normal;
            text-align: left;
            font-size: inherit;
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
