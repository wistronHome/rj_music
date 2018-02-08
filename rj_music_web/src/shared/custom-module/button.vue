<template>
    <button class="rj-btn" :title="title || $slots.default[0].text"
        :class="{ 'rj-btn-disabled': disabled }">
        <span :class="clazz"><slot></slot></span>
    </button>
</template>

<script>
    export default {
        props: {
            icon: {
                type: String,
                default: 'default'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            }
        },
        computed: {
            clazz() {
                return `icon-${this.icon}`;
            }
        }
    }
</script>

<style lang="stylus" scoped>
$btn2= "../../assets/button2.png";
* {
    user-select none
}
.rj-btn {
    font-family simsun,\5b8b\4f53;
    color #333
    border none
    padding 0 5px 0 0
    white-space nowrap
    height: 31px;
    line-height: 30px;
    min-width: 23px;
    cursor: pointer;
    outline none
    background url($btn2) no-repeat
    background-position right -1020px
    &:hover {
        background-position right -1106px
        .icon-store {
            background-position 0 -1063px;
        }
        .icon-share {
            background-position 0 -1268px
        }
        .icon-load {
            background-position: 0 -2805px;
        }
        .icon-message {
            background-position: 0 -1508px;
        }
        .icon-default {
            background-position: 0 -141px;
        }
    }
    span {
        float left
        padding: 0 7px 0 36px;
        padding-right: 2px;
        padding-left: 28px;
        height: 31px;
        line-height: 30px;
        min-width: 23px;
        cursor: pointer;
        background url($btn2) no-repeat
    }
    .icon-store {
        background-position: 0 -977px;
    }
    .icon-share {
        background-position 0 -1225px
    }
    .icon-load {
        background-position 0 -2761px
    }
    .icon-message {
        background-position: 0 -1465px;
    }
    .icon-default {
        padding-left: 11px;
        background-position: 0 -59px;
    }
}
.rj-btn-disabled {
    cursor: default;
    background-position: right -1192px;
    &:hover {
        background-position: right -1192px;
        .icon-store {
            color: #bebebe;
            background-position: 0 -1149px;
            cursor: default;
        }
    }
    .icon-store {
        color: #bebebe;
        background-position: 0 -1149px;
        cursor: default;
    }
}
</style>
