<template>
    <div id="app">
        <Layout class="rj-lay">
            <Header class="rj-header">
                <rj-header></rj-header>
            </Header>
            <Content>
                <router-view></router-view>
            </Content>
            <Footer class="rj-footer">
                <rj-footer></rj-footer>
            </Footer>
        </Layout>
    </div>
</template>

<script>
import header from './shared/common-module/header.vue';
import footer from './shared/common-module/footer.vue';

export default {
    name: 'App',
    components: {
        'rj-header': header,
        'rj-footer': footer
    }
}
</script>

<style lang="stylus">
    $icon = "./assets/icon.png";
    $radius = 4px
    #app {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        text-align: center;
        .rj-header {
            position: fixed;
            left 0
            right 0
            top 0
            z-index: 1000;
            box-sizing: border-box;
            background: #242424;
            border-bottom: 1px solid #000;
        }
        .rj-lay {
            position: absolute;
            margin-top 64px
            background #f5f5f5
            left: 0;
            right: 0;
            top: 0;
        }
        .rj-footer {
            height: 53px;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            zoom: 1;
            background: url("./assets/playbar.png") repeat-x 0 0;
        }
    }

    * {
        font-family: Arial, Helvetica, sans-serif;
    }
    a {
        &:hover {
            text-decoration underline
        }
    }
    em, i {
        font-style normal
        text-align left
    }
    .song {
        color: #333;
        &:hover {
            color: #333;
            text-decoration: underline;
        }
    }
    .singer {
        color: #aeaeae;
        &:hover {
            color: #aeaeae;
            text-decoration: underline;
        }
    }
    .wrap {
        width 980px
        padding 40px;
        margin 0 auto;
        border 1px solid #ccc
        background #fff
        .record-title{
            position: relative;
            height: 35px;
            border-bottom 2px solid #c20c0c
            h3 {
                float: left;
                color #666
                font-size 20px;
                line-height: 28px;
            }
            h4 {
                float left;
                display: inline;
                margin-top: 5px;
                margin-left: 10px;
                line-height: 26px;
                font-weight: 400;
                color: #666;
            }
            div {
                position: absolute;
                z-index: 1;
                right: 0;
                bottom: 5px;
                span {
                    color: #666;
                    line-height 26px
                    cursor pointer
                    float right
                    margin-left 8px
                }
                i {
                    width: 1px;
                    height: 12px;
                    margin-top: 7px;
                    margin-left 8px
                    background-color: #999;
                    float right
                }
                .z-sel {
                    color #333;
                    font-weight 700
                }
            }
        }
    }

    .ivu-menu-vertical, .ivu-menu-vertical  {
        .ivu-menu-item,.ivu-menu-submenu-title {
            padding 8px 0 0 24px;
        }
    }
    .ivu-menu-vertical {
        .ivu-menu-submenu {
            .ivu-menu-item {
                padding-left 24px
            }
        }
    }

    .ivu-modal-header {
        padding 0;
        background #333
        border-top-left-radius $radius
        border-top-right-radius $radius
        .model-header {
            color #f3f3f3
            margin 8px 10px
        }

    }

    .ivu-modal-footer {
        padding 0
        .model-footer {
            padding 12px 18px
            background rgb(247, 247, 247)
            border-bottom-left-radius $radius
            border-bottom-right-radius $radius
        }
    }
    .ivu-modal-close {
        top 3px
    }

    .rj-icn {
        display: inline-block;
        overflow: hidden;
        vertical-align: middle;
        width 13px
        height 13px
        background url($icon) no-repeat
    }
    .rj-icn-modify {
        background-position: 0 -270px;
        &:hover {
            background-position: -20px -270px;
        }
    }
    .rj-icn-delete {
        background-position: 0 -284px;
        &:hover {
            background-position -20px -284px
        }
    }
    .rj-icn-music {
        width: 64px;
        height: 50px;
        background-position: 0 -347px;
    }
    .rj-icn-store {
        width: 16px;
        height: 14px;
        background-position: 0 -400px;
    }
</style>
