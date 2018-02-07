<template>
    <div class="ff-item">
            <a class="item-photo" title="追逐萌萌的你">
                <img src="http://p1.music.126.net/C4rCQC3Lj36zTSRxbWdqvw==/109951163114453118.jpg?param=60y60">
                <!-- <i class="dot u-icn u-icn-68 f-alpha"></i> -->
            </a>
            <div class="info">
                <p>
                    <a href="/user/home?id=1308927796" class="name" title="追逐萌萌的你">追逐萌萌的你</a>
                    &nbsp;<i class="icn icn-v"></i>
                    <i class="icn icn-female"></i>
                </p>
                <p>
                    <a href="/user/event?id=1308927796">
                        动态<em class="s-fc7">0</em>
                    </a>
                    <span class="line">|</span>
                    <a href="/user/follows?id=1308927796">
                        关注<em class="s-fc7">9</em>
                    </a>
                    <span class="line">|</span>
                    <a href="/user/fans?id=1308927796">
                        粉丝<em class="s-fc7">4</em>
                    </a>
                </p>
                <p class="s-fc3 f-thide">雨后江岸破晓</p>
            </div>
            <div class="oper">
                <button>发私信</button>
                <p class="s-fc4"><i class="ygz"></i> 已关注</p>
                <p class="s-fc4"><i class="xhgz"></i> 相互关注</p>
            </div>
        </div>
</template>

<script>

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
