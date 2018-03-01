<template>
    <button @click="handleClick" @mouseenter="mouseenter" @mouseleave="mouseleave" class="rj-btn" :title="title || $slots.default[0].text"
        :class="{ 'rj-btn-disabled': disabled, 'rj-btn-primary': btnType === 'primary', 'rj-btn-hide-icon': hideIcon }">
        <span :style="fWidth" :class="clazz">
            <em v-if="isMouseEnter">{{focusContent}}</em>
            <slot v-if="!isMouseEnter"></slot>
        </span>
        <i v-if="checked" class="rj-checked"></i>
    </button>
</template>

<script>
    export default {
        data() {
            return {
                isMouseEnter: false
            }
        },
        props: {
            btnType: {
                type: String,
                default: 'default'
            },
            width: {
                type: Number,
                default: 0
            },
            icon: {
                type: String,
                default: 'default'
            },
            checked: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            focusContent: {
                type: String
            },
            hideIcon: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            clazz() {
                return `icon-${this.icon}`;
            },
            fWidth() {
                if (this.width) {
                    return { width: this.width + 'px' };
                } else {
                    return { };
                }
            }
        },
        methods: {
            mouseenter() {
                if (this.focusContent) {
                    this.isMouseEnter = true;
                }
            },
            mouseleave() {
                this.isMouseEnter = false;
            },
            handleClick(event) {
                this.$emit('click', event);
            }
        }
    }
</script>

<style lang="stylus" scoped>
$icon = "../../assets/icon.png";
$btn = "../../assets/button.png"
$btn2 = "../../assets/button2.png";
* {
    user-select none
}
.rj-btn {
    position relative
    background url($btn2) no-repeat
    background-position right -1020px
    &:hover {
        background-position right -1106px
    }
}
.rj-btn-hide-icon {
    &:hover {
        span {
            padding-left: 7px;
        }
    }
}
.rj-btn-primary {
    background url($btn) no-repeat
    background-position 0 -720px
    width 72px
    &:hover {
        background-position -80px -720px
    }
}
.rj-btn, .rj-btn-primary {
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

    &:hover {
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
        .icon-chat {
            background-position 0 -845px;
        }
        .icon-plus {
            background-position -80px -720px;
        }
        .icon-checked {
            background-position 0 -760px;
        }
        .icon-circle {
            background-position -68px -990px;
        }

        .icon-default {
            background-position: 0 -141px;
        }
    }
    span {
        float left
        font-size 12px
        font-weight 500
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
    .icon-chat {
        background url($btn) no-repeat;
        background-position 0 -810px;
    }
    .icon-plus {
        background url($btn) no-repeat;
        background-position 0 -720px;
        color #fff
    }
    .icon-checked {
        background url($btn) no-repeat;
        background-position 0 -919px;
    }
    .icon-circle {
        background url($btn) no-repeat;
        background-position 0 -955px
    }

    .icon-default {
        padding-left: 11px;
        background-position: 0 -59px;
    }

}
.rj-btn-disabled {
    cursor: default;
    pointer-events: none;
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

.rj-checked {
    position: absolute;
    right: -3px;
    bottom: -3px;
    width: 18px;
    height: 18px;
    overflow: hidden;
    vertical-align: middle;
    background: url($icon) no-repeat;
    background-position: -25px -430px;
}
</style>
